import {
    BedrockRuntimeClient,
    ConverseCommand,
} from "@aws-sdk/client-bedrock-runtime";
import {toolMap, tools} from "@/services/tools"
import {HttpsProxyAgent} from 'https-proxy-agent';

const encoder = new TextEncoder()
const clientConfig = {
    awsRegion: 'us-west-2',
    ...(process.env.HTTP_PROXY && {httpAgent: new HttpsProxyAgent(process.env.HTTP_PROXY)})
}
console.log(clientConfig)

const bedrockClient = new BedrockRuntimeClient(clientConfig);

async function agent(inputMessages, streaming) {
    let outputMessages = []

    while (true) {
        //console.log('input:'+ JSON.stringify(outputMessages))
        console.log('input'+  JSON.stringify([...inputMessages.map(({content, ...rest}) => ({
            ...rest,
            content:[{text:content}]
        })), ...outputMessages]))
        const messages = [...inputMessages.map(({content, ...rest}) => ({
            ...rest,
            content:[{text:content}]
        })), ...outputMessages]
        const toolConfig = {
            tools: tools.map(({input_schema, ...rest}) => ({
                toolSpec: {
                    ...rest,
                    inputSchema: {json: input_schema}
                }
            }))
        }
        let message = await bedrockClient.send(
            new ConverseCommand({
                messages: messages,
                modelId: 'us.amazon.nova-premier-v1:0',
                toolConfig: toolConfig
            }),
        )
        // For text data (like JSON responses)
        const responseText = new TextDecoder().decode(message.body);
        console.log(responseText);
        try {
            message = JSON.parse(new TextDecoder().decode(message.body));
            console.log(JSON.stringify(message, null, 2)); // Pretty-print JSON
        } catch (e) {
            console.log('Not valid JSON, raw content:', new TextDecoder().decode(message.body));
        }
        if (message.stopReason === 'end_turn') {
            streaming(encoder.encode(`data: ${JSON.stringify({
                role: "assistant",
                content: message.output.message.content[0].text
            })}\n\n`))
            break
        } else if (message.stopReason === 'tool_use') {
            // print first input token
            console.log('first use token:' + message.usage.inputTokens)
            // Append LLM response to output messages list
            outputMessages.push(message.output.message)
            // Handle only the first tool use
            const tool = message.output.message.content.filter(item => item.toolUse)[0].toolUse;
            console.log(tool)
            // {
            //   type: 'tool_use',
            //   id: 'toolu_bdrk_01JJBkFPv8qiNK6B6K5vKSbw',
            //   name: 'generateUI',
            //   input: { component: { name: 'table', headers: [Array], rows: [Array] } }
            // }
            // Tool: If Generated UI component
            // if (tool.name === 'generateUI') {
            //   streaming(encoder.encode(`data: ${JSON.stringify({ role: "tool", content: tool.input })}\n\n`))
            //   break
            // }
            try {
                const result = await toolMap[tool.name](tool.input, streaming);
                // Append tool use result to output messages list
                if (result.content !== undefined) {
                    outputMessages.push({
                        role: 'user',
                        content: [{toolResult:{ toolUseId: tool.toolUseId, content: [{text:result.content}],status: "success"}}]
                    });
                }
                // Streaming generated UI component to client side if component

                if (result.component) {
                    await streaming(encoder.encode(`data: ${JSON.stringify({
                        role: "tool",
                        content: {component: result.component}
                    })}\n\n`));
                    await streaming(encoder.encode(`data: \n\n`));
                }


            } catch (error) {
                console.error(`Error executing tool ${tool.name}:`, error);
                // 可能需要添加错误处理逻辑，例如添加错误信息到outputMessages
            }
            //console.log('input:'+ JSON.stringify(outputMessages))
        }
    }
}

export async function POST(req) {
    const inputMessage = await req.json()
    const customReadable = new ReadableStream({
        async start(controller) {
            const streaming = content => controller.enqueue(content)
            await agent([inputMessage], streaming)
            controller.close()
        }
    })

    return new Response(customReadable, {
        headers: {
            Connection: "keep-alive",
            "Content-Encoding": "none",
            "Cache-Control": "no-cache, no-transform",
            "Content-Type": "text/event-stream; charset=utf-8",
        }
    })
}

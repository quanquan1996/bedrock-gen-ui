import AnthropicBedrock from "@anthropic-ai/bedrock-sdk"
import { toolMap, tools } from "@/services/tools"
import { HttpsProxyAgent } from 'https-proxy-agent';

const encoder = new TextEncoder()
const clientConfig = {
  awsRegion: 'us-west-2',
  ...(process.env.HTTP_PROXY && { httpAgent: new HttpsProxyAgent(process.env.HTTP_PROXY) })
}
console.log(clientConfig)

const client = new AnthropicBedrock(clientConfig)

async function agent(inputMessages, streaming) {
  let outputMessages = []

  while (true) {
    //console.log('input:'+ JSON.stringify(outputMessages))
    const message = await client.messages.create({
      model: 'us.anthropic.claude-3-7-sonnet-20250219-v1:0',
      max_tokens: 20480,
      messages: [...inputMessages, ...outputMessages],
      tools: tools
    })
    if (message.stop_reason === 'end_turn') {
      streaming(encoder.encode(`data: ${JSON.stringify({ role: "assistant", content: message.content[0].text })}\n\n`))
      break
    } else if (message.stop_reason === 'tool_use') {
      // print first input token
      console.log('first use token:'+message.usage.input_tokens)
      // Append LLM response to output messages list
      outputMessages.push({ role: 'assistant', content: message.content })
      // Handle only the first tool use
      const tool = message.content.filter(item => item.type === 'tool_use')[0]
      console.log(message)
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
            content: [{ type: 'tool_result', tool_use_id: tool.id, content: result.content }]
          });
        }
        // Streaming generated UI component to client side if component

        if (result.component) {
          await streaming(encoder.encode(`data: ${JSON.stringify({ role: "tool", content: { component: result.component } })}\n\n`));
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

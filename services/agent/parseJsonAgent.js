import AnthropicBedrock from "@anthropic-ai/bedrock-sdk"
import {HttpsProxyAgent} from 'https-proxy-agent';

const encoder = new TextEncoder()
const clientConfig = {
    awsRegion: 'us-west-2',
    ...(process.env.HTTP_PROXY && {httpAgent: new HttpsProxyAgent(process.env.HTTP_PROXY)})
}
console.log(clientConfig)

const client = new AnthropicBedrock(clientConfig)
export async function parseJsonAgent(inputMessages, jsonSchema,streaming) {
    const tools = [jsonSchema]
    //console.log('input:'+ JSON.stringify(outputMessages))
    const message = await client.messages.create({
        model: 'us.anthropic.claude-3-7-sonnet-20250219-v1:0',
        max_tokens: 2048,
        messages: [
            {
                role: "user",
                content: [
                    {
                        type: "text",
                        text: inputMessages
                    }
                ]
            }
        ],
        tools: tools,
        tool_choice:{
            type:'tool',
            name: jsonSchema.name
        }
    })
    if (message.stop_reason === 'end_turn') {
        return 'error'
    } else if (message.stop_reason === 'tool_use') {
        // Append LLM response to output messages list
        // Handle only the first tool use
        const tool = message.content.filter(item => item.type === 'tool_use')[0]
        console.log(tool.input)
        return tool.input
    }

}

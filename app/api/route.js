import AnthropicBedrock from "@anthropic-ai/bedrock-sdk"
import { toolMap, tools } from "@/services/tools"

const client = new AnthropicBedrock({
  awsRegion: 'us-west-2'
})

export async function POST(req) {
  const inputMessage = await req.json()
  const messages = [inputMessage]
  const customReadable = new ReadableStream({
    async start(controller) {
      let outputMessages = []
      const encoder = new TextEncoder()

      while (true) {
        const message = await client.messages.create({
          model: 'anthropic.claude-3-5-sonnet-20241022-v2:0',
          max_tokens: 2048,
          messages: [...messages, ...outputMessages],
          tools: tools
        })
        console.log(message)
        if (message.stop_reason === 'end_turn') {
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({
            role: "assistant",
            content: message.content[0].text
          })}\n\n`))
          break
        } else if (message.stop_reason === 'tool_use') {
          // Append LLM response to output messages list
          outputMessages.push({ role: 'assistant', content: message.content })
          // Handle only the first tool use
          const tool = message.content.filter(item => item.type === 'tool_use')[0]
          const result = await toolMap[tool.name](tool.input)
          // Streaming generated UI component to client side if component
          if (result.component) {
            controller.enqueue(encoder.encode(`data: ${JSON.stringify({
              role: "tool",
              content: { component: result.component }
            })}\n\n`))
          }
          // Append tool use result to output messages list
          outputMessages.push({
            role: 'user',
            content: [{ type: 'tool_result', tool_use_id: tool.id, content: result.content }]
          })
        }
      }
    }
  })

  return new Response(customReadable, {
    header: {
      Connection: "keep-alive",
      "Content-Encoding": "none",
      "Cache-Control": "no-cache, no-transform",
      "Content-Type": "text/event-stream; charset=utf-8",
    }
  })
}

import AnthropicBedrock from "@anthropic-ai/bedrock-sdk"
import { toolMap, tools } from "@/services/tools"

const client = new AnthropicBedrock({
  awsRegion: 'us-west-2'
})

// https://developer.mozilla.org/docs/Web/API/ReadableStream#convert_async_iterator_to_stream
function iteratorToStream(iterator) {
  return new ReadableStream({
    async pull(controller) {
      const { value, done } = await iterator.next()

      if (done) controller.close()
      else controller.enqueue(value)
    },
  })
}

const encoder = new TextEncoder()

async function* agent(inputMessages) {
  let outputMessages = []

  while (true) {
    const message = await client.messages.create({
      model: 'anthropic.claude-3-5-sonnet-20241022-v2:0',
      max_tokens: 2048,
      messages: [...inputMessages, ...outputMessages],
      tools: tools
    })
    if (message.stop_reason === 'end_turn') {
      yield encoder.encode(JSON.stringify({ role: 'assistant', content: message.content[0].text }))
      break
    } else if (message.stop_reason === 'tool_use') {
      // Append LLM response to output messages list
      outputMessages.push({ role: 'assistant', content: message.content })
      // Handle only the first tool use
      const tool = message.content.filter(item => item.type === 'tool_use')[0]
      const result = await toolMap[tool.name](tool.input)
      // Streaming generated UI component to client side
      if (result.component) {
        yield encoder.encode(JSON.stringify({ role: 'tool', content: { component: result.component } }))
      }
      // Append tool use result to output messages list
      outputMessages.push({
        role: 'user',
        content: [{ type: 'tool_result', tool_use_id: tool.id, content: result.content }]
      })
    }
  }
}

export async function GET() {
  const messages = [{ role: 'user', content: 'I need a new phone' }]
  const iterator = agent(messages)
  const stream = iteratorToStream(iterator)

  return new Response(stream)
}

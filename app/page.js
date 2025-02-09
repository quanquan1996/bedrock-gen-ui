'use client'
import { useState, useRef, useEffect } from 'react'
import ChatUserMessage from '@/components/chat/user-message';
import ChatLoadingMessage from '@/components/chat/loading-message';
import ChatAiMessage from '@/components/chat/ai-message'
import ChatToolMessage from '@/components/chat/tool-message'
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { SendHorizonal } from 'lucide-react';
// import { fetchMessages } from '@/services/fetchMessages';

export default function Home() {

  const [userInput, setUserInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [messages, setMessages] = useState([{ content: 'Hi, how are you?', role: 'assistant' }])
  const [incomingMessage, setIncomingMessage] = useState({ role: 'assistant', content: '' })
  const [isComposing, setIsComposing] = useState(false)

  const [rows, setRows] = useState(2)

  const messageListRef = useRef(null);
  const textAreaRef = useRef(null);

  useEffect(() => {
    textAreaRef.current.focus();
  }, [])

  // Auto scroll chat to bottom
  useEffect(() => {
    const messageList = messageListRef.current;
    messageList.scrollTop = messageList.scrollHeight;
  }, [messages, incomingMessage]);

  // Focus on text field on load
  useEffect(() => {
    textAreaRef.current.focus();
  }, []);

  useEffect(() => {
    let inputRows = userInput.split('\n').length
    if (inputRows < 5) {
      setRows(inputRows)
    }
  }, [userInput])

  function handleError() {
    setMessages((prevMessages) => {
      // Remove the loading message.
      return [...prevMessages, {
        content: 'Oops! There seems to be an error. Please try again.',
        role: 'assistant'
      }]
    });
    setLoading(false);
    setUserInput("");
  }

  // Prevent blank submissions and allow for multiline input
  function handleEnter(e) {
    if (e.key !== 'Enter') return
    if (userInput && !e.shiftKey && !isComposing) handleSubmit(e)
  };

  const streamingCallback = chunk => {
    switch (chunk.role) {
      case 'assistant':
        setIncomingMessage({ role: 'assistant', content: incomingMessage.content += chunk.content })
        break
      case 'tool':
        setMessages(prev => [...prev, chunk])
        break
      default:
        break
    }
  }

  // Handle form submission
  async function handleSubmit(e) {
    e.preventDefault();

    if (userInput.trim() === "") {
      return;
    }

    setUserInput('')
    const prompt = { content: userInput, role: 'user' }
    setMessages(prevMessages => [...prevMessages, { content: userInput, role: 'user' }])
    setLoading(true)
    await sendMessage(prompt, streamingCallback)
    setMessages(prev => [...prev, incomingMessage])
    setIncomingMessage({ role: 'assistant', content: '' })
    setLoading(false)
  };

  const handleCompositionEvent = event => {
    switch (event.type) {
      case 'compositionstart':
      case 'compositionupdate':
        setIsComposing(true)
        break
      case 'compositionend':
        setIsComposing(false)
        break
      default:
        setIsComposing(false)
    }
  }

  return (
    <main className='h-screen flex flex-col overflow-hidden'>
      <div className='flex flex-1 overflow-hidden'>
        <div className="justify-between items-center flex flex-col sm:rounded-3xl w-full md:w-2/3 lg:w-3/6 mx-auto sm:mb-6">
          <div className="flex-1 w-full justify-center flex overflow-y-auto scrollbar-hide" ref={messageListRef}>
            <div className="flex flex-col p-3 w-full">

              {messages.map((message, i) => {
                if (message.role === 'user') {
                  return (
                    <ChatUserMessage key={i} message={message} />
                  )
                } else if (message.role === 'assistant') {
                  return (
                    <ChatAiMessage key={i} message={message} />
                  )
                } else if (message.role === 'tool') {
                  return (
                    <ChatToolMessage key={i} message={message} />
                  )
                }
              })}
              {loading && incomingMessage.content === '' ? <ChatLoadingMessage /> : null}
              {incomingMessage.content !== '' ? <ChatAiMessage message={incomingMessage} /> : null}
            </div>
          </div>
          <div className="flex flex-col justify-center items-center w-full">
            <div className={`py-4 px-3 flex space-x-2 justify-center w-full ${rows === 1 ? 'items-center' : 'items-start'}`}>
              <Textarea
                ref={textAreaRef}
                rows={rows}
                onCompositionStart={event => handleCompositionEvent(event)}
                onCompositionUpdate={event => handleCompositionEvent(event)}
                onCompositionEnd={event => handleCompositionEvent(event)}
                onKeyDown={handleEnter}
                className='bg-secondary text-base px-8 py-4 rounded-3xl resize-none'
                placeholder={loading ? 'Waiting for response' : 'How can I help you?'}
                disabled={loading}
                value={userInput}
                onChange={e => setUserInput(e.target.value)}
              />

              <Button
                size='icon'
                className='rounded-full w-12 h-12'
                disabled={loading}
                onClick={handleSubmit}
                variant='ghost'
              >
                <SendHorizonal />
              </Button>

            </div>
            {/* <p className='text-sm text-secondary-foreground/70'>Chatfather will do anything for you!</p> */}
          </div>
        </div>
      </div>
    </main>
  )
}

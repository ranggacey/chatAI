// ChatAi/page.jsx
"use client"

import { useState } from "react"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function ChatAi() {
  const [userName, setUserName] = useState("")
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "assistant",
      text: "Hello! My name is Jihyo. It's nice to meet you. What would you like to call me?",
    },
  ])
  const handleUserNameChange = (name) => {
    setUserName(name)
    setMessages([
      ...messages,
      {
        id: messages.length + 1,
        sender: "user",
        text: `Hello, Jihyo. My name is ${name}.`,
      },
      {
        id: messages.length + 2,
        sender: "assistant",
        text: `It's wonderful to meet you, ${name}. I'm so glad we get to chat. How has your day been so far?`,
      },
    ])
  }
  const handleMessageSend = async (message) => {
    setMessages([
      ...messages,
      {
        id: messages.length + 1,
        sender: "user",
        text: message,
      },
    ])
    
    // Call API to get response
    const response = await fetch('/ChatAi/api/route', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    });
    
    const data = await response.json();
    setMessages([
      ...messages,
      {
        id: messages.length + 2,
        sender: "assistant",
        text: data.text,
      },
    ]);
  }
  return (
    <div className="flex flex-col h-screen bg-background text-foreground">
      <header className="bg-primary text-primary-foreground py-4 px-6">
        <h1 className="text-2xl font-bold">Chat with Jihyo</h1>
      </header>
      <main className="flex-1 overflow-auto p-6">
        <div className="max-w-xl mx-auto">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex items-start gap-4 mb-4 ${message.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <Avatar className="w-10 h-10 bg-muted rounded-full flex-shrink-0">
                <AvatarImage src="/jihyo-avatar.jpg" alt={message.sender} />
                <AvatarFallback>{message.sender === "user" ? "U" : "A"}</AvatarFallback>
              </Avatar>
              <div
                className={`p-4 rounded-lg max-w-[70%] ${
                  message.sender === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                }`}
              >
                <p>{message.text}</p>
              </div>
            </div>
          ))}
        </div>
      </main>
      <footer className="bg-muted/40 py-4 px-6">
        {userName ? (
          <form
            onSubmit={(e) => {
              e.preventDefault()
              handleMessageSend(e.target.message.value)
              e.target.message.value = ""
            }}
            className="flex items-center gap-4"
          >
            <Input id="message" name="message" placeholder={`Message ${userName}`} className="flex-1" />
            <Button type="submit">Send</Button>
          </form>
        ) : (
          <div className="flex items-center gap-4">
            <Input
              id="name"
              placeholder="What's your name?"
              value={userName}
              onChange={(e) => handleUserNameChange(e.target.value)}
              className="flex-1"
            />
            <Button disabled={!userName} onClick={() => handleUserNameChange(userName)}>
              Start Chat
            </Button>
          </div>
        )}
      </footer>
    </div>
  )
}

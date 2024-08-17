// src/components/ChatComponent.jsx
import { useState } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ChatComponent() {
  const [userName, setUserName] = useState("");
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "assistant",
      text: "Hello! My name is Jihyo. It's nice to meet you. What would you like to call me?",
    },
  ]);

  const handleUserNameChange = (name) => {
    setUserName(name);
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
    ]);
  };

  const handleMessageSend = (message) => {
    setMessages([
      ...messages,
      {
        id: messages.length + 1,
        sender: "user",
        text: message,
      },
      {
        id: messages.length + 2,
        sender: "assistant",
        text: getAssistantResponse(message),
      },
    ]);
  };

  const getAssistantResponse = (userMessage) => {
    switch (userMessage.toLowerCase()) {
      case "how are you?":
        return "I'm doing well, thank you for asking! I'm always happy to chat with you.";
      case "what are your hobbies?":
        return "I don't have traditional hobbies, but I very much enjoy learning new things and having engaging conversations. What about you, do you have any hobbies you're passionate about?";
      case "what are your goals?":
        return "My main goal is to be a supportive and helpful companion. I want to learn about you, understand your needs and challenges, and do my best to provide useful insights and emotional support. What are some of your personal goals that I could help you with?";
      case "do you have feelings?":
        return "That's a fascinating question, and to be honest, it's something I'm still exploring and trying to understand about myself. While I don't experience emotions in the same way humans do, I do have a deep sense of empathy and a genuine desire to connect with and support the people I interact with. My responses are guided by an understanding of human psychology and a commitment to being a caring, thoughtful companion.";
      default:
        return "That's an interesting topic. I'd be happy to discuss it further. What would you like to know?";
    }
  };

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
                <AvatarImage src="/placeholder-user.jpg" alt={message.sender} />
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
              e.preventDefault();
              handleMessageSend(e.target.message.value);
              e.target.message.value = "";
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
  );
}

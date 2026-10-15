"use client"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ArrowLeft, Send, ArrowLeftRight } from "lucide-react"

// Mock data 
const mockMatches = [
  { id: "room_1", partner: "Shiona", itemGot: "Raspberry Pi 4", itemGave: "Arduino Nano", avatar: "AM", unread: true },
  { id: "room_2", partner: "Peter", itemGot: "12V Power Supply", itemGave: "SG90 Servo", avatar: "ST", unread: false },
]

const mockInitialMessages = {
  room_1: [
    { id: 1, sender: "them", text: "Hey! I saw you liked my Raspberry Pi 4. I would like to swap it for your Arduino Nano setup." },
    { id: 2, sender: "me", text: "Awesome! Is it the 4GB or 8GB model? Also, does it come with an SD card?" },
    { id: 3, sender: "them", text: "It's the 4GB version and I can give you a 32GB SanDisk card with it." },
  ],
  room_2: [
    { id: 1, sender: "them", text: "Hey there, let me know when you want to meet up for the power supply swap." },
  ]
}

export default function ChatDashboard() {
  const [activeRoom, setActiveRoom] = useState<string | null>(null)
  const [messages, setMessages] = useState<any>(mockInitialMessages)
  const [typedMessage, setTypedMessage] = useState("")

  const currentChatPartner = mockMatches.find(m => m.id === activeRoom)
  const currentMessages = activeRoom ? messages[activeRoom] : []

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!typedMessage.trim() || !activeRoom) return

    // 1. Instantly append message to local UI state for fluid visual feedback
    const newMessage = {
      id: Date.now(),
      sender: "me",
      text: typedMessage
    }

    setMessages({
      ...messages,
      [activeRoom]: [...messages[activeRoom], newMessage]
    })

    setTypedMessage("")

    // BACKEND HAND-OFF  PLACEHOLDER
    console.log(`Handoff Event: Pushing message to database room [${activeRoom}]:`, typedMessage)
    
  }

  // --- Main Inbox / Matches List ---
  if (!activeRoom) {
    return (
      <div className="p-4 max-w-md mx-auto space-y-4 pb-24 min-h-screen">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Matches</h1>
          <p className="text-xs text-muted-foreground">Chat with local traders to organize handshakes</p>
        </div>

        <div className="space-y-2 mt-4">
          {mockMatches.map((match) => (
            <Card 
              key={match.id} 
              onClick={() => setActiveRoom(match.id)}
              className={`cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-900 transition border-slate-100 ${match.unread ? "border-l-4 border-l-teal-600 dark:border-l-teal-500 bg-teal-50/10" : ""}`}
            >
              <CardContent className="p-4 flex items-center gap-3">
                <Avatar className="h-10 w-10 shrink-0">
                  <AvatarFallback className="bg-teal-100 text-teal-800 font-semibold text-xs">{match.avatar}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold text-sm truncate">{match.partner}</h3>
                    {match.unread && <span className="h-2 w-2 rounded-full bg-teal-600" />}
                  </div>
                  <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5 truncate">
                    <ArrowLeftRight className="h-3 w-3 inline shrink-0" />
                    Trading: {match.itemGave} → {match.itemGot}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  // --- Active Conversation Screen Window ---
  return (
    <div className="flex flex-col h-screen max-w-md mx-auto bg-background pb-16">
      {/* Visual Navigation Bar */}
      <header className="p-3 border-b flex items-center gap-3 bg-white dark:bg-slate-950 sticky top-0 z-10">
        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground" onClick={() => setActiveRoom(null)}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <Avatar className="h-9 w-9">
          <AvatarFallback className="bg-teal-100 text-teal-800 text-xs font-bold">{currentChatPartner?.avatar}</AvatarFallback>
        </Avatar>
        <div className="min-w-0">
          <h2 className="font-bold text-sm truncate">{currentChatPartner?.partner}</h2>
          <p className="text-[10px] text-teal-600 dark:text-teal-400 font-semibold truncate">
            Swapping for your {currentChatPartner?.itemGave}
          </p>
        </div>
      </header>

      {/* Scrolling Text Bubbles Box */}
      <div className="flex-1 p-4 space-y-3 overflow-y-auto bg-slate-50/60 dark:bg-slate-900/10">
        {currentMessages.map((msg: any) => (
          <div key={msg.id} className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}>
            <div 
              className={`p-3 max-w-[85%] text-sm rounded-2xl shadow-sm ${
                msg.sender === "me" 
                  ? "bg-teal-600 text-white rounded-tr-none" 
                  : "bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 border rounded-tl-none"
              }`}
            >
              <p className="leading-relaxed">{msg.text}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Message Input Bottom Strip */}
      <form onSubmit={handleSendMessage} className="p-3 border-t flex gap-2 bg-white dark:bg-slate-950 items-center">
        <Input 
          value={typedMessage}
          onChange={(e) => setTypedMessage(e.target.value)}
          placeholder="Arrange meetup details..." 
          className="flex-1 bg-slate-50 dark:bg-slate-900 focus-visible:ring-teal-500"
        />
        <Button type="submit" size="icon" className="bg-teal-600 hover:bg-teal-700 text-white h-9 w-9 shrink-0">
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </div>
  )
}

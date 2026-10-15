import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export default function ChatPage() {
  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] max-w-md mx-auto border-x pb-20">
      <header className="p-4 border-b flex items-center gap-3">
        <Avatar>
          <AvatarFallback>AM</AvatarFallback>
        </Avatar>
        <div>
          <h2 className="font-semibold text-sm">Alex M.</h2>
          <p className="text-xs text-emerald-500">Trading Raspberry Pi 4</p>
        </div>
      </header>

      <div className="flex-1 p-4 space-y-3 overflow-y-auto bg-slate-50/50 dark:bg-transparent">
        <Card className="p-3 max-w-[80%] bg-muted rounded-tl-none">
          <p className="text-sm">Hey, I saw you were looking for an Arduino Nano. Would you trade your Pi 4 for it?</p>
        </Card>
        <Card className="p-3 max-w-[80%] ml-auto bg-primary text-primary-foreground rounded-tr-none">
          <p className="text-sm">Yeah, that sounds like a fair trade! Is it the 4GB or 8GB variant?</p>
        </Card>
      </div>

      <div className="p-3 border-t flex gap-2 bg-background">
        <Input placeholder="Type your trade offer..." className="flex-1" />
        <Button>Send</Button>
      </div>
    </div>
  )
}

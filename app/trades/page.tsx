"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeftRight, MessageSquare, CheckCircle } from "lucide-react"
import Link from "next/link"

const activeTrades = [
  { id: 1, partner: "Shiona", itemGot: "Raspberry Pi 4", itemGave: "Arduino Nano & Sensors", status: "Match Found" },
]

const completedTrades = [
  { id: 101, partner: "Peter", itemGot: "12V Power Supply", itemGave: "SG90 Micro Servo", date: "Oct 4, 2026" },
]

export default function TradesPage() {
  return (
    <div className="p-4 max-w-md mx-auto space-y-6 pb-24 min-h-screen">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Your Trades</h1>
        <p className="text-xs text-muted-foreground">Manage active barter handshakes and trade history</p>
      </div>

      {/* Active Matched Section */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Active Connections</h3>
        {activeTrades.map((trade) => (
          <Card key={trade.id} className="border-blue-200 bg-blue-50/10 dark:bg-blue-950/10">
            <CardHeader className="p-4 pb-2">
              <div className="flex justify-between items-center">
                <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 flex items-center gap-1">
                  <ArrowLeftRight className="h-3 w-3" /> {trade.status}
                </span>
                <Badge variant="secondary">Meetup Pending</Badge>
              </div>
              <CardTitle className="text-sm font-bold mt-1">Trading with {trade.partner}</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0 space-y-3 text-xs">
              <p className="text-muted-foreground">
                You receive: <span className="text-foreground font-medium">{trade.itemGot}</span>
              </p>
              <p className="text-muted-foreground">
                You give: <span className="text-foreground font-medium">{trade.itemGave}</span>
              </p>
              <Link href="/chat" passHref>
                <Button size="sm" className="w-full gap-1.5 mt-1">
                  <MessageSquare className="h-3.5 w-3.5" /> Chat to Arrange Meetup
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Historical Completed Swaps */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Completed Swaps</h3>
        {completedTrades.map((swap) => (
          <Card key={swap.id} className="opacity-80">
            <CardContent className="p-4 flex items-center justify-between gap-4">
              <div className="space-y-1 text-xs">
                <p className="font-semibold text-sm">Swapped with {swap.partner}</p>
                <p className="text-muted-foreground">Got: {swap.itemGot}</p>
                <p className="text-slate-400 text-[10px]">{swap.date}</p>
              </div>
              <div className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 text-xs font-medium shrink-0">
                <CheckCircle className="h-4 w-4" /> Swapped
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

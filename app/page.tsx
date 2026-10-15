"use client"
import { useState } from "react"
import { ThumbsUp, X, MapPin, SlidersHorizontal, Info, RefreshCw } from "lucide-react"

const knotSwapSampleDeck = [
  { 
    id: 1, 
    title: "Raspberry Pi 4 Model B (4GB)", 
    category: "Item", 
    condition: "Mint condition, original box", 
    offeredBy: "Shiona", 
    distance: "1.2 mi",
    seeking: "Arduino Nano & I2C Display" 
  },
  { 
    id: 2, 
    title: "Intro to Microcontrollers", 
    category: "Skill/Tutoring", 
    condition: "Offered: Beginner circuit basics", 
    offeredBy: "Peter", 
    distance: "4.5 mi",
    seeking: "Soldering Station kit" 
  },
  { 
    id: 3, 
    title: "Nema 17 Stepper Motors (x3)", 
    category: "Item", 
    condition: "Slightly used", 
    offeredBy: "Adriana", 
    distance: "8.1 mi",
    seeking: "12V 5A Power Supply" 
  },
]

export default function KnotSwapDashboard() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [swipeDirection, setSwipeDirection] = useState<"left" | "right" | null>(null)
  const [isAnimating, setIsAnimating] = useState(false)

  const activeCard = knotSwapSampleDeck[currentIndex]

  const handleSwipe = (direction: "left" | "right") => {
    if (isAnimating || currentIndex >= knotSwapSampleDeck.length) return
    
    setIsAnimating(true)
    setSwipeDirection(direction)

    setTimeout(() => {
      setCurrentIndex((prev) => prev + 1)
      setSwipeDirection(null)
      setIsAnimating(false)
    }, 400) 
  }

  return (
    
    <div className="p-3 w-full h-[calc(100vh-5rem)] flex flex-col justify-between bg-white dark:bg-slate-950 overflow-hidden">
      {/* --- Header Tray --- */}
      <header className="flex justify-between items-center border-b pb-2">
        <div>
          <h1 className="text-lg font-extrabold tracking-tight text-slate-900 dark:text-white">KnotSwap</h1>
          <p className="text-[10px] text-muted-foreground font-medium">Electronics Barter Network</p>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="inline-flex items-center gap-1 bg-slate-50 border px-2 py-0.5 rounded-lg text-[10px] font-semibold text-slate-600">
            <MapPin className="h-2.5 w-2.5 text-teal-600" /> Houston
          </span>
        </div>
      </header>

      
      <div className="flex-1 flex items-center justify-center relative w-full py-2">
        {currentIndex < knotSwapSampleDeck.length ? (
          <div 
            className={`w-full max-w-[290px] flex flex-col justify-between shadow-md border bg-white dark:bg-slate-900 overflow-hidden rounded-2xl transition-all duration-300 transform ease-out ${
              swipeDirection === "right" ? "translate-x-[150%] rotate-[15deg] opacity-0" : ""
            } ${
              swipeDirection === "left" ? "-translate-x-[150%] -rotate-[15deg] opacity-0" : ""
            }`}
          >
            
            <div className="bg-slate-50 dark:bg-slate-950 p-3 h-[130px] flex flex-col justify-between relative shrink-0">
              <div className="flex justify-between items-center">
                <span className="bg-teal-600 text-white px-1.5 py-0.5 rounded-md text-[9px] uppercase tracking-wider font-bold">
                  {activeCard.category}
                </span>
                <span className="border border-slate-200 text-slate-500 px-1 py-0.5 rounded-md text-[9px] font-semibold bg-white/80">
                  {activeCard.distance} away
                </span>
              </div>
              
              <div className="w-full text-center py-1 text-muted-foreground flex flex-col items-center gap-0.5">
                <Info className="h-4 w-4 text-slate-300" />
                <p className="text-[9px] text-slate-400">Component image asset</p>
              </div>

              <div>
                <h2 className="text-sm font-bold tracking-tight leading-tight truncate text-slate-900 dark:text-slate-100">
                  {activeCard.title}
                </h2>
                <p className="text-[10px] font-medium text-slate-400 mt-0.5">👤 Offered by: {activeCard.offeredBy}</p>
              </div>
            </div>

            {/* Smaller Lower Text Content Box */}
            <div className="p-3 bg-white dark:bg-slate-900 border-t space-y-1.5">
              <div className="text-[11px]">
                <span className="font-bold uppercase tracking-wider text-slate-400 block text-[8px] mb-0.5">Condition</span>
                <p className="text-slate-700 dark:text-slate-300 font-medium truncate">{activeCard.condition}</p>
              </div>
              <div className="p-2 bg-teal-50/40 dark:bg-teal-950/10 border border-teal-100/50 dark:border-teal-900 rounded-xl text-[11px]">
                <span className="font-bold uppercase tracking-wider text-teal-600 block text-[8px] mb-0.5">Seeking in return:</span>
                <p className="text-slate-900 dark:text-slate-100 font-semibold truncate">🔄 {activeCard.seeking}</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center space-y-2 p-4 animate-in fade-in">
            <p className="text-xs font-semibold text-slate-400">No more local hardware trades nearby!</p>
            <button onClick={() => setCurrentIndex(0)} className="text-xs text-teal-600 font-bold hover:underline">
              Reload Deck
            </button>
          </div>
        )}
      </div>

      
      {currentIndex < knotSwapSampleDeck.length && (
        <div className="flex justify-center gap-4 items-center pb-1">
          <button 
            onClick={() => handleSwipe("left")}
            disabled={isAnimating}
            className="h-11 w-11 flex items-center justify-center rounded-full border border-red-100 bg-white text-red-500 shadow-xs hover:bg-red-50/50 transition active:scale-95 disabled:opacity-50"
          >
            <X className="h-4 w-4" />
          </button>
          <button 
            onClick={() => handleSwipe("right")}
            disabled={isAnimating}
            className="h-11 w-11 flex items-center justify-center rounded-full border border-emerald-100 bg-white text-emerald-500 shadow-xs hover:bg-emerald-50/50 transition active:scale-95 disabled:opacity-50"
          >
            <ThumbsUp className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  )
}


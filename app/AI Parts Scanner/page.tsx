"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Camera, RefreshCw } from "lucide-react"

export default function ScanPage() {
  const [isScanning, setIsScanning] = useState(false)
  const [scanResult, setScanResult] = useState<string | null>(null)

  const handleSimulateScan = () => {
    setIsScanning(true)
    setScanResult(null)
    // Simulating Roboflow API response lag
    setTimeout(() => {
      setIsScanning(false)
      setScanResult("Raspberry Pi 4 Model B (Detected with 94% Confidence)")
    }, 1500)
  }

  return (
    <div className="p-4 max-w-md mx-auto space-y-6 pb-24 text-center">
      <div>
        <h1 className="text-2xl font-bold">AI Hardware Scanner</h1>
        <p className="text-sm text-muted-foreground">Snap a photo to instantly identify your electronic components</p>
      </div>

      <Card className="aspect-video flex items-center justify-center border-2 border-dashed relative overflow-hidden bg-muted">
        {isScanning ? (
          <div className="flex flex-col items-center gap-2">
            <RefreshCw className="h-8 w-8 animate-spin text-primary" />
            <p className="text-sm">Analyzing components via Roboflow...</p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2 p-4">
            <Camera className="h-12 w-12 text-muted-foreground" />
            <p className="text-xs text-muted-foreground">Camera simulation viewport</p>
          </div>
        )}
      </Card>

      <Button onClick={handleSimulateScan} disabled={isScanning} className="w-full size-lg">
        {isScanning ? "Processing..." : "Capture Photo"}
      </Button>

      {scanResult && (
        <Card className="border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/20">
          <CardContent className="p-4 text-sm font-medium text-emerald-700 dark:text-emerald-400">
             {scanResult}
          </CardContent>
        </Card>
      )}
    </div>
  )
}

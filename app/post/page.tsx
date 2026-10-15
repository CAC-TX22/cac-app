"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge";
import { Camera, RefreshCw, AlertCircle, Cpu, CheckCircle2, Sliders } from "lucide-react";

interface DetectionResult {
  className: string;
  confidence: number;
}

export default function PostItemPage() {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [detection, setDetection] = useState<DetectionResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  // Custom form input values for the marketplace post packet
  const [seekingItem, setSeekingItem] = useState("");
  const [itemCondition, setItemCondition] = useState("Excellent");
  const [isPublished, setIsPublished] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const triggerCamera = () => {
    fileInputRef.current?.click();
  };

  const handleImageCapture = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Instantly display the captured image file as a local UI preview background
    setPreviewUrl(URL.createObjectURL(file));
    setLoading(true);
    setError(null);
    setDetection(null);
    setIsPublished(false);

    // Simulate Roboflow Object Detection Response delay
    setTimeout(() => {
      setLoading(false);
      setDetection({
        className: "Raspberry Pi 4 Model B",
        confidence: 0.94
      });
    }, 1800);
  };

  const handlePublishToMarketplace = (e: React.FormEvent) => {
    e.preventDefault();
    if (!detection || !seekingItem.trim()) return;

    // Build the structural data contract object package for the backend developer
    const listingPayload = {
      title: detection.className,
      confidenceScore: detection.confidence,
      condition: itemCondition,
      seeking: seekingItem.trim(),
      timestamp: new Date().toISOString()
    };

    console.log("Handoff Pack dispatched to backend listener:", listingPayload);
    setIsPublished(true);
  };

  return (
    <div className="p-4 max-w-md mx-auto space-y-6 pb-24 min-h-screen">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Post an Item</h1>
        <p className="text-xs text-muted-foreground">Snap a component to identify it and add it to the local market</p>
      </div>

      <input
        type="file"
        accept="image/*"
        capture="environment"
        ref={fileInputRef}
        onChange={handleImageCapture}
        className="hidden"
      />

      {/* --- Smaller, Compact AI Viewport Scanner Tray --- */}
{!isPublished && (
  <Card 
    onClick={triggerCamera}
    className="w-full max-w-[280px] mx-auto aspect-square border-2 border-dashed border-slate-300 dark:border-slate-800 rounded-2xl flex flex-col items-center justify-center relative overflow-hidden bg-slate-50 dark:bg-slate-900 cursor-pointer hover:bg-slate-100/50 transition-all shadow-xs"
  >
    {previewUrl ? (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={previewUrl} alt="Captured gear asset" className="w-full h-full object-cover" />
    ) : (
      <div className="flex flex-col items-center gap-1.5 p-3 text-center">
        <div className="p-2.5 rounded-full bg-white dark:bg-slate-800 shadow-xs border border-slate-100 dark:border-slate-800 mb-0.5">
          <Camera className="h-5 w-5 text-teal-600 dark:text-teal-400" />
        </div>
        <p className="text-xs font-bold text-slate-700 dark:text-slate-300">Take a photo</p>
        <p className="text-[10px] text-muted-foreground max-w-[160px]">Snap item under clear lighting</p>
      </div>
    )}

    {loading && (
      <div className="absolute inset-0 bg-white/90 dark:bg-slate-950/90 backdrop-blur-xs flex flex-col items-center justify-center gap-1.5 animate-in fade-in">
        <RefreshCw className="h-5 w-5 animate-spin text-teal-600" />
        <p className="text-[10px] font-bold text-slate-700 dark:text-slate-300 tracking-wide uppercase">Analyzing via AI...</p>
      </div>
    )}
  </Card>
)}


      {/* --- Step 2: Live Identification & Parameter Tuning Preview Form --- */}
      {detection && !isPublished && (
        <Card className="border-slate-200 dark:border-slate-800 shadow-sm animate-in slide-in-from-bottom-4 duration-300">
          <CardHeader className="pb-3 border-b bg-slate-50/50 dark:bg-slate-900/20 p-4">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2 min-w-0">
                <Cpu className="h-4 w-4 text-teal-600 shrink-0" />
                <CardTitle className="text-sm font-bold truncate">{detection.className}</CardTitle>
              </div>
              <Badge className="bg-teal-600 dark:bg-teal-500 font-semibold text-[10px] shrink-0">
                {Math.round(detection.confidence * 100)}% Match
              </Badge>
            </div>
          </CardHeader>
          
          <CardContent className="p-4 pt-4">
            <form onSubmit={handlePublishToMarketplace} className="space-y-4">
              {/* Parameter Form Field 1: Condition Selector */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                  <Sliders className="h-3 w-3" /> Hardware Condition
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {["Mint", "Excellent", "Fair"].map((cond) => (
                    <button
                      type="button"
                      key={cond}
                      onClick={() => setItemCondition(cond)}
                      className={`text-xs font-medium py-2 px-3 border rounded-xl transition ${
                        itemCondition === cond 
                          ? "border-teal-600 bg-teal-50/30 text-teal-700 font-bold dark:bg-teal-950/20 dark:text-teal-400" 
                          : "bg-background text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      {cond}
                    </button>
                  ))}
                </div>
              </div>

              {/* Parameter Form Field 2: Seeking Barter Targets */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  What do you want in return?
                </label>
                <Input
                  required
                  value={seekingItem}
                  onChange={(e) => setSeekingItem(e.target.value)}
                  placeholder="e.g., Arduino Nano, 10k Resistors, LEDs"
                  className="bg-slate-50/50 focus-visible:ring-teal-600 dark:bg-slate-900 rounded-xl text-sm"
                />
              </div>

              <Button type="submit" className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl mt-2 shadow-sm">
                Publish to Discover Feed
              </Button>
            </form>
          </CardContent>
        </Card>
      )}

      {/* --- Step 3: Success Confirmation State --- */}
      {isPublished && (
        <Card className="border-emerald-200 bg-emerald-50/10 p-6 text-center space-y-4 animate-in zoom-in-95">
          <div className="mx-auto w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 shadow-xs">
            <CheckCircle2 className="h-6 w-6" />
          </div>
          <div className="space-y-1">
            <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">Listing Published Live!</h2>
            <p className="text-xs text-muted-foreground max-w-xs mx-auto">
              Your <span className="font-semibold text-slate-800 dark:text-slate-200">{detection?.className}</span> is now visible to local swipers nearby.
            </p>
          </div>
          <Button 
            variant="outline" 
            onClick={() => {
              setPreviewUrl(null);
              setDetection(null);
              setSeekingItem("");
              setIsPublished(false);
            }} 
            className="w-full text-xs font-semibold rounded-xl"
          >
            Scan Another Item
          </Button>
        </Card>
      )}

      {error && (
        <Card className="border-destructive bg-destructive/10 text-left">
          <CardContent className="p-4 flex gap-2 items-start text-xs text-destructive font-semibold">
            <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
            <p>{error}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

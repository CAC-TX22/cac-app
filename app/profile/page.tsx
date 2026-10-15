import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star } from "lucide-react"

export default function ProfilePage() {
  return (
    <div className="p-4 max-w-md mx-auto space-y-6 pb-24">
      <Card className="text-center pt-6">
        <CardContent className="space-y-3">
          <Avatar className="h-20 w-20 mx-auto">
            <AvatarFallback className="text-xl">JD</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-xl font-bold">John Doe</h2>
            <p className="text-sm text-muted-foreground">Electrical Engineering Student</p>
          </div>
          <div className="flex items-center justify-center gap-1 text-amber-500 font-semibold text-sm">
            <Star className="h-4 w-4 fill-amber-500" />
            4.9 <span className="text-muted-foreground font-normal">(18 verified trades)</span>
          </div>
        </CardContent>
      </Card>

      <div>
        <h3 className="font-semibold mb-3 text-sm">Your Active Listings</h3>
        <Card>
          <CardHeader className="p-4 pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-sm font-medium">Nema 17 Stepper Motor</CardTitle>
              <Badge variant="secondary">Active</Badge>
            </div>
          </CardHeader>
          <CardContent className="p-4 pt-0 text-xs text-muted-foreground">
            Looking for: 12V Power Supplies
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

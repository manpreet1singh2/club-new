import { Metadata } from "next"
import Link from "next/link"
import { Ticket } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"

export const metadata: Metadata = { title: "Create Account — ClubSpot" }

export default function SignupPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/50 py-12 px-4">
      <div className="w-full max-w-md space-y-6">
        <Link href="/" className="flex items-center justify-center gap-2 text-2xl font-bold">
          <Ticket className="h-7 w-7 text-primary" /><span>ClubSpot</span>
        </Link>
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Create your account</CardTitle>
            <CardDescription>Start discovering the best nightlife near you</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2"><Label>First Name</Label><Input placeholder="John" /></div>
              <div className="space-y-2"><Label>Last Name</Label><Input placeholder="Doe" /></div>
            </div>
            <div className="space-y-2"><Label>Email</Label><Input type="email" placeholder="john@example.com" /></div>
            <div className="space-y-2"><Label>Phone</Label><Input type="tel" placeholder="+1 (555) 000-0000" /></div>
            <div className="space-y-2"><Label>Password</Label><Input type="password" placeholder="Create a strong password" /></div>
            <div className="space-y-2"><Label>Confirm Password</Label><Input type="password" placeholder="Repeat your password" /></div>
            <div className="flex items-start gap-2">
              <Checkbox id="terms" className="mt-0.5" />
              <label htmlFor="terms" className="text-sm text-muted-foreground leading-relaxed">
                I agree to the <Link href="/terms" className="text-primary underline">Terms of Service</Link> and <Link href="/privacy" className="text-primary underline">Privacy Policy</Link>
              </label>
            </div>
            <Button className="w-full" size="lg">Create Account</Button>
            <div className="relative"><div className="absolute inset-0 flex items-center"><Separator className="w-full"/></div><div className="relative flex justify-center"><span className="bg-background px-2 text-xs text-muted-foreground">or continue with</span></div></div>
            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" className="w-full">Google</Button>
              <Button variant="outline" className="w-full">Apple</Button>
            </div>
          </CardContent>
          <CardFooter className="justify-center">
            <p className="text-sm text-muted-foreground">Already have an account? <Link href="/login" className="text-primary font-medium underline">Log in</Link></p>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

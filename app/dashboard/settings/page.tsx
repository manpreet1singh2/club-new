"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-black tracking-tighter uppercase italic">Account Settings</h2>
        <p className="text-muted-foreground">Manage your account preferences and notification settings.</p>
      </div>

      <Separator className="bg-primary/10" />

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="rounded-3xl border-none shadow-xl">
          <CardHeader>
            <CardTitle className="text-xl font-black tracking-tighter uppercase italic">Profile Information</CardTitle>
            <CardDescription>Update your personal details and contact information.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" defaultValue="John Doe" className="rounded-xl border-muted" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" defaultValue="john.doe@example.com" className="rounded-xl border-muted" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number (WhatsApp)</Label>
              <Input id="phone" defaultValue="+91 98765 43210" className="rounded-xl border-muted" />
            </div>
            <Button className="w-full rounded-2xl font-black uppercase tracking-widest mt-2">
              Save Profile
            </Button>
          </CardContent>
        </Card>

        <Card className="rounded-3xl border-none shadow-xl">
          <CardHeader>
            <CardTitle className="text-xl font-black tracking-tighter uppercase italic">Notifications</CardTitle>
            <CardDescription>Choose how you want to be notified about your bookings.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base font-bold">WhatsApp Alerts</Label>
                <p className="text-sm text-muted-foreground">Receive booking confirmations on WhatsApp.</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base font-bold">Email Notifications</Label>
                <p className="text-sm text-muted-foreground">Get receipts and updates via email.</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base font-bold">Transport Reminders</Label>
                <p className="text-sm text-muted-foreground">Get a notification 1 hour before pickup.</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Button variant="outline" className="w-full rounded-2xl font-black uppercase tracking-widest border-2">
              Update Preferences
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card className="rounded-3xl border-none shadow-xl border-red-100 bg-red-50/10">
        <CardHeader>
          <CardTitle className="text-xl font-black tracking-tighter uppercase italic text-red-600">Danger Zone</CardTitle>
          <CardDescription>Irreversible actions for your account.</CardDescription>
        </CardHeader>
        <CardContent>
          <Button variant="destructive" className="rounded-2xl font-black uppercase tracking-widest">
            Delete Account
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

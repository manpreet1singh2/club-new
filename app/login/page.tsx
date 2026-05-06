"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Ticket, Zap, ArrowRight, ShieldCheck, Mail, Lock, User, Github, Chrome } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = () => {
    setIsLoading(true)
    setTimeout(() => setIsLoading(false), 2000)
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/20 py-12 px-4 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_left,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent -z-10" />
      <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_bottom_right,_var(--tw-gradient-stops))] from-purple-500/5 via-transparent to-transparent -z-10" />

      <div className="w-full max-w-lg space-y-10">
        <div className="flex flex-col items-center text-center space-y-4">
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-primary p-3 rounded-2xl shadow-xl shadow-primary/20"
          >
            <Ticket className="h-8 w-8 text-primary-foreground" />
          </motion.div>
          <div className="space-y-1">
            <h1 className="text-3xl font-black tracking-tight">Welcome to <span className="text-gradient">ClubSpot</span></h1>
            <p className="text-muted-foreground font-medium">Elevate your nightlife experience today.</p>
          </div>
        </div>

        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
        >
            <Tabs defaultValue="login" className="w-full">
              <div className="flex justify-center mb-8">
                  <TabsList className="bg-background border-2 h-14 p-1.5 rounded-2xl w-full">
                    <TabsTrigger value="login" className="rounded-xl px-8 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg font-black uppercase text-[10px] tracking-widest flex-1 transition-all">Login</TabsTrigger>
                    <TabsTrigger value="register" className="rounded-xl px-8 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg font-black uppercase text-[10px] tracking-widest flex-1 transition-all">Register</TabsTrigger>
                  </TabsList>
              </div>

              <TabsContent value="login" className="mt-0 focus-visible:outline-none">
                <Card className="border-none shadow-2xl rounded-[2.5rem] overflow-hidden">
                  <CardHeader className="p-10 pb-6 bg-muted/5">
                    <CardTitle className="text-2xl font-black">Login to Account</CardTitle>
                    <CardDescription className="font-medium">Access your personalized booking dashboard.</CardDescription>
                  </CardHeader>
                  <CardContent className="p-10 space-y-6">
                    <div className="space-y-4">
                        <div className="space-y-2">
                          <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Email Address</Label>
                          <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                            <Input className="h-14 pl-12 rounded-2xl border-2 font-bold focus:border-primary" placeholder="name@example.com" />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between ml-1">
                            <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Password</Label>
                            <Link href="#" className="text-[10px] font-black uppercase tracking-widest text-primary hover:underline">Forgot?</Link>
                          </div>
                          <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                            <Input className="h-14 pl-12 rounded-2xl border-2 font-bold focus:border-primary" type="password" placeholder="••••••••" />
                          </div>
                        </div>
                    </div>
                    <div className="flex items-center space-x-3 ml-1">
                      <Checkbox id="remember" className="h-5 w-5 rounded-md border-2" />
                      <label htmlFor="remember" className="text-sm font-bold text-muted-foreground cursor-pointer">Keep me logged in</label>
                    </div>
                    <Button size="xl" className="w-full rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-primary/20 group" onClick={handleLogin} disabled={isLoading}>
                      {isLoading ? <Zap className="h-5 w-5 animate-spin" /> : (
                          <>
                            Secure Login
                            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                          </>
                      )}
                    </Button>

                    <div className="relative py-4">
                      <div className="absolute inset-0 flex items-center"><Separator className="w-full" /></div>
                      <div className="relative flex justify-center text-[10px] font-black uppercase tracking-widest">
                        <span className="bg-card px-4 text-muted-foreground">Or connect with</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <Button variant="outline" className="h-14 rounded-2xl border-2 font-bold gap-3 hover:bg-muted/50 transition-all">
                        <Chrome className="h-5 w-5" /> Google
                      </Button>
                      <Button variant="outline" className="h-14 rounded-2xl border-2 font-bold gap-3 hover:bg-muted/50 transition-all">
                        <Github className="h-5 w-5" /> GitHub
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="register" className="mt-0 focus-visible:outline-none">
                <Card className="border-none shadow-2xl rounded-[2.5rem] overflow-hidden">
                   <CardHeader className="p-10 pb-6 bg-muted/5">
                     <CardTitle className="text-2xl font-black">Create Account</CardTitle>
                     <CardDescription className="font-medium">Join the exclusive network for premium nightlife.</CardDescription>
                   </CardHeader>
                   <CardContent className="p-10 space-y-6">
                      <div className="grid grid-cols-2 gap-4">
                         <div className="space-y-2">
                           <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">First Name</Label>
                           <Input className="h-14 rounded-2xl border-2 font-bold focus:border-primary" placeholder="Max" />
                         </div>
                         <div className="space-y-2">
                           <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Last Name</Label>
                           <Input className="h-14 rounded-2xl border-2 font-bold focus:border-primary" placeholder="Power" />
                         </div>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Email Address</Label>
                        <Input className="h-14 rounded-2xl border-2 font-bold focus:border-primary" placeholder="max@power.com" />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Password</Label>
                        <Input className="h-14 rounded-2xl border-2 font-bold focus:border-primary" type="password" placeholder="••••••••" />
                      </div>
                      <div className="space-y-4 pt-2">
                         <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Account Type</Label>
                         <div className="grid grid-cols-2 gap-4">
                            <Label htmlFor="customer" className="flex items-center gap-3 p-4 border-2 rounded-2xl cursor-pointer hover:border-primary/50 transition-all has-[:checked]:border-primary has-[:checked]:bg-primary/5">
                               <input type="radio" id="customer" name="role" className="sr-only" defaultChecked />
                               <User className="h-5 w-5 text-primary" />
                               <span className="font-bold">Customer</span>
                            </Label>
                            <Label htmlFor="owner" className="flex items-center gap-3 p-4 border-2 rounded-2xl cursor-pointer hover:border-primary/50 transition-all has-[:checked]:border-primary has-[:checked]:bg-primary/5">
                               <input type="radio" id="owner" name="role" className="sr-only" />
                               <Zap className="h-5 w-5 text-primary" />
                               <span className="font-bold">Owner</span>
                            </Label>
                         </div>
                      </div>
                      <Button size="xl" className="w-full rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-primary/20 mt-4">
                        Join ClubSpot
                      </Button>
                   </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
        </motion.div>

        <div className="flex flex-col items-center gap-6">
           <div className="flex items-center gap-2 text-muted-foreground">
              <ShieldCheck className="h-5 w-5 text-green-500" />
              <span className="text-xs font-bold uppercase tracking-widest">Enterprise-grade Security</span>
           </div>
           <p className="text-[10px] text-center text-muted-foreground max-w-xs leading-relaxed font-medium">
             By joining, you agree to our Terms of Service and Privacy Policy. All rights reserved.
           </p>
        </div>
      </div>
    </div>
  )
}

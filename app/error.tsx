"use client"
import { useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => { console.error(error) }, [error])
  return (
    <div className="flex min-h-screen flex-col items-center justify-center text-center px-4 space-y-5">
      <h1 className="text-5xl font-black text-destructive">Oops!</h1>
      <h2 className="text-2xl font-bold">Something went wrong</h2>
      <p className="text-muted-foreground max-w-sm">An unexpected error occurred. Please try again.</p>
      <div className="flex gap-3">
        <Button onClick={reset}>Try Again</Button>
        <Link href="/"><Button variant="outline">Go Home</Button></Link>
      </div>
    </div>
  )
}

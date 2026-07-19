import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function DashboardHeader() {
  return (
    <div className="flex items-start justify-between gap-4">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight">Welcome back!</h1>
        <p className="text-sm text-muted-foreground">
          Here&apos;s a list of your tasks for this month.
        </p>
      </div>
      <Avatar>
        <AvatarImage
          src="https://avatar.vercel.sh/davis"
          alt="User avatar"
        />
        <AvatarFallback>DA</AvatarFallback>
      </Avatar>
    </div>
  )
}

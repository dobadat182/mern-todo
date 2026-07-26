import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function TaskHeader() {
  return (
    <div className="flex items-start justify-between gap-4">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight">Hello There 👋</h1>
        <p className="text-sm text-muted-foreground">
          Welcome to your task manager.
        </p>
      </div>
      <Avatar>
        <AvatarImage src="https://avatar.vercel.sh/davis" alt="User avatar" />
        <AvatarFallback>DA</AvatarFallback>
      </Avatar>
    </div>
  );
}

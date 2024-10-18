
import { Avatar, AvatarFallback, AvatarImage } from "@frontend/shared/components/ui/avatar"
import { Button } from "@frontend/shared/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@frontend/shared/components/ui/dropdown-menu"
import { LogOut } from "lucide-react"
import { useState } from "react"

export interface UserSectionProps {
    user: { name: string, email: string }
    onLogOut: () => void
}

export default function UserSection({ user, onLogOut }: UserSectionProps) {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen} >
            <DropdownMenuTrigger asChild>
                <Button
                    className="rounded-full w-8 h-8"
                    variant="outline"
                    size="icon"
                >
                    <Avatar className="h-8 w-8 hover:scale-110 duration-300 ease-in-out">
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback className="bg-background">{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end">
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{user.name || "admin"} </p>
                        <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={onLogOut}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
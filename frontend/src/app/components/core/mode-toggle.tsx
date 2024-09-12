import {useTheme} from "./theme-provider";
import {Button} from "@frontend/shared/components/ui/button";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@frontend/shared/components/ui/tooltip";
import {MoonIcon, SunIcon} from "lucide-react";


export function ModeToggle() {
    const {theme, setTheme} = useTheme()

    return (
        <TooltipProvider disableHoverableContent>
            <Tooltip delayDuration={100}>
                <TooltipTrigger asChild>
                    <Button
                        className="rounded-full w-8 h-8 bg-background"
                        variant="outline"
                        size="icon"
                        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                    >
                        <SunIcon
                            className="w-[1.2rem] h-[1.2rem] rotate-90 scale-0 transition-transform ease-in-out duration-500 dark:rotate-0 dark:scale-100"/>
                        <MoonIcon
                            className="absolute w-[1.2rem] h-[1.2rem] rotate-0 scale-1000 transition-transform ease-in-out duration-500 dark:-rotate-90 dark:scale-0"/>
                    </Button>
                </TooltipTrigger>
            </Tooltip>
        </TooltipProvider>
    )
}

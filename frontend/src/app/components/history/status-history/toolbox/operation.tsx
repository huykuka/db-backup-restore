import {Button, buttonVariants} from "@frontend/shared/components/ui/button";
import {DownloadIcon} from "lucide-react";


export function Operation() {
    return (
        <div className="flex flex-wrap items-center gap-3">
            <Button className={buttonVariants({variant: "secondary"})}>
                <DownloadIcon className="mr-2"/>
                Download log
            </Button>
        </div>
    )
}
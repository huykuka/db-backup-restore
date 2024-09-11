import {Button, buttonVariants} from "@frontend/shared/components/ui/button";
import {Plus, Trash} from "lucide-react";

export function Operation() {
    return (
        <div className="flex flex-wrap items-center space-x-2">
            <Button className={buttonVariants({variant: "destructive"})}>
                <Trash className="mr-2"/>
                Mass Delete</Button>
            <Button className={buttonVariants({variant: "secondary"})}>
                <Plus className="mr-2"/>
                Create Backup
            </Button>
        </div>
    )

}
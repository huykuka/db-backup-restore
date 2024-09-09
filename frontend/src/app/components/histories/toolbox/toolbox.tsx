import {Button, buttonVariants} from "@frontend/shared/components/ui/button";
import {Filter} from "./filter";

export function Toolbox() {

    return (
        <div className="rounded-md border bg-card text-card-foreground shadow">
            <div className="flex justify-between items-center p-4 !dark:bg-gray-7 text-white">
                <Filter/>
                <Button className={buttonVariants({variant: "secondary"})}>Create Backup</Button>
            </div>
        </div>

    )
}

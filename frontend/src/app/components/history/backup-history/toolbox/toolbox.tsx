import {Filter} from "./filter";
import {Operation} from "./operation";

export function Toolbox() {

    return (
        <div className="rounded-md border bg-card text-card-foreground shadow">
            <div className="flex flex-wrap justify-between items-center p-4 gap-3 !dark:bg-gray-7">
                <Filter/>
                <Operation/>
            </div>
        </div>

    )
}

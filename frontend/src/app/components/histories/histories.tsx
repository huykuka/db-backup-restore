import {DataTableHistories} from "./data-table";
import {Toolbox} from "./toolbox/toolbox";

export function Histories() {
    return (
        <div className="flex flex-col space-y-2">
            <Toolbox/>
            <DataTableHistories/>
        </div>
    )
}

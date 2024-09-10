import {DataTableHistories} from "./data-table";
import {Toolbox} from "./toolbox/toolbox";
import {HistoryTablePaging} from "./history-table-paging";
import {Card, CardContent, CardHeader, CardTitle} from "@frontend/shared/components/ui/card";

export function Histories() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    Back Up History
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col space-y-5">
                    <Toolbox/>
                    <DataTableHistories/>
                    <HistoryTablePaging/>
                </div>
            </CardContent>
        </Card>

    )
}

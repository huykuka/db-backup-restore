import {Card, CardContent, CardHeader, CardTitle} from "@frontend/shared/components/ui/card";
import {StatusDataTable} from "./status-data-table";

import {Toolbox} from "./toolbox/toolbox";
import {StatusTablePaging} from "./status-table-paging";

export function StatusHistory() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    Status History
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col space-y-5">
                    <Toolbox/>
                    <StatusDataTable/>
                    <StatusTablePaging/>
                </div>
            </CardContent>
        </Card>

    )
}
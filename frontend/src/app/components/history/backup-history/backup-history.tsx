import {Toolbox} from "./toolbox/toolbox";
import {BackupTablePaging} from "./backup-table-paging";
import {Card, CardContent, CardHeader, CardTitle} from "@frontend/shared/components/ui/card";
import {BackUpDataTable} from "./backup-data-table";

export function BackupHistory() {
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
                    <BackUpDataTable/>
                    <BackupTablePaging/>
                </div>
            </CardContent>
        </Card>

    )
}

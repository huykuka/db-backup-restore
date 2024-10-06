import {Toolbox} from "./toolbox/toolbox";
import {BackupTablePaging} from "./backup-table-paging";
import {Card, CardContent, CardHeader, CardTitle} from "@frontend/shared/components/ui/card";
import {BackUpDataTable} from "./backup-data-table";
import {Backup} from "../../../models";
import {useEffect} from "react";
import {toast} from "sonner";
import backupHistoryService, {useBackupHistory} from "./backup-history.service";
import {useFetch} from "../../../core/hooks/useFetch";
import {useZuStandStore} from "../../../core/hooks/useZustandStore";


export interface BackUpHistoryState {
    backups: Backup[],
    page: number,
    size: number,
    loading: boolean
    filter: {
        fromDate: Date | null,
        toDate: Date | null,
    }
}

export function BackupHistory() {
    const { data, loading, error} = useFetch<{ backups: Backup[] }>('/backup/list') ?? {};
    const { state, setState } = useBackupHistory();


    useEffect(() => {
        setState('loading', loading);
        setState('backups', data?.backups || []);
    }, [data,setState]); // Add data and setState to the dependency array

    const handleDeleteBackup = async (id: string) => {
        try {
            await backupHistoryService.deleteBackup(id);
            toast.success("Backup Deleted");
            const response: any = await backupHistoryService.getBackup();
            setState('backups', response?.data?.data?.backups);
        } catch (error) {}
    }

    const handleRestoreBackup = async (id: string) => {
        try {
            await backupHistoryService.restoreBackup(id);
            console.log("Backup Restored");
            toast.success("Backup Restored");
        } catch (error) {
            toast.error("Failed to restore backup");
        }
    }

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
                    <BackUpDataTable onDeleteBackup={handleDeleteBackup} onRestoreBackup={handleRestoreBackup} />
                    <BackupTablePaging/>
                </div>
            </CardContent>
        </Card>

    )
}

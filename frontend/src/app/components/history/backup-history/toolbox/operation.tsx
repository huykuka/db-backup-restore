import {Button, buttonVariants} from "@frontend/shared/components/ui/button";
import {Plus, Trash} from "lucide-react";
import apiClientServices from "../../../../core/services/api-client.services";
import {toast} from "sonner";
import {useBackupHistory} from "../backup-history";


export function Operation() {
    const {state,setState} = useBackupHistory();

    const handleCreateBackup = async () => {
        try {
            await apiClientServices.post("/backup");
            toast.success("Backup Created");

            const response = await apiClientServices.get('/backup/list');
            setState('backups', response.data.data.backups);
        } catch (error) {
            toast.error("Failed to create backup");
        }
    }

    return (
        <div className="flex flex-wrap items-center space-x-2">
            <Button className={buttonVariants({variant: "destructive"})}>
                <Trash className="mr-2"/>
                Mass Delete</Button>
            <Button className={buttonVariants({variant: "secondary"})} onClick={handleCreateBackup}>
                <Plus className="mr-2"/>
                Create Backup
            </Button>
        </div>
    )

}
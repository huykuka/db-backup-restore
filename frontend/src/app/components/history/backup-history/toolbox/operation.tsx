import {Button, buttonVariants} from "@frontend/shared/components/ui/button";
import {Plus, Trash} from "lucide-react";
import apiClientServices from "../../../../core/services/api-client.services";

interface OperationProps {

}


export function Operation({}: OperationProps) {
    const handleCreateBackup = () => {
       apiClientServices.post("/backup").then(() => {
              console.log("Backup Created")
       }).catch(() => {
              console.log("Backup Creation Failed")
       })
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
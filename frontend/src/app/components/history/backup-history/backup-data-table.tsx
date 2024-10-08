import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow
} from '@frontend/shared/components/ui/table';
import {Button} from "@frontend/shared/components/ui/button";
import {toast} from "sonner"
import {ArchiveRestoreIcon, DeleteIcon} from "lucide-react";

const backups = [
    {
        createDate: "2023-01-01",
        filename: "backup1.sql",
        performedBy: "User1"
    },
    {
        createDate: "2023-01-02",
        filename: "backup2.sql",
        performedBy: "User2"
    },
    {
        createDate: "2023-01-03",
        filename: "backup3.sql",
        performedBy: "User3"
    },
    {
        createDate: "2023-01-04",
        filename: "backup4.sql",
        performedBy: "User4"
    },
    {
        createDate: "2023-01-05",
        filename: "backup5.sql",
        performedBy: "User5"
    },
    {
        createDate: "2023-01-06",
        filename: "backup6.sql",
        performedBy: "User6"
    },
    {
        createDate: "2023-01-07",
        filename: "backup7.sql",
        performedBy: "User7"
    },
]

const onDeleteBackup = (filename: string) => {
    const today = new Date().toLocaleDateString();
    toast.error("Backup deleted", {
        description: today,
        action: {
            label: "Undo",
            onClick: () => console.log("Undo"),
        },
    })

}

const onRestoreBackup = (filename: string) => {
    const today = new Date().toLocaleDateString();
    toast.info(`Restoring backup ${filename}`, {
        description: today,
        action: {
            label: "Undo",
            onClick: () => console.log("Undo"),
        },
    })
}

export function BackUpDataTable() {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[50px]">Index</TableHead>
                    <TableHead>Create Date</TableHead>
                    <TableHead>Filename</TableHead>
                    <TableHead>Performed By</TableHead>
                    <TableHead className="text-right"></TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {backups.map((backup, index) => (
                    <TableRow key={backup.filename}>
                        <TableCell className="font-medium">{index + 1}</TableCell>
                        <TableCell>{backup.createDate}</TableCell>
                        <TableCell>{backup.filename}</TableCell>
                        <TableCell>{backup.performedBy}</TableCell>
                        <TableCell className="flex space-x-2 text-right justify-end">
                            <Button variant={"ghost"} onClick={() => onRestoreBackup(backup.filename)}>
                                <ArchiveRestoreIcon className="mr-2"/>
                                Restore
                            </Button>
                            <Button variant={"destructive"}
                                    onClick={() => onDeleteBackup(backup.filename)}>
                                <DeleteIcon className="mr-2"/>
                                Delete
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
            <TableFooter>
                <TableRow>
                    <TableCell colSpan={4}>Total</TableCell>
                    <TableCell className="text-right">$2,500.00</TableCell>
                </TableRow>
            </TableFooter>
        </Table>
    )
}
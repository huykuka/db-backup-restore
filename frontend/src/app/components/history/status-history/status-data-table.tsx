import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from '@frontend/shared/components/ui/table';
import {Badge} from "@frontend/shared/components/ui/badge";

const backups = [
    {
        createDate: "2023-01-01",
        filename: "backup1.sql",
        performedBy: "User1",
        type: "Backup",
        status: "failed"
    },
    {
        createDate: "2023-01-02",
        filename: "backup2.sql",
        performedBy: "User2",
        type: "Restore",
        status: "success"
    },
    {
        createDate: "2023-01-03",
        filename: "backup3.sql",
        performedBy: "User3",
        type: "Backup",
        status: "failed"
    },
    {
        createDate: "2023-01-04",
        filename: "backup4.sql",
        performedBy: "User4",
        type: "Restore",
        status: "failed"
    },
    {
        createDate: "2023-01-05",
        filename: "backup5.sql",
        performedBy: "User5",
        type: "Backup",
        status: "success"
    },
    {
        createDate: "2023-01-06",
        filename: "backup6.sql",
        performedBy: "User6",
        type: "Restore",
        status: "success"
    },
    {
        createDate: "2023-01-07",
        filename: "backup7.sql",
        performedBy: "User7",
        type: "Backup",
        status: "success"
    },
]

export function StatusDataTable() {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Create Date</TableHead>
                    <TableHead>Filename</TableHead>
                    <TableHead>Performed By</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {backups.map((backup, index) => (
                    <TableRow key={backup.filename}>
                        <TableCell>{backup.createDate}</TableCell>
                        <TableCell>{backup.filename}</TableCell>
                        <TableCell>{backup.performedBy}</TableCell>
                        <TableCell>
                            <Badge variant={backup.type === "Backup" ? "default" : "secondary"}>
                                {backup.type}
                            </Badge>
                        </TableCell>
                        <TableCell>
                            <Badge variant={backup.status === "failed" ? "destructive" : "outline"}>
                                {backup.status}
                            </Badge>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
          
        </Table>
    )
}
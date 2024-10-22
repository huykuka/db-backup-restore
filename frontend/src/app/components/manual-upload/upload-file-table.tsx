import { Button } from "@frontend/shared/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@frontend/shared/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@frontend/shared/components/ui/table";
import { ArchiveRestoreIcon, DeleteIcon } from "lucide-react";
import manualUploadService from "./manual-upload.service";

interface ManualFileTableProps {
    onDeleteFile: (path: string) => void;
    onRestoreFile: (path: string) => void;
}

export const UploadFileTable = ({ onDeleteFile, onRestoreFile }: ManualFileTableProps) => {
    const { getState } = manualUploadService;

    return (
        getState().files.length !== 0 && (
            <Card>
                <CardHeader>
                    <CardTitle>File Upload</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col space-y-5">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Upload Date</TableHead>
                                    <TableHead>Filename</TableHead>
                                    <TableHead className="text-right"></TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {getState().files.map((file, index) => (
                                    <TableRow key={index}>
                                        <TableCell>
                                            {new Date(file.createdAt).toLocaleString()}
                                        </TableCell>
                                        <TableCell>{file.name}</TableCell>
                                        <TableCell className="flex space-x-2 text-right justify-end">
                                            <Button
                                                variant={'ghost'}
                                                onClick={() => onRestoreFile(file.filePath)}
                                            >
                                                <ArchiveRestoreIcon className="mr-2" />
                                                <span className="hidden md:inline">Restore</span>
                                            </Button>
                                            <Button
                                                variant={'destructive'}
                                                onClick={() => onDeleteFile(file.filePath)}
                                            >
                                                <DeleteIcon className="mr-2" />
                                                <span className="hidden md:inline">Delete</span>
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>
        )
    );
};
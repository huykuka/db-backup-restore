import { useState } from 'react';
import FileUpload from '../core/file-upload';
import manualUploadService from './manual-upload.service';

export default function ManualFileUpload() {
  const [uploadProgress, setUploadProgress] = useState<number>(0);

  return (
    <FileUpload
      acceptedTypes={['.psql', '.zip', '.MOV']}
      title="Manual Backup Upload"
      description="Upload your .psql file to restore the database."
      uploadProgress={uploadProgress}
      onFileUpload={async (file: File) => {
        await manualUploadService.upload(file, setUploadProgress);
      }}
    />

    // <Card>
    //   <CardHeader>
    //     <CardTitle>Manual Backup Upload</CardTitle>
    //     <CardDescription>
    //       This section allows you to upload the backup file manually to perform
    //       restore action.
    //     </CardDescription>
    //   </CardHeader>

    //   <CardContent>
    //     <div
    //       className={`border-2 border-dashed rounded-lg p-6 transition-colors ${
    //         isDragging
    //           ? 'border-primary bg-primary/10'
    //           : 'border-muted-foreground/25'
    //       }`}
    //       onDragEnter={handleDragEnter}
    //       onDragOver={handleDragOver}
    //       onDragLeave={handleDragLeave}
    //       onDrop={handleDrop}
    //     >
    //       <Input
    //         id="file-upload"
    //         type="file"
    //         className="hidden"
    //         accept=".psql"
    //         onChange={(e) => {
    //           handleFileChange(e);
    //           e.target.value = '';
    //         }}
    //       />
    //       <div className="text-center">
    //         <Upload
    //           className={`mx-auto h-12 w-12 transition-colors duration-300 ease-in-out ${
    //             isDragging
    //               ? 'text-primary animate-bounce'
    //               : 'text-muted-foreground'
    //           }`}
    //         />
    //         <p className="mt-2 text-sm text-muted-foreground">
    //           <Button
    //             onClick={() => document.getElementById('file-upload')?.click()}
    //             variant="link"
    //             className="text-primary"
    //           >
    //             Click to upload
    //           </Button>{' '}
    //           or drag and drop
    //         </p>
    //         <p className="mt-1 text-xs text-muted-foreground">.PSQL file</p>
    //       </div>
    //     </div>
    //   </CardContent>

    //   <CardFooter className="flex flex-col items-start gap-4">
    //     <Progress value={uploadProgress} />
    //     {fileName && (
    //       <p className="text-sm text-muted-foreground">
    //         Selected file: {fileName}
    //       </p>
    //     )}
    //   </CardFooter>
    // </Card>
  );
}

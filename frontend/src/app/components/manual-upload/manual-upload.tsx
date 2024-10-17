import { useState } from 'react';
import FileUpload from '../core/file-upload';
import manualUploadService, { useManualUpload } from './manual-upload.service';
import { UploadFileTable } from './upload-file-table';


export default function ManualFileUpload() {
  useManualUpload()

  const [uploadProgress, setUploadProgress] = useState<number>(0);

  const { getState, setState } = manualUploadService

  const handleDeleteFile = (path: String) => {
    const updatedFiles = getState().files.filter(file => file.filePath !== path);
    setState('files', updatedFiles);
  }

  const handleRestoreFile = (path: string) => {
    console.log(path)
  }

  return (
    <div className='flex flex-col gap-4'>
      <FileUpload
        acceptedTypes={['.sql', '.psql', '.zip', '.MOV']}
        title="Manual Backup Upload"
        description="Upload your .psql file to restore the database."
        uploadProgress={uploadProgress}
        onFileUpload={async (file: any) => {
          await manualUploadService.upload(file, setUploadProgress);
        }}
      />
      <UploadFileTable onDeleteFile={handleDeleteFile} onRestoreFile={handleRestoreFile} />
    </div>
  );
}
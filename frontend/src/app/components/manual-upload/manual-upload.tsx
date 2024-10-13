import { useState } from 'react';
import FileUpload from '../core/file-upload';
import manualUploadService from './manual-upload.service';

export default function ManualFileUpload() {
  const [uploadProgress, setUploadProgress] = useState<number>(0);

  return (
    <FileUpload
      acceptedTypes={['.sql', '.psql', '.zip', '.MOV']}
      title="Manual Backup Upload"
      description="Upload your .psql file to restore the database."
      uploadProgress={uploadProgress}
      onFileUpload={async (file: any) => {
        await manualUploadService.upload(file, setUploadProgress);
      }}
    />
  );
}

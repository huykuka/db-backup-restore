import { Button } from '@frontend/shared/components/ui/button';
import { Input } from '@frontend/shared/components/ui/input';
import { Label } from '@frontend/shared/components/ui/label';
import { Progress } from '@frontend/shared/components/ui/progress';
import { Upload } from 'lucide-react';
import { useCallback, useState } from 'react';
import manualUploadService from './manual-upload.service';

export default function FileUpload() {
  const [fileName, setFileName] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState<File | null>(null); // Store the selected file

  const handleFile = useCallback((file: File) => {
    setFileName(file.name);
    setSelectedFile(file); // Store the file to upload later
  }, []);

  const handleDragEnter = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      handleFile(file);
    },
    [handleFile]
  );

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleUpload = async () => {
    if (selectedFile) {
      await manualUploadService.upload(selectedFile, setUploadProgress);
      setFileName(null); // Clear the filename after upload
      setSelectedFile(null); // Clear the selected file
    }
  };

  return (
    <div className="w-full space-y-4">
      <Label htmlFor="file-upload" className="block text-sm font-medium">
        This section allows you to upload the backup file manually to perform
        restore action.
      </Label>
      <div
        className={`border-2 border-dashed rounded-lg p-6 transition-colors ${
          isDragging
            ? 'border-primary bg-primary/10'
            : 'border-muted-foreground/25'
        }`}
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <Input
          id="file-upload"
          type="file"
          className="hidden"
          onChange={handleFileChange}
        />
        <div className="text-center">
          <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
          <p className="mt-2 text-sm text-muted-foreground">
            <Button
              onClick={() => document.getElementById('file-upload')?.click()}
              variant="link"
              className="text-primary"
            >
              Click to upload
            </Button>{' '}
            or drag and drop
          </p>
          <p className="mt-1 text-xs text-muted-foreground">.PSQL file</p>
        </div>
      </div>
      {fileName && (
        <>
          <Progress value={uploadProgress} />
          <p className="text-sm text-muted-foreground">
            Selected file: {fileName}
          </p>
          <Button onClick={handleUpload}>Submit</Button>{' '}
          {/* Add a submit button */}
        </>
      )}
    </div>
  );
}

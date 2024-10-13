import { Button } from '@frontend/shared/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@frontend/shared/components/ui/card';
import { Input } from '@frontend/shared/components/ui/input';
import { Progress } from '@frontend/shared/components/ui/progress';
import { Upload } from 'lucide-react';
import { useCallback, useState } from 'react';
import manualUploadService from './manual-upload.service';

export default function FileUpload() {
  const acceptedType = ['.psql'];
  const [fileName, setFileName] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleFile = useCallback(async (file: File) => {
    const fileExtension = file.name.split('.').pop()?.toLowerCase(); // Extract the file extension

    // Check if the file extension matches the accepted types
    if (
      !acceptedType.some(
        (type) => fileExtension === type.replace('.', '').toLowerCase()
      )
    ) {
      console.error('Invalid file type. Only .psql files are accepted.');
      return;
    }

    setFileName(file.name);
    await manualUploadService.upload(file, setUploadProgress);
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

  return (
    <Card>
      <CardHeader>
        <CardTitle>Manual Backup Upload</CardTitle>
        <CardDescription>
          This section allows you to upload the backup file manually to perform
          restore action.
        </CardDescription>
      </CardHeader>

      <CardContent>
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
            accept=".psql"
            onChange={(e) => {
              handleFileChange(e);
              e.target.value = '';
            }}
          />
          <div className="text-center">
            <Upload
              className={`mx-auto h-12 w-12 transition-colors duration-300 ease-in-out ${
                isDragging
                  ? 'text-primary animate-bounce'
                  : 'text-muted-foreground'
              }`}
            />
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
      </CardContent>

      <CardFooter className="flex flex-col items-start gap-4">
        <Progress value={uploadProgress} />
        {fileName && (
          <p className="text-sm text-muted-foreground">
            Selected file: {fileName}
          </p>
        )}
      </CardFooter>
    </Card>
  );
}

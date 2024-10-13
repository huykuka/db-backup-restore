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

interface FileUploadProps {
  acceptedTypes: string[];
  title?: string;
  description?: string;
  uploadProgress?: number;
  onFileUpload?: (file: File) => Promise<void>;
  onFileSelect?: (fileName: string) => void;
}

export default function FileUpload({
  acceptedTypes,
  title = 'Upload File',
  description = 'Please upload a file',
  uploadProgress,
  onFileUpload,
  onFileSelect,
}: FileUploadProps) {
  const [fileName, setFileName] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFile = useCallback(
    async (file: File) => {
      const fileExtension = file.name.split('.').pop()?.toLowerCase(); // Extract file extension

      // Check if file extension matches accepted types
      if (
        !acceptedTypes.some(
          (type) => fileExtension === type.replace('.', '').toLowerCase()
        )
      ) {
        console.error('Invalid file type.');
        return;
      }

      setFileName(file.name);
      onFileSelect && onFileSelect(file.name);

      if (onFileUpload) {
        await onFileUpload(file);
      }
    },
    [acceptedTypes, onFileUpload, onFileSelect]
  );

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
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
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
            accept={acceptedTypes.join(',')}
            onChange={(e) => {
              handleFileChange(e);
              e.target.value = ''; // Reset input after file selection
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
            <p className="mt-1 text-xs text-muted-foreground">
              {acceptedTypes.join(', ')} files only
            </p>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex flex-col items-start gap-4">
        {uploadProgress ? <Progress value={uploadProgress} /> : null}
        {fileName && (
          <p className="text-sm text-muted-foreground">
            Selected file: {fileName}
          </p>
        )}
      </CardFooter>
    </Card>
  );
}

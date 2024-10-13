import { Button } from '@frontend/shared/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@frontend/shared/components/ui/card';
import { Progress } from '@frontend/shared/components/ui/progress';
import { Upload } from 'lucide-react';
import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

interface FileUploadProps {
  acceptedTypes: string[];
  title?: string;
  description?: string;
  uploadProgress?: number;
  single?: boolean;
  onFileUpload?: (file: File | File[]) => Promise<void>;
  onFileSelect?: (fileName: string) => void;
}

export default function FileUpload({
  acceptedTypes,
  title = 'Upload File',
  description = 'Please upload a file',
  uploadProgress,
  single = true,
  onFileUpload,
  onFileSelect,
}: FileUploadProps) {
  const [fileName, setFileName] = useState<string | null>(null);
  const onDrop = useCallback(
    async (files: File[]) => {
      const validFiles: File[] = [];

      for (const file of files) {
        const fileExtension = file.name.split('.').pop()?.toLowerCase(); // Extract file extension
        // Check if file extension matches accepted types
        if (
          !acceptedTypes.some(
            (type) => fileExtension === type.replace('.', '').toLowerCase()
          )
        ) {
          console.error('Invalid file type:', file.name);
          continue; // Skip this file
        }

        validFiles.push(file);
      }

      if (single) {
        const file = validFiles[0]; // Take the first valid file if single
        if (file) {
          setFileName(file.name as string);
          onFileSelect && onFileSelect(file.name);
          if (onFileUpload) {
            await onFileUpload(file);
          }
        }
      } else {
        // Handle multiple files
        const names = validFiles.map((file) => file.name);
        if (onFileUpload) {
          await onFileUpload(validFiles);
        }
      }
    },
    [acceptedTypes, onFileUpload, onFileSelect, single]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>

      <CardContent {...getRootProps({ className: 'dropzone' })}>
        <div
          className={`border-2 border-dashed hover:bg-primary/10 rounded-lg p-6 transition-colors z-40 ${
            isDragActive
              ? 'border-primary bg-primary/10'
              : 'border-muted-foreground/25'
          }`}
        >
          <input
            {...getInputProps({ accept: acceptedTypes.join(',') })}
            className="hidden"
          />
          <div className="text-center">
            <Upload
              className={`mx-auto h-12 w-12 transition-colors duration-300 ease-in-out ${
                isDragActive
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

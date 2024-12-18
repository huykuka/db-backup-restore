import { useZuStandStore } from '@core/hooks';
import { ManualFileUpload } from '@models/manual-file-upload.model';
import { GenericHTTPService, ToastService } from '@core/services';

export interface ManualFileUPloadState {
  files: ManualFileUpload[];
}

export const manualFileUPloadState: ManualFileUPloadState = {
  files: [],
};

// eslint-disable-next-line react-hooks/rules-of-hooks
export const useManualUpload = useZuStandStore(manualFileUPloadState);

class ManualUploadService extends GenericHTTPService {
  async upload(file: File, onProgress: (percent: number) => void) {
    const formData = new FormData();
    formData.append('file', file);
    try {
      const response: any = await super.post('restore/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = progressEvent.total
            ? Math.round((progressEvent.loaded * 100) / progressEvent.total)
            : 0;
          onProgress(percentCompleted); // Call the progress callback
        },
      });
      ToastService.success(`${file.name} uploaded!`);

      this.setState('files', [
        ...this.getState().files,
        {
          name: file.name,
          filePath: response.data.data.fileName,
          createdAt: new Date(),
        },
      ]);

      return response.data; // Return the response data
    } catch (error) {
      console.error('Error uploading file:', error);
      ToastService.error('File upload failed!');
      throw error; // Rethrow the error for handling in the component
    } finally {
      onProgress(0);
    }
  }

  async restore(filePath: string) {
    try {
      ToastService.loading('Restore In Progress');
      await super.post(`restore/manual`, {
        filePath,
      });
      ToastService.success('Restore successfully!');
    } catch (err) {
    } finally {
      ToastService.dismiss();
    }
  }

  public setState(key: keyof ManualFileUPloadState, value: any) {
    useManualUpload.getState().setState(key, value);
  }

  public resetState() {
    useManualUpload.getState().reset();
  }

  public getState(): ManualFileUPloadState {
    return useManualUpload.getState().state;
  }

  private checkFileDuplicate(file: File) {
    const fileNames = this.getState().files.map((file) => file.name);
    return fileNames.includes(file.name);
  }
}

const manualUploadService = new ManualUploadService();
export default manualUploadService;

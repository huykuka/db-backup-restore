import { GenericHTTPService } from '../../core/services/http-client.services';

class ManualUploadService extends GenericHTTPService {
  async upload(file: File, onProgress: (percent: number) => void) {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await super.post('restore/upload', formData, {
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
      return response.data; // Return the response data
    } catch (error) {
      console.error('Error uploading file:', error);
      throw error; // Rethrow the error for handling in the component
    } finally{
       onProgress(0);
    }
  }
}

const manualUploadService = new ManualUploadService();
export default manualUploadService;

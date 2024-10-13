import { toast } from 'sonner';

export class ToastService {
  success(message: string) {
    toast.success(message, {
      description: new Date().toLocaleString(),
    });
  }

  error(message: string) {
    toast.error(message, {
      description: new Date().toLocaleString(),
    });
  }

  info(message: string) {
    toast.info(message, {
      description: new Date().toLocaleString(),
    });
  }

  warning(message: string) {
    toast.warning(message, {
      description: new Date().toLocaleString(),
    });
  }

  loading(message: string, options = {}) {
    const loadingToast = toast.loading(message, {
      description: new Date().toLocaleString(),
      ...options, // Spread options for further customization
    });

    return loadingToast; // Return the toast ID for further actions like dismissing
  }

  dismiss() {
    toast.dismiss(); // Method to dismiss a specific toast by ID
  }
}

const toastService = new ToastService();
export default toastService;

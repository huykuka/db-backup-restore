import { toast } from 'sonner';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ToastService } from './toast.service';

describe('ToastService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should display a success toast with the correct message and description', () => {
    const message = 'Success message';
    const spy = vi.spyOn(toast, 'success');
    ToastService.success(message);
    expect(spy).toHaveBeenCalledWith(message, {
      description: expect.any(String),
    });
  });

  describe('ToastService', () => {
    beforeEach(() => {
      vi.clearAllMocks();
    });

    it('should display a success toast with the correct message and description', () => {
      const message = 'Success message';
      const spy = vi.spyOn(toast, 'success');
      ToastService.success(message);
      expect(spy).toHaveBeenCalledWith(message, {
        description: expect.any(String),
      });
    });

    it('should display an error toast with the correct message and description', () => {
      const message = 'Error message';
      const spy = vi.spyOn(toast, 'error');
      ToastService.error(message);
      expect(spy).toHaveBeenCalledWith(message, {
        description: expect.any(String),
      });
    });

    it('should display an info toast with the correct message and description', () => {
      const message = 'Info message';
      const spy = vi.spyOn(toast, 'info');
      ToastService.info(message);
      expect(spy).toHaveBeenCalledWith(message, {
        description: expect.any(String),
      });
    });

    it('should display a warning toast with the correct message and description', () => {
      const message = 'Warning message';
      const spy = vi.spyOn(toast, 'warning');
      ToastService.warning(message);
      expect(spy).toHaveBeenCalledWith(message, {
        description: expect.any(String),
      });
    });

    it('should display a loading toast with the correct message and description', () => {
      const message = 'Loading message';
      const options = { duration: 5000 };
      const spy = vi.spyOn(toast, 'loading');
      const toastId = ToastService.loading(message, options);
      expect(spy).toHaveBeenCalledWith(message, {
        description: expect.any(String),
        ...options,
      });
      expect(toastId).toBeDefined();
    });

    it('should dismiss all toasts', () => {
      const spy = vi.spyOn(toast, 'dismiss');
      ToastService.dismiss();
      expect(spy).toHaveBeenCalled();
    });
  });
});

it('should dismiss all toasts', () => {
  const spy = vi.spyOn(toast, 'dismiss');
  ToastService.dismiss();
  expect(spy).toHaveBeenCalled();
});

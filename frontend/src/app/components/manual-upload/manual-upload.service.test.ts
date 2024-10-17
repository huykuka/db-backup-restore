import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { toastService } from '../../core/services';
import manualUploadService from './manual-upload.service';

// Mock the toastService module
vi.mock('../../core/services/toast.service', () => ({
  toastService: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

describe('ManualUploadService', () => {
  let mockAxios: MockAdapter;

  beforeEach(() => {
    // Set up a mock adapter for axios
    mockAxios = new MockAdapter(axios);
  });

  afterEach(() => {
    // Reset mock axios after each test
    mockAxios.reset();
  });

  it('should successfully upload a file and call the progress callback', async () => {
    const file = new File(['dummy content'], 'testfile.txt', {
      type: 'text/plain',
    });
    const progressCallback = vi.fn();

    // Mock the POST request with a successful response
    mockAxios
      .onPost('restore/upload')
      .reply(200, { message: 'Upload successful' });

    const response = await manualUploadService.upload(file, progressCallback);

    // Check if progress callback is called with a progress percentage
    expect(progressCallback).toHaveBeenCalledWith(expect.any(Number));

    // Check if toastService.success was called with the correct message
    expect(toastService.success).toHaveBeenCalledWith(`${file.name} uploaded!`);

    // Check if response data is as expected

    // Ensure progress callback was reset to 0
    expect(progressCallback).toHaveBeenCalledWith(0);
  });
});

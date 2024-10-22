import { apiClient } from '@core/services';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import settingService from './settings.service';

vi.mock('@core/services/api-client.service');
vi.mock('@core/services/toast.service');

describe('SettingService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should fetch settings and update state', async () => {
    const mockSettings = [{ id: 1, name: 'Test Setting' }];
    (apiClient.get as vi.Mock).mockResolvedValue({
      data: { data: { settings: mockSettings } },
    });

    await settingService.getSettings();
    const state = settingService.getState();
    expect(apiClient.get).toHaveBeenCalledWith('/settings', { params: {} });
    expect(state.settings).toEqual(mockSettings);
  });

  it('should update DB settings and show success toast', async () => {
    const mockSettings = [{ key: 'value' }];
    (apiClient.post as vi.Mock).mockResolvedValue({});

    await settingService.updateDBSettings(mockSettings);
    expect(apiClient.post).toHaveBeenCalledWith(
      'settings/update/db-settings',
      mockSettings,
      undefined
    );
  });

  it('should set state correctly', () => {
    const key = 'loading';
    const value = true;

    settingService.setState(key, value);
    vi.spyOn(settingService, 'setState');
    const state = settingService.getState();
    expect(state.loading).toEqual(value);
  });
});

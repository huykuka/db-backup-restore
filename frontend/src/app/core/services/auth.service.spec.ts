import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ACCESS_TOKEN, LocalStorageService } from '@core/services/local-storage.service';
import { apiClient } from './api-client.service';
import { authService, useAuth } from './auth.service';

vi.mock('@core/services/local-storage.service');
vi.mock('./api-client.service');
vi.mock('./auth.service', async (importOriginal) => {
    const originalModule = await importOriginal<typeof import('./auth.service')>();
    return {
        ...originalModule,
        useAuth: {
            getState: vi.fn(),
        },
    };
});

describe('AuthService', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe('validateToken', () => {

        it('should set isAuthenticated to true if token is valid', async () => {
            vi.spyOn(LocalStorageService, 'getItem').mockReturnValue('valid-token');
            vi.spyOn(apiClient, 'get').mockResolvedValue({ status: 200 });
            const setStateSpy = vi.spyOn(authService, 'setState');

            await authService.validateToken();

            expect(setStateSpy).toHaveBeenCalledWith('isAuthenticated', true);
        });

        it('should remove token and set isAuthenticated to false if validation fails', async () => {
            vi.spyOn(LocalStorageService, 'getItem').mockReturnValue('invalid-token');
            vi.spyOn(apiClient, 'get').mockRejectedValue(new Error('Invalid token'));
            const setStateSpy = vi.spyOn(authService, 'setState');
            const removeItemSpy = vi.spyOn(LocalStorageService, 'removeItem');

            await expect(authService.validateToken()).rejects.toThrow('Invalid token');

            expect(removeItemSpy).toHaveBeenCalledWith(ACCESS_TOKEN);
            expect(setStateSpy).toHaveBeenCalledWith('isAuthenticated', false);
        });
    });
});
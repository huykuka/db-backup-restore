import {describe, expect, it, vi} from 'vitest';
import {jwtInterceptor} from './jwt.interceptor';
import {LocalStorageService} from '@core/services/local-storage.service';

vi.mock('@core/services/local-storage.service');

describe('jwtInterceptor', () => {
    it('should set the Authorization header if token exists', () => {
        const token = 'test-token';
        // @ts-expect-error
        (LocalStorageService.getItem as vi.Mock).mockReturnValue(token);

        const config: any = {
            headers: {}
        };

        const result = jwtInterceptor(config);

        expect(result.headers['Authorization']).toBe(`Bearer ${token}`);
    });

    it('should not set the Authorization header if token does not exist', () => {
        // @ts-ignore
        (LocalStorageService.getItem as vi.Mock).mockReturnValue(null);

        const config: any = {
            headers: {}
        };

        const result = jwtInterceptor(config);

        expect(result.headers['Authorization']).toBeUndefined();
    });
});
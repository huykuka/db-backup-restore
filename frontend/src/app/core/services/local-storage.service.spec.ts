import { LocalStorageService } from "./local-storage.service";

describe('LocalStorageService', () => {
    beforeEach(() => {
        // Mock localStorage
        const localStorageMock = (() => {
            let store: { [key: string]: string } = {};
            return {
                getItem: (key: string) => store[key] || null,
                setItem: (key: string, value: string) => store[key] = value,
                removeItem: (key: string) => delete store[key],
                clear: () => store = {},
            };
        })();
        Object.defineProperty(window, 'localStorage', { value: localStorageMock });
    });

    it('should set an item in localStorage', () => {
        const key = 'testKey';
        const value = { data: 'testData' };
        LocalStorageService.setItem(key, value);
        expect(localStorage.getItem(key)).toBe(JSON.stringify(value));
    });

    it('should get an item from localStorage', () => {
        const key = 'testKey';
        const value = { data: 'testData' };
        localStorage.setItem(key, JSON.stringify(value));
        const result = LocalStorageService.getItem(key);
        expect(result).toEqual(value);
    });

    it('should return null if item does not exist in localStorage', () => {
        const result = LocalStorageService.getItem('nonExistentKey');
        expect(result).toBeNull();
    });

    it('should remove an item from localStorage', () => {
        const key = 'testKey';
        const value = { data: 'testData' };
        localStorage.setItem(key, JSON.stringify(value));
        LocalStorageService.removeItem(key);
        expect(localStorage.getItem(key)).toBeNull();
    });

    it('should clear all items from localStorage', () => {
        localStorage.setItem('key1', 'value1');
        localStorage.setItem('key2', 'value2');
        LocalStorageService.clear();
        expect(localStorage.getItem('key1')).toBeNull();
        expect(localStorage.getItem('key2')).toBeNull();
    });
});
import {create} from 'zustand'

type State = {
    [key: string]: any;
};

type Store<T extends State> = {
    state: T;
    setState: (key: keyof T, value: T[keyof T]) => void;
};

export const useZuStandStore = <T extends State>(initialState: T) =>
    create<Store<T>>((set) => ({
        state: initialState,
        resetState: () => set(() => ({ state: initialState })),
        setState: (key: keyof T, value: T[keyof T]) =>
            set((store) => ({
                state: { ...store.state, [key]: value },
            })),
    }));
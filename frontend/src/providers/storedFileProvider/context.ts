import { createContext } from 'react';

export interface StoredFile {
    id: string;
    fileName: string;
    fileType: string;
}

// Bridge
export interface UserFileStore {
    id?: string,
    userId: number,
    fileId: string
}

export interface StoredFileStateContext_State {
    storedFiles?: StoredFile[];
    storedFile?: StoredFile;
    userFile?: UserFileStore;
    isError: boolean;
    isPending: boolean;
    isSuccess: boolean;
}

export const StoredFileStateContext_InitState: StoredFileStateContext_State = {
    storedFiles: [],
    storedFile: undefined,
    userFile: undefined,
    isError: false,
    isPending: false,
    isSuccess: false
}

export interface StoredFileActionContext_Actions {
    getStoredFile: (id: string) => void;
    getStoredFiles: () => void;
    putStoredFile: (file: StoredFile) => void;
    deleteStoredFile: (id: string) => void;
    postStoredFile: (file: StoredFile) => void;
    postUserFile: (bridge: UserFileStore) => void;
    getBridgeByUser: (userId: number) => void;
}

export const StoredFileActionContext_DefaultActions: StoredFileActionContext_Actions = {
    getStoredFile: (id: string) => {},
    getStoredFiles: () => {},
    putStoredFile: (file: StoredFile) => {},
    deleteStoredFile: (id: string) => {},
    postStoredFile: (file: StoredFile) => {},
    postUserFile: (bridge: UserFileStore) => {},
    getBridgeByUser: (userId: number) => {}
}

export const StoredFileStateContext = createContext<StoredFileStateContext_State>(StoredFileStateContext_InitState);
export const StoredFileActionContext = createContext<StoredFileActionContext_Actions>(StoredFileActionContext_DefaultActions);

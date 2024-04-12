"use client";
import React, { use, useContext, useEffect, useReducer } from 'react';
import storedFileReducer from './reducer';
import { StoredFile, StoredFileActionContext, StoredFileStateContext, StoredFileStateContext_InitState, UserFileStore } from './context';
import { makeAxiosInstance } from '../authProvider';
import { deleteStoredFileErrorAction, deleteStoredFileSuccessAction, getBridgeByUserErrorAction, getBridgeByUserRequestAction, getBridgeByUserSuccessAction, getStoredFileErrorAction, getStoredFileRequestAction, getStoredFilesErrorAction, getStoredFilesRequestAction, getStoredFilesSuccessAction, getStoredFileSuccessAction, postUserFileErrorAction, postUserFileRequestAction, postUserFileSuccessAction, putStoredFileErrorAction, putStoredFileRequestAction, putStoredFileSuccessAction } from './actions';

const StoredFileProvider = ({children}: {children: React.ReactNode}): React.ReactNode => {
    const [state, dispatch] = useReducer(storedFileReducer, StoredFileStateContext_InitState);

    let instance = makeAxiosInstance();

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            console.log("found the accesss token", accessToken);
            instance = makeAxiosInstance(accessToken);
        } 
    }, []);
    
    const getStoredFile = (id: string) => {
        const endpoint = '/api/services/app/FileStore/Get';
        dispatch(getStoredFileRequestAction());
        instance.get(`${endpoint}?Id=${id}`)
            .then(res => {
                const data = res.data;
                if (data.success) {
                    dispatch(getStoredFileSuccessAction(data.result));
                } else {
                    dispatch(getStoredFileErrorAction());
                }
            })
            .catch(err => 
                dispatch(getStoredFileErrorAction())
            );
    };

    const getStoredFiles = () => {
        const endpoint = '/api/services/app/FileStore/GetAll';
        dispatch(getStoredFilesRequestAction());
        instance.get(endpoint)
            .then(res => {
                const data = res.data;
                if (data.success) {
                    dispatch(getStoredFilesSuccessAction(data.result.items));
                } else {
                    dispatch(getStoredFileErrorAction());
                }
            })
            .catch(err => 
                dispatch(getStoredFilesErrorAction())
            );
    };
    const putStoredFile = (file: StoredFile) => {
        const endpoint = '/api/services/app/FileStore/Update';        
        dispatch(putStoredFileRequestAction());
        instance.get(endpoint)
            .then(res => {
                const data = res.data;
                if (data.success) {
                    dispatch(putStoredFileSuccessAction(data.result));
                } else {
                    dispatch(putStoredFileErrorAction());
                }
            })
            .catch(err => 
                dispatch(putStoredFileErrorAction())
            );
    };
    const deleteStoredFile = (id: string) => {
        const endpoint = '/api/services/app/FileStore/Delete';
        dispatch(deleteStoredFileErrorAction())
        instance.delete(`${endpoint}?Id=${id}`)
            .then(res => {
                const data = res.data;
                if (data.success) {
                    dispatch(deleteStoredFileSuccessAction());
                } else {
                    dispatch(deleteStoredFileErrorAction());
                }
            })
            .catch(err => 
                dispatch(deleteStoredFileErrorAction())
            );
    };

    const postStoredFile = (file: StoredFile) => {
        const endpoint = '/api/services/app/FileStore/Create';
        instance.post(endpoint, file)
            .then(res => {
                const data = res.data;
                if (data.success) {
                    dispatch(putStoredFileSuccessAction(data.result));
                } else {
                    dispatch(putStoredFileErrorAction());
                }
            })
            .catch(err => 
                dispatch(putStoredFileErrorAction())
            );
    }

    const postUserFile = (bridge: UserFileStore) => {
        console.log("bridge", bridge);
        const endpoint = '/api/services/app/UserFileStore/CreateUserFileStore';
        dispatch(postUserFileRequestAction());
        instance.post(endpoint, bridge)
            .then(res => {
                const data = res.data;
                console.log("...", data);
                if (data.success) {
                    dispatch(postUserFileSuccessAction(data.result));
                } else {
                    dispatch(postUserFileErrorAction());
                }
            })
            .catch(err => 
                dispatch(postUserFileErrorAction())
            );
    }

    const getBridgeByUser = (userId: number) => {
        const endpoint = '/api/services/app/UserFileStore/GetUserFileStore';
        dispatch(getBridgeByUserRequestAction());
        instance.get(`${endpoint}?userId=${userId}`)
            .then(res => {
                const data = res.data;
                console.log("got the UserFileStore", data);
                if (data.success) {
                    dispatch(getBridgeByUserSuccessAction(data.result));
                } else {
                    dispatch(getBridgeByUserErrorAction());
                }
            })
            .catch(err => 
                dispatch(getBridgeByUserErrorAction())
            );
    }

    return (
        <StoredFileStateContext.Provider value={state}>
            <StoredFileActionContext.Provider value={{getBridgeByUser, postUserFile, getStoredFile, getStoredFiles, putStoredFile, deleteStoredFile, postStoredFile}}>
                {children}
            </StoredFileActionContext.Provider>
        </StoredFileStateContext.Provider>
    );
}

export default StoredFileProvider;
export const useStoreFileState = () => {
    const context = useContext(StoredFileStateContext);
    if (!context) {
        throw new Error('useStoredFileState must be used within a StoredFileProvider, i.e. the StoredFileProvider must be an ancestor of the component using this hook.');
    }
    return context;
}
export const useStoredFileActions = () => {
    const context = useContext(StoredFileActionContext);
    if (!context) {
        throw new Error('useStoredFileActions must be used within a StoredFileProvider, i.e. the StoredFileProvider must be an ancestor of the component using this hook.');
    }
    return context;
};

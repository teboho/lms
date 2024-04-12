import { createAction } from 'redux-actions';
import { StoredFile, UserFileStore } from './context';

export const StoredFileActionEnums = {
    GetStoredFileRequest: 'GET_STORED_FILE_REQUEST',
    GetStoredFileSuccess: 'GET_STORED_FILE_SUCCESS',
    GetStoredFileError: 'GET_STORED_FILE_ERROR',

    GetStoredFilesRequest: 'GET_STORED_FILES_REQUEST',
    GetStoredFilesSuccess: 'GET_STORED_FILES_SUCCESS',
    GetStoredFilesError: 'GET_STORED_FILES_ERROR',

    PutStoredFileRequest: 'PUT_STORED_FILE_REQUEST',
    PutStoredFileSuccess: 'PUT_STORED_FILE_SUCCESS',
    PutStoredFileError: 'PUT_STORED_FILE_ERROR',

    DeleteStoredFileRequest: 'DELETE_STORED_FILE_REQUEST',
    DeleteStoredFileSuccess: 'DELETE_STORED_FILE_SUCCESS',
    DeleteStoredFileError: 'DELETE_STORED_FILE_ERROR',

    PostUserFileRequest: 'POST_USER_FILE_REQUEST',
    PostUserFileSuccess: 'POST_USER_FILE_SUCCESS',
    PostUserFileError: 'POST_USER_FILE_ERROR',

    GetBridgeByUserRequest: 'GET_BRIDGE_BY_USER_REQUEST',
    GetBridgeByUserSuccess: 'GET_BRIDGE_BY_USER_SUCCESS',
    GetBridgeByUserError: 'GET_BRIDGE_BY_USER_ERROR'
};

export const getStoredFileRequestAction = createAction(
    StoredFileActionEnums.GetStoredFileRequest,
    () => ({ isSuccess: false, isPending: true, isError: false, storedFile: undefined })
);

export const getStoredFileSuccessAction = createAction(
    StoredFileActionEnums.GetStoredFileSuccess,
    (storedFile: StoredFile) => ({ isSuccess: true, isPending: false, isError: false, storedFile })
);

export const getStoredFileErrorAction = createAction(
    StoredFileActionEnums.GetStoredFileError,
    () => ({ isSuccess: false, isPending: false, isError: true, storedFile: undefined })
);

export const putStoredFileRequestAction = createAction(
    StoredFileActionEnums.PutStoredFileRequest,
    () => ({ isSuccess: false, isPending: true, isError: false, storedFile: undefined })
);

export const putStoredFileSuccessAction = createAction(
    StoredFileActionEnums.PutStoredFileSuccess,
    (storedFile: StoredFile) => ({ isSuccess: true, isPending: false, isError: false, storedFile })
);

export const putStoredFileErrorAction = createAction(
    StoredFileActionEnums.PutStoredFileError,
    () => ({ isSuccess: false, isPending: false, isError: true, storedFile: undefined })
);

export const getStoredFilesRequestAction = createAction(
    StoredFileActionEnums.GetStoredFilesRequest,
    () => ({ isSuccess: false, isPending: true, isError: false, storedFiles: [] })
);

export const getStoredFilesSuccessAction = createAction(
    StoredFileActionEnums.GetStoredFilesSuccess,
    (storedFiles: StoredFile[]) => ({ isSuccess: true, isPending: false, isError: false, storedFiles })
);

export const getStoredFilesErrorAction = createAction(
    StoredFileActionEnums.GetStoredFilesError,
    () => ({ isSuccess: false, isPending: false, isError: true, storedFiles: [] })
);

export const deleteStoredFileRequestAction = createAction(
    StoredFileActionEnums.DeleteStoredFileRequest,
    () => ({ isSuccess: false, isPending: true, isError: false, storedFile: undefined })
);

export const deleteStoredFileSuccessAction = createAction(
    StoredFileActionEnums.DeleteStoredFileSuccess,
    () => ({ isSuccess: true, isPending: false, isError: false, undefined })
);

export const deleteStoredFileErrorAction = createAction(
    StoredFileActionEnums.DeleteStoredFileError,
    () => ({ isSuccess: false, isPending: false, isError: true, storedFile: undefined })
);

export const postUserFileRequestAction = createAction(
    StoredFileActionEnums.PostUserFileRequest,
    () => ({ isSuccess: false, isPending: true, isError: false, userFile: undefined })
);

export const postUserFileSuccessAction = createAction(
    StoredFileActionEnums.PostUserFileSuccess,
    (userFile: UserFileStore) => ({ isSuccess: true, isPending: false, isError: false, userFile })
);

export const postUserFileErrorAction = createAction(
    StoredFileActionEnums.PostUserFileError,
    () => ({ isSuccess: false, isPending: false, isError: true, userFile: undefined })
);

export const getBridgeByUserRequestAction = createAction(
    StoredFileActionEnums.GetBridgeByUserRequest,
    () => ({ isSuccess: false, isPending: true, isError: false, userFile: undefined })
);

export const getBridgeByUserSuccessAction = createAction(
    StoredFileActionEnums.GetBridgeByUserSuccess,
    (userFile: UserFileStore) => ({ isSuccess: true, isPending: false, isError: false, userFile })
);

export const getBridgeByUserErrorAction = createAction(
    StoredFileActionEnums.GetBridgeByUserError,
    () => ({ isSuccess: false, isPending: false, isError: true, userFile: undefined })
);

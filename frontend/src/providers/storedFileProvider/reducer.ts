import { handleActions } from 'redux-actions';
import { StoredFileActionEnums } from './actions';
import { StoredFileStateContext_InitState } from './context';

const storedFileReducer = handleActions(
    {
        [StoredFileActionEnums.GetStoredFileRequest]: (state, action) => ({
            ...state,
            ...action.payload
        }),
        [StoredFileActionEnums.GetStoredFileSuccess]: (state, action) => ({
            ...state,
            ...action.payload
        }),
        [StoredFileActionEnums.GetStoredFileError]: (state, action) => ({
            ...state,
            ...action.payload
        }),

        [StoredFileActionEnums.PutStoredFileRequest]: (state, action) => ({
            ...state,
            ...action.payload
        }),
        [StoredFileActionEnums.PutStoredFileSuccess]: (state, action) => ({
            ...state,
            ...action.payload
        }),
        [StoredFileActionEnums.PutStoredFileError]: (state, action) => ({
            ...state,
            ...action.payload
        }),

        [StoredFileActionEnums.GetStoredFilesRequest]: (state, action) => ({
            ...state,
            ...action.payload
        }),
        [StoredFileActionEnums.GetStoredFilesSuccess]: (state, action) => ({
            ...state,
            ...action.payload
        }),
        [StoredFileActionEnums.GetStoredFilesError]: (state, action) => ({
            ...state,
            ...action.payload
        }),

        [StoredFileActionEnums.DeleteStoredFileRequest]: (state, action) => ({
            ...state,
            ...action.payload
        }),
        [StoredFileActionEnums.DeleteStoredFileSuccess]: (state, action) => ({
            ...state,
            ...action.payload
        }),
        [StoredFileActionEnums.DeleteStoredFileError]: (state, action) => ({
            ...state,
            ...action.payload
        }),

        [StoredFileActionEnums.PostUserFileRequest]: (state, action) => ({
            ...state,
            ...action.payload
        }),
        [StoredFileActionEnums.PostUserFileSuccess]: (state, action) => ({
            ...state,
            ...action.payload
        }),
        [StoredFileActionEnums.PostUserFileError]: (state, action) => ({
            ...state,
            ...action.payload
        }),

        [StoredFileActionEnums.GetBridgeByUserRequest]: (state, action) => ({
            ...state,
            ...action.payload
        }),
        [StoredFileActionEnums.GetBridgeByUserSuccess]: (state, action) => ({
            ...state,
            ...action.payload
        }),
        [StoredFileActionEnums.GetBridgeByUserError]: (state, action) => ({
            ...state,
            ...action.payload
        })
    },
    StoredFileStateContext_InitState
);

export default storedFileReducer;
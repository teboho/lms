import { handleActions } from "redux-actions";
import { InventoryActionEnums } from "./actions";
import { InventoryContextStateInit, InventoryContextStateType } from "./context";

/**
 * A reducer to handle the inventory actions
 */
export const inventoryReducer = handleActions<InventoryContextStateType>(
    {
        [InventoryActionEnums.GetInventorysRequest]: (state, action) => ({
            ...state,
            ...action.payload
        }), 
        [InventoryActionEnums.GetInventorysSuccess]: (state, action) => ({
            ...state,
            ...action.payload
        }), 
        [InventoryActionEnums.GetInventorysError]: (state, action) => ({
            ...state,
            ...action.payload
        }),
        
        [InventoryActionEnums.GetInventoryRequest]: (state, action) => ({
            ...state,
            ...action.payload
        }),
        [InventoryActionEnums.GetInventorySuccess]: (state, action) => ({
            ...state,
            ...action.payload
        }),
        [InventoryActionEnums.GetInventoryError]: (state, action) => ({
            ...state,
            ...action.payload
        }),

        [InventoryActionEnums.SetSearchTerm]: (state, action) => ({
            ...state,
            ...action.payload
        }),

        [InventoryActionEnums.PostInventoryRequest]: (state, action) => ({
            ...state,
            ...action.payload
        }),
        [InventoryActionEnums.PostInventorySuccess]: (state, action) => ({
            ...state,
            ...action.payload
        }),
        [InventoryActionEnums.PostInventoryError]: (state, action) => ({
            ...state,
            ...action.payload
        }),
    },
    InventoryContextStateInit
)
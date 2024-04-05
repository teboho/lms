import { handleActions } from "redux-actions";
import { InventoryActionEnums } from "./actions";
import { INVENTORY_CONTEXT_INITIAL_STATE } from "./context";

/**
 * A reducer t
 */
export const inventoryReducer = handleActions(
    {
        // this handler will change the value of the isPending in the state
        [InventoryActionEnums.GetInventorysRequest]: (state, action) => ({
            ...state,
            ...action.payload
        }),  // this handler will change the value of the isSuccess in the state
        [InventoryActionEnums.GetInventorysSuccess]: (state, action) => ({
            ...state,
            ...action.payload
        }), // this handler will change the value of the isError in the state
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
    INVENTORY_CONTEXT_INITIAL_STATE
)
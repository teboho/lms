"use client"
import { useContext, useEffect, useMemo, useReducer } from "react";
import { inventoryReducer } from "./reducer";
import InventoryContext, { InventoryContextStateInit } from "./context";
import { makeAxiosInstance } from "../authProvider";
import { getInventorysErrorAction, 
    getInventorysRequestAction,
    getInventorysSuccessAction,
    getInventoryErrorAction, 
    getInventoryRequestAction,
    getInventorySuccessAction, 
    setSearchTermAction
} from "./actions";
import AuthContext from "../authProvider/context";
import { useRouter } from "next/navigation";
import Utils from "@/utils";

export default function InventoryProvider({ children }: { children: React.ReactNode }) {
    const [inventoryState, dispatch] = useReducer(inventoryReducer, InventoryContextStateInit);
    const { authObj } = useContext(AuthContext);
    const { push } = useRouter();

    let accessToken = useMemo(() => authObj?.accessToken, []);
    accessToken = useMemo(() => authObj?.accessToken, [authObj]);

    const instance = makeAxiosInstance(accessToken);

    useEffect(() => {
        if (accessToken) {
            getAll();
        }         
    }, [authObj]);

    /**
     * 
     * @param term search term
     */
    function search(term: string): void {
        const endpoint = "api/services/app/inventory/GetSearchInventorys";

        dispatch(setSearchTermAction(term));
        
        dispatch(getInventorysRequestAction());
        instance.get(`${endpoint}?name=${term}`)
            .then(res => {
                if (res.data.success) {
                    if (res.data.result !== null)
                    {
                        dispatch(getInventorysSuccessAction(res.data.result))
                    }
                } else {
                    dispatch(getInventorysErrorAction());
                }
            })
    }
    /**
     * Get all inventory items
     */
    function getAll(): void {
        const endpoint = "api/services/app/inventory/GetAll?maxResultCount=10000";        
        dispatch(getInventorysRequestAction());
        instance.get(`${endpoint}`)
            .then(res => {
                if (res.data.success) {
                    if (res.data.result !== null)
                    {
                        dispatch(getInventorysSuccessAction(res.data.result.items))
                    }
                } else {
                    dispatch(getInventorysErrorAction());
                }
            })
            .catch(err => dispatch(getInventorysErrorAction()));
    }

    /**
     * 
     * @param inventoryId inventory id
     */
    function getInventory(inventoryId: string): void {
        const endpoint = "api/services/app/inventory/Get?Id=" + inventoryId;
        dispatch(getInventoryRequestAction());
        instance.get(`${endpoint}`)
            .then(res => {
                if (res.data.success) {
                    if (res.data.result !== null)
                    {
                        dispatch(getInventorySuccessAction(res.data.result))
                    }
                } else {
                    dispatch(getInventoryErrorAction());
                }
            })
            .catch(err => dispatch(getInventoryErrorAction()));
    }

    /**
     * 
     * @param id inventory id
     * @param bookId book id
     * @param count the new count value
     */
    function updateInventory(id: string, bookId: string, count: number): void {
        const endpoint = "/api/services/app/Preference/Create";
        
        const inventory = {
            "id": id,
            "bookId": bookId,
            "count": count
        }

        dispatch(getInventorysRequestAction());
        instance.put(`${endpoint}`, inventory)
            .then(res => {
                if (res.data.success) {
                    if (res.data.result !== null)
                    {
                        dispatch(getInventorysSuccessAction(res.data.result))
                    }
                } else {
                    dispatch(getInventorysErrorAction());
                }
            })
            .catch(err =>  dispatch(getInventorysErrorAction()));
    }

    return (
        <InventoryContext.Provider value={{
            inventoryItems: inventoryState.inventoryItems,
            inventory: inventoryState.inventory,
            searchTerm: inventoryState.searchTerm,
            getInventory, 
            getAll
        }}>
            {children}
        </InventoryContext.Provider>
    );
}
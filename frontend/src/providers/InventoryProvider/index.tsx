"use client"
import { useContext, useEffect, useReducer } from "react";
import { inventoryReducer } from "./reducer";
import InventoryContext, { INVENTORY_CONTEXT_INITIAL_STATE } from "./context";
import axios from "axios";
import { baseURL } from "../AuthProvider";
import { getInventorysErrorAction, getInventorysRequestAction, getInventorysSuccessAction,
    getInventoryErrorAction, getInventoryRequestAction, getInventorySuccessAction, 
    setSearchTermAction
} from "./actions";
import AuthContext from "../AuthProvider/context";
import { useRouter } from "next/navigation";
import Utils from "@/utils";

export default function InventoryProvider({ children }: { children: React.ReactNode }) {
    // we will make the state with the reducers
    const [inventoryState, dispatch] = useReducer(inventoryReducer, INVENTORY_CONTEXT_INITIAL_STATE);
    const { authObj } = useContext(AuthContext);
    const { push } = useRouter();

    const accessToken = Utils.getAccessToken(); //authObj?.accessToken; // localStorage.getItem("accessToken");
    // Axios instance
    const instance = axios.create({
        baseURL: baseURL,
        headers: {
            "Authorization": `Bearer ${accessToken}`,
            "Content-Type": "application/json"
        }
    });

    useEffect(() => {
        // check the AuthProvider for the accesToken
        if (accessToken) {
            getAll();
        }         
    }, [authObj]);

    /**
     * 
     * @param term search term
     */
    function search(term: string): void {
        const endpoint = "api/services/app/Inventory/GetSearchInventorys";
        console.log(endpoint);
        console.log(term);

        dispatch(setSearchTermAction(term));
        
        // before we make the http request, we set pending to true via dispatch
        dispatch(getInventorysRequestAction());
        // the we make the call
        instance.get(`${endpoint}?name=${term}`)
            .then(res => {
                console.log("results", res.data)
                if (res.data.success) {
                    // disptach for success
                    if (res.data.result !== null)
                    {
                        dispatch(getInventorysSuccessAction(res.data.result))
                    }
                } else {
                    // dispatch for erroe
                    dispatch(getInventorysErrorAction());
                }
            })
    }
    /**
     * get all inventory items
     */
    function getAll(): void {
        // conduct the fetch and dispatch based on the response
        const endpoint = "api/services/app/Inventory/GetAll?maxResultCount=10000";
        console.log(endpoint);
        // console.log(term);
        
        // before we make the http request, we set pending to true via dispatch
        dispatch(getInventorysRequestAction());
        // the we make the call
        instance.get(`${endpoint}`)
            .then(res => {
                console.log("inventory results", res.data.result.items)
                if (res.data.success) {
                    // disptach for success
                    if (res.data.result !== null)
                    {
                        dispatch(getInventorysSuccessAction(res.data.result.items))
                    }
                } else {
                    // dispatch for erroe
                    dispatch(getInventorysErrorAction());
                }
            });
    }

    /**
     * 
     * @param inventoryId inventory id
     */
    function getInventory(inventoryId: string): void {
        // conduct the fetch and dispatch based on the response
        const endpoint = "api/services/app/Inventory/Get?Id=" + inventoryId;
        
        // before we make the http request, we set pending to true via dispatch
        dispatch(getInventoryRequestAction());
        // the we make the call
        instance.get(`${endpoint}`)
            .then(res => {
                console.log("inventory result", res.data.result)
                if (res.data.success) {
                    // disptach for success
                    if (res.data.result !== null)
                    {
                        dispatch(getInventorySuccessAction(res.data.result))
                    }
                } else {
                    // dispatch for erroe
                    dispatch(getInventoryErrorAction());
                }
            })
    }

    function updateInventory(id: string, bookId: string, count: number): void {
        // conduct the fetch and dispatch based on the response
        const endpoint = "/api/services/app/Preference/Create";
        
        const inventory = {
            "id": id,
            "bookId": bookId,
            "count": count
        }

        // before we make the http request, we set pending to true via dispatch
        dispatch(getInventorysRequestAction());
        // the we make the call
        instance.post(`${endpoint}`, prefs)
            .then(res => {
                console.log("results", res.data)
                if (res.data.success) {
                    // disptach for success
                    if (res.data.result !== null)
                    {
                        dispatch(getInventorysSuccessAction(res.data.result))
                    }
                } else {
                    // dispatch for erroe
                    dispatch(getInventorysErrorAction());
                }
                    dispatch(getInventorysErrorAction());
            }).catch(err =>  dispatch(getInventorysErrorAction()));
    }

    return (
        <InventoryContext.Provider value={{inventoryItems: inventoryState.inventoryItems, inventory: inventoryState.inventory, searchTerm: inventoryState.searchTerm, getInventory, getAll}}>
            {children}
        </InventoryContext.Provider>
    );
}
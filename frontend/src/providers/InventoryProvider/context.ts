"use client";
import { createContext } from "react";

export interface InventoryType {
    "id": string,
    "bookId": string,
    "count" : number,
}

export const INVENTORY_INIT: InventoryType = {
    "id": "",
    "bookId": "",
    "count" : 0,
}

export interface INVENTORY_STATE_TYPE {
    isPending: boolean;
    isSuccess: boolean;
    isError: boolean;
    inventoryItems: InventoryType[] | undefined;
    inventory: InventoryType | undefined; // this is for the single inventory item
    searchTerm: string; // this is for the search term is actually going to be the book id guid
}

export const INVENTORY_CONTEXT_INITIAL_STATE: INVENTORY_STATE_TYPE = {
    isPending: false,
    isError: false,
    isSuccess: false,
    inventoryItems: [] as InventoryType[],
    inventory: INVENTORY_INIT,
    searchTerm: ""
}

export interface InventoryContextType {
    inventory: InventoryType;
    inventoryItems: InventoryType[];
    getInventory: (inventoryId: string) => void;
    getAll: () => void;
    searchTerm: string;
}

/**
 * Default value that the provider will pass is an empty object
 */
const InventoryContext = createContext<InventoryContextType>({ 
    inventory: INVENTORY_INIT,
    inventoryItems: [],
    getInventory: (inventoryId: string) => {}, 
    getAll: () => {},
    searchTerm: ""
});

export default InventoryContext;
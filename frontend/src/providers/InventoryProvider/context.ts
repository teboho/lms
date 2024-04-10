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

export interface InventoryContextStateType {
    isPending?: boolean;
    isSuccess?: boolean;
    isError?: boolean;
    inventoryItems?: InventoryType[];
    inventory?: InventoryType; // this is for the single inventory item
    searchTerm?: string; // this is for the search term is actually going to be the book id guid
}

export const InventoryContextStateInit: InventoryContextStateType = {
    isPending: false,
    isError: false,
    isSuccess: false,
    inventoryItems: [] as InventoryType[],
    inventory: INVENTORY_INIT,
    searchTerm: undefined
}

export interface InventoryContextValueType {
    inventory: InventoryType;
    inventoryItems: InventoryType[];
    getInventory: (inventoryId: string) => void;
    getAll: () => void;
    searchTerm: string;
}

/**
 * Default value that the provider will pass is an empty object
 */
const InventoryContext = createContext<InventoryContextValueType>({ 
    inventory: INVENTORY_INIT,
    inventoryItems: [],
    getInventory: (inventoryId: string) => {}, 
    getAll: () => {},
    searchTerm: ""
});

export default InventoryContext;
"use client"

import { createContext, useContext, useState } from "react";

type GlobalState = {
    search: string;
    setSearch: (search: string) => void;
    filter: string;
    setFilter: (filter: string) => void;
    categories: string[];
    setCategories: (categories: string[]) => void;
}

const initialState: GlobalState = {
    search: '',
    setSearch: () => {},
    filter: '',
    setFilter: () => {},
    categories: [],
    setCategories: () => {},
}

const GlobalStateContext = createContext<GlobalState>(initialState);

export default function GlobalContext({ children }: { children: React.ReactNode }) {
    const [search, setSearch] = useState('')
    const [filter, setFilter] = useState('')
    const [categories, setCategories] = useState<string[]>([])
    
    return (
        <GlobalStateContext.Provider value={{ search, setSearch, filter, setFilter, categories, setCategories}}>
            {children}
        </GlobalStateContext.Provider>
    )
}

export const useGlobalState = () => {
    const context = useContext(GlobalStateContext);
    if (context === undefined) {
        throw new Error('useGlobalState must be used within a GlobalStateContext.Provider');
    }
    return context;
}
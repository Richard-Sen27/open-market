"use client"

import { createContext, useContext, useState } from "react";

type GlobalState = {
    search: string;
    setSearch: (search: string) => void;
    filter: string;
    setFilter: (filter: string) => void;
}

const initialState: GlobalState = {
    search: '',
    setSearch: () => {},
    filter: '',
    setFilter: () => {},
}

const GlobalStateContext = createContext<GlobalState>(initialState);

export default function GlobalContext({ children }: { children: React.ReactNode }) {
    const [search, setSearch] = useState('')
    const [filter, setFilter] = useState('')
    
    return (
        <GlobalStateContext.Provider value={{ search, setSearch, filter, setFilter}}>
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
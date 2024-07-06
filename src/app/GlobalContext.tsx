"use client"

import { createContext, useContext, useState } from "react";

type GlobalState = {
    search: string;
    setSearch: (search: string) => void;
    filter: string;
    setFilter: (filter: string) => void;
    categories: string[];
    setCategories: (categories: string[]) => void;
    allCategories: { label: string, value: string }[];
}

const initialState: GlobalState = {
    search: '',
    setSearch: () => {},
    filter: '',
    setFilter: () => {},
    categories: [],
    setCategories: () => {},
    allCategories: []
}

const GlobalStateContext = createContext<GlobalState>(initialState);

export default function GlobalContext({ children }: { children: React.ReactNode }) {
    const [search, setSearch] = useState('')
    const [filter, setFilter] = useState('')
    const [categories, setCategories] = useState<string[]>([])
    const allCategories = [
        { label: "Voice Recognition", value: "voice-recognition" },
        { label: "Image Recognition", value: "image-recognition" },
        { label: "Text Recognition", value: "text-recognition" },
        { label: "Data Analysis", value: "data-analysis" },
        { label: "Data Visualization", value: "data-visualization" },
        { label: "Data Preprocessing", value: "data-preprocessing" },
        { label: "Image Generation", value: "image-generation" },
        { label: "Text Generation", value: "text-generation" },
      ]
    
    return (
        <GlobalStateContext.Provider value={{ search, setSearch, filter, setFilter, categories, setCategories, allCategories}}>
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
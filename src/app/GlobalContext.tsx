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
    navTitle: string;
    setNavTitle: (title: string) => void;
    breadcrumb: Breadcrumb | null;
    setBreadcrumb: (breadcrumb: Breadcrumb | null) => void;
    showNav: boolean;
    setShowNav: (showNav: boolean) => void;
}

const initialState: GlobalState = {
    search: '',
    setSearch: () => {},
    filter: '',
    setFilter: () => {},
    categories: [],
    setCategories: () => {},
    allCategories: [],
    navTitle: '',
    setNavTitle: () => {},
    breadcrumb: null,
    setBreadcrumb: () => {},
    showNav: true,
    setShowNav: () => {},
}

type Breadcrumb = { label: string, href: string }[]

const GlobalStateContext = createContext<GlobalState>(initialState);

export default function GlobalContext({ children }: { children: React.ReactNode }) {
    const [search, setSearch] = useState('')
    const [filter, setFilter] = useState('')
    const [categories, setCategories] = useState<string[]>([])
    const [navTitle, setNavTitle] = useState('')
    const [breadcrumb, setBreadcrumb] = useState<Breadcrumb | null>(null)
    const [showNav, setShowNav] = useState(true)
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
        <GlobalStateContext.Provider value={
            { 
                search, setSearch, 
                filter, setFilter, 
                categories, setCategories, 
                allCategories, 
                navTitle, setNavTitle,
                breadcrumb, setBreadcrumb,
                showNav, setShowNav
            }}>
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
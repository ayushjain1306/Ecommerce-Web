import { useState, createContext } from "react";

const SearchContext = createContext(null);

function SearchProvider({ children }){
    const [search, setSearch] = useState("");

    return (
        <SearchContext.Provider value={{ search, setSearch }}>
            { children }
        </SearchContext.Provider>
    )
}

export {
    SearchContext,
    SearchProvider
}
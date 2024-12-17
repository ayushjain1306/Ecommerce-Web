import { useState, createContext } from "react";

const CategoryContext = createContext(null);

function CategoryProvider({ children }) {
    const [options, setOptions] = useState([]);

    return (
        <CategoryContext.Provider value={{ options, setOptions }}>
            { children }
        </CategoryContext.Provider>
    )
}

export {
    CategoryContext,
    CategoryProvider
}
import { useState, createContext, useEffect } from "react";

const UserContext = createContext(null);

function UserProvider({ children }) {
    const [user, setUser] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [loadCart, setLoadCart] = useState(false);
    const [loadProfile, setLoadProfile] = useState(false);

    return (
        <UserContext.Provider value={{user, setUser, openDialog, loadCart, loadProfile, setOpenDialog, setLoadCart, setLoadProfile}}>
            {children}
        </UserContext.Provider>
    )
}

export { UserContext, UserProvider };
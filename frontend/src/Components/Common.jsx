import { useContext, useEffect } from "react";
import Header from "./header/Header.jsx";
import Footer from "./footer/Footer.jsx";
import { Outlet } from "react-router-dom";
import { UserContext } from "../context/userContext.jsx";
import { fetchUser } from "../apis/accountApi.js";

function Common(){
    const { setUser, setLoadCart, setLoadProfile, setOpenDialog } = useContext(UserContext);

    useEffect(() => {
        const fetchUserData = async() => {
            const response = await fetchUser();

            if (response){
                setUser(response);
                setLoadProfile(false);
            }
            else {
                setOpenDialog(true);
                setLoadProfile(true);
            }

            setLoadCart(true);
        }

        fetchUserData()
    }, []);

    return (
        <>
            <Header />
            <div style={{minHeight: "100vh"}}>
                <Outlet />
            </div>
            <Footer />
        </>
    )
}

export default Common;
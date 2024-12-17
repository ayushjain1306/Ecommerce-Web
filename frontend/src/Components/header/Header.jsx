import { AppBar, Toolbar, styled } from "@mui/material";
import IntroSection from "./IntroSection.jsx";
import SearchSection from "./SearchSection.jsx";
import LoginSection from "./LoginSection.jsx";

const Appbar = styled(AppBar)(({theme}) => ({
    backgroundColor: "white",
    width: "100vw",
    [theme.breakpoints.down('sm')]: {
        height: "13vh"
    }
}))

const ToolBar = styled(Toolbar)(({theme}) => ({
    backgroundColor: "white",
    width: "100vw",
    [theme.breakpoints.down('sm')]: {
        height: "13vh",
        display: "block",
        paddingTop: "1vh",
    }
}))

function Header(){
    return (
        <Appbar>
            <ToolBar>
                <IntroSection />
                <SearchSection />
                <LoginSection />
            </ToolBar>
        </Appbar>
    )
}

export default Header;
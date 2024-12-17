import { useState } from "react";
import { styled } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Menu } from "@mui/icons-material";
import DrawerFunc from "./Drawer.jsx";

const StyledDiv = styled('div')(({theme}) => ({
    width: "20%",
    [theme.breakpoints.down('sm')]: {
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
    }
}))

const StyledMenu = styled(Menu)(({theme}) => ({
    color: "black",
    [theme.breakpoints.up('sm')]: {
        display: "none"
    }
}))

function IntroSection() {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    return (
        <StyledDiv>
            <StyledMenu fontSize="large" onClick={() => setOpen(true)} />
            <h4 className="h5" style={{color: "black", cursor: "pointer"}} onClick={() => navigate("/")}>Company Name & Logo</h4>
            {
                open && <DrawerFunc open={open} setOpen={setOpen} />
            }
        </StyledDiv>
    )
}

export default IntroSection;
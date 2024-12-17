import { Button, List, ListItem, styled } from "@mui/material";
import { DialogBox } from "../home/Homepage.jsx";
import LogDialogBox from "./DialogBox.jsx";
import { useContext, useState } from "react";
import { UserContext } from "../../context/userContext.jsx";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined.js";
import { useNavigate } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person.js";

const StyledDiv = styled('div')(({ theme }) => ({
    width: "33%",
    display: "flex",
    alignItems: "center",
    [theme.breakpoints.down('sm')]: {
        display: "none"
    }
}))

const StyledButton = styled(Button)(({ theme }) => ({
    width: "30%"
}))

const LoginDiv = styled('div')(({ theme }) => ({
    color: "black",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer"
}));

const SymbolDiv = styled('div')(({ theme }) => ({
    marginRight: "5px"
}));

const NameDiv = styled('div')(({ theme }) => ({
    fontSize: "20px"
}));

const CartDiv = styled('div')(({ theme }) => ({
    width: "50%",
    color: "black"
}));

const NewList = styled(List)(({theme}) => ({
    position: "absolute",
    top: "10vh",
    right: "9vw",
    color: "black",
    backgroundColor: "whitesmoke",
    borderRadius: "3px",
    width: "10vw",
    [theme.breakpoints.between("md", "lg")]: {
        top: "4.5vh",
        right: "7vw",
        width: "14vw"
    }
}))

const NewListItem = styled(ListItem)(({theme}) => ({
    '&:hover': {
        backgroundColor: "#ebebeb"
    }
}))

function LoginSection() {
    const [open, setOpen] = useState(false);
    const [openLog, setOpenLog] = useState(false);
    const [show, setShow] = useState(false);
    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    return (
        <StyledDiv>
            <CartDiv>
                <span style={{ color: "black", fontSize: "20px", cursor: "pointer", margin: "auto", display: 'flex', alignItems: "center", justifyContent: "center", width: "50%" }} onClick={() => navigate("/cart")}>
                    <ShoppingCartOutlinedIcon style={{fontSize: "28px", marginRight: "5px"}} />
                    Cart
                </span>
            </CartDiv>

            {
                user ?
                    <LoginDiv onClick={() => setShow(!show)}>
                        <SymbolDiv>
                            <PersonIcon style={{fontSize: "28px"}} />
                        </SymbolDiv>
                        <NameDiv>
                            {user.name}
                        </NameDiv>
                    </LoginDiv>
                    :
                    <StyledButton variant="contained" onClick={() => setOpen(true)}>
                        Login
                    </StyledButton>
            }

            {
                open && <DialogBox open={open} setOpen={setOpen} />
            }
            {
                show && <NewList>
                    <NewListItem style={{cursor: "pointer"}} onClick={() => {navigate("/account"); setShow(false)}}>Your Orders</NewListItem>
                    <NewListItem style={{cursor: "pointer"}} onClick={() => {setOpenLog(true); setShow(false)}}>Log Out</NewListItem>
                </NewList>
            }
            {
                openLog && <LogDialogBox open={openLog} setOpen={setOpenLog} />
            }
        </StyledDiv>
    )
}

export default LoginSection;
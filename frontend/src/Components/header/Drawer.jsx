import React, { useContext, useState } from "react";
import { Drawer, Button, List, ListItem, styled } from "@mui/material";
import { Close } from "@mui/icons-material";
import { UserContext } from "../../context/userContext.jsx";
import LogDialogBox from "./DialogBox.jsx";
import { DialogBox } from "../home/Homepage.jsx";
import { Link } from "react-router-dom";

const StyledDiv = styled('div')(({ theme }) => ({
    width: "60vw"
}))

const StyledButton = styled(Button)(({ theme }) => ({
    width: "50%",
    marginTop: "2vh"
}))

function DrawerFunc({ open, setOpen }) {
    const [openDialog, setOpenDialog] = useState(false);
    const [openLogDialog, setOpenLogDialog] = useState(false);
    const { user } = useContext(UserContext);

    const handleClose = () => {
        setOpen(false);
    }

    return (
        <Drawer open={open} onClose={() => handleClose()}>
            <StyledDiv>
                <div style={{ textAlign: "right", marginTop: "2vh", marginRight: "2vw" }}>
                    <Button onClick={() => handleClose()} style={{ color: "black" }}>
                        <Close fontSize="large" />
                    </Button>
                </div>
                <List style={{textAlign: "center"}}>
                    <ListItem style={{ justifyContent: "center", fontSize: "20px" }}><Link to="/cart" style={{ color: "inherit", textDecoration: "inherit" }}>Your Cart</Link></ListItem>
                    {
                        user ?
                            <>
                                <ListItem style={{ justifyContent: "center", fontSize: "20px" }}><Link to="/account" style={{ color: "inherit", textDecoration: "inherit" }}>Your Orders</Link></ListItem>
                                <ListItem style={{ justifyContent: "center", fontSize: "20px" }}><Link to="/account/addresses" style={{ color: "inherit", textDecoration: "inherit" }}> Saved Addresses</Link></ListItem>
                                <ListItem style={{ justifyContent: "center", fontSize: "20px" }}><Link to="/account/reset-password" style={{ color: "inherit", textDecoration: "inherit" }}>Reset Password</Link></ListItem>
                                <ListItem style={{ justifyContent: "center", fontSize: "20px" }}><Link style={{ color: "inherit", textDecoration: "inherit" }} onClick={() => setOpenLogDialog(true)}>Log Out</Link></ListItem>
                            </>
                            :
                            <StyledButton variant="contained" onClick={() => { setOpenDialog(true) }}>
                                    Login
                            </StyledButton>
                    }
                </List>
                {
                    openDialog && <DialogBox open={openDialog} setOpen={setOpenDialog} />
                }
                {
                    openLogDialog && <LogDialogBox open={openLogDialog} setOpen={setOpenLogDialog} />
                }
            </StyledDiv>
        </Drawer>
    )
}

export default DrawerFunc;
import { useState } from "react";
import { Dialog, CircularProgress, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, styled } from "@mui/material";
import Swal from "sweetalert2";
import { logoutWork } from "../../apis/accountApi.js";

function DialogBox({ open, setOpen }){
    const [loading, setLoading] = useState(false);

    const handleClick = async() => {
        setLoading(true);
        const response = await logoutWork();
        setLoading(false);

        setOpen(false);

        if (response){
            Swal.fire({
                title: "Success",
                icon: "success",
                text: "You have successfully Logged Out.",
                confirmButtonText: 'OK'
            })
            window.location.href = "/";
        }
        else {
            Swal.fire({
                title: "Error",
                icon: "error",
                text: "Something Went Wrong!",
                confirmButtonText: "OK"
            })
        }
    }

    return (
        <Dialog open={open} onClose={() => setOpen(false)}>
            <DialogTitle>
                Log Out
            </DialogTitle>
            <div style={{textAlign: "center"}}>
                {
                    loading && <CircularProgress />
                }
            </div>
            <DialogContent>
                <DialogContentText>
                    Are your sure you want to log out? You can log in again at anytime.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button variant="contained" onClick={() => setOpen(false)}>Cancel</Button>
                <Button variant="contained" color="warning" onClick={() => handleClick()}>Log Out</Button>
            </DialogActions>
        </Dialog>
    )
}

export default DialogBox;
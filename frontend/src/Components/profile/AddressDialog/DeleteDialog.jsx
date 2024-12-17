import { useState } from "react"
import { Dialog, DialogTitle, CircularProgress, DialogContent, DialogContentText, DialogActions, Button, styled } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close.js";
import Swal from "sweetalert2";
import { deleteAddress } from "../../../apis/addressApi.js";

const StyledDiv = styled('div')(({theme}) => ({
    width: "30vw",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    [theme.breakpoints.down('lg')]: {
        width: "100%"
    }
}))

function DialogBox({open, setOpen, loadAgain, setLoadAgain, address}){
    const [loading, setLoading] = useState(false);

    const handleClick = async() => {
        setLoading(true);
        const response = await deleteAddress(address._id);
        setLoading(false);

        setOpen(false);
        
        if (response){
            setLoadAgain(loadAgain+1);
            Swal.fire({
                title: "Success",
                icon: "success",
                text: "Address Deleted Successfully.",
                confirmButtonText: "OK"
            })
        }
        else {
            Swal.fire({
                title: "Error",
                icon: "error",
                text: "Something Went Wrong",
                confirmButtonText: "OK"
            })
        }
    }

    return (
        <Dialog open={open} onClose={() => setOpen(false)}>
            <DialogTitle>
                <StyledDiv>
                    Delete Your Address
                    <Button onClick={() => setOpen(false)} style={{ color: "black" }}>
                        <CloseIcon fontSize="large" />
                    </Button>
                </StyledDiv>
            </DialogTitle>
            {
                loading && <div style={{textAlign: "center"}}><CircularProgress /></div>
            }
            <DialogContent>
                <DialogContentText>
                    This step cannot be undone.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button variant="contained" onClick={() => handleClick()}>
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default DialogBox;
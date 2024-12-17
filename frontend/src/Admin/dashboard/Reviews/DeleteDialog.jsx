import { useState } from "react";
import { Dialog, DialogContentText, DialogContent, DialogTitle, DialogActions, CircularProgress, Button, styled } from "@mui/material";
import { Close } from "@mui/icons-material";
import { deleteReview } from "../../../apis/adminApis/reviewsApi.js";
import Swal from "sweetalert2";

const StyledDialogTitle = styled(DialogTitle)(({theme}) => (({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
})))

function DeleteDialog({ open, setOpen, review, loadAgain, setLoadAgain }){
    const [loading, setLoading] = useState(false);

    const handleClick = async () => {
        setLoading(true);
        const response = await deleteReview(review._id);
        setLoading(false);
        setOpen(false);

        if (response){
            setLoadAgain(loadAgain + 1);
            Swal.fire({
                title: "Success",
                icon: "success",
                text: "Review Deleted Successfully.",
                confirmButtonText: "OK"
            })
        }
        else {
            Swal.fire({
                title: "Error",
                icon: "error",
                text: "Something Went Wrong.",
                confirmButtonText: "OK"
            })
        }
    }

    return (
        <Dialog open={open} onClose={() => setOpen(false)}>
            <StyledDialogTitle>
                Delete Review
                <Button style={{color: "black"}} onClick={() => setOpen(false)}><Close /></Button>
            </StyledDialogTitle>
            {
                loading && <div style={{textAlign: "center"}}><CircularProgress /></div>
            }
            <DialogContent>
                <DialogContentText>
                    Are your sure you want to delete this review? No one will be able to find this review again.
                </DialogContentText>
            </DialogContent>
            <DialogActions style={{padding: "2vh 2vw"}}>
                <Button variant="contained" color="error" onClick={() => handleClick()}>Delete</Button>
            </DialogActions>
        </Dialog>
    )
}

export default DeleteDialog;
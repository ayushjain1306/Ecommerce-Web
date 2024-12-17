import { useState } from "react";
import { Dialog, DialogTitle, DialogActions, DialogContent, DialogContentText, CircularProgress, Button, styled } from "@mui/material";
import { Close } from "@mui/icons-material";
import { deleteProduct } from "../../../apis/adminApis/productsApi.js";
import Swal from "sweetalert2";

function DeleteDialog({ open, setOpen, loading, setLoading, product }) {
    const [load, setLoad] = useState(false);

    const handleClick = async () => {
        setLoad(true);
        const response = await deleteProduct(product._id);
        setLoad(false);
        setOpen(false);

        if (response) {
            setLoading(!loading);
            Swal.fire({
                title: "Success",
                text: "Product Deleted Successfully.",
                icon: "success",
                confirmButtonText: 'OK!'
            })
        }
        else {
            Swal.fire({
                title: "Error",
                text: "Something went Wrong!",
                icon: "error",
                confirmButtonText: 'OK!'
            })
        }
    }

    return (
        <Dialog open={open} setOpen={() => setOpen(false)}>
            <DialogTitle style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                Delete Product
                <Button style={{color: "black"}} onClick={() => setOpen(false)}><Close /></Button>
            </DialogTitle>
            {
                load && <div style={{textAlign: "center"}}><CircularProgress /></div>
            }
            <DialogContent>
                <DialogContentText>
                    Are your sure your want to delete this product? This step cannot be undone.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button variant="contained" color="error" onClick={() => handleClick()}>Delete</Button>
            </DialogActions>
        </Dialog>
    )
}

export default DeleteDialog;
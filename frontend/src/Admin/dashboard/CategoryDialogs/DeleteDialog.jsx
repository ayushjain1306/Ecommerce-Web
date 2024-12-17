import { useState } from "react";
import { Dialog, DialogTitle, DialogActions, DialogContent, DialogContentText, CircularProgress, Button, styled } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close.js";
import { deleteCategory } from "../../../apis/adminApis/categoryApis.js";
import Swal from "sweetalert2";

function DeleteDialog({ open, setOpen, loading, setLoading, category }) {
    const [load, setLoad] = useState(false);

    const handleClick = async() => {
        setLoad(true);
        const response = await deleteCategory(category._id);
        setLoad(false);

        setOpen(false);

        if (response){
            Swal.fire({
                title: "Success",
                text: "Product Deleted Successfully.",
                icon: "success",
                confirmButtonText: 'OK!'
            })
            setLoading(loading+1);
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
        <Dialog open={open} onClose={() => setOpen(false)}>
            <DialogTitle style={{display: "flex", justifyContent: "space-between"}}>
                <span>Delete Category</span>
                <Button onClick={() => setOpen(false)} style={{color: "black"}}><CloseIcon /></Button>
            </DialogTitle>
            {
                load && <div style={{textAlign: "center"}}><CircularProgress /></div>
            }
            <DialogContent>
                <DialogContentText>
                    All the products related to this category will also get delete. Are you sure you want to delete this category? This step cannot be undone.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button variant="contained" color="error" onClick={() => handleClick()}>Delete</Button>
            </DialogActions>
        </Dialog>
    )
}

export default DeleteDialog;
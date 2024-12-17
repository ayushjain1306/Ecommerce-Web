import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, CircularProgress, Button, styled } from "@mui/material";
import { useState } from "react";
import { editCategory } from "../../../apis/adminApis/categoryApis.js";
import Swal from "sweetalert2";
import { Close } from "@mui/icons-material";

const StyledDialogTitle = styled(DialogTitle)(({ theme }) => ({
    width: "30vw",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    [theme.breakpoints.down('lg')]: {
        width: "100%"
    }
}))

function EditDialog({ open, setOpen, loadAgain, setLoadAgain, category }) {
    const [name, setName] = useState(category.name);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        if (e.target.value === "") {
            setError("This field cannot be empty.");
        }
        else {
            setError("")
        }
        setName(e.target.value);
    }

    const handleClick = async () => {
        if (name === category.name){
            return;
        }

        if (name === "") {
            setError("This field cannot be empty.");
            return;
        }

        setError("");

        setLoading(true);

        const response = await editCategory(category._id, name);
        setLoading(false);

        if (response) {
            setOpen(false);
            setLoadAgain(loadAgain + 1);

            Swal.fire({
                title: "Success",
                icon: "success",
                text: "Category Updated Successfully.",
                confirmButtonText: "OK"
            })
        }
        else {
            setOpen(false);

            Swal.fire({
                title: "Error",
                icon: "error",
                text: "Something went wrong!",
                confirmButtonText: "OK"
            })
        }
    }

    return (
        <Dialog open={open} onClose={() => setOpen(false)}>
            <StyledDialogTitle>
                Edit your Category
                <Button onClick={() => setOpen(false)} style={{color: 'black'}}><Close /></Button>
            </StyledDialogTitle>
            {
                loading && <div style={{textAlign: "center"}}><CircularProgress /></div>
            }
            <DialogContent>
                <DialogContentText>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter the Category"
                        value={name}
                        onChange={(e) => handleChange(e)}
                        style={{ marginTop: "2vh" }}
                    />
                    <span style={{ color: "red", fontSize: "12px" }}>{error}</span>
                </DialogContentText>
            </DialogContent>
            <DialogActions style={{padding: "2vh 1.5vw"}}>
                <Button variant="contained" onClick={() => handleClick()}>Save</Button>
            </DialogActions>
        </Dialog>
    )
}

export default EditDialog;
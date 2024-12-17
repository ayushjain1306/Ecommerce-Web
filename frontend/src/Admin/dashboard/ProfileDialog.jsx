import { useState } from "react";
import { Dialog, DialogActions, DialogContent, CircularProgress, DialogTitle, Button, styled } from "@mui/material";
import { Close } from "@mui/icons-material";
import { changeCredential } from "../../apis/adminApis/profileApis.js";
import Swal from "sweetalert2";

const StyledDialogTitle = styled(DialogTitle)(({theme}) => ({
    width: "30vw",
    [theme.breakpoints.down('lg')]: {
        width: "100%"
    }
}))

function DialogBox({ open, setOpen, data }){
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleClick = async () => {
        if (password === "") {
            return;
        }

        setError("");

        const d = { password, credentials: data };

        setLoading(true);
        const response = await changeCredential(d);
        setLoading(false);

        if (response === "Invalid Password."){
            setError("Wrong Password.");
        }
        else if (response){
            setOpen(false);
            Swal.fire({
                title: "Success",
                icon: "success",
                text: "Credentials Updated Successfully.",
                confirmButtonText: "OK"
            })

            window.location.reload();
        }
        else {
            setOpen(false);
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
            <StyledDialogTitle>
                <div style={{display: 'flex', alignItems: "center", justifyContent: "space-between"}}>
                    Enter Current Password
                    <Button style={{color: "black"}} onClick={() => setOpen(false)}><Close /></Button>
                </div>
            </StyledDialogTitle>
            <div style={{textAlign: "center"}}>
                {
                    loading && <CircularProgress />
                }
            </div>
            <DialogContent>
                <form>
                    <div>
                        <input 
                            type="password" 
                            className="form-control"
                            placeholder="Enter Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <p style={{color: "red", fontSize: "14px"}}>{error}</p>
                    </div>
                </form>
            </DialogContent>
            <DialogActions>
                <Button variant="contained" onClick={() => handleClick()} color="warning">Submit</Button>
            </DialogActions>
        </Dialog>
    )
}

export default DialogBox;
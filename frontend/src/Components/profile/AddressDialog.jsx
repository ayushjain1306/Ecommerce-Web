import { useState } from "react";
import { Dialog, DialogTitle, DialogContent, CircularProgress, DialogActions, Button, styled } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close.js";
import { addAddress } from "../../apis/addressApi.js";
import Swal from "sweetalert2";

const StyledDiv = styled('div')(({theme}) => ({
    width: "30vw",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    [theme.breakpoints.down('lg')]: {
        width: "100%"
    }
}))

function DialogBox({ open, setOpen, loadAgain, setLoadAgain }) {
    const [input, setInput] = useState({ name: "", address: "", phone: "", city: "", state: "", pincode: "", default: false });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setInput({ ...input, [e.target.id]: e.target.value });
    }

    const handleClick = async (e) => {
        e.preventDefault();

        setLoading(true);

        const response = await addAddress(input);
        setLoading(false);

        setOpen(false);
        setLoadAgain(loadAgain+1);

        if (response){
            Swal.fire({
                title: "Success",
                icon: "success",
                text: "Address Added Successfully.",
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
                    Add Your Address
                    <Button onClick={() => setOpen(false)} style={{ color: "black" }}>
                        <CloseIcon fontSize="large" />
                    </Button>
                </StyledDiv>
            </DialogTitle>
            {
                loading && <div style={{textAlign: "center"}}><CircularProgress /></div>
            }
            <DialogContent>
                {/* <DialogContentText> */}
                    <form onSubmit={(e) => handleClick(e)} id="form-add-address" style={{marginTop: "1vh"}}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2vh" }}>
                            <label>Name: </label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter the Name"
                                value={input.name}
                                id="name"
                                onChange={(e) => handleChange(e)}
                                style={{ width: "60%" }}
                                required
                            />
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2vh" }}>
                            <label>Phone Number: </label>
                            <input
                                type="Number"
                                className="form-control"
                                placeholder="Enter the Phone Number"
                                value={input.phone}
                                id="phone"
                                onChange={(e) => handleChange(e)}
                                style={{ width: "60%" }}
                                required
                            />
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2vh" }}>
                            <label>Address: </label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter the Address"
                                value={input.address}
                                id="address"
                                onChange={(e) => handleChange(e)}
                                style={{ width: "60%" }}
                                required
                            />
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2vh" }}>
                            <label>City: </label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter the City"
                                value={input.city}
                                id="city"
                                onChange={(e) => handleChange(e)}
                                style={{ width: "60%" }}
                                required
                            />
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2vh" }}>
                            <label>State: </label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter the State"
                                value={input.state}
                                id="state"
                                onChange={(e) => handleChange(e)}
                                style={{ width: "60%" }}
                                required
                            />
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2vh" }}>
                            <label>Pincode: </label>
                            <input
                                type="Number"
                                className="form-control"
                                placeholder="Enter the Pincode"
                                value={input.pincode}
                                id="pincode"
                                onChange={(e) => handleChange(e)}
                                style={{ width: "60%" }}
                                required
                            />
                        </div>
                        <div className="mb-3 form-check">
                            <input
                                type="checkbox"
                                className="form-check-input"
                                onChange={() => setInput({ ...input, default: !input.default })}
                            />
                            <label>Set as Default</label>
                        </div>

                        <div style={{ textAlign: "right" }}>
                            <Button type="submit" variant="contained" color="warning">
                                Add Address
                            </Button>
                        </div>
                    </form>
                {/* </DialogContentText> */}
            </DialogContent>
            <DialogActions>

            </DialogActions>
        </Dialog>
    )
}

export default DialogBox;
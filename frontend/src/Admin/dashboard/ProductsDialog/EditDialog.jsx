import { useState, useEffect } from "react";
import { Dialog, DialogTitle, DialogContent, CircularProgress, Button, styled } from "@mui/material";
import deletePic from "../../../assets/images/delete.png";
import Swal from "sweetalert2";
import { editProduct } from "../../../apis/adminApis/productsApi";
import { Close } from "@mui/icons-material";

const StyledDialogTitle = styled(DialogTitle)(({ theme }) => ({
    width: "35vw",
    [theme.breakpoints.down('lg')]: {
        width: "100%"
    }
}))

const StyledDialogContent = styled(DialogContent)(({ theme }) => ({
    
}))

const style = {
    marginTop: "2vh"
}

function EditDialog({ open, setOpen, loading, setLoading, product }) {
    const [input, setInput] = useState(product);
    const [load, setLoad] = useState(false);
    const [sizeLoad, setSizeLoad] = useState(false);
    const [error, setError] = useState("");
    const [sizeError, setSizeError] = useState("");
    const [color, setColor] = useState({ name: "", status: "Available" });
    const [size, setSize] = useState({ name: "", status: "Available" });
    const [headError, setHeadError] = useState("");
    const [selectedColor, setSelectedColor] = useState({});
    const [selectedSize, setSelectedSize] = useState({});
    const [stillLoading, setStillLoading] = useState(false);

    useEffect(() => {
        if (selectedColor){
            setInput({...input, colors: input.colors.filter((color) => JSON.stringify(color) !== JSON.stringify(selectedColor))})
        }
    }, [selectedColor]);

    useEffect(() => {
        if (selectedSize){
            setInput({...input, sizes: input.sizes.filter((size) => JSON.stringify(size) !== JSON.stringify(selectedSize))})
        }
    }, [selectedSize]);

    const handleChange = (e) => {
        setInput({...input, [e.target.id]: e.target.value});
    }

    const handleClick = async (e) => {
        e.preventDefault();

        if (JSON.stringify(product) === JSON.stringify(input)){
            return;
        }

        const form = document.getElementById("form-edit-product");

        if (!form.checkValidity()){
            setHeadError("Please fill all the given fields.");
            return;
        }

        if (input.colors.length === 0 || input.sizes.length === 0){
            setHeadError("Please add atleast one color and one size.");
            return;
        }
        setHeadError("");

        setStillLoading(true);

        const response = await editProduct(product._id, input);
        setStillLoading(false);

        setOpen(false);

        if (response){
            setLoading(!loading);
            Swal.fire({
                title: "Success",
                icon: "success",
                text: "Product Updated Successfully.",
                confirmButtonText: 'OK'
            })
        }
        else {
            Swal.fire({
                title: "Error",
                icon: "error",
                text: "Something went Wrong!",
                confirmButtonText: "OK"
            })
        }
    }

    const addColor = () => {
        if (color.name === "") {
            setError("These fields cannot be empty.");
            return;
        }

        setInput({ ...input, colors: [...input.colors, color] })
        setColor({ name: "" })
        setLoad(true)
    }

    const addSize = () => {
        if (size.name === "") {
            setSizeError("This field cannot be empty.");
            return;
        }

        setSize({ name: "", status: "Available" })

        setInput({ ...input, sizes: [...input.sizes, size] })
        setSizeLoad(true)
    }

    return (
        <Dialog open={open} onClose={() => setOpen(false)}>
            <StyledDialogTitle>
                <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                    Edit your Product
                    <Button style={{color: "black"}} onClick={() => setOpen(false)}><Close /></Button>
                </div>
                <span style={{color: "red", fontSize: "14px"}}>{headError}</span>
            </StyledDialogTitle>
            {
                stillLoading && <div style={{textAlign: "center"}}><CircularProgress /></div>
            }
            <StyledDialogContent>
                <form id="form-edit-product">
                    <label style={{ ...style, color: "black", fontWeight: "bold" }}>Name of the Product</label><br />

                    <input
                        style={style}
                        type="text"
                        className="form-control"
                        id="name"
                        placeholder="Enter the Product Name"
                        value={input.name}
                        required
                        onChange={(e) => handleChange(e)}
                    />

                    <label style={{ ...style, color: "black", fontWeight: "bold" }}>Description</label><br />

                    <textarea style={style}
                        className="form-control"
                        placeholder="Add Product Description"
                        id="description"
                        rows={4}
                        required
                        value={input.description}
                        onChange={(e) => handleChange(e)}
                    ></textarea>

                    <label style={{ ...style, color: "black", fontWeight: "bold" }}>Colors</label><br />

                    <div>
                        {
                            input.colors.length > 0
                            &&
                            <table className="table">
                                <tbody>
                                    <tr>
                                        <th>Name</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                    {
                                        input.colors.map((color) => {
                                            return (
                                                <tr key={color.name}>
                                                    <td>{color.name}</td>
                                                    <td><span style={{color: color.status === "Available" ? "green": "red", fontWeight: "bold", cursor: "pointer"}} onClick={() => setInput({...input, colors: [...input.colors.filter((c) => JSON.stringify(color) !== JSON.stringify(c)), {name: color.name, status: color.status === "Available" ? "Unavailable" : "Available"}]})}>{color.status}</span></td>
                                                    <td><Button variant="outlined" onClick={() => setSelectedColor(color)}><img style={{height: "20px", width: "20px"}} src={deletePic} alt="delete" /></Button></td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        }
                    </div>

                    <div style={{ display: "flex", alignItems: "center", paddingTop: "2vh" }}>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Color Name"
                            value={color.name}
                            style={{ width: "35%" }}
                            onChange={(e) => setColor({ ...color, name: e.target.value })}
                        />
                        <Button variant="contained" color="warning" style={{ marginLeft: "10px" }} onClick={() => addColor()}>Add Color</Button><br />
                    </div>
                    <span style={{ color: "red", fontSize: "12px" }}>{error}</span><br />

                    <label style={{ ...style, fontWeight: "bold" }}>Sizes</label>

                    <div>
                        {
                            input.sizes.length > 0 && <table className="table">
                                <tbody>
                                    <tr>
                                        <th>Name</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                    {
                                        input.sizes.map((size) => {
                                            return (
                                                <tr key={size.name}>
                                                    <td>{size.name}</td>
                                                    <td><span style={{color: size.status === "Available" ? "green": "red", fontWeight: "bold", cursor: "pointer"}} onClick={() => setInput({...input, sizes: [...input.sizes.filter((s) => JSON.stringify(size) !== JSON.stringify(s)), {name: size.name, status: size.status === "Available" ? "Unavailable" : "Available"}]})}>{size.status}</span></td>
                                                    <td><Button variant="outlined" onClick={() => setSelectedSize(size)}><img style={{height: "20px", width: "20px"}} src={deletePic} alt="delete" /></Button></td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        }
                    </div>

                    <div style={{ display: "flex", alignItems: "center", paddingTop: "2vh" }}>
                        <input
                            type="text"
                            placeholder="Enter the Available Size"
                            value={size.name}
                            className="form-control"
                            style={{ width: "60%" }}
                            onChange={(e) => setSize({ ...size, name: e.target.value })}
                        />
                        <Button variant="contained" color="warning" style={{ marginLeft: "10px" }} onClick={() => addSize()}>Add</Button>
                    </div>
                    <span style={{ color: "red", fontSize: "12px" }}>{sizeError}</span><br />

                    <label style={{ ...style, fontWeight: "bold" }}>No. of Pieces</label>

                    <input
                        type="Number"
                        placeholder="Enter the Total Number of Pieces"
                        className="form-control"
                        style={style}
                        value={input.quantity}
                        id="quantity"
                        required
                        onChange={(e) => handleChange(e)}
                    />

                    <label style={{ ...style, fontWeight: "bold" }}>Your Selling Price</label>

                    <input
                        type="Number"
                        placeholder="Enter your Selling Price"
                        style={style}
                        value={input.price}
                        className="form-control"
                        id="price"
                        required
                        onChange={(e) => handleChange(e)}
                    />

                    <div style={{ marginTop: "4vh", textAlign: "right" }}>
                        <Button type="submit" variant="contained" onClick={(e) => handleClick(e)}>Update Product</Button>
                    </div>


                </form>
                
            </StyledDialogContent>
        </Dialog>
    )
}

export default EditDialog;
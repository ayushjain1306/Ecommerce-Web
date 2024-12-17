import { useState, useEffect } from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, CircularProgress, Button, styled } from "@mui/material";
import { getCategories } from "../../apis/adminApis/categoryApis.js";
import { addProduct } from "../../apis/adminApis/productsApi.js";
import { Close } from "@mui/icons-material";
import Swal from "sweetalert2";
import deletePic from "../../assets/images/delete.png";

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

function DialogBox({ open, setOpen, loading, setLoading }) {
    const [input, setInput] = useState({
        name: "",
        description: "",
        colors: [],
        sizes: [],
        mrp: "",
        price: "",
        quantity: "",
        image: [],
        category: ""
    });
    const [load, setLoad] = useState(false);
    const [sizeLoad, setSizeLoad] = useState(false);
    const [error, setError] = useState("");
    const [sizeError, setSizeError] = useState("");
    const [color, setColor] = useState({ name: "", status: "Available" });
    const [size, setSize] = useState({ name: "", status: "Available" });
    const [headError, setHeadError] = useState("");
    const [categories, setCategories] = useState(null);
    const [stillLoading, setStillLoading] = useState(false);
    const [image, setImage] = useState(null);
    const [imageError, setImageError] = useState("");

    useEffect(() => {
        const fetchCategories = async () => {
            const response = await getCategories();

            if (response) {
                setCategories(response);
            }
        }

        fetchCategories();
    }, []);

    const handleChange = (e) => {
        setInput({ ...input, [e.target.id]: e.target.value });
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

    const handleClick = async (e) => {
        e.preventDefault();

        const form = document.getElementById("form-product");

        if (form.checkValidity()) {
            setHeadError("");
            if (input.sizes.length === 0 || input.colors.length === 0 || input.image.length === 0) {
                setError("Please add atleast one color");
                setSizeError("Please add atleast one size");
                setImageError("Please add atleast one image")
                return;
            }

            if (input.category === "") {
                setHeadError("Please fill all the given fields.");
                return;
            }

            setHeadError("");

            setStillLoading(true);
            const response = await addProduct(input);
            setStillLoading(false);

            if (response) {
                setOpen(false);
                setLoading(!loading);
                Swal.fire({
                    title: "Success",
                    icon: "success",
                    text: "Product Added Successfully.",
                    confirmButtonText: "OK"
                })
            }
            else {
                setOpen(false);
                Swal.fire({
                    title: "Error",
                    icon: "error",
                    text: "Something went Wrong!",
                    confirmButtonText: "OK"
                })
            }
        }
        else {
            setHeadError("Please fill all the given fields.");
        }
    }

    return (
        <Dialog open={open} onClose={() => setOpen(false)}>
            <StyledDialogTitle>
                <div style={{ display: 'flex', alignItems: "center", justifyContent: "space-between" }}>
                    Add New Product
                    <Button onClick={() => setOpen(false)} style={{ color: "black" }}><Close fontSize="large" /></Button>
                </div>
                <span style={{ color: "red", fontSize: "13px" }}>{headError}</span>
            </StyledDialogTitle>
            {
                stillLoading && <div style={{ textAlign: "center" }}><CircularProgress /></div>
            }
            <StyledDialogContent>
                {/* <DialogContentText> */}
                <form id="form-product">
                    <input
                        style={style}
                        type="text"
                        className="form-control"
                        id="name"
                        placeholder="Enter the Product Name"
                        required
                        onChange={(e) => handleChange(e)}
                    />
                    <textarea style={style}
                        className="form-control"
                        placeholder="Add Product Description"
                        id="description"
                        rows={4}
                        required
                        onChange={(e) => handleChange(e)}
                    ></textarea>

                    <select className="form-select" style={style} required onChange={(e) => setInput({ ...input, category: e.target.value })}>
                        <option disabled selected>Select Category</option>
                        {
                            categories?.map((category) => {
                                return (
                                    <option key={category?._id} value={category?.name}>{category.name}</option>
                                )
                            })
                        }
                    </select>

                    {
                        input.image.length > 0 &&
                        <div>
                            <label style={{ ...style, fontWeight: "bold" }}>Added Images</label>
                            {
                                input.image.map((image, index) => {
                                    return (
                                        <p key={index} style={{margin: "1vh 0vw"}}>{image.name}</p>
                                    )
                                })
                            }
                        </div>
                    }

                    <label style={{ ...style, fontWeight: "bold" }}>Add Image</label>

                    <div style={{display: 'flex', alignItems: "center", justifyContent: "space-between", paddingTop: "2vh"}}>
                        <input
                            type="file"
                            accept="image/*"
                            className="form-control"
                            style={{ ...style, width: "80%", margin: "0" }}
                            required
                            onChange={(e) => setImage(e.target.files[0])}
                        />
                        <Button variant="contained" color="warning" onClick={() => setInput({...input, image: [...input.image, image]})}>Add</Button>
                    </div>
                    <span style={{ color: "red", fontSize: "12px" }}>{imageError}</span><br />

                    <label style={{ ...style, color: "black", fontWeight: "bold" }}>Colors</label><br />

                    {load && <div>
                        {
                            input.colors.length > 0
                            &&
                            <table className="table">
                                <tbody>
                                    <tr>
                                        <th>Name</th>
                                        <th>Actions</th>
                                    </tr>
                                    {
                                        input.colors.map((color) => {
                                            return (
                                                <tr key={color.name}>
                                                    <td>{color.name}</td>
                                                    <td><Button variant="outlined" onClick={() => setInput({ ...input, colors: input.colors.filter((selectedColor) => JSON.stringify(color) !== JSON.stringify(selectedColor)) })}><img style={{ height: "20px", width: "20px" }} src={deletePic} alt="delete" /></Button></td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        }
                    </div>}

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

                    {
                        sizeLoad && <div>
                            {
                                input.sizes.length > 0 && <table className="table">
                                    <tbody>
                                        <tr>
                                            <th>Name</th>
                                            <th>Actions</th>
                                        </tr>
                                        {
                                            input.sizes.map((size) => {
                                                return (
                                                    <tr key={size.name}>
                                                        <td>{size.name}</td>
                                                        <td><Button variant="outlined" onClick={() => setInput({ ...input, sizes: input.sizes.filter((selectedSize) => JSON.stringify(size) !== JSON.stringify(selectedSize)) })}><img style={{ height: "20px", width: "20px" }} src={deletePic} alt="delete" /></Button></td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            }
                        </div>
                    }

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
                    <span style={{ color: "red", fontSize: "12px" }}>{sizeError}</span>

                    <input
                        type="Number"
                        placeholder="Enter the Total Number of Pieces"
                        className="form-control"
                        style={style}
                        value={input.value}
                        id="quantity"
                        required
                        onChange={(e) => handleChange(e)}
                    />

                    <input
                        type="Number"
                        placeholder="Enter the MRP Rate (in Ruppees)"
                        style={style}
                        value={input.mrp}
                        className="form-control"
                        id="mrp"
                        required
                        onChange={(e) => handleChange(e)}
                    />

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
                        <Button type="submit" variant="contained" style={{ fontWeight: "bold" }} onClick={(e) => handleClick(e)}>Create Product</Button>
                    </div>


                </form>
                {/* </DialogContentText> */}
            </StyledDialogContent>
            <DialogActions>

            </DialogActions>
        </Dialog>
    )
}

export default DialogBox;
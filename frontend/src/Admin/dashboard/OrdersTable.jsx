import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent, Typography, DialogActions, Pagination, Button, DialogContentText } from "@mui/material";
import { Visibility } from "@mui/icons-material";
import { updateStatus } from "../../apis/adminApis/ordersApi.js";
import Swal from "sweetalert2";
import { Close } from "@mui/icons-material";

function Table({ data, headers, targets }) {
    const [page, setPage] = useState(1);
    const [filteredData, setFilteredData] = useState(data.slice(0, 10));
    const [loadAgain, setLoadAgain] = useState(false);
    const [open, setOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);

    const handlePageChange = (value) => {
        setPage(value);
        setFilteredData(data.slice((value - 1) * 10, value * 10));
        setLoadAgain(!loadAgain);
    }

    const handleClick = async (element) => {
        if (element.status === "Delivered") {
            return;
        }

        const response = await updateStatus(element._id);

        if (response) {
            window.location.reload();
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
        <div>
            <table className="table">
                <thead>
                    <tr>
                        {
                            headers.map((element, index) => {
                                return (
                                    <th key={index}>{element}</th>
                                )
                            })
                        }
                    </tr>
                </thead>
                <tbody>
                    {(loadAgain === true || loadAgain === false) &&
                        (filteredData.map((element, index) => {
                            return (
                                <tr key={index}>
                                    <td>{(page - 1) * 10 + index + 1}</td>
                                    {
                                        targets.map((target, index) => {
                                            return (
                                                <td key={index}>
                                                    {
                                                        target === "amount"
                                                            ?
                                                            `Rs. ${element[target]}`
                                                            :
                                                            (target === "items"
                                                                ?
                                                                element.products.map((product) => {
                                                                    return (
                                                                        <React.Fragment key={product._id}>
                                                                            <img src={product.image} alt="product" style={{ height: "30px", width: "30px", marginRight: "10px", marginBottom: "5px" }} />
                                                                            {product.name.length > 20 ? product.name.substring(0, 20) + "..." : product.name} <br />
                                                                        </React.Fragment>
                                                                    )
                                                                })
                                                                :
                                                                (target === "status"
                                                                    ?
                                                                    <span className={element[target] === "Delivered" ? "bg-success text-white" : "bg-warning"} style={{ padding: "0.8vh 0.8vw", borderRadius: "3px", cursor: "pointer" }} onClick={() => handleClick(element)}>{element[target]}</span>
                                                                    :
                                                                    element[target]
                                                                )
                                                            )
                                                    }
                                                </td>
                                            )
                                        })
                                    }
                                    <td>
                                        <Button variant="outlined" style={{ color: "black" }} onClick={() => {
                                            setSelectedOrder(element);
                                            setOpen(true);
                                        }}><Visibility /></Button>
                                    </td>
                                </tr>
                            )
                        }))
                    }
                </tbody>
            </table>
            <Pagination
                count={Math.ceil(data.length / 10)}
                variant="outlined"
                shape="rounded"
                onChange={(e, value) => handlePageChange(value)}
                style={{ display: "flex", justifyContent: "center" }}
            />
            {
                open && <DialogBox open={open} setOpen={setOpen} order={selectedOrder} />
            }
        </div>
    )
}

function DialogBox({ open, setOpen, order }) {
    return (
        <Dialog open={open} onClose={() => setOpen(false)}>
            <DialogTitle>
                <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                    Order Details
                    <Button style={{ color: "black" }} onClick={() => setOpen(false)}>
                        <Close />
                    </Button>
                </div>
            </DialogTitle>
            <DialogContent>
                <Typography style={{fontWeight: "bold"}}>Product Items: </Typography>
                <table className="table">
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>Product</th>
                            <th>Color</th>
                            <th>Size</th>
                            <th>Quantity</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            order?.products?.map((element, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>
                                            <img src={element.image} alt="product" style={{ height: "20px", width: "20px", marginRight: "10px" }} />
                                            {element.name}
                                        </td>
                                        <td>{element.color}</td>
                                        <td>{element.size}</td>
                                        <td>{element.quantity}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>

                <Typography style={{fontWeight: "bold", marginTop: "5vh", marginBottom: "2vh"}}>
                    Costumer Details:
                </Typography>
                <Typography>
                    {order.address.name} - {order.address.phone}
                </Typography>
                <DialogContentText>
                    {order.address.address}, {order.address.city}, {order.address.state} - {order.address.pincode}
                </DialogContentText>

                <Typography style={{fontWeight: "bold", marginTop: "5vh", marginBottom: "2vh"}}>
                    Transaction ID:
                </Typography>
                <Typography>
                    {order?.transaction_id}
                </Typography>
            </DialogContent>
            <DialogActions style={{padding: "3vh 1.5vw"}}>
                <Button variant="contained" onClick={() => setOpen(false)}>OK</Button>
            </DialogActions>
        </Dialog>
    )
}

export default Table;
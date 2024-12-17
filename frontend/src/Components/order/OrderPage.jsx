import { Typography, Button, styled } from "@mui/material";
import { useState, useEffect, useContext } from "react";
import { OrderContext } from "../../context/orderContext.jsx";
import { useNavigate } from "react-router-dom";
import { bookOrder } from "../../apis/orderApi.js";
import Swal from "sweetalert2";
import { getAddresses } from "../../apis/addressApi.js";
import DialogBox from "../profile/AddressDialog.jsx";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const StyledDiv = styled('div')(({ theme }) => ({
    width: "60%",
    margin: "auto",
    borderRadius: "3px",
    backgroundColor: "white",
    boxShadow: "8px 8px 8px -3px rgb(0,0,0,0.2)",
    padding: "4vh 0vw",
    [theme.breakpoints.down('sm')]: {
        width: "90%"
    }
}))

function OrderPage() {
    const { order, setOrder } = useContext(OrderContext);
    const [address, setAddress] = useState([]);
    const [open, setOpen] = useState(false);
    const [loadAgain, setLoadAgain] = useState(1);
    const [loaded, setLoaded] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (!order) {
            navigate("/");
        }
    }, [order]);

    useEffect(() => {
        const fetchAddresses = async () => {
            const response = await getAddresses();

            if (response) {
                setAddress(response.filter((address) => address.default === true));
            }

            setLoaded(!loaded);
        }

        fetchAddresses();
    }, [loadAgain]);

    const handleClick = async (paymentDetails) => {
        let orderBody = {
            no_of_items: order.totalItems,
            products: [],
            transaction_id: paymentDetails.paymentID,
            amount: order.totalCost + 40,
            address: {
                name: address[0].name,
                phone: address[0].phone,
                city: address[0].city,
                state: address[0].state,
                pincode: address[0].pincode,
                address: address[0].address
            }
        }

        order.items.forEach((item) => {
            orderBody.products.push({
                product_id: item.product._id,
                name: item.product.name,
                image: item.product.image[0],
                color: item.item.color,
                size: item.item.size,
                quantity: item.item.quantity
            })
        })

        const response = await bookOrder(orderBody, order.cartStatus);

        if (response) {
            Swal.fire({
                title: "Success",
                text: "Order Booked Successfully.",
                icon: "success",
                confirmButtonText: 'OK'
            })
            setOrder(null);
        }
        else {
            Swal.fire({
                title: "Error",
                text: "Something Went Wrong!",
                icon: "error",
                confirmButtonText: "OK"
            })
        }
    }

    const initialOptions = {
        clientId: "AVfczCp8lTjEdU1PmZrWrY6kKpXWuMy5M8R5la8S4EWzpIRuMlwbXTPsWE2XFBKzpprCUbKA7lUrdTsL"
    };
    const paypalStyles = {
        shape: "rect",
        layout: "horizontal"
    }

    return (
        order && <div style={{ minHeight: "100vh", width: "100%", backgroundColor: "#ebebe9", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <StyledDiv>
                <h4 className="h4">Company Details</h4>
                <div style={{ width: "80%", margin: "auto", marginTop: "2vh", textAlign: "left" }}>
                    <Typography style={{ fontWeight: "bold" }}>Items ({order.totalItems})</Typography>

                    <table className="table">
                        <tbody>
                            <tr>
                                <td></td>
                                <td></td>
                            </tr>
                            {
                                order.items.map((item) => {
                                    return (
                                        <tr key={item.product._id}>
                                            <td>
                                                <img src={item.product.image[0]} alt="product" style={{ height: "10vh", width: "5vw" }} />
                                            </td>
                                            <td>
                                                <div>
                                                    <Typography>{item.product.name}</Typography>
                                                    <Typography style={{ color: "green", fontWeight: "bold" }}>Rs. {item.product.price}</Typography>
                                                    <Typography>Quantity: {item.item.quantity}</Typography>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>

                    {
                        (loaded === true || loaded === false) && (address.length > 0 ?
                            <div>
                                Default Address:
                                <Typography>{address[0].address}, {address[0].city}, {address[0].state} - {address[0].pincode}</Typography>
                                <p className="form-text">You can change your Default Address in your Profile Settings.</p>
                            </div>
                            :
                            <div>
                                <Button variant="outlined" color="warning" onClick={() => setOpen(true)}>Add Address</Button>
                            </div>
                        )
                    }

                    <div style={{ marginTop: "8vh" }}>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <Typography>Price ({order.totalItems} {order.totalItems === 1 ? "Item" : "Items"}): </Typography>
                            <Typography>Rs. {order.totalCost}</Typography>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <Typography>Delivery Charges: </Typography>
                            <Typography>Rs. 40</Typography>
                        </div>
                        <hr />
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <Typography style={{ fontWeight: "bold" }}>Total Amount: </Typography>
                            <Typography style={{ fontWeight: "bold" }}>Rs. {order.totalCost + 40}</Typography>
                        </div>

                        <div style={{ textAlign: "right", justifyItems: "right", marginTop: "5vh" }}>
                            {
                                address.length === 0 ?
                                    <Button variant="contained" disabled color="warning">Add Address</Button>
                                    :
                                    <div style={{ width: "35%" }}>
                                        <PayPalScriptProvider options={initialOptions}>
                                            <PayPalButtons amount={order.totalCost} onApprove={handleClick} />
                                        </PayPalScriptProvider>
                                    </div>
                            }
                        </div>
                    </div>
                </div>
            </StyledDiv>
            {
                open && <DialogBox open={open} setOpen={setOpen} loadAgain={loadAgain} setLoadAgain={setLoadAgain} />
            }
        </div>
    )
}

export default OrderPage;
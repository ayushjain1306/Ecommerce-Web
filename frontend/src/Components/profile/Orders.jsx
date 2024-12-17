import React, { useState, useEffect } from "react";
import { Pagination, CircularProgress, Button, styled } from "@mui/material";
import { getOrders } from "../../apis/orderApi.js";
import { useNavigate } from "react-router-dom";

const HeadDiv = styled('div')(({ theme }) => ({
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
    backgroundColor: "white",
    padding: "3vh 2vw",
    fontSize: "25px",
    boxShadow: "8px 8px 8px -3px rgb(0,0,0,0.2)",
    borderRadius: "3px"
}))

const OrdersDiv = styled('div')(({ theme }) => ({
    width: "100%",
    backgroundColor: "white",
    padding: "3vh 2vw",
    boxShadow: "8px 8px 8px -3px rgb(0,0,0,0.2)",
    borderRadius: "3px",
    marginTop: "3vh",
    [theme.breakpoints.down('lg')]: {
        overflowX: "auto"
    }
}))

function Orders() {
    const [orders, setOrders] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [page, setPage] = useState(1);
    const navigate = useNavigate();
    const [filteredOrders, setFilteredOrders] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchOrders = async () => {
            setLoading(true);
            const response = await getOrders();
            setLoading(false);

            if (response) {
                setOrders(response);
                setFilteredOrders(response);
            }
            setLoaded(!loaded);
        }

        fetchOrders();
    }, []);

    const handlePageChange = (value) => {
        setPage(value);

        setFilteredOrders(orders.slice((page - 1) * 10, page * 10));

        setLoaded(!loaded);
    }

    return (
        <div>
            <HeadDiv>
                <div style={{ width: "100%", display: "flex", justifyContent: "space-between" }}>
                    All Orders
                    <Button variant="contained" color="warning" onClick={() => navigate("/shopping")}>Explore more Products</Button>
                </div>
            </HeadDiv>
            <OrdersDiv>
                {
                    loading && <CircularProgress />
                }
                {
                    (loaded === true || loaded === false) && (
                        filteredOrders &&
                        (filteredOrders.length > 0 ? <div>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Products</th>
                                        <th>No. Of Items</th>
                                        <th>Total Amount</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        filteredOrders.map((order) => {
                                            return (
                                                <tr key={order._id}>
                                                    <td style={{ display: "block" }}>
                                                        {order?.products?.map((product) =>
                                                            <React.Fragment key={product._id}>
                                                                <img src={product.image} alt="product" style={{ height: "30px", width: "30px", marginRight: "10px", marginBottom: "5px" }} />
                                                                {product.name.length > 20 ? product.name.substring(0, 20) + "..." : product.name} <br />
                                                            </React.Fragment>
                                                        )}
                                                    </td>
                                                    <td>{order.no_of_items}</td>
                                                    <td>{order.amount}</td>
                                                    <td><span style={{ padding: "0.8vh 1vw", borderRadius: "20px" }}>{order.status === "Pending" ? "Yet to be Shipped" : order.status}</span></td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                            <Pagination
                                count={Math.ceil(orders.length / 10)}
                                variant="outlined"
                                shape="rounded"
                                onChange={(e, value) => handlePageChange(value)}
                                style={{ display: "flex", justifyContent: "center" }}
                            />
                        </div>
                            :
                            <div>No Products to be Shown</div>
                        )
                    )
                }
            </OrdersDiv>
        </div>
    )
}

export default Orders;
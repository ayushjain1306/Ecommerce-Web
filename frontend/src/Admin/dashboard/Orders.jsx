import { useState, useEffect } from "react";
import { CircularProgress, styled } from "@mui/material";
import { getOrders } from "../../apis/adminApis/ordersApi.js";
import Table from "./OrdersTable.jsx";

const HeadDiv = styled('div')(({ theme }) => ({
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
    backgroundColor: "white",
    padding: "3vh 2vw",
    fontSize: "25px",
    boxShadow: "8px 8px 8px -3px rgb(0,0,0,0.2)",
    borderRadius: "5px",
    [theme.breakpoints.down("sm")]: {
        padding: "2vh 5vw",
        width: "90%",
        margin: "auto",
        fontSize: "20px"
    }
}))

const OrdersDiv = styled('div')(({ theme }) => ({
    backgroundColor: "white",
    boxShadow: "8px 8px 8px -3px rgb(0,0,0,0.2)",
    marginTop: "3vh",
    paddingBottom: "3vh",
    borderRadius: "3px",
    [theme.breakpoints.down('sm')]: {
        overflowX: "auto",
        width: "90%",
        margin: "auto",
        marginTop: "2vh"
    }
}))

function Orders() {
    const [orders, setOrders] = useState(null);
    const [loaded, setLoaded] = useState(false);
    const [loading, setLoading] = useState(false);

    const headers = ["Sr. No.", "Items", "No. of Items", "Total Cost", "Change Status", "Actions"];
    const targets = ["items", "no_of_items", "amount", "status"];

    useEffect(() => {
        const fetchOrders = async () => {
            setLoading(true);
            const response = await getOrders();
            setLoading(false);

            if (response) {
                setOrders(response);
            }

            setLoaded(true);
        }

        fetchOrders();
    }, []);

    return (
        <div>
            <HeadDiv>
                <div>
                    All Orders
                </div>
            </HeadDiv>
            <OrdersDiv>
                {
                    loading && <CircularProgress style={{marginTop: "10px"}} />
                }
                {
                    loaded &&
                    (
                        orders ?
                            (orders.length > 0 ?
                                <Table headers={headers} targets={targets} data={orders} />
                                :
                                <div colSpan="6" style={{ width: "100%" }}>No Orders to be Shown.</div>

                            )
                            :
                            <div colSpan="6" style={{ width: "100%" }}>Failed to Load the Orders.</div>

                    )
                }
            </OrdersDiv>
        </div>
    )
}

export default Orders;
import { useState, useContext, useEffect } from "react";
import { Typography, Drawer, CircularProgress, styled } from "@mui/material";
import { getResult } from "../../../apis/adminApis/dashboardApi.js";
import Analytics from "./Analytics.jsx";
import { AdminContext } from "../../../context/adminContext.jsx";
import { Menu } from "@mui/icons-material";

const StyledDiv = styled('div')(({ theme }) => ({
    display: "grid",
    gridTemplateColumns: "25% 25% 25% 25%",
    paddingTop: "5vh",
    [theme.breakpoints.down('sm')]: {
        gridTemplateColumns: "50% 50%",
        padding: "2vh"
    }
}))

const Card = styled('div')(({ theme }) => ({
    borderRadius: "3px",
    boxShadow: "8px 8px 8px -3px rgb(0,0,0,0.2)",
    padding: "10px",
    textAlign: "left",
    width: "90%",
    margin: "auto",
    height: "20vh",
    [theme.breakpoints.down('sm')]: {
        marginTop: "2vh",
        height: "15vh"
    },
    [theme.breakpoints.between('sm', 'lg')]: {
        height: "13vh"
    }
}))

const StyledHeading = styled('h4')(({theme}) => ({
    textAlign: "left",
    [theme.breakpoints.down('sm')]: {
        width: "90%",
        margin: "auto"
    }
}))

function Dashboard() {
    const { admin } = useContext(AdminContext);
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchResult = async () => {
            setLoading(true);
            const response = await getResult();
            setLoading(false);

            if (response) {
                setResult(response);
            }
        }

        fetchResult();
    }, []);

    return (
        <div>
            {
                admin && <StyledHeading className="h3">Hi {admin.name},</StyledHeading>
            }
            {
                loading && <CircularProgress />
            }
            {
                result && <StyledDiv>
                    <Card className="bg-success text-white">
                        <h5 className="h5">Total Sales</h5>
                        <Typography>
                            Rs. {result?.amount}
                        </Typography>
                    </Card>
                    <Card className="bg-warning text-white">
                        <h5 className="h5">Pending Orders</h5>
                        <Typography>
                            {result?.orders}
                        </Typography>
                    </Card>
                    <Card className="bg-danger text-white">
                        <h5 className="h5">Total Products</h5>
                        <Typography>
                            {result?.products}
                        </Typography>
                    </Card>
                    <Card className="bg-primary text-white">
                        <h5 className="h5">Total Categories</h5>
                        <Typography>
                            {result?.categories}
                        </Typography>
                    </Card>
                </StyledDiv>
            }

            <Analytics />
        </div>
    )
}

export default Dashboard;
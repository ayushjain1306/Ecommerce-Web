import { useState, useEffect } from "react";
import { Typography, styled } from "@mui/material";
import { getTopSellingProducts } from "../../../apis/adminApis/dashboardApi.js";

const StyledDiv = styled('div')(({ theme }) => ({
    width: "42%",
    backgroundColor: "white",
    borderRadius: "3px",
    boxShadow: "8px 8px 8px -3px rgb(0,0,0,0.2)",
    padding: "2vh 2vw",
    [theme.breakpoints.down("sm")]: {
        width: "90%",
        margin: "auto",
        marginTop: "4vh",
        minHeight: "45vh"
    }
}))

const AnotherStyledDiv = styled('div')(({ theme }) => ({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderTop: "1px solid #e3e3e3",
    padding: "1.5vh 1vw"
}))

function ProductAnalytics() {
    const [productsData, setProductsData] = useState([]);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const fetchTopSellingProducts = async () => {
            const response = await getTopSellingProducts();

            if (response) {
                setProductsData(response);
            }

            setLoaded(true);
        }

        fetchTopSellingProducts();
    }, []);

    return (
        loaded && <StyledDiv>
            <h5 className="h5" style={{marginBottom: "3vh"}}>Top Selling Products</h5>
            {
                productsData.length > 0 ?
                    productsData.map((data, index) => {
                        return (
                            <AnotherStyledDiv key={index}>
                                <img src={data.image} alt="product" style={{height: "40px", width: "40px", borderRadius: "50%"}} />
                                <Typography>
                                    {data._id.length > 30 ? data._id.substring(0, 30) + "..." : data._id }
                                </Typography>
                                <Typography>
                                    {data.totalSales}
                                </Typography>
                            </AnotherStyledDiv>
                        )
                    })
                    :
                    <div>
                        No Products to be Shown.
                    </div>
            }
        </StyledDiv>
    )
}

export default ProductAnalytics;
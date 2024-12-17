import { styled } from "@mui/material";
import SalesAnalytics from "./SalesAnalytics.jsx";
import ProductAnalytics from "./ProductAnalytics.jsx";

const StyledDiv = styled('div')(({theme}) => ({
    paddingTop: "5vh",
    display: "flex",
    justifyContent: "space-between",
    [theme.breakpoints.down('sm')]: {
        display: 'block'
    }
}))

function Analytics() {
    return (
        <StyledDiv>
            <SalesAnalytics />
            <ProductAnalytics />
        </StyledDiv>
    )
}

export default Analytics;
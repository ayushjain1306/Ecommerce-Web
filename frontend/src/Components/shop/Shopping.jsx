import { useState, useEffect, useContext } from "react";
import { CircularProgress, Typography, styled } from "@mui/material";
import InfiniteScroll from "react-infinite-scroller";
import { getShoppingProducts } from "../../apis/productsApi.js";
import { Link } from "react-router-dom";
import { SearchContext } from "../../context/searchContext.jsx";

const StyledDiv = styled('div')(({ theme }) => ({
    minHeight: "100vh",
    width: "100%",
    paddingTop: "13vh",
    backgroundColor: "#ebebe9",
    paddingBottom: "5vh",
    [theme.breakpoints.down('sm')]: {
        paddingTop: "15vh"
    },
    [theme.breakpoints.between('sm', 'md')]: {
        paddingTop: "8vh"
    },
    [theme.breakpoints.between('md', 'lg')]: {
        paddingTop: "6vh"
    }
}))

const AnotherStyledDiv = styled('div')(({ theme }) => ({
    width: "80%",
    margin: "auto",
    marginBottom: "3vh",
    backgroundColor: "white",
    borderRadius: "3px",
    padding: "3vh 3%",
    boxShadow: "8px 8px 8px -3px rgb(0,0,0,0.2)",
    "&:hover": {
        boxShadow: "8px 8px 8px -3px rgb(0,0,0,0.4)"
    },
    [theme.breakpoints.down('lg')]: {
        width: "99%",
    }
}))

const StyledInfiniteScroll = styled(InfiniteScroll)(({theme}) => ({
    display: "grid", 
    gridTemplateColumns: "25% 25% 25% 25%", 
    width: "80%", 
    margin: "auto",
    [theme.breakpoints.down('sm')]: {
        gridTemplateColumns: "50% 50%",
        width: "90%"
    },
    [theme.breakpoints.between('sm', 'lg')]: {
        gridTemplateColumns: "33% 33% 33%",
        width: "95%"
    }
}))

const Image = styled('img')(({theme}) => ({
    height: "30vh",
    width: "90%",
    [theme.breakpoints.down('sm')]: {
        height: "20vh"
    },
    [theme.breakpoints.between('sm', 'md')]: {
        height: "23vh",
        width: "93%"
    },
    [theme.breakpoints.between('md', 'lg')]: {
        height: "20vh",
        width: "90%"
    }
}))

function Shopping() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [skip, setSkip] = useState(0);
    const { search } = useContext(SearchContext);

    const fetchProducts = async () => {
        const response = await getShoppingProducts(skip * 10, search);
        setSkip(skip + 1);
        setLoading(false);
        if (response) {
            setProducts([...products, ...response]);
            setHasMore(response.length === 10);
        }
        else {
            setHasMore(false);
        }
    }

    useEffect(() => {
        setSkip(0);
        setHasMore(true);
        setLoading(true);
        setProducts([]);
        fetchProducts();
    }, [search]);

    const handleScroll = () => {
        if (loading && !hasMore) return;

        setLoading(true);
        fetchProducts();
    }

    return (
        <StyledDiv>
            <div>
                <StyledInfiniteScroll
                    loadMore={() => handleScroll()}
                    hasMore={hasMore}
                    loader={<div key={0}><CircularProgress/></div>}
                >
                    {
                        products?.map((product) => {
                            return (
                                <AnotherStyledDiv key={product._id}>
                                    <Link to={`/shopping/${product._id}`} style={{color: "inherit", textDecoration: "inherit"}}>
                                        <Image src={product.image} alt="product" />
                                        <div style={{}}>
                                            <h4 className="h6" style={{ marginTop: "10px", textAlign: "center" }}>{product.name.length > 15 ? product.name.substring(0, 15) + "..." : product.name}</h4>
                                            <Typography style={{ color: "green", fontWeight: "bold" }}>Rs. {product.price} {product.price !== product.mrp && <strike style={{ color: "grey", marginLeft: "10px" }}>Rs. {product.mrp}</strike>}</Typography>
                                            {
                                                product.price !== product.mrp && (product.price / product.mrp) * 100 > 10 ?
                                                    <Typography style={{ marginTop: "10px", fontWeight: "bold" }}>{100 - Math.round((product.price / product.mrp) * 100)}% Off</Typography>
                                                    :
                                                    <Typography>{"   "}</Typography>
                                            }
                                        </div>
                                    </Link>
                                </AnotherStyledDiv>
                            )
                        })
                    }
                </StyledInfiniteScroll>
            </div>
        </StyledDiv>
    )
}

export default Shopping;
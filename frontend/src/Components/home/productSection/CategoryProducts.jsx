import React, { useState, useEffect } from "react";
import { Button, Typography, styled, CircularProgress } from "@mui/material";
import InfiniteScroller from "react-infinite-scroller";
import { getCategoryProducts } from "../../../apis/productsApi.js";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded.js";
import { Link, useNavigate } from "react-router-dom";

const StyledDiv = styled('div')(({ theme }) => ({
    boxShadow: "8px 8px 8px -3px rgb(0,0,0,0.2)",
    backgroundColor: "white",
    width: "97%",
    margin: "auto",
    marginTop: "3vh",
    padding: "3vh 2vw",
    borderRadius: "3px",
    [theme.breakpoints.down('lg')]: {
        width: "90%",
        padding: "3vh 4vw"
    }
}))



const Image = styled('img')(({theme}) => ({
    width: "80%",
    height: "30vh",
    [theme.breakpoints.down('sm')]: {
        height: "18vh",
        width: "90%"
    },
    [theme.breakpoints.between('sm', 'md')]: {
        height: "18vh",
        width: "85%"
    },
    [theme.breakpoints.between('md', 'lg')]: {
        height: "20vh",
        width: "85%"
    }
}))

const responsive = {
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 5
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 3
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 2
    }
}

function CategoryProducts() {
    const [categories, setCategories] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    const [skip, setSkip] = useState(0);
    const navigate = useNavigate();

    const fetchProducts = async () => {
        const response = await getCategoryProducts(skip * 5);
        setSkip(skip + 1);
        setLoading(false);

        if (response) {
            setCategories([...categories, ...response]);
            setHasMore(response.length === 5);
        }
        else {
            setHasMore(false);
        }
    }

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleScroll = () => {
        if (loading && !hasMore) return;

        setLoading(true);
        fetchProducts();
    }

    return (
        <div style={{ backgroundColor: "#ebebe9", width: "100%" }}>
            <InfiniteScroller
                loadMore={() => handleScroll()}
                hasMore={hasMore}
                loader={<div key={0} style={{paddingTop: "2vh"}}><CircularProgress /></div>}
            >
                {
                    categories.map((category) => {
                        return (
                            <React.Fragment key={category.category._id}>
                                {
                                    category.products.length > 0 && <StyledDiv>
                                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "15px" }}>
                                            <h4>
                                                {category.category.name}
                                            </h4>
                                            <Button variant="outlined" color="warning" onClick={() => navigate("/shopping")}>
                                                <span style={{ fontWeight: "bold", marginRight: "10px" }}>More</span> <ArrowForwardIosRoundedIcon style={{ height: "18px" }} />
                                            </Button>
                                        </div>
                                        <CarouselProducts products={category.products} />
                                    </StyledDiv>
                                }
                            </React.Fragment>
                        )
                    })
                }
            </InfiniteScroller>
        </div>
    )
}

function CarouselProducts({ products }) {

    return (
        <Carousel
            responsive={responsive}
            swipeable={true}
            itemClass="carousel-item-padding-40-px"
        >
            {
                products.map((product) => {
                    return (
                        <div key={product._id} style={{ border: "1px solid #e3e3e3", padding: "18px 0px", margin: "0px 10px", borderRadius: "3px" }}>
                            <Link to={`/shopping/${product._id}`} style={{ color: "inherit", textDecoration: "inherit" }}>
                                <Image src={product.image[0]} alt="product-Pic" />
                                <Typography style={{ width: "80%", margin: "auto", marginTop: "10px", fontSize: "17px" }}>{product.name.length > 15 ? product.name.substring(0, 15) + "..." : product.name}</Typography>
                                <Typography style={{ color: "green", fontWeight: "bold" }}>Rs. {product.price}</Typography>
                            </Link>
                        </div>
                    )
                })
            }
        </Carousel>
    )
}

export default CategoryProducts;
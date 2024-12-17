import { Typography, CircularProgress, Button, styled } from "@mui/material";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getProductDetails } from "../../apis/productsApi.js";
import { addProductReview, getProductReviews } from "../../apis/reviewsApi.js";
import InfiniteScroll from "react-infinite-scroller";
import { CloudUpload, CloudDone, Add, Remove, Person, Send } from "@mui/icons-material";
import Swal from "sweetalert2";
import { DialogBox } from "../home/Homepage.jsx";
import OrderButtons from "./Buttons.jsx";
import LatestProducts from "../home/productSection/LatestProducts.jsx";
import Carousel from "react-multi-carousel";

const responsive = {
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 1
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 1
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1
    }
}

const StyledDiv = styled('div')(({ theme }) => ({
    width: "97%",
    margin: "auto",
    boxShadow: "8px 8px 8px -3px rgb(0,0,0,0.2)",
    borderRadius: "3px",
    display: "flex",
    padding: "5vh 0vw 5vh 5vw",
    backgroundColor: "white",
    [theme.breakpoints.down('lg')]: {
        display: "block",
        width: "90%",
        padding: "5vh 0vw"
    }
}))

const FirstDiv = styled('div')(({ theme }) => ({
    width: "35%",
    border: "1px solid #e3e3e3",
    padding: "4vh 2vw",
    height: "80%",
    [theme.breakpoints.down('lg')]: {
        width: "80%",
        height: "50%",
        margin: "auto",
        padding: "2vh 2vw"
    }
}))

const StyledImage = styled('img')(({ theme }) => ({
    height: "65vh",
    width: "100%",
    [theme.breakpoints.down("sm")]: {
        height: "100%",
        width: "90%"
    },
    [theme.breakpoints.between('sm', 'md')]: {
        width: "70%",
        height: "40vh"
    },
    [theme.breakpoints.between('md', 'lg')]: {
        height: "30vh",
        width: "70%"
    },
}))

const SecondDiv = styled('div')(({ theme }) => ({
    width: "60%",
    padding: "0vh 5vw",
    textAlign: "left",
    [theme.breakpoints.down("lg")]: {
        width: "80%",
        margin: "auto",
        padding: "0px",
        marginTop: "5vh"
    }
}))

const AnotherStyledDiv = styled('div')(({ theme }) => ({
    padding: "1vh 1vw",
    border: "1px solid #e3e3e3",
    marginRight: "10px",
    cursor: "pointer",
    borderRadius: "3px"
}))

const StyledP = styled('p')(({ theme }) => ({
    padding: "5px 0px",
    marginBottom: "0px",
    width: "9%",
    textAlign: "center",
    border: "1px solid #e3e3e3",
    [theme.breakpoints.down("md")]: {
        width: "18%"
    }
}))

const DivStyle = styled('div')(({ theme }) => ({
    marginTop: "2vh",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    [theme.breakpoints.down("md")]: {
        display: "block"
    }
}))

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: "insert(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whitespace: 'nonwrap',
    width: 1
})

const MainStyleDiv = styled('div')(({ theme }) => ({
    backgroundColor: "#ebebe9",
    minHeight: "100vh",
    paddingTop: "12vh",
    paddingBottom: "3vh",
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

const ReviewImage = styled('img')(({ theme }) => ({
    height: "20vh",
    width: "10vw",
    [theme.breakpoints.down('sm')]: {
        width: "20vw",
        height: "15vh"
    },
    [theme.breakpoints.between('sm', 'lg')]: {
        width: "18vw",
        height: "18vh"
    }
}))

let colors = [];
let sizes = [];

function ProductDetails() {
    const [product, setProduct] = useState(null);
    const [selectedColor, setSelectedColor] = useState(null);
    const [selectedSize, setSelectedSize] = useState(null);
    const [review, setReview] = useState({ review: "", image: null });
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [skip, setSkip] = useState(0);
    const [error, setError] = useState("");
    const [colorError, setColorError] = useState("");
    const [sizeError, setSizeError] = useState("");
    const [open, setOpen] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const params = useParams();

    const fetchReviews = async (id) => {
        const response = await getProductReviews(id, skip * 5);
        setSkip(skip + 1);
        setLoading(false);
        if (response) {
            setReviews([...reviews, ...response]);
            setHasMore(response.length === 5);
        }
        else {
            setHasMore(false);
        }
    }

    useEffect(() => {
        const fetchProduct = async () => {
            const response = await getProductDetails(params.product_id);

            if (response) {
                setProduct(response);
                fetchReviews(response._id);
            }
        }

        fetchProduct();
    }, []);

    const handleChange = (color) => {
        if (color.status !== "Available") return;

        if (document.getElementById(color._id)) {
            document.getElementById(color._id).style.border = "1px solid #1100ab";
        }

        setSelectedColor(color);

        colors.forEach((id) => {
            if (id !== color._id && document.getElementById(id)) {
                document.getElementById(id).style.border = "1px solid #e3e3e3";
            }
        })
    }

    const handleChangeSize = (size) => {
        if (size.status !== "Available") return;

        if (document.getElementById(size._id)) {
            document.getElementById(size._id).style.border = "1px solid #1100ab";
        }

        setSelectedSize(size);

        sizes.forEach((id) => {
            if (id !== size._id && document.getElementById(id)) {
                document.getElementById(id).style.border = "1px solid #e3e3e3";
            }
        })
    }

    const handleScroll = () => {
        if (loading || !hasMore) return;

        setLoading(true);
        fetchReviews();
    }

    const handleChangeInput = (e) => {
        setReview({ ...review, review: e.target.value });
    }

    const addReview = async () => {
        if (!reviews) {
            setOpen(true);
            return;
        }

        if (review.review === "") {
            setError("This field cannot be empty.");
            return;
        }

        const response = await addProductReview({ ...review, product_id: product._id });

        setReview({ review: "", image: null });

        if (response) {
            Swal.fire({
                title: "Success",
                icon: "success",
                text: "Review Added Successfully.",
                confirmButtonText: "OK"
            })

            window.location.reload();
        }
        else {
            Swal.fire({
                title: "Error",
                icon: "error",
                text: "Something Went Wrong!",
                confirmButtonText: "OK"
            })
        }
    }

    return (
        product &&
        <MainStyleDiv>
            <div>
                <StyledDiv>
                    <FirstDiv style={{ borderRadius: "3px" }}>
                        <Carousel
                            responsive={responsive}
                            swipeable={true}
                            itemClass="carousel-item-padding-40-px"
                            autoPlay={true}
                            autoPlaySpeed={3000}
                        >
                            {
                                product.image.map((image, index) => {
                                    return (
                                        <StyledImage key={index} src={image} alt="product" />
                                    )
                                })
                            }
                        </Carousel>
                    </FirstDiv>
                    <SecondDiv>
                        <h4 className="h5" style={{ fontWeight: "normal" }}>{product?.name}</h4>
                        <Typography style={{ fontSize: "28px", marginTop: "3vh", color: "green", fontWeight: "bold", display: "flex", alignItems: "center" }}>
                            Rs. {product?.price}
                            <strike style={{ fontSize: "18px", marginLeft: "20px", color: "grey" }}>Rs. {product?.mrp}</strike>
                            {
                                Math.round((product?.price / product?.mrp) * 100) > 10
                                &&
                                <span style={{ marginLeft: "15px", fontSize: "18px" }}>{100 - Math.round((product?.price / product?.mrp) * 100)}% Off</span>
                            }
                        </Typography>

                        {
                            product.quantity > 10
                                ?
                                <span style={{ color: "green" }}>In Stock</span>
                                :
                                (
                                    product.quantity > 5
                                        ?
                                        <span style={{ color: "red" }}>Few Pieces Left</span>
                                        :
                                        <span style={{ color: "red" }}>{`Only ${product.quanity} ${product.quantity === 1 ? "piece" : "pieces"} left`}</span>
                                )
                        }

                        {
                            product.quantity > 1 &&
                            <div style={{ marginTop: "3vh", display: "flex", alignItems: "center" }}>
                                <Button variant="outlined" style={{ borderTopRightRadius: "0px", borderBottomRightRadius: "0px" }} disabled={product.quanity === quantity ? true : false} onClick={() => setQuantity(quantity + 1)}><Add /></Button>
                                <StyledP>{quantity}</StyledP>
                                <Button variant="outlined" style={{ borderTopLeftRadius: "0px", borderBottomLeftRadius: "0px" }} disabled={quantity === 1 ? true : false} onClick={() => setQuantity(quantity - 1)}><Remove /></Button>
                            </div>
                        }

                        <div style={{ marginTop: "4vh" }}>
                            <Typography style={{ fontWeight: "bold" }}>Colors </Typography>
                            <div style={{ display: "grid", marginTop: "2vh", gridTemplateColumns: "25% 25% 25% 25%" }}>
                                {
                                    product?.colors?.map((color) => {
                                        if (color.status === "Available") colors.push(color._id);

                                        return (
                                            <AnotherStyledDiv key={color._id} id={color._id} style={{ border: color.status !== "Available" && "1px solid red" }} onClick={() => handleChange(color)}>
                                                {color.name}<br />
                                                <span style={{ color: color.status === "Available" ? "green" : "red", fontSize: "12px" }}>{color.status === "Available" ? "In Stock" : "Currently Unavailable"}</span>
                                            </AnotherStyledDiv>
                                        )
                                    })
                                }
                            </div>
                        </div>
                        <span style={{ color: "red", fontSize: "12px" }}>{colorError}</span>

                        <div style={{ marginTop: "4vh" }}>
                            <Typography style={{ fontWeight: "bold" }}>Sizes </Typography>
                            <div style={{ display: "grid", marginTop: "2vh", gridTemplateColumns: "25% 25% 25% 25%" }}>
                                {
                                    product?.sizes?.map((size) => {
                                        if (size.status === "Available") sizes.push(size._id);

                                        return (
                                            <AnotherStyledDiv key={size._id} id={size._id} style={{ border: size.status !== "Available" && "1px solid red" }} onClick={() => handleChangeSize(size)}>
                                                {size.name}<br />
                                                <span style={{ color: size.status === "Available" ? "green" : "red", fontSize: "12px" }}>{size.status === "Available" ? "In Stock" : "Currently Unavailable"}</span>
                                            </AnotherStyledDiv>
                                        )
                                    })
                                }
                            </div>
                        </div>
                        <span style={{ color: "red", fontSize: "12px" }}>{sizeError}</span>

                        {product.quantity !== 0 && <OrderButtons reviews={reviews} color={selectedColor} size={selectedSize} setColorError={setColorError} setSizeError={setSizeError} pieces={quantity} product={product} />}

                        <div style={{ marginTop: "4vh" }}>
                            <Typography style={{ fontWeight: "bold" }}>Description </Typography>
                            <div style={{ display: "flex", marginTop: "2vh" }}>
                                {
                                    product?.description
                                }
                            </div>
                        </div>

                        <div style={{ marginTop: "4vh" }}>
                            <Typography style={{ fontWeight: "bold" }}>Product Reviews </Typography>
                            <DivStyle>
                                <input
                                    type="text"
                                    placeholder="Add your Product Review"
                                    className="form-control"
                                    value={review.review}
                                    onChange={(e) => handleChangeInput(e)}
                                    style={{ width: "50%" }}
                                />
                                <Button
                                    component="label"
                                    role={undefined}
                                    variant="contained"
                                    tabIndex={-1}
                                    startIcon={review.image ? <CloudDone /> : <CloudUpload />}
                                >
                                    {review.image ? "Image Uploaded" : "Upload Image"}
                                    <VisuallyHiddenInput type="file" accept="image/*" onChange={(e) => setReview({ ...review, image: e.target.files[0] })} />
                                </Button>
                                <Button variant="contained" endIcon={<Send />} onClick={() => addReview()}>Send</Button>
                            </DivStyle>
                            <span style={{ color: "red", fontSize: "12px" }}>{error}</span>
                            <hr />
                            {
                                <InfiniteScroll
                                    loadMore={() => handleScroll()}
                                    hasMore={hasMore}
                                    loader={<div key={0} style={{ paddingTop: "2vh" }}><CircularProgress /></div>}
                                >
                                    {
                                        reviews.length === 0 ?
                                            <div style={{ marginTop: "3vh" }}>No Reviews have been added for this product.</div>
                                            :
                                            reviews.map((r) => {
                                                return (
                                                    <div key={r?.review?._id} style={{ marginTop: "2vh" }}>
                                                        <div style={{ display: "flex", alignItems: "center" }}>
                                                            <div style={{
                                                                padding: "6px",
                                                                marginRight: "10px",
                                                                backgroundColor: "lightgrey",
                                                                color: "white",
                                                                borderRadius: "50%"
                                                            }}>
                                                                <Person />
                                                            </div>
                                                            <Typography style={{ fontSize: "20px" }}>{r?.user?.name}</Typography>
                                                        </div>
                                                        <div style={{ paddingLeft: "1vw", paddingTop: "2vh" }}>
                                                            {
                                                                r?.review?.image && <ReviewImage src={r?.review?.image} alt="review" />
                                                            }
                                                            <Typography style={{ paddingTop: "1vh" }}>
                                                                {r?.review?.review}
                                                            </Typography>
                                                        </div>
                                                        <hr />
                                                    </div>
                                                )
                                            })
                                    }
                                </InfiniteScroll>
                            }
                        </div>
                    </SecondDiv>
                </StyledDiv>
                <LatestProducts />
                {
                    open && <DialogBox open={open} setOpen={setOpen} />
                }
            </div>
        </MainStyleDiv>
    )
}

export default ProductDetails;
import { Button, styled, Backdrop, CircularProgress } from "@mui/material";
import { DialogBox } from "../home/Homepage.jsx";
import { useState, useContext, useEffect } from "react";
import Swal from "sweetalert2";
import { addToCart, checkProductInCart } from "../../apis/cartApi.js";
import { UserContext } from "../../context/userContext.jsx";
import { OrderContext } from "../../context/orderContext.jsx";
import { useNavigate } from "react-router-dom";

const StyledDiv = styled('div')(({theme}) => ({
    display: "flex",
    marginTop: "4vh"
}))

const StyledButton = styled(Button)(({theme}) => ({
    width: "30%",
    marginRight: "4%",
    [theme.breakpoints.down("md")]: {
        width: "45%"
    }
}))

function OrderButtons({ reviews, color, size, setColorError, setSizeError, pieces, product }) {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const { user } = useContext(UserContext);
    const { setOrder } = useContext(OrderContext);
    const [result, setResult] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const checkProductCart = async() => {
            const response = await checkProductInCart(product._id);

            setResult(response);
        }

        checkProductCart();
    }, [])

    const handleCart = async () => {
        if (!user){
            setOpen(true);
            return;
        }

        if (!color){
            setColorError("Please select atleast one color.");
            return;
        }

        if (!size){
            setColorError("");
            setSizeError("Please select atleast one size");
            return;
        }

        setLoading(true);

        setColorError("");
        setSizeError("");

        const cartBody = {
            product_id: product._id,
            color: color.name,
            size: size.name,
            quantity: pieces
        }

        const response = await addToCart(cartBody);

        setLoading(false);

        if (response){
            Swal.fire({
                title: "Success",
                icon: "success",
                text: "Product Added in Cart Successfully.",
                confirmButtonText: "OK"
            })
        }
        else {
            Swal.fire({
                title: "Error",
                icon: "error",
                textMessage: "Something Went Wrong!",
                confirmButtonText: "OK"
            })
        }
    }

    const handleOrder = () => {
        if (!reviews){
            setOpen(true);
            return;
        }

        if (!color){
            setColorError("Please select atleast one color.");
            return;
        }

        if (!size){
            setColorError("");
            setSizeError("Please select atleast one size");
            return;
        }

        setLoading(true);

        setColorError("");
        setSizeError("");

        const productBody = {
            items: [
                {
                    item: {
                        product_id: product._id,
                        color,
                        size,
                        quantity: pieces
                    },
                    product
                }
            ],
            totalCost: pieces*product.price,
            totalItems: pieces,
            cartStatus: false
        };

        setOrder(productBody);

        setLoading(false);

        navigate("/order");
    }

    return (
        <StyledDiv>
            <Backdrop
                sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
                open={loading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <StyledButton variant="contained" color="warning" disabled={result} onClick={() => handleCart()}>
                {result ? "Already In Cart": "Add To Cart"}
            </StyledButton>
            <StyledButton variant="contained" color="success" onClick={() => handleOrder()}>
                Buy Now
            </StyledButton>
            {
                open && <DialogBox open={open} setOpen={setOpen} />
            }
        </StyledDiv>
    )
}

export default OrderButtons;
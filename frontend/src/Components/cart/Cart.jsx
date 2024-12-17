import { Backdrop, CircularProgress, Button, styled } from "@mui/material";
import { useEffect, useState, useContext } from "react";
import { UserContext } from "../../context/userContext.jsx";
import { DialogBox } from "../home/Homepage.jsx";
import { useNavigate } from "react-router-dom";
import { getCartItems } from "../../apis/cartApi.js";
import ProductSection from "./ProductSection.jsx";
import { OrderContext } from "../../context/orderContext.jsx";
import LatestProducts from "../home/productSection/LatestProducts.jsx";
import cartImage from "../../assets/images/928bb331a32654ba76a4fc84386f3851.jpg"

const StyledDiv = styled('div')(({ theme }) => ({
    backgroundColor: "#ebebe9",
    minHeight: "100vh",
    paddingTop: "13vh",
    paddingBottom: "5vh",
    paddingLeft: "2vw",
    paddingRight: "2vw",
    [theme.breakpoints.down('sm')]: {
        paddingTop: "15vh"
    },
    [theme.breakpoints.between('md', 'lg')]: {
        paddingTop: "6vh"
    },
    [theme.breakpoints.between('sm', 'md')]: {
        paddingTop: "8vh"
    }
}))

const AnotherStyledDiv = styled('div')(({ theme }) => ({
    display: "flex",
    alignItems: "flex-start"
}))

const FirstDiv = styled('div')(({ theme }) => ({
    width: "97%",
    margin: "auto",
    backgroundColor: "white",
    boxShadow: "8px 8px 8px -3px rgb(0,0,0,0.2)",
    borderRadius: "3px",
    [theme.breakpoints.down('sm')]: {
        width: "90%"
    },
    [theme.breakpoints.between('sm', 'md')]: {
        width: "90%"
    },
    [theme.breakpoints.between('md', 'lg')]: {
        width: "90%"
    }
}))

const divStyle = {
    backgroundColor: "white",
    padding: "0vh 0vw 5vh 0vw",
    borderRadius: "3px",
    boxShadow: "8px 8px 8px -3px rgb(0,0,0,0.2)"
}

const Image = styled('img')(({theme}) => ({
    height: "40vh",
    width: "25vw",
    marginBottom: "2vh",
    [theme.breakpoints.down('sm')]: {
        height: "25vh",
        width: "45vw"
    },
    [theme.breakpoints.between('sm', 'md')]: {
        height: "25vh",
        width: "35vw"
    },
    [theme.breakpoints.between('md', 'lg')]: {
        height: "20vh",
        width: "30vw"
    }
}))

const NewButton = styled(Button)(({theme}) => ({
    width: "25%",
    fontSize: "16px",
    fontWeight: "bold",
    marginTop: "5vh",
    [theme.breakpoints.down('sm')]: {
        width: "80%"
    }
}))

function Cart() {
    const [cartItems, setCartItems] = useState([]);
    const [open, setOpen] = useState(false);
    const [load, setLoad] = useState(false);
    const { user, loadCart } = useContext(UserContext);
    const [loading, setLoading] = useState(false);
    const { setOrder } = useContext(OrderContext);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCartItems = async () => {
            const response = await getCartItems();

            if (response) {
                setCartItems(response);
                setLoad(true);
            }
        }

        fetchCartItems();
    }, [user]);

    const handleClick = () => {
        let totalCost = 0;
        let totalItems = 0;

        cartItems.forEach((item) => {
            totalCost += item.item.quantity*item.product.price;
            totalItems += item.item.quantity;
        })

        const orderItem = {
            items: cartItems, totalCost, totalItems, cartStatus: true
        }

        setOrder(orderItem);

        navigate("/order");
    }

    return (
        <div>
            <Backdrop
                sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })} 
                open={loading}
                style={{color: "white"}}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <StyledDiv>
                <div>
                    {
                        loadCart && (user ?
                            (load && (cartItems.length > 0 ?
                                <AnotherStyledDiv>
                                    <FirstDiv>
                                        <table className="table">
                                            <tbody>
                                                {
                                                    cartItems.map((item) => {
                                                        // totalPrice += item.item.quantity*item.product.price;
                                                        return (
                                                            <tr key={item.item._id}>
                                                                <td>
                                                                    <ProductSection item={item} cartItems={cartItems} setCartItems={setCartItems} setLoading={setLoading} />
                                                                </td>
                                                            </tr>
                                                        )
                                                    })
                                                }
                                            </tbody>
                                        </table>

                                        <div style={{textAlign: "right", marginRight: "2vw", marginBottom: "2vh"}}>
                                            <Button variant="contained" color="warning" style={{fontWeight: "bold", width: "20%"}} onClick={() => handleClick()}>Order Now</Button>
                                        </div>

                                    </FirstDiv>
                                    
                                </AnotherStyledDiv>
                                :
                                <div style={divStyle}>
                                    <Image src={cartImage} alt="cart" />
                                    <h3 className="h4">No Items are Added in Cart.</h3>
                                    <NewButton variant="contained" color="warning" onClick={() => navigate("/shopping")}>Explore Latest Products</NewButton>
                                </div>
                            ))
                            :
                            <div style={divStyle}>
                                <Image src={cartImage} alt="cart" />
                                <h3 className="h4">Please <span style={{ fontWeight: "bold" }}>Login</span> or <span style={{ fontWeight: "bold" }}>Signup</span> for using Cart.</h3>
                                <Button variant="contained" color="warning" style={{ fontSize: "16px", width: "18%", fontWeight: "bold", marginTop: "5vh" }} onClick={() => setOpen(true)}>Login</Button>
                            </div>)
                    }
                </div>
                <LatestProducts />
            </StyledDiv>

            {
                open && <DialogBox open={open} setOpen={setOpen} />
            }
        </div>
    )
}

export default Cart;
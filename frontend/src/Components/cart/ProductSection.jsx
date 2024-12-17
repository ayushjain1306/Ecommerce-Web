import { Button, Typography, styled } from "@mui/material";
import AddIcon from "@mui/icons-material/Add.js";
import RemoveIcon from "@mui/icons-material/Remove.js";
import { deleteItemInCart } from "../../apis/cartApi.js";
import Swal from "sweetalert2";

const quantityStyle = {
    padding: "5px 0px",
    marginBottom: "0px",
    width: "19%",
    textAlign: "center",
    border: "1px solid #e3e3e3"
}

const Image = styled('img')(({theme}) => ({
    height: "30vh",
    width: "15vw",
    [theme.breakpoints.down('sm')]: {
        height: "15vh",
        width: "20vw"
    },
    [theme.breakpoints.between('sm', 'md')]: {
        height: "18vh",
        width: "17vw"
    },
    [theme.breakpoints.between('md', 'lg')]: {
        height: "15vh",
        width: "17vw"
    }
}))

function ProductSection({ item, cartItems, setCartItems, setLoading }) {

    const handleClick = async () => {
        setLoading(true);
        const response = await deleteItemInCart(item?.item?._id);
        setLoading(false);

        if (response) {
            Swal.fire({
                title: "Success",
                icon: "success",
                text: "Product Removed From Cart.",
                confirmButtonText: "OK"
            })

            setCartItems(cartItems.filter((items) => items.item._id !== item.item._id));
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

    const handleIncrement = () => {
        const newItem = {...item, item: {...item.item, quantity: item.item.quantity+1}}

        setCartItems([...cartItems.filter((i) => JSON.stringify(i) !== JSON.stringify(item)), newItem]);
    }

    const handleDecrement = () => {
        const newItem = {...item, item: {...item.item, quantity: item.item.quantity-1}}

        setCartItems([...cartItems.filter((i) => JSON.stringify(i) !== JSON.stringify(item)), newItem]);
    }

    return (
        <div style={{ display: "flex", justifyContent: "space-between", padding: "2vh 2vw" }} key={item?.item?._id}>
            <div style={{display: "flex"}}>
                <Image src={item?.product?.image[0]} alt="cart-item" />
                <div style={{ marginLeft: "1.5vw" }}>
                    <h6 style={{ textAlign: "left" }}>{item?.product?.name.length > 50 ? item?.product?.name.substring(0, 50) + "..." : item?.product?.name}</h6>
                    <Typography style={{ textAlign: "left", fontWeight: "bold", fontSize: "18px", color: "green" }}>Rs. {item?.product?.price}</Typography>
                    <Typography style={{ textAlign: "left", fontWeight: "bold", color: "green" }}><strike style={{ color: "grey", marginRight: "10px" }}>Rs. {item?.product?.mrp}</strike><span>{100 - Math.round((item?.product?.price / item?.product?.mrp) * 100)}% Off</span></Typography>
                    <div style={{ marginTop: "3vh", display: "flex", alignItems: "center" }}>
                        <Button variant="outlined" style={{ borderTopRightRadius: "0px", borderBottomRightRadius: "0px" }} disabled={item?.item?.quantity === item?.product?.quantity} onClick={() => handleIncrement()}><AddIcon /></Button>
                        <p style={quantityStyle}>{item?.item?.quantity}</p>
                        <Button variant="outlined" style={{ borderTopLeftRadius: "0px", borderBottomLeftRadius: "0px" }} disabled={item?.item?.quantity === 1} onClick={() => handleDecrement()}><RemoveIcon /></Button>
                    </div>
                    <div>
                        <Typography style={{textAlign: "left", fontWeight: "bold", marginTop: "8px"}}>Color: <span style={{fontWeight: "normal"}}>{item?.item?.color}</span></Typography>
                        <Typography style={{textAlign: "left", fontWeight: "bold", marginTop: "8px"}}>Size: <span style={{fontWeight: "normal"}}>{item?.item?.size}</span></Typography>
                    </div>
                </div>
            </div>

            <div style={{ textAlign: "right" }}>
                <Button variant="outlined" color="warning" onClick={() => handleClick()}>Remove</Button>
            </div>
        </div>
    )
}

export default ProductSection;
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogActions, DialogTitle, Typography, Button, styled } from "@mui/material";
import { Close } from "@mui/icons-material";
import { getProductName } from "../../../apis/adminApis/productsApi.js";
import { Person } from "@mui/icons-material";

function ViewDialog({ open, setOpen, review }) {
    const [product, setProduct] = useState("");

    useEffect(() => {
        const fetchProduct = async () => {
            const response = await getProductName(review.product_id);

            if (response.length > 0) {
                setProduct(response);
            }
        }

        fetchProduct();
    }, []);

    return (
        <Dialog open={open} onClose={() => setOpen(false)}>
            <DialogTitle style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                {
                    product.length > 0 && product
                }
                <Button style={{ color: "black" }} onClick={() => setOpen(false)}><Close /></Button>
            </DialogTitle>
            <DialogContent>
                <div style={{display: "flex", alignItems: "center", marginBottom: "10px"}}>
                    <div style={{ backgroundColor: "lightgrey", borderRadius: "50%", color: "white", padding: "5px" }}>
                        <Person fontSize="large" />
                    </div>
                    <Typography className="text-primary" style={{ marginLeft: "15px", fontSize: "20px" }}>
                        {review.user_name}
                    </Typography>
                </div>

                <Typography style={{ fontSize: "17px" }}>{review.review}</Typography>

                {
                    review.image && <img src={review.image} alt="review" style={{ height: "100px", width: "100px", marginTop: "20px" }} />
                }
            </DialogContent>
            <DialogActions style={{padding: "2vh 2vw"}}>
                <Button variant="contained" color="warning" onClick={() => setOpen(false)}>
                    OK
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default ViewDialog;
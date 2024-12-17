import { Dialog, DialogTitle, DialogActions, DialogContent, DialogContentText, Button, styled } from "@mui/material";


function ViewDialog({ open, setOpen, loading, setLoading, product }) {
    let count = 1;
    let sizeCount = 1;

    return (
        <Dialog open={open} onClose={() => setOpen(false)}>
            <DialogTitle style={{ width: "30vw" }}>
                {product?.name}
            </DialogTitle>
            <DialogContent style={{ width: "30vw" }}>
                <DialogContentText>
                    <div style={{textAlign: "center"}}>
                        <img src={product?.image} alt="product" style={{ height: "25vh", width: "40%", margin: "auto" }} /><br />
                    </div>
                    <label style={{margin: "2vh 0vh", color: "black", fontWeight: "bold"}}>Description: </label><br />
                    <span style={{ width: "100%", fontSize: "16px", textAlign: "left" }}>{product?.description}</span><br />

                    <label style={{margin: "2vh 0vh", color: "black", fontWeight: "bold", marginRight: "10px"}}>MRP: </label>Rs. {product?.mrp} <br />
                    <label style={{marginBottom: "2vh", color: "black", fontWeight: "bold", marginRight: "10px"}}>Your Selling Price: </label>Rs. {product?.price} <br />

                    <label style={{marginBottom: "2vh", color: "black", fontWeight: "bold", marginRight: "10px"}}>Category: </label>{product?.category} <br />

                    <label style={{margin: "2vh 0vh", color: "black", fontWeight: "bold"}}>Colors: </label><br />

                    <table className="table">
                        <thead>
                            <tr>
                                <th>Sr. No.</th>
                                <th>Color</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                product?.colors?.map((color) => {
                                    return (
                                        <tr key={count}>
                                            <td>{count++}</td>
                                            <td>{color.name}</td>
                                            <td style={{color: color.status === "Available" ? "green" : "red", fontWeight: "bold" }}>{color.status}</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>

                    <label style={{margin: "2vh 0vh", color: "black", fontWeight: "bold"}}>Sizes: </label><br />

                    <table className="table">
                        <thead>
                            <tr>
                                <th>Sr. No.</th>
                                <th>Size</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                product?.sizes?.map((size) => {
                                    return (
                                        <tr key={sizeCount}>
                                            <td>{sizeCount++}</td>
                                            <td>{size.name}</td>
                                            <td style={{color: size.status === "Available" ? "green" : "red", fontWeight: "bold" }}>{size.status}</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button variant="contained" style={{ fontWeight: "bold" }} onClick={() => setOpen(false)}>Close</Button>
            </DialogActions>
        </Dialog>
    )
}

export default ViewDialog;
import { useState, useEffect } from "react";
import { CircularProgress, styled, Button, Pagination } from "@mui/material";
import { getProducts } from "../../apis/adminApis/productsApi.js";
import DialogBox from "./ProductsDialog.jsx";
import EditDialog from "./ProductsDialog/EditDialog.jsx";
import DeleteDialog from "./ProductsDialog/DeleteDialog.jsx";
import { Delete, Edit } from "@mui/icons-material";

const HeadDiv = styled('div')(({ theme }) => ({
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
    backgroundColor: "white",
    padding: "3vh 2vw",
    fontSize: "25px",
    boxShadow: "8px 8px 8px -3px rgb(0,0,0,0.2)",
    borderRadius: "5px",
    [theme.breakpoints.down("sm")]: {
        padding: "2vh 5vw",
        width: "90%",
        margin: "auto",
        fontSize: "20px",
        overflowX: "auto"
    }
}))

const ProductsDiv = styled('div')(({ theme }) => ({
    backgroundColor: "white",
    boxShadow: "8px 8px 8px -3px rgb(0,0,0,0.2)",
    marginTop: "3vh",
    paddingBottom: "2vh",
    [theme.breakpoints.down('sm')]: {
        overflowX: "auto",
        width: "90%",
        margin: "auto",
        marginTop: "2vh"
    }
}))

function Products() {
    const [products, setProducts] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [open, setOpen] = useState(false);
    const [load, setLoad] = useState(false);
    const [loading, setLoading] = useState(false);
    const [edit, setEdit] = useState(false);
    const [deleteDialog, setDeleteDialog] = useState(false);
    const [product, setProduct] = useState(null);
    const [page, setPage] = useState(1);
    const [filteredProducts, setFilteredProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            const response = await getProducts();
            setLoading(false);

            if (response) {
                setProducts(response);
                setFilteredProducts(response.slice((page-1)*10, page*10));
            }

            setLoaded(true)
        }

        fetchProducts();
    }, [load]);

    const handlePageChange = (value) => {
        setPage(value);
        setFilteredProducts(products.slice((value-1)*10, value*10));
    }

    return (
        <div>
            <HeadDiv>
                <div>
                    All Products
                </div>
                <Button variant="contained" color="warning" style={{ fontWeight: "600" }} onClick={() => setOpen(true)}>
                    Add New Product
                </Button>
            </HeadDiv>
            <ProductsDiv>
                {
                    loading && <CircularProgress style={{marginTop: "10px"}} />
                }
                <table className="table">
                    {loaded && <thead>
                        <tr>
                            <th>Sr. No.</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Qantity</th>
                            <th>Actions</th>
                        </tr>
                    </thead>}
                    <tbody>
                        {
                            loaded &&
                            (
                                filteredProducts &&
                                    (filteredProducts.length > 0 ?
                                        filteredProducts.map((selectedProduct, index) => {
                                            return (
                                                <tr key={selectedProduct._id}>
                                                    <td>{(page-1)*10 + index + 1}</td>
                                                    <td>{selectedProduct.name.length > 25 ? selectedProduct.name.substring(0, 25) + "..." : selectedProduct.name}</td>
                                                    <td>Rs. {selectedProduct.price}</td>
                                                    <td>{selectedProduct.quantity}</td>
                                                    <td>
                                                        <Button variant="outlined" style={{ marginRight: "5px", color: "black" }} onClick={() => { setProduct(selectedProduct); setEdit(true) }}><Edit /></Button>
                                                        <Button variant="outlined" style={{ color: "black" }} onClick={() => { setProduct(selectedProduct); setDeleteDialog(true) }}><Delete /></Button>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                        :
                                        <tr>
                                            <td colSpan="5" style={{ width: "100%" }}>No Products to be Shown.</td>
                                        </tr>
                                    )
                            )
                        }
                    </tbody>
                </table>
                <Pagination
                    count={Math.ceil(products.length / 10)}
                    variant="outlined"
                    shape="rounded"
                    onChange={(e, value) => handlePageChange(value)}
                    style={{ display: "flex", justifyContent: "center" }}
                />
                {
                    open && <DialogBox open={open} setOpen={setOpen} loading={load} setLoading={setLoad} />
                }
                {
                    edit && <EditDialog open={edit} setOpen={setEdit} loading={load} setLoading={setLoad} product={product} />
                }
                {
                    deleteDialog && <DeleteDialog open={deleteDialog} setOpen={setDeleteDialog} loading={load} setLoading={setLoad} product={product} />
                }
            </ProductsDiv>
        </div>
    )
}

export default Products;
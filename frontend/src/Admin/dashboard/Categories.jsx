import { useState, useEffect } from "react";
import { CircularProgress, Pagination, Button, styled, Dialog, DialogActions, DialogTitle, DialogContentText, DialogContent } from "@mui/material";
import { addCategory, getCategories } from "../../apis/adminApis/categoryApis.js";
import Swal from "sweetalert2";
import { Edit, Delete, Close } from "@mui/icons-material";
import EditDialog from "./CategoryDialogs/EditDialog.jsx";
import DeleteDialog from "./CategoryDialogs/DeleteDialog.jsx";

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
        fontSize: "20px"
    }
}))

const CategoriesDiv = styled('div')(({ theme }) => ({
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

const StyledDialogTitle = styled(DialogTitle)(({ theme }) => ({
    width: "30vw",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between"
}))

function Categories() {
    const [categories, setCategories] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [open, setOpen] = useState(false);
    const [loadAgain, setLoadAgain] = useState(0);
    const [edit, setEdit] = useState(false);
    const [deleteDialog, setDeleteDialog] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [page, setPage] = useState(1);
    const [filteredCategories, setFilteredCategories] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchCategories = async () => {
            setLoading(true);
            const response = await getCategories();
            setLoading(false);

            if (response) {
                setCategories(response);
                setFilteredCategories(response.slice((page - 1) * 10, page * 10));
            }

            setLoaded(true)
        }

        fetchCategories();
    }, [loadAgain]);

    const handlePageChange = (value) => {
        setPage(value);
        setFilteredCategories(categories.slice((value - 1) * 10, value * 10))
    }

    return (
        <div>
            <HeadDiv>
                <div>
                    All Categories
                </div>
                <Button variant="contained" color="warning" style={{ fontWeight: "600" }} onClick={() => setOpen(true)}>
                    Add New Category
                </Button>
            </HeadDiv>
            <CategoriesDiv>
                {
                    loading && <CircularProgress style={{marginTop: "10px"}} />
                }
                <table className="table">
                    {loaded && <thead>
                        <tr>
                            <th>Sr. No.</th>
                            <th>Name</th>
                            <th>No. of Products</th>
                            <th>Actions</th>
                        </tr>
                    </thead>} 
                    
                    <tbody>
                        {
                            loaded &&
                            (
                                filteredCategories &&
                                (filteredCategories.length > 0 ?
                                    filteredCategories.map((category, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{(page - 1) * 10 + index + 1}</td>
                                                <td>{category.name}</td>
                                                <td>{category.no_of_products}</td>
                                                <td>
                                                    <Button variant="outlined" style={{ marginRight: "5px", color: "black" }} onClick={() => { setEdit(true); setSelectedCategory(category) }}><Edit /></Button>
                                                    <Button variant="outlined" style={{ color: "black" }} onClick={() => { setDeleteDialog(true); setSelectedCategory(category) }}><Delete /></Button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                    :
                                    <tr>
                                        <td colSpan="5" style={{ width: "100%" }}>No Categories to be Shown.</td>
                                    </tr>
                                )
                            )
                        }
                    </tbody>
                </table>
                <Pagination
                    count={Math.ceil(categories.length / 10)}
                    variant="outlined"
                    shape="rounded"
                    onChange={(e, value) => handlePageChange(value)}
                    style={{ display: "flex", justifyContent: "center" }}
                />
                {
                    open && <DialogBox open={open} setOpen={setOpen} loadAgain={loadAgain} setLoadAgain={setLoadAgain} />
                }
                {
                    edit && <EditDialog open={edit} setOpen={setEdit} loadAgain={loadAgain} setLoadAgain={setLoadAgain} category={selectedCategory} />
                }
                {
                    deleteDialog && <DeleteDialog open={deleteDialog} setOpen={setDeleteDialog} loading={loadAgain} setLoading={setLoadAgain} category={selectedCategory} />
                }
            </CategoriesDiv>
        </div>
    )
}

function DialogBox({ open, setOpen, loadAgain, setLoadAgain }) {
    const [category, setCategory] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        if (e.target.value === "") {
            setError("This field cannot be empty.");
        }
        else {
            setError("")
        }
        setCategory(e.target.value);
    }

    const handleClick = async () => {
        if (category === "") {
            setError("This field cannot be empty.");
            return;
        }

        setError("");

        setLoading(true);

        const response = await addCategory(category);
        setLoading(false);

        if (response) {
            setOpen(false);
            setLoadAgain(loadAgain + 1);

            Swal.fire({
                title: "Success",
                icon: "success",
                text: "Category Added Successfully.",
                confirmButtonText: "OK"
            })
        }
        else {
            setOpen(false);

            Swal.fire({
                title: "Error",
                icon: "error",
                text: "Something went wrong!",
                confirmButtonText: "OK"
            })
        }
    }

    return (
        <Dialog open={open} onClose={() => setOpen(false)}>
            <StyledDialogTitle>
                Add New Category
                <Button style={{ color: "black" }} onClick={() => setOpen(false)}><Close /></Button>
            </StyledDialogTitle>
            {
                loading && <div style={{textAlign: "center"}}><CircularProgress /></div>
            }
            <DialogContent>
                <DialogContentText>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter the Category"
                        value={category}
                        onChange={(e) => handleChange(e)}
                        style={{ marginTop: "2vh" }}
                    />
                    <span style={{ color: "red", fontSize: "12px" }}>{error}</span>
                </DialogContentText>
            </DialogContent>
            <DialogActions style={{ padding: "2vh 1.5vw" }}>
                <Button variant="contained" onClick={() => handleClick()}>Save</Button>
            </DialogActions>
        </Dialog>
    )
}

export default Categories;
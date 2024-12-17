import { useState, useEffect } from "react";
import { CircularProgress, Pagination, Button, styled } from "@mui/material";
import { getAllReviews } from "../../apis/adminApis/reviewsApi.js";
import { Delete, Visibility } from "@mui/icons-material";
import ViewDialog from "./Reviews/ViewDialog.jsx";
import DeleteDialog from "./Reviews/DeleteDialog.jsx";

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

const ReviewsDiv = styled('div')(({ theme }) => ({
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

function Reviews() {
    const [reviews, setReviews] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [page, setPage] = useState(1);
    const [filteredReviews, setFilteredReviews] = useState([]);
    const [open, setOpen] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [selectedReview, setSelectedReview] = useState(null);
    const [loadAgain, setLoadAgain] = useState(1);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchReviews = async () => {
            setLoading(true);
            const response = await getAllReviews();
            setLoading(false);

            if (response) {
                setReviews(response);
                setFilteredReviews(response.slice((page - 1) * 10, page * 10));
            }

            setLoaded(true)
        }

        fetchReviews();
    }, [loadAgain]);

    const handlePageChange = (value) => {
        setPage(value);
        setFilteredReviews(reviews.slice((value - 1) * 10, value * 10));
    }

    return (
        <div>
            <HeadDiv>
                <div>
                    All Product Reviews
                </div>
            </HeadDiv>
            <ReviewsDiv>
                {
                    loading && <CircularProgress style={{ marginTop: "10px" }} />
                }
                <table className="table">
                    {loaded && <thead>
                        <tr>
                            <th>Sr. No.</th>
                            <th>Costumer Name</th>
                            <th>Image</th>
                            <th>Review</th>
                            <th>Actions</th>
                        </tr>
                    </thead>}
                    <tbody>
                        {
                            loaded &&
                            (
                                filteredReviews &&
                                (filteredReviews.length > 0 ?
                                    filteredReviews.map((review, index) => {
                                        return (
                                            <tr>
                                                <td>{(page - 1) * 10 + index + 1}</td>
                                                <td>{review.user_name}</td>
                                                <td>{review.image ? <img src={review.image} style={{ height: "31px", width: "31px" }} alt="review" /> : "No Image"}</td>
                                                <td>{review.review.length > 25 ? review.review.substring(0, 25) + "..." : review.review}</td>
                                                <td>
                                                    <Button variant="outlined" style={{ marginRight: "5px", color: "black" }} onClick={() => { setSelectedReview(review); setOpen(true) }}><Visibility /></Button>
                                                    <Button variant="outlined" style={{ marginRight: "5px", color: "black" }} onClick={() => { setSelectedReview(review); setOpenDelete(true) }}><Delete /></Button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                    :
                                    <tr>
                                        <td colSpan="6" style={{ width: "100%" }}>No Reviews to be Shown.</td>
                                    </tr>
                                )
                            )
                        }
                    </tbody>
                </table>
                <Pagination
                    count={Math.ceil(reviews.length / 10)}
                    variant="outlined"
                    shape="rounded"
                    onChange={(e, value) => handlePageChange(value)}
                    style={{ display: "flex", justifyContent: "center" }}
                />
            </ReviewsDiv>
            {
                open && <ViewDialog open={open} setOpen={setOpen} review={selectedReview} />
            }
            {
                openDelete && <DeleteDialog open={openDelete} setOpen={setOpenDelete} review={selectedReview} loadAgain={loadAgain} setLoadAgain={setLoadAgain} />
            }
        </div>
    )
}

export default Reviews;
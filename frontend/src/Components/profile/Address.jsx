import { DialogContentText, CircularProgress, Backdrop, Typography, Button, styled } from "@mui/material";
import { useState, useEffect } from "react";
import { defaultEdit, getAddresses } from "../../apis/addressApi.js";
import InfiniteScroll from "react-infinite-scroller";
import DialogBox from "./AddressDialog.jsx";
import EditDialogBox from "./AddressDialog/EditDialog.jsx";
import DeleteDialogBox from "./AddressDialog/DeleteDialog.jsx";
import DeleteIcon from "@mui/icons-material/Delete.js";
import EditIcon from "@mui/icons-material/Edit.js";
import Swal from "sweetalert2";

const HeadDiv = styled('div')(({ theme }) => ({
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
    backgroundColor: "white",
    padding: "3vh 2vw",
    fontSize: "25px",
    boxShadow: "8px 8px 8px -3px rgb(0,0,0,0.2)",
    borderRadius: "3px"
}))

const AddressDiv = styled('div')(({ theme }) => ({
    width: "100%",
    padding: "3vh 2vw",
    borderRadius: "3px",
    marginTop: "3vh",
    [theme.breakpoints.down('sm')]: {
        marginTop: "0px"
    }
}))

const Card = styled('div')(({theme}) => ({
    backgroundColor: "white",
    boxShadow: "8px 8px 8px -3px rgb(0,0,0,0.2)",
    borderRadius: "3px",
    width: "90%",
    margin: "auto",
    marginBottom: "2vh",
    padding: "1vh 1vw",
    minHeight: "27vh",
    [theme.breakpoints.between('md', 'lg')]: {
        minHeight: "18vh"
    }
}))

const StyledInfiniteScroll = styled(InfiniteScroll)(({theme}) => ({
    display: "grid",
    gridTemplateColumns: "30% 30% 30%",
    [theme.breakpoints.down('sm')]: {
        gridTemplateColumns: "50% 50%"
    },
    [theme.breakpoints.between('sm', 'lg')]: {
        gridTemplateColumns: "33% 33% 33%"
    }
}))

function Address() {
    const [addresses, setAddresses] = useState([]);
    const [load, setLoad] = useState(false);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [skip, setSkip] = useState(0);
    const [open, setOpen] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [loadAgain, setLoadAgain] = useState(0);
    const [address, setAddress] = useState(null);
    const [loadingDefault, setLoadingDefault] = useState(false);

    let defaultAddress = null;

    const fetchAddresses = async (skip) => {
        const response = await getAddresses(skip * 10);
        setLoad(true);
        setSkip(skip + 1);
        setLoading(false);

        if (response) {
            if (skip === 0){
                setAddresses(response);
            }
            else {
                setAddresses([...addresses, ...response]);
            }
            setHasMore(response.length === 10)
        }
        else {
            setHasMore(false);
        }
    }

    const handleScroll = () => {
        if (loading && !hasMore) return;

        setLoading(true);
        fetchAddresses(skip);
    }

    useEffect(() => {
        setAddresses([]);
        setLoading(true);
        setHasMore(true);
        setLoad(false);
        fetchAddresses(0);
    }, [loadAgain]);

    const handleClickDefault = async (id) => {
        setLoadingDefault(true);
        const response = await defaultEdit(id, defaultAddress._id);
        setLoadingDefault(false);

        if (response){
            setLoadAgain(loadAgain+1);
            Swal.fire({
                title: "Success",
                icon: "success",
                text: "Address Added Successfully.",
                confirmButtonText: "OK"
            })
        }
        else {
            Swal.fire({
                title: "Error",
                icon: "error",
                text: "Something Went Wrong",
                confirmButtonText: "OK"
            })
        }
    }

    return (
        <div>
            <Backdrop
                sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })} 
                open={loadingDefault}
                style={{color: "white"}}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <HeadDiv>
                <div>
                    All Addresses
                </div>
                <Button variant="contained" onClick={() => setOpen(true)}>Add Address</Button>
            </HeadDiv>
            <AddressDiv>
                {
                    load && (
                        <StyledInfiniteScroll
                            loadMore={() => handleScroll()}
                            hasMore={hasMore}
                            loader={<div key={0}><CircularProgress /></div>}
                        >
                            {
                                addresses.length > 0 ?
                                addresses.map((address) => {
                                    if (address.default) {
                                        defaultAddress = address
                                    }
                                    return (
                                        <Card key={address._id}>
                                            <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                                                <Typography style={{fontSize: "18px"}}>{address.name}</Typography>
                                                {address.default ? <span style={{color: "green", fontWeight: "bold"}}>DEFAULT</span>: <Button onClick={() => handleClickDefault(address._id)}>Set Default</Button>}
                                            </div>
                                            <DialogContentText style={{textAlign: "left", marginTop: "1vh", fontSize: "14px"}}>
                                                <span>
                                                    {address.address}, {address.city}, {address.state} - {address.pincode}
                                                </span><br />
                                                <span style={{fontSize: "15px", marginTop: "2vh"}}>Phone Number: {address.phone}</span> <br />
                                            </DialogContentText>
                                            <div style={{marginTop: "2vh", textAlign: "right"}}>
                                                <Button variant="outlined" style={{marginRight: "10px"}} onClick={() => {setAddress(address); setOpenEdit(true)}}><EditIcon /></Button>
                                                <Button variant="outlined" onClick={() => {setAddress(address); setOpenDelete(true)}}><DeleteIcon /></Button>
                                            </div>
                                        </Card>
                                    )
                                })
                                :
                                <div>
                                    No Addresses to be Shown.
                                </div>
                            }
                        </StyledInfiniteScroll>
                    )
                }
            </AddressDiv>
            {
                open && <DialogBox open={open} setOpen={setOpen} loadAgain={loadAgain} setLoadAgain={setLoadAgain} />
            }
            {
                openEdit && <EditDialogBox open={openEdit} setOpen={setOpenEdit} loadAgain={loadAgain} setLoadAgain={setLoadAgain} address={address} />
            }
            {
                openDelete && <DeleteDialogBox open={openDelete} setOpen={setOpenDelete} loadAgain={loadAgain} setLoadAgain={setLoadAgain} address={address} />
            }
        </div>
    )
}

export default Address;
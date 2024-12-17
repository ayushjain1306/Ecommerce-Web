import { useContext, useEffect, useState } from "react";
import { adminData } from "../../apis/adminApis/loginApi.js";
import { useNavigate } from "react-router-dom";
import { CircularProgress, Backdrop, styled } from "@mui/material";
import { Outlet, Link } from "react-router-dom";
import { Dashboard, Inventory, ShoppingCart, Label, RateReview, Logout, Menu, Person } from "@mui/icons-material";
import { adminLogout } from "../../apis/adminApis/loginApi.js";
import Swal from "sweetalert2";
import { AdminContext } from "../../context/adminContext.jsx";
import DrawerFunc from "./Drawer.jsx";

const StyledDiv = styled('div')(({ theme }) => ({
    height: "100vh",
    width: "17vw",
    paddingTop: "2vh",
    boxShadow: "-3px 1px 6px 8px rgb(0,0,0,0.2)",
    backgroundColor: "white",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    [theme.breakpoints.down('sm')]: {
        display: 'none'
    },
    [theme.breakpoints.between('sm', 'lg')]: {
        width: "25vw"
    }
}))

const OutletDiv = styled('div')(({ theme }) => ({
    height: "100vh",
    width: "83vw",
    padding: "2vh 2vw",
    paddingTop: "2vh",
    overflowY: "auto",
    [theme.breakpoints.down('sm')]: {
        width: "100vw"
    },
    [theme.breakpoints.between('sm', 'lg')]: {
        width: "75vw"
    }
}))

const StyledMenu = styled(Menu)(({theme}) => ({
    display: "none",
    marginBottom: "2vh",
    marginLeft: "2vw",
    [theme.breakpoints.down('sm')]: {
        display: "block"
    }
}))

const elements = [
    { id: "6", name: "Your Profile", url: "profile", Component: Person },
    { id: "1", name: "Dashboard", url: "", Component: Dashboard },
    { id: "2", name: "Orders", url: "orders", Component: ShoppingCart },
    { id: "3", name: "Products", url: "products", Component: Inventory },
    { id: "4", name: "Categories", url: "categories", Component: Label },
    { id: "5", name: "Product Reviews", url: "product-reviews", Component: RateReview }
]

function AdminDashboard() {
    const { admin, setAdmin } = useContext(AdminContext);
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchAdminData = async () => {
            const response = await adminData();

            if (response) {
                setAdmin(response);
            }
            else {
                navigate("/admin-login");
            }
        }

        fetchAdminData();
    }, []);

    const handleClick = async () => {
        setLoading(true);
        const response = await adminLogout();
        setLoading(false);

        if (response){
            window.location.reload();
        }
        else {
            Swal.fire({
                title: "Error",
                icon: "error",
                text: "Something Went Wrong.",
                confirmButtonText: "OK"
            })
        }
    }

    return (
        admin && <div style={{
            display: "flex",
            justifyContent: "space-between",
            height: "100vh",
            width: "100vw",
            backgroundColor: "#ebebe9"
        }}>
            <Backdrop
                sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
                open={loading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <StyledDiv>
                <div>
                    <h5 className="h6" style={{marginBottom: "3vh"}}>Company Logo & Name</h5>
                    <table className="table" id="dashboard-table">
                        <tbody>
                            <tr><td></td></tr>
                            {
                                elements.map((element) => {
                                    return (
                                        <tr key={element.id}>
                                            <td><Link style={{ color: "inherit", textDecoration: "none", display: "flex", alignItems: "center" }} to={element.url}><element.Component fontSize="small" style={{ marginRight: "10px" }} />{element.name}</Link></td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
                <div>
                    <table className="table" style={{marginBottom: "0vh"}}>
                        <tbody>
                            <tr><td></td></tr>
                            <tr>
                                <td style={{textAlign: "left"}}>
                                    <Link style={{color: "inherit", textDecoration: "inherit"}} onClick={() => handleClick()}>
                                        <Logout fontSize="small" style={{marginRight: "10px"}} /> Logout
                                    </Link>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </StyledDiv>
            <OutletDiv>
                <StyledMenu fontSize="large" onClick={() => setOpen(true)} />
                <Outlet />
            </OutletDiv>
            {
                open && <DrawerFunc open={open} setOpen={setOpen} />
            }
        </div>
    )
}

export default AdminDashboard;
import { Drawer, styled } from "@mui/material";
import { Dashboard, Inventory, ShoppingCart, Label, RateReview, Logout, Person } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { adminLogout } from "../../apis/adminApis/loginApi.js";
import Swal from "sweetalert2";

const elements = [
    { id: "6", name: "Your Profile", url: "profile", Component: Person },
    { id: "1", name: "Dashboard", url: "", Component: Dashboard },
    { id: "2", name: "Orders", url: "orders", Component: ShoppingCart },
    { id: "3", name: "Products", url: "products", Component: Inventory },
    { id: "4", name: "Categories", url: "categories", Component: Label },
    { id: "5", name: "Product Reviews", url: "product-reviews", Component: RateReview }
]

function DrawerFunc({ open, setOpen }) {
    const handleClose = () => {
        setOpen(false);
    }

    const handleClick = async () => {
        const response = await adminLogout();

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
        <Drawer open={open} onClose={() => handleClose()}>
            <div style={{
                width: "60vw",
                paddingTop: "2vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                height: "100vh"
            }}>
                <div>
                    <h5 className="h6" style={{ marginBottom: "3vh", textAlign: "center" }}>Company Logo & Name</h5>
                    <table className="table" id="dashboard-table">
                        <tbody>
                            <tr><td></td></tr>
                            {
                                elements.map((element) => {
                                    return (
                                        <tr key={element.id}>
                                            <td><Link style={{ color: "inherit", textDecoration: "none", display: "flex", alignItems: "center" }} to={element.url} onClick={() => handleClose()}><element.Component fontSize="small" style={{ marginRight: "10px" }} />{element.name}</Link></td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
                <div>
                    <table className="table" style={{ marginBottom: "0vh" }}>
                        <tbody>
                            <tr><td></td></tr>
                            <tr>
                                <td style={{ textAlign: "left" }}>
                                    <Link style={{ color: "inherit", textDecoration: "inherit" }} onClick={() => handleClick()}>
                                        <Logout fontSize="small" style={{ marginRight: "10px" }} /> Logout
                                    </Link>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </Drawer>
    )
}

export default DrawerFunc;
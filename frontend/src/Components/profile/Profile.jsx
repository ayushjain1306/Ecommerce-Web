import { useState, useContext } from "react";
import { Typography, styled } from "@mui/material";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext.jsx";
import PersonIcon from "@mui/icons-material/Person.js";
import DialogBox from "../header/DialogBox.jsx";

const MainStyleDiv = styled('div')(({ theme }) => ({
    display: "flex",
    justifyContent: "space-between",
    height: "100vh",
    width: "100%",
    backgroundColor: "#ebebe9",
    paddingTop: "12vh",
    [theme.breakpoints.down('sm')]: {
        paddingTop: "15vh"
    },
    [theme.breakpoints.between('sm', 'md')]: {
        paddingTop: "8vh"
    },
    [theme.breakpoints.between('md', 'lg')]: {
        paddingTop: "6vh"
    }
}))

const StyledDiv = styled('div')(({ theme }) => ({
    height: "88vh",
    width: "20%",
    paddingTop: "2vh",
    boxShadow: "8px 8px 8px -3px rgb(0,0,0,0.2)",
    backgroundColor: "white",
    borderRadius: "3px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    [theme.breakpoints.down('sm')]: {
        display: "none"
    },
    [theme.breakpoints.between('sm', 'md')]: {
        height: "92vh"
    },
    [theme.breakpoints.between('md', 'lg')]: {
        height: "94vh"
    }
}))

const OutletDiv = styled('div')(({ theme }) => ({
    height: "88vh",
    width: "80%",
    padding: "0vh 2vw 2vh 2vw",
    [theme.breakpoints.down('sm')]: {
        width: "100%",
        height: "85vh"
    },
    [theme.breakpoints.between('sm', 'md')]: {
        height: "92vh"
    },
    [theme.breakpoints.between('md', 'lg')]: {
        height: "94vh"
    }
}))

const ProfileDiv = styled('div')(({theme}) => ({
    display: "flex",
    alignItems: "flex-start",
    [theme.breakpoints.down('lg')]: {
        display: "none"
    }
}))

const elements = [
    { id: "1", name: "My Orders", url: "" },
    { id: "2", name: "Saved Adresses", url: "addresses" },
    { id: "3", name: "Reset Password", url: "reset-password" }
]

function Profile() {
    const navigate = useNavigate();
    const { user, loadProfile } = useContext(UserContext);
    const [open, setOpen] = useState(false);

    if (loadProfile && !user) {
        navigate("/");
    }

    return (
        user && <MainStyleDiv>
            <StyledDiv>
                <div>
                    <ProfileDiv>
                        <div style={{ padding: "10px", margin: "0px 10px", borderRadius: "50%", backgroundColor: "lightgrey", color: "white" }}>
                            <PersonIcon style={{ fontSize: "35px" }} />
                        </div>
                        <div style={{ textAlign: "left", width: "100%" }}>
                            <Typography style={{ fontSize: "20px" }}>{user.name}</Typography>
                            <Typography style={{ fontWeight: "bold", fontSize: "14px" }}>{user.email}</Typography>
                        </div>
                    </ProfileDiv>
                    <table className="table" id="dashboard-table" style={{ marginTop: "10px" }}>
                        <tbody>
                            <tr>
                                <td></td>
                            </tr>
                            {
                                elements.map((element) => {
                                    return (
                                        <tr key={element.id}>
                                            <td><Link style={{ color: "inherit", textDecoration: "none" }} to={element.url}>{element.name}</Link></td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
                <table className="table" style={{ marginBottom: "0px" }}>
                    <tbody>
                        <tr><td></td></tr>
                        <tr>
                            <td style={{ textAlign: "left" }}>
                                <Link style={{ color: "inherit", textDecoration: "inherit" }} onClick={() => setOpen(true)}>Log Out</Link>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </StyledDiv>
            <OutletDiv>
                <Outlet />
            </OutletDiv>
            {
                open && <DialogBox open={open} setOpen={setOpen} />
            }
        </MainStyleDiv>
    )
}

export default Profile;
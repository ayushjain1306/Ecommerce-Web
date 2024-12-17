import { Button, styled, Backdrop, CircularProgress } from "@mui/material";
import { useState } from "react";
import loginWork from "../../apis/adminApis/loginApi.js";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import heroImage from "../../assets/images/6920c867aea5370c4fb7f8e9063cd68d-removebg-preview.png";

const DivStyle = styled('div')(({ theme }) => ({
    height: "100vh",
    width: "100vw",
    display: "flex",
    alignItems: "center",
    justifyContent: "right",
    backgroundColor: "#ebebe9",
    overflowY: "auto",
    [theme.breakpoints.down("lg")]: {
        display: "block",
        paddingTop: "10vh"
    }
}))

const LeftDiv = styled('div')(({ theme }) => ({
    padding: "3vh 0vw",
    boxShadow: "0px 5px 8px -4px rgb(0,0,0,0.2)",
    fontSize: "19px",
    fontWeight: "600",
    [theme.breakpoints.between("md", "lg")]: {
        fontSize: "23px"
    }
}))

const RightDiv = styled('div')(({ theme }) => ({
    width: "27%",
    height: "70vh",
    margin: "15vh 10vw",
    backgroundColor: "white",
    boxShadow: "8px 8px 8px -3px rgb(0,0,0,0.2)",
    borderRadius: "3px",
    [theme.breakpoints.down('sm')]: {
        width: "80%",
        margin: "auto",
        height: "54vh",
        marginTop: "3vh"
    },
    [theme.breakpoints.between("sm", "md")]: {
        width: "60%",
        margin: "auto",
        height: "50vh",
        marginTop: "3vh"
    },
    [theme.breakpoints.between("md", "lg")]: {
        width: "60%",
        margin: "auto",
        height: "45vh",
        marginTop: "5vh"
    }
}))

const StyledButton = styled(Button)(({ theme }) => ({
    width: "60%",
    margin: "10vh 4vh"
}))

const StyledDiv = styled('div')(({ theme }) => ({
    width: "53%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    [theme.breakpoints.down('lg')]: {
        width: "100%"
    }
}))

const ImageStyle = styled('img')(({ theme }) => ({
    width: "80%",
    height: "60vh",
    [theme.breakpoints.down('sm')]: {
        height: "30vh"
    },
    [theme.breakpoints.between("sm", "lg")]: {
        height: "30vh",
        width: "60%"
    }
}))

function AdminLogin() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [usernameError, setUsernameError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChangeUsername = (e) => {
        if (e.target.value === "") {
            setUsernameError("This field cannot be empty.");
        }
        else {
            setUsernameError("");
        }

        setUsername(e.target.value);
    }

    const handleChangePassword = (e) => {
        if (e.target.value === "") {
            setPasswordError("This field cannot be empty.");
        }
        else {
            setPasswordError("");
        }

        setPassword(e.target.value);
    }

    const handleClick = async () => {
        if (username === "") {
            setUsernameError("This field cannot be empty.");
        }
        else if (password === "") {
            setUsernameError("");
            setPasswordError("This field cannot be empty.");
        }
        else {
            setLoading(true);
            const response = await loginWork({ username, password });
            setLoading(false);

            if (response === true) {
                setUsernameError("");
                navigate("/admin")
            }
            else if (response === "Username Not Found." || response === "Incorrect Password.") {
                setUsernameError("Invalid Credentials.");
            }
            else {
                Swal.fire({
                    title: "Error!",
                    icon: "error",
                    text: "Something went wrong.",
                    confirmButtonText: 'OK'
                })
            }
        }
    }

    return (
        <DivStyle>
            <Backdrop
                sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
                open={loading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <StyledDiv>
                <ImageStyle src={heroImage} alt="logo" />
            </StyledDiv>
            <RightDiv>
                <LeftDiv>
                    Company Name
                </LeftDiv>

                <div style={{ marginTop: "7vh", padding: "0vh 4vh" }}>
                    <input
                        type="text"
                        className="form-control"
                        value={username}
                        placeholder="Enter your Username"
                        onChange={(e) => handleChangeUsername(e)}
                    />
                    <p style={{ color: "red", fontSize: "12px", textAlign: "left" }}>{usernameError}</p>

                    <input
                        type="password"
                        className="form-control"
                        value={password}
                        placeholder="Enter your Password"
                        onChange={(e) => handleChangePassword(e)}
                        style={{ marginTop: "3vh" }}
                    />
                    <p style={{ color: "red", fontSize: "12px", textAlign: "left" }}>{passwordError}</p>
                </div>

                <StyledButton variant="contained" color="warning" onClick={() => handleClick()}>
                    Login
                </StyledButton>
            </RightDiv>
        </DivStyle>
    )
}

export default AdminLogin;
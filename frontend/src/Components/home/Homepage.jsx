import { useContext, useState } from "react";
import HeroSection from "./heroSection/Hero.jsx";
import LatestProducts from "./productSection/LatestProducts.jsx";
import CategoryProducts from "./productSection/CategoryProducts.jsx";
import { CircularProgress, Dialog, Button, DialogContent, DialogContentText, DialogTitle, styled } from "@mui/material";
import { loginApi, signupApi } from "../../apis/accountApi.js";
import Swal from "sweetalert2";
import { UserContext } from "../../context/userContext.jsx";
import CloseIcon from "@mui/icons-material/Close.js";

const StyledDialogTitle = styled(DialogTitle)(({theme}) => ({
    width: "27vw",
    textAlign: "center",
    fontFamily: "cursive",
    fontSize: "25px",
    fontWeight: "bold",
    [theme.breakpoints.down('lg')]: {
        width: "50vw"
    },
    [theme.breakpoints.down('md')]: {
        width: "50vw"
    },
    [theme.breakpoints.down('sm')]: {
        width: "70vw"
    }
}))

const MainStyleDiv = styled('div')(({theme}) => ({
    minHeight: "100vh",
    backgroundColor: "#ebebe9",
    paddingTop: "13vh",
    paddingBottom: "5vh",
    width: "100%",
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

const StyledDialogContent = styled(DialogContent)(({theme}) => ({
    width: "27vw",
    [theme.breakpoints.down('lg')]: {
        width: "50vw"
    },
    [theme.breakpoints.down('md')]: {
        width: "50vw"
    },
    [theme.breakpoints.down('sm')]: {
        width: "70vw"
    }
}))

const StyledButton = styled(Button)((theme) => ({
    width: "80%",
    fontWeight: "bold",
    marginTop: "2vh",
    marginBottom: "10vh"
}))

const StyledInput = styled('input')(({theme}) => ({
    marginTop: "2vh"
}))

let timeoutExecuted = false;

function Homepage(){
    const [open, setOpen] = useState(false);
    const { user, openDialog } = useContext(UserContext);

    if (user) timeoutExecuted = true

    if (openDialog === true && !timeoutExecuted){
        setTimeout(() => {
            !user && setOpen(true);
            timeoutExecuted = true
        }, 10000);
    }

    return (
        <MainStyleDiv>
            <HeroSection />
            <LatestProducts />
            <CategoryProducts />
            {
                open && <DialogBox open={open} setOpen={setOpen} />
            }
        </MainStyleDiv>
    )
}

export function DialogBox({ open, setOpen }){
    const [inputLogin, setInputLogin] = useState({email: "", password: ""});
    const [inputSignup, setInputSignup] = useState({name : "", phone: "", email: "", password: ""});
    const [login, setLogin] = useState(true);
    const [nameError, setNameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [phoneError, setPhoneError] = useState("");
    const [loading, setLoading] = useState(false);
    const { setUser } = useContext(UserContext);

    const handleChange = (e) => {
        if (login){
            setInputLogin({...inputLogin, [e.target.name]: e.target.value});
        }
        else {
            setInputSignup({...inputSignup, [e.target.name]: e.target.value});
        }
    }

    const handleClick = async() => {
        if (login){
            if (inputLogin.email === ""){
                setEmailError("This field cannot be Empty.");
                return;
            }
            else if (inputLogin.password === ""){
                setPasswordError("This field cannot be Empty.");
            }
            else {
                setLoading(true);
                const response = await loginApi(inputLogin, setUser);
                setLoading(false);

                if (response === "Invalid Credentials."){
                    setEmailError(response);
                }
                else if (response === true){
                    Swal.fire({
                        title: "Success!",
                        text: "You have Logged In Successfully.",
                        icon: "success",
                        confirmButtonText: "OK"
                    })

                    setOpen(false);
                }
                else {
                    Swal.fire({
                        title: "Error!",
                        text: "Something went wrong",
                        icon: "error",
                        confirmButtonText: "OK"
                    })

                    setOpen(false);
                }
            }
        }
        else {
            if (inputSignup.name === ""){
                setNameError("This field cannot be Empty.");
                return;
            }
            else if (inputSignup.email === ""){
                setEmailError("This field cannot be Empty.");
            }
            else if (inputSignup.phone === ""){
                setPhoneError("This field cannot be Empty.");
                return;
            }
            else if (inputSignup.password === ""){
                setPasswordError("This field cannot be Empty.");
            }
            else {
                setLoading(true);
                const response = await signupApi(inputSignup, setUser);
                setLoading(false);

                if (response === "Account on this email already exists."){
                    setEmailError("Account on this email already exists.");
                }
                else if (response === "Account on this phone number already exists.") {
                    setPhoneError("Account on this phone number already exists.");
                }
                else if (response === true){
                    Swal.fire({
                        title: "Success!",
                        text: "Your Account has been created Successfully.",
                        icon: "success",
                        confirmButtonText: "OK"
                    })

                    setOpen(false);
                }
                else {
                    Swal.fire({
                        title: "Error!",
                        text: "Something went wrong.",
                        icon: "error",
                        confirmButtonText: "OK"
                    })

                    setOpen(false);
                }
            }
        }
    }

    const handlePageChange = () => {
        setNameError("");
        setEmailError("");
        setPhoneError("");
        setPasswordError("");

        setLogin(!login);
    }

    return (
        <Dialog open={open} onClose={() => setOpen(false)} style={{height: "100vh"}}>
            <StyledDialogTitle style={{display: "flex"}}>
                <span style={{display: "block", width: "100%"}}>
                    {login ? "Login" : "Create Account"}
                </span>
                <Button style={{width: "10%", color: "black"}} onClick={() => setOpen(false)}>
                    <CloseIcon  />
                </Button>
            </StyledDialogTitle>
            <StyledDialogContent>
                <DialogContentText style={{textAlign: "center"}}>
                    {
                        loading && <CircularProgress />
                    }
                    {!login && <StyledInput 
                        type="name" 
                        name="name"
                        className="form-control" 
                        placeholder="Enter your Name" 
                        onChange={(e) => handleChange(e)}
                        value={inputSignup.name}
                    />}
                    <span style={{color: "red", fontSize: "12px"}}>{nameError}</span>
                    <StyledInput 
                        type="email" 
                        name="email"
                        className="form-control" 
                        placeholder="Enter your Email Address" 
                        onChange={(e) => handleChange(e)}
                        value={login ? inputLogin.email : inputSignup.email }
                    />
                    <span style={{color: "red", fontSize: "12px"}}>{emailError}</span>
                    {!login && <StyledInput 
                        type="phone" 
                        name="phone"
                        className="form-control" 
                        placeholder="Enter your Phone Number" 
                        onChange={(e) => handleChange(e)}
                        value={inputSignup.phone}
                    />}
                    <span style={{color: "red", fontSize: "12px"}}>{phoneError}</span>
                    <StyledInput 
                        type="password" 
                        name="password"
                        className="form-control" 
                        placeholder="Enter your Password" 
                        onChange={(e) => handleChange(e)}
                        value={login ? inputLogin.password : inputSignup.password}
                    />
                    <span style={{color: "red", fontSize: "12px"}}>{passwordError}</span>

                    <Button variant="contained" color="warning" style={{width: "80%", fontWeight: "bold", marginTop: "2vh"}} onClick={() => handleClick()}>{login ? "Login" : "Create Account"}</Button>
                    <StyledButton variant="outlined" onClick={() => handlePageChange()}>{login ? "Don't Have an Account?" : "Already Have an Account?"}</StyledButton>
                </DialogContentText>
            </StyledDialogContent>
        </Dialog>
    )
}

export default Homepage;
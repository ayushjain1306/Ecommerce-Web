import { useState } from "react";
import { Button, CircularProgress, styled } from "@mui/material";
import { checkPassword, resetPassword } from "../../apis/accountApi.js";
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

const PasswordDiv = styled('div')(({ theme }) => ({
    width: "100%",
    backgroundColor: "white",
    padding: "3vh 2vw",
    boxShadow: "8px 8px 8px -3px rgb(0,0,0,0.2)",
    borderRadius: "3px",
    marginTop: "3vh"
}))

const StyledInput = styled('input')(({theme}) => ({
    width: "30%",
    [theme.breakpoints.down('sm')]: {
        width: "50%"
    }
}))

function Password() {
    const [correct, setCorrect] = useState(false);
    const [password, setPassword] = useState("");
    const [newPass, setNewPass] = useState("");
    const [loading, setLoading] = useState(false);

    const handleFirstClick = async (e) => {
        e.preventDefault();

        if (password === "") {
            return;
        }

        setLoading(true);

        const response = await checkPassword(password);
        setLoading(false);

        if (!response){
            Swal.fire({
                title: "Error",
                icon: "error",
                text: "Something Went Wrong.",
                confirmButtonText: "OK"
            })
        }
        else {
            setCorrect(true);
        }
    }

    const handleSecondClick = async (e) => {
        e.preventDefault();

        if (password === "") {
            return;
        }

        setLoading(true);

        const response = await resetPassword(newPass);
        setLoading(false);

        if (response){
            Swal.fire({
                title: "Success",
                icon: "success",
                text: "Password Updated Successfully.",
                confirmTextButton: 'OK'
            })
            setPassword("");
            setNewPass("");
            setCorrect(false);
        }
        else {
            Swal.fire({
                title: "Error",
                icon: "error",
                text: "Something Went Wrong.",
                confirmButtonText: 'OK'
            })
        }
    }

    return (
        <div>
            <HeadDiv>
                <div>
                    Reset Your Password
                </div>
            </HeadDiv>
            <PasswordDiv>
                <div>
                    {
                        loading && <CircularProgress />
                    }
                </div>
                {
                    correct ?
                        <form>
                            <div style={{ display: "flex", justifyContent: "space-evenly", alignItems: "center", margin: "2vh 0vw" }}>
                                <label>New Password</label>
                                <StyledInput
                                    type="password"
                                    value={newPass}
                                    className="form-control"
                                    placeholder="Enter your New Password"
                                    onChange={(e) => setNewPass(e.target.value)}
                                    required
                                />
                            </div>
                            <Button type="submit" variant="contained" color="warning" style={{ width: "20%", marginTop: "2vw", marginBottom: "1vw" }} onClick={(e) => handleSecondClick(e)}>Submit</Button>
                        </form>
                        :
                        <form>
                            <div style={{ display: "flex", justifyContent: "space-evenly", alignItems: "center", margin: "2vh 0vw" }}>
                                <label style={{ fontSize: "18px" }}>Current Password</label>
                                <StyledInput
                                    type="password"
                                    value={password}
                                    className="form-control"
                                    placeholder="Enter your Current Password"
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <Button type="submit" variant="contained" color="warning" style={{ width: "20%", marginTop: "2vw", marginBottom: "1vw" }} onClick={(e) => handleFirstClick(e)}>Submit</Button>
                        </form>
                }
            </PasswordDiv>
        </div>
    )
}

export default Password;
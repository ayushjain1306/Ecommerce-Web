import { useState } from "react";
import { Accordion, AccordionDetails, AccordionSummary, Button, styled } from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import DialogBox from "./ProfileDialog.jsx";

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

const ProfileDiv = styled('div')(({ theme }) => ({
    marginTop: "3vh",
    [theme.breakpoints.down('sm')]: {
        width: "90%",
        margin: "auto",
        marginTop: "2vh"
    }
}))

const StyledDiv = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: "center",
    justifyContent: "space-evenly",
    paddingBottom: "2vh",
    [theme.breakpoints.down('sm')]: {
        flexDirection: "column"
    }
}))

const StyledLabel = styled('label')(({ theme }) => ({
    width: "30%",
    [theme.breakpoints.down('sm')]: {
        width: "60%"
    }
}))

const StyledInput = styled('input')(({ theme }) => ({
    width: "30%",
    [theme.breakpoints.down('sm')]: {
        width: "60%",
        margin: "2vh 0vw"
    }
}))

function Profile() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [open, setOpen] = useState(false);
    const [data, setData] = useState({});

    const handleClick = (value) => {
        if (password === "" && username === ""){
            return;
        }

        if (username === ""){
            setData({password});
        }
        else {
            setData({username});
        }

        setOpen(true);
    }

    return (
        <div>
            <HeadDiv>
                Profile Section
            </HeadDiv>
            <ProfileDiv>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMore />}
                        aria-controls="panel1-content"
                        id="panel1-header"
                    >
                        Change Your Username
                    </AccordionSummary>
                    <AccordionDetails>
                        <form>
                            <StyledDiv style={{display: "flex"}}>
                                <StyledLabel>New Username</StyledLabel>
                                <StyledInput
                                    type="text"
                                    placeholder="Enter New Username"
                                    className="form-control"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                                <Button variant="contained" color="warning" onClick={() => handleClick()}>Change Username</Button>
                            </StyledDiv>
                        </form>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMore />}
                        aria-controls="panel2-content"
                        id="panel2-header"
                    >
                        Change Your Password
                    </AccordionSummary>
                    <AccordionDetails>
                        <form>
                            <StyledDiv>
                                <StyledLabel>New Password</StyledLabel>
                                <StyledInput
                                    type="password"
                                    className="form-control"
                                    placeholder="Enter New Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <Button variant="contained" color="warning" onClick={() => handleClick()}>Change Password</Button>
                            </StyledDiv>
                        </form>
                    </AccordionDetails>
                </Accordion>
                {
                    open && <DialogBox open={open} setOpen={setOpen} data={data}  />
                }
            </ProfileDiv>
        </div>
    )
}

export default Profile;
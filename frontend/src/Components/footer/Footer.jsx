import { Typography, List, ListItem, styled } from "@mui/material";
import { Link } from "react-router-dom";
import { Phone, Email } from "@mui/icons-material";

const StyledDiv = styled('div')(({theme}) => ({
    backgroundColor: "#444444",
    height: "30vh",
    width: "100%",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-evenly",
    color: "white",
    [theme.breakpoints.down('sm')]: {
        display: 'block',
        height: "50vh"
    },
    [theme.breakpoints.between('sm', 'md')]: {
        height: "23vh"
    },
    [theme.breakpoints.between('md', 'lg')]: {
        height: "20vh"
    }
}))

const FirstDiv = styled('div')(({theme}) => ({
    width: "30%",
    margin: "auto",
    [theme.breakpoints.down('sm')]: {
        width: "100%",
        padding: "5vh 0vw 3vh 0vw"
    }
}))

const SecondDiv = styled('div')(({theme}) => ({
    width: "30%",
    marginTop: "5vh",
    [theme.breakpoints.down('sm')]: {
        width: "80%",
        margin: "auto",
        marginTop: "2vh"
    }
}))

const ThirdDiv = styled('div')(({theme}) => ({
    width: "30%",
    marginTop: "5vh",
    [theme.breakpoints.down('sm')]: {
        width: "100%"
    }
}))

const Heading = styled('h5')(({theme}) => ({
    width: "80%", 
    margin: "auto", 
    textAlign: "left", 
    padding: "0px 16px",
    [theme.breakpoints.down('sm')]: {
        textAlign: "center"
    }
}))

const NewList = styled(List)(({theme}) => ({
    width: "80%", 
    margin: "auto",
    [theme.breakpoints.down('sm')]: {
        textAlign: "center"
    }
}))

const NewListItem = styled(ListItem)(({theme}) => ({
    [theme.breakpoints.down('sm')]: {
        justifyContent: "center"
    }
}))

function Footer() {
    return (
        <StyledDiv>
            <FirstDiv>
                <h4 className="h5">Company Name and Logo</h4>
            </FirstDiv>
            <SecondDiv>
                <h4 className="h5">About Us</h4>
                <p style={{fontSize: "14px"}}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum labore provident illum velit, nostrum ab id voluptate similique facere mollitia.</p>
            </SecondDiv>
            <ThirdDiv>
                <Heading className="h5">Contact details</Heading>
                <NewList>
                    <NewListItem><Phone fontSize="small" style={{marginRight: "1vw"}} /> <Typography style={{fontSizwe: "14px"}}>+1234567890</Typography></NewListItem>
                    <NewListItem><Email fontSize="small" style={{marginRight: "1vw"}} /> <Typography style={{fontSizwe: "14px"}}>company-email@gmail.com</Typography></NewListItem>
                    <Link to="admin">a</Link>
                </NewList>
            </ThirdDiv>
        </StyledDiv>
    )
}

export default Footer;
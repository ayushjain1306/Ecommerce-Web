import { Button, styled } from "@mui/material";
import banner from "../../../assets/images/heroImage.png";
import { useNavigate } from "react-router-dom";

const StyledDiv = styled('div')(({ theme }) => ({
    height: "55vh",
    width: "97%",
    margin: "auto",
    backgroundColor: "white",
    boxShadow: "8px 8px 8px -3px rgb(0,0,0,0.2)",
    display: "flex",
    alignItems: "center",
    [theme.breakpoints.down('sm')]: {
        width: "90%",
        height: "30vh"
    },
    [theme.breakpoints.between('sm', 'md')]: {
        height: "35vh",
        width: "90%"
    },
    [theme.breakpoints.between('md', 'lg')]: {
        height: "33vh",
        width: "90%"
    }
}))

const AnotherStyledDiv = styled('div')(({ theme }) => ({
    width: "40%",
    height: "100%",
    textAlign: "left",
    paddingLeft: "8vw",
    [theme.breakpoints.down('sm')]: {
        display: "none"
    },
    [theme.breakpoints.between('sm', 'lg')]: {
        paddingLeft: "4vw"
    }
}))

const Heading = styled('h2')(({ theme }) => ({
    marginTop: "6vh",
    fontFamily: "Verdana",
    fontSize: "45px",
    color: "#5e17eb",
    fontWeight: "bold",
    [theme.breakpoints.down('sm')]: {
        fontSize: "18px",
        textAlign: "left",
        marginTop: "2vh",
        marginLeft: "2vw"
    },
    [theme.breakpoints.between('sm', 'md')]: {
        fontSize: "40px",
        textAlign: "left",
        marginTop: "3vh"
    },
    [theme.breakpoints.between('md', 'lg')]: {
        marginTop: "3vh"
    }
}))

const StyledButton = styled(Button)(({ theme }) => ({
    backgroundColor: "#5e17eb",
    fontWeight: "bold",
    marginTop: "8vh",
    '&:hover': {
        backgroundColor: "#5012c9"
    },
    [theme.breakpoints.between('sm', 'md')]: {
        marginTop: "4vh"
    },
    [theme.breakpoints.between('md', 'lg')]: {
        fontSize: "18px",
        marginTop: "4vh"
    }
}))

const AnotherHeading = styled('div')(({ theme }) => ({
    fontFamily: "Georgia",
    fontSize: "20px",
    marginTop: "4vh",
    [theme.breakpoints.between('sm', 'md')]: {
        marginTop: "3vh"
    }
}))

const Heading2 = styled('h2')(({ theme }) => ({
    display: "none",
    marginTop: "6vh",
    fontFamily: "Verdana",
    fontSize: "45px",
    color: "#5e17eb",
    fontWeight: "bold",
    [theme.breakpoints.down('sm')]: {
        display: "block",
        fontSize: "18px",
        textAlign: "left",
        marginTop: "2vh",
        marginLeft: "2vw"
    }
}))

const StyledButton2 = styled(Button)(({ theme }) => ({
    display: 'none',
    backgroundColor: "#5e17eb",
    fontWeight: "bold",
    marginTop: "8vh",
    '&:hover': {
        backgroundColor: "#5012c9"
    },
    [theme.breakpoints.down('sm')]: {
        display: "block",
        textAlign: "left",
        marginTop: "4vh",
        marginLeft: "2vw"
    }
}))

const AnotherHeading2 = styled('div')(({ theme }) => ({
    display: "none",
    fontFamily: "Georgia",
    fontSize: "20px",
    marginTop: "4vh",
    [theme.breakpoints.down('sm')]: {
        display: "block",
        textAlign: "left",
        marginLeft: "2vw",
        marginTop: "2vh",
        fontSize: "15px"
    }
}))

const ImageStyleDiv = styled('div')(({ theme }) => ({
    width: "60%",
    height: "100%",
    backgroundColor: "whitesmoke",
    [theme.breakpoints.down('sm')]: {
        width: "100%",
        position: "relative",
        textAlign: "right"
    }
}))

const Image = styled('img')(({theme}) => ({
    width: "100%",
    height: "100%",
    [theme.breakpoints.down('sm')]: {
        width: "80%"
    }
}))

function HeroSection() {
    const navigate = useNavigate();

    return (
        <StyledDiv>
            <AnotherStyledDiv style={{ backgroundColor: "whitesmoke" }}>
                <Heading className="h2">Elevate Your Style</Heading>
                <AnotherHeading className="h6">Discover the latest Fashion Trends and your Styles</AnotherHeading>
                <StyledButton variant="contained" onClick={() => navigate("/shopping")}>Shop Now</StyledButton>
            </AnotherStyledDiv>
            <ImageStyleDiv>
                <Image src={banner} alt="banner" />
                <div style={{position: "absolute", top: "0", left: "0"}}>
                    <Heading2 className="h2">Elevate Your</Heading2>
                    <Heading2 className="h2" style={{marginTop: "0px"}}>Style</Heading2>
                    <AnotherHeading2 className="h6">Discover the latest Fashion</AnotherHeading2>
                    <AnotherHeading2 className="h6" style={{marginTop: "0px"}}>Trends and your Styles</AnotherHeading2>
                    <StyledButton2 variant="contained" onClick={() => navigate("/shopping")}>Shop Now</StyledButton2>
                </div>
            </ImageStyleDiv>
        </StyledDiv>
    )
}

export default HeroSection;
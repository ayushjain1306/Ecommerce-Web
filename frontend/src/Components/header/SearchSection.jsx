import { useState, useEffect, useContext } from "react";
import { List, ListItem, Button, styled } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { getCatgeories } from "../../apis/searchApi.js";
import { CategoryContext } from "../../context/categoryContext.jsx";
import { SearchContext } from "../../context/searchContext.jsx";
import { useNavigate } from "react-router-dom";

const StyledDiv = styled('div')(({ theme }) => ({
    width: "46%",
    display: "flex",
    [theme.breakpoints.down('sm')]: {
        width: "90%",
        margin: "auto",
        marginTop: "1vh"
    }
}))

const StyledList = styled(List)(({theme}) => ({
    position: "absolute",
    backgroundColor: "#ebebe9",
    color: "black",
    top: "8vh",
    borderRadius: "3px",
    left: "21%",
    width: "38.8%",
    [theme.breakpoints.down('sm')]: {
        width: "66%",
        top: "13vh",
        left: "8%"
    }
}))

const StyledListItem = styled(ListItem)(({theme}) => ({
    "&:hover" : {
        backgroundColor: "lightgrey",
        cursor: "pointer"
    }
}))

function SearchSection() {
    const [input, setInput] = useState("");
    const { options, setOptions } = useContext(CategoryContext);
    const [listItems, setListItems] = useState([]);
    const { setSearch } = useContext(SearchContext);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCategories = async () => {
            const response = await getCatgeories();

            if (response) {
                setOptions(response);
            }
        }
        fetchCategories();
    }, []);

    const handleChange = (e) => {
        setInput(e.target.value);

        const values = e.target.value.trim().toLowerCase().split(" ");

        setListItems(options.filter((option) => values.some(value => option.name.toLowerCase().includes(value))).slice(0, 10));
    }

    const handleClick = () => {
        if (input === ""){
            return;
        }

        setSearch(input);
        setInput("");
        navigate("/shopping");
    }

    return (
        <StyledDiv>
            <input
                type="text"
                className="form-control"
                placeholder="Search for Products here"
                value={input}
                onChange={(e) => handleChange(e)}
            />
            <Button variant="outlined" style={{ marginLeft: "1vw" }} onClick={() => handleClick()}><SearchIcon fontSize="medium" /></Button>

            {
                input?.length > 0 &&
                <StyledList>
                    {
                        listItems?.length > 0 && listItems.map((item) => {
                            return (
                                <StyledListItem onClick={() => {
                                    setInput(item.name);
                                    setListItems(listItems.filter((option) => option.name === item.name));
                                }}>{item.name}</StyledListItem>
                            )
                        })
                    }
                </StyledList>
                
            }
        </StyledDiv>
    )
}

export default SearchSection;
import { useState, useEffect } from "react";
import { styled } from "@mui/material";
import { BarChart, Bar, XAxis, YAxis, LineChart, Line, CartesianGrid, Tooltip, Legend } from "recharts";
import { getYears, getSalesData } from "../../../apis/adminApis/dashboardApi.js";

const StyledDiv = styled('div')(({ theme }) => ({
    backgroundColor: "white",
    borderRadius: "3px",
    boxShadow: "8px 8px 8px -3px rgb(0,0,0,0.2)",
    width: "55%",
    padding: "2vh 2vw",
    [theme.breakpoints.down('sm')]: {
        width: "90%",
        margin: "auto"
    }
}))

const StyledSelect = styled('select')(({ theme }) => ({
    width: "50%",
    margin: "auto",
    marginBottom: "3vh",
    marginTop: "2vh"
}))

function SalesAnalytics() {
    const [years, setYears] = useState([]);
    const [salesData, setSalesData] = useState(null);
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchSalesData = async () => {
            const response = await getSalesData();

            const currentYear = new Date().getFullYear();

            if (response) {
                setSalesData(response);
                setData(response[currentYear]);
            }
        }

        const fetchYears = async () => {
            const response = await getYears();

            if (response) {
                setYears(response);
            }
        }

        fetchYears();
        fetchSalesData();
    }, []);

    const handleChange = (e) => {
        setData(salesData[e.target.value]);
    }

    return (
        years.length > 0 && salesData && <StyledDiv>
            <h6 className="h5">Sales Data</h6>
            <StyledSelect className="form-select" onChange={(e) => handleChange(e)}>
                {
                    years.map((year, index) => {
                        return (
                            <option key={index} value={year} defaultValue={index === years.length - 1}>
                                {year}
                            </option>
                        )
                    })
                }
            </StyledSelect>
            <div style={{overflowX: "auto"}}>
                <LineChart
                    height={300}
                    width={500}
                    data={data}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="sale" stroke="#1100ab" activeDot={{ r: 8 }} />
                </LineChart>
            </div>
        </StyledDiv>
    )
}

export default SalesAnalytics;
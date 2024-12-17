import { useState } from "react";
import { Pagination } from "@mui/material";

function Table({ data, headers, targets }) {
    const [filteredData, setFilteredData] = useState(data.slice(0, 10));
    const [loadAgain, setLoadAgain] = useState(false);

    const handlePageChange = (value) => {
        setFilteredData(data.slice((value - 1) * 10, value * 10));
        setLoadAgain(!loadAgain);
    }

    return (
        <div>
            <table className="table">
                <thead>
                    <tr>
                        {
                            headers.map((element, index) => {
                                return (
                                    <th key={index}>{element}</th>
                                )
                            })
                        }
                    </tr>
                </thead>
                <tbody>
                    { (loadAgain === true || loadAgain === false) &&
                        (filteredData.map((element, index) => {
                            return (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    {
                                        targets.map((target, index) => {
                                            return (
                                                <td key={index}>
                                                    {element[target]}
                                                </td>
                                            )
                                        })
                                    }
                                </tr>
                            )
                        }))
                    }
                </tbody>
            </table>
            <Pagination
                count={Math.ceil(data.length / 10)}
                variant="outlined"
                shape="rounded"
                onChange={(e, value) => handlePageChange(value)}
                style={{ display: "flex", justifyContent: "center" }}
            />
        </div>
    )
}

export default Table;
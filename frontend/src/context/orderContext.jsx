import { useState, createContext } from "react";

export const OrderContext = createContext(null);

function OrderProvider({ children }) {
    const [order, setOrder] = useState(null);

    return (
        <OrderContext.Provider value={{ order, setOrder }}>
            { children }
        </OrderContext.Provider>
    )
}

export default OrderProvider;
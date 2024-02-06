import { createContext, useEffect, useState } from "react";
import { getLocalStorage, saveLocalStorage } from "../utilities/utilities";


export const StoreContext = createContext();

export const StoreContextProvider = ({ children }) => {

    const [user, setUser] = useState(null);

    const [openBag, setOpenBag] = useState(false);

    const [url, setUrl] = useState("https://api-franklinstore.vercel.app");

    const [loading, setLoading] = useState(false);

    const [bagItems, setBagItems] = useState(getLocalStorage("bag") || []);

    const [checkout, setCheckout] = useState('');

    const [query, setQuery] = useState('');

    useEffect(() => {
        const userToken = getLocalStorage("user_token");
        const users = getLocalStorage("users_db");

        if (userToken && users) {
            const hasUser = users.find((user) => user.email === userToken.email)

            if (hasUser) setUser(hasUser);
        }
    }, []);

    const data = {
        user,
        setUser,
        openBag,
        setOpenBag,
        url,
        setUrl,
        loading,
        setLoading,
        bagItems,
        setBagItems,
        checkout,
        setCheckout,
        query,
        setQuery
    }

    return (
        <StoreContext.Provider value={data}>
            {children}
        </StoreContext.Provider>
    )
}
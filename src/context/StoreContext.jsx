import { createContext } from "react";
import { useState } from "react";
import { getLocalStorage } from "../utilities/utilities";


export const StoreContext = createContext();

export const StoreContextProvider = ({children}) => {
    const [ openBag, setOpenBag ] = useState(false);

    const [ url, setUrl ] = useState("https://api-franklinstore.vercel.app");

    const [ loading, setLoading ] = useState(true);

    const [ bagItens, setBagItens ] = useState(getLocalStorage("bag") || []);

    const [ historic, setHistoric ] = useState(getLocalStorage("historic") || []);

    const [ favorites, setFavorites ] = useState(getLocalStorage("favorites") || []);

    const [ checkout, setCheckout ] = useState('');

    const [ query, setQuery ] = useState('')

    const data = {
        openBag,
        setOpenBag,
        url, 
        setUrl,
        loading, 
        setLoading,
        bagItens, 
        setBagItens, 
        checkout,
        setCheckout, 
        historic, 
        setHistoric,
        query, 
        setQuery, 
        favorites, 
        setFavorites
    }

    return (
        <StoreContext.Provider value={data}>
            {children}
        </StoreContext.Provider>
    )
}
import { createContext } from "react";
import { useState } from "react";
import { getLocalStorage } from "../utilities/utilities";


export const StoreContext = createContext();

export const StoreContextProvider = ({children}) => {
    const [ openBag, setOpenBag ] = useState(false);

    const [ url, setUrl ] = useState("https://heliotrope-exultant-hisser.glitch.me/catalogo");

    const [ loading, setLoading ] = useState(true);

    const [ bagItens, setBagItens ] = useState(getLocalStorage("bag") || []);

    const [ historic, setHistoric ] = useState(getLocalStorage("historic") || []);

    const [ start, setStart ] = useState('');

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
        start, 
        setStart,
        checkout,
        setCheckout, 
        historic, 
        setHistoric,
        query, 
        setQuery
    }

    return (
        <StoreContext.Provider value={data}>
            {children}
        </StoreContext.Provider>
    )
}
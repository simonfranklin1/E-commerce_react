import { createContext, useEffect, useState } from "react";
import { getLocalStorage, saveLocalStorage } from "../utilities/utilities";


export const StoreContext = createContext();

export const StoreContextProvider = ({children}) => {

    const [ user, setUser ] = useState(null);

    const [ openBag, setOpenBag ] = useState(false);

    const [ url, setUrl ] = useState("https://api-franklinstore.vercel.app");

    const [ loading, setLoading ] = useState(false);

    const [ bagItems, setBagItems ] = useState(getLocalStorage("bag") || []);

    const [ checkout, setCheckout ] = useState('');

    const [ query, setQuery ] = useState('');

    useEffect(() => {
        const userData = getLocalStorage("user_db");

        if(userData) {
            setUser(userData);
        }
        
    }, []);

    const signUp = async ( name, email, password ) => {
        if(!name || !email || !password ) {
            return;
        } else {
            const res = await fetch(url + "/users");
            const users = await res.json();
                
            const alreadyRegistered = users.find((user) => user.email === email);

            if(alreadyRegistered) {
                window.alert("Email já cadastrado!");
                return;
            } else {
                const userData = {
                    name: name,
                    email: email,
                    password: password,
                    orders: [],
                    favorites: [],
                }
    
                try {
                    const res = await fetch(url + "/users", {
                        method: "POST",
                        headers: {
                            "Content-type" : "application/json"
                        },
                        body: JSON.stringify(userData)
                    });
    
                    setUser(userData);
                    saveLocalStorage("user_db", userData);
                    return res;
                } catch (error) {
                    console.log(error); 
                }
            }
        }

    }

    const signIn = async ( email, password ) => {
        if(!email && !password) {
            return;
        } else {
            try {
                const res = await fetch(url + "/users");
                const users = await res.json();
                
                const alreadyRegistered = users.find((user) => user.email === email && user.password === password);

                if(alreadyRegistered) {
                    setUser(alreadyRegistered);
                    saveLocalStorage("user_db", alreadyRegistered);
                }
                   
            } catch (error) {
                console.log(error);
            }
        }
    }

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
        setQuery, 
        signUp,
        signIn
    }

    return (
        <StoreContext.Provider value={data}>
            {children}
        </StoreContext.Provider>
    )
}
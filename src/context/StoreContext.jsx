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
        const userToken = getLocalStorage("user_token");
        const users = getLocalStorage("users_db");
        
        if(userToken && users) {
            const hasUser = users.find((user) => user.email === userToken.email)
            
            if(hasUser) setUser(hasUser);
            console.log(hasUser);
        }
    }, []);

    const signUp = ( name, email, password ) => {
        const users = getLocalStorage("users_db");

        const hasUser = users?.filter((user) => user.email === email);
        
        if(hasUser?.length) {
            window.alert("Já tem uma conta com esse E-mail");
        }

        const newUser = {
            name: name,
            email: email,
            password: password,
            orders: [],
            favorites: [],
        }

        if(users) {
            saveLocalStorage("users_db", [...users, newUser]);
        } else {
            saveLocalStorage("users_db", [newUser])
        }    

        const token = Math.random().toString(36).substring(2);

        setUser(newUser);
        saveLocalStorage("user_token", {email, token});
    }

    const signIn = ( email, password ) => {
        const users = getLocalStorage("users_db");

        const hasUser = users?.filter((user) => user.email === email);

        if(hasUser?.length) {
            if(hasUser[0].email === email && hasUser[0].password === password) {
                const token = Math.random().toString(36).substring(2);
                saveLocalStorage("user_token", {email, token});
                setUser(hasUser[0]);
                return true;
            } else {
                window.alert("E-mail ou senha incorretos");
                return false;
            }
        } else {
            window.alert("Usuário não cadastrado");
            return false;
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
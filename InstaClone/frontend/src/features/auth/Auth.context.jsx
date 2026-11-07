import { createContext, useContext, useState } from "react";

export const authContext = createContext()

export const AuthProvider = ({children})=>{
    const [loading, setLoading] = useState(false)
    const [loggedUser, setLoggedUser] = useState(null)

    return <authContext.Provider value={{loading, setLoading, loggedUser, setLoggedUser}}>
        {children}
    </authContext.Provider>
}

export const useAuthContext = ()=> useContext(authContext)
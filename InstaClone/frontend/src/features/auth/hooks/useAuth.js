import { useAuthContext } from "../auth.context"
import { getMeApi, loginApi, registerApi } from "../services/auth.api"

export const useAuth = ()=>{
    const {loading, setLoading, loggedUser, setLoggedUser} = useAuthContext()

    async function handleLogin(username, password) {
        setLoading(true)
        try {
            const data = await loginApi(username, password)
            setLoggedUser(data.user)
        } catch (error) {
            console.log(error.response?.data?.message || "Failed to login");
            throw error
        }finally{
            setLoading(false)
        }
    }

    async function handleRegister(username, email, password) {
        setLoading(true)
        try {
            const data = await registerApi(username, email, password)
            setLoggedUser(data.user)
        } catch (error) {   
             console.log(error.response?.data?.message || "Failed to register");
            throw error
        }finally{
            setLoading(false)
        }
    }

    async function fetchUser() {
        setLoading(true)
        try {
            const data = await getMeApi()
            setLoggedUser(data.user)
        } catch (error) {
            
        }finally{
            setLoading(false)
        }
    }

    return{
        handleLogin,
        handleRegister,
        fetchUser,
        loading,
        loggedUser
    }
}
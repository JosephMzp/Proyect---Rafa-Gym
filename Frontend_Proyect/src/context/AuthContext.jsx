import {createContext, useState, useContext, useEffect} from 'react'
import {registerRequest, LoginRequest, verityTokenRequet} from '../api/auth.js'
import Cookies from 'js-cookie';

export const authContext = createContext();

 export const useAuth = () => {
     const context = useContext(authContext)
     if(!context){
         throw new Error("useAuth must be used afafa")
     }
     return context;
 }

export const AuthProvider = ({children}) => {
    const [usuario, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [errors, setErrors] = useState([])
    const [loading, setLoading] = useState(true)

    const signup = async (usuario) => {
    try{
        const res = await registerRequest(usuario);
        console.log(res.data)
        //if(res.status === 200){
        setUser(res.data)
        setIsAuthenticated(true)
    }
    catch(error){
        console.log(error.response)
        setErrors(error.response.data)
    }}

     const signin = async (usuario) => {
         try{
             const res = await LoginRequest(usuario)
             setUser(res.data)
             setIsAuthenticated(true)   
             console.log(res)      
         }catch(error){
             console.log(error.response.data)
             if(Array.isArray(error.response.data)){
             return setErrors(error.response.data)
             }
             setErrors([error.response.data.message])
         }
     }

     const logout = () => {
         Cookies.remove("token");
         setIsAuthenticated(false);
         setUser(null);
     }

     useEffect(() => {
         if(errors.length > 0) {
             const timer = setTimeout(() => {
                 setErrors([])
             }, 5000)
             return () => clearTimeout(timer)
         }
     }, [errors])

     useEffect(() => {
          async function checkLogin() {
          const cookies = Cookies.get()
          if(!cookies.token){
              setIsAuthenticated(false)
              setLoading(false)
              return setUser(null)
          }
          try {
              const res = await verityTokenRequet(cookies.token)
              if(!res.data) {
                setIsAuthenticated(false);
                setLoading(false);
                return;
              }
              setIsAuthenticated(true)
              setUser(res.data); //
              setLoading(false);
          }catch(error){
              setIsAuthenticated(false)
              setUser(null)
              setLoading(false);
          }
      }
      checkLogin();
     }, [])

    return (
        <authContext.Provider value={{
            signup,
            usuario,
            signin,
             logout,
             loading,
             isAuthenticated,
             errors,
        }}>
            {children}
        </authContext.Provider>
    )
}
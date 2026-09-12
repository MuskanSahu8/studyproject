import { useContext, useEffect, useState } from "react";
import { createContext } from "react";
import apiClient from "../ApiClient/interceptor";
//auth file is used get acces to user ;

//1.create authcontext
 const AuthContext=createContext(null);
 //2.create auth provider & pass children
 export const AuthProvider=({children})=>{
    const [user,setUser]=useState(null);
    const [loading,setLoading]=useState(true);
    //3.get user
        const getUser=async()=>{
            try {
            const response= await apiClient.get("/user/get-user");
            console.log(response.data.data);
            setUser(response.data.user)
        } catch (error) {
         console.log("User not logged in");
         setUser(null);
    }finally{
        setLoading(false)
    }
 }
 //4.run when app starts
 useEffect(()=>{
   getUser();
 },[])

 //5.provide data to all components
 return(
 <AuthContext.Provider
    value={{
        user,
        setUser,
        loading,
        getUser}}
        >
        {children}
 </AuthContext.Provider>
 )
}
 //custom hook
 export const useAuth =()=>{
    return useContext(AuthContext);
 }
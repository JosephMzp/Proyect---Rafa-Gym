import { createContext, useContext, useState } from "react";
import {createMembresiasRequest, getMembresiasRequest, getMembresiaRequest, 
    deleteMembresiaRequest, updateMembresiaRequest} from '../api/membresia.js'

const MembresiaContext = createContext();

export const useMembresias = () => {
    const context = useContext(MembresiaContext);

    if(!context){
        throw new Error("Error")
    }
    return context;
}

export function MembresiaProvider({children}) {

    const [membresias, setMembresias] = useState([]);

    const getMembresias = async() => {
        try{
            const res = await getMembresiasRequest()
            setMembresias(res.data);
            console.log(res.data)
        }catch (error){
            console.log(error)
        }
    }

    const createMembresias = async (membresia) => { 
         try{
            const res = await createMembresiasRequest(membresia)
            console.log(res.data)
         }catch(error){
         console.log(error)
    }}

    const deleteMembresia = async(id) => {
        try{
            const res = await deleteMembresiaRequest(id);
            if(res.status == 204) setMembresias(membresias.filter(membresia => membresia._id != id))
        }catch(error){
            console.log(error)
        }
    }

    const getMembresia = async (id) => {
        try{
            const res = await getMembresiaRequest(id)
            return res.data
        }catch(error){
            console.log(error)
        }
    }

    const updateMembresia = async (id, membresia) => {
        try{
            await updateMembresiaRequest(id, membresia)
        }catch(error){
            console.log(error)
        }
    }

    return (
        <MembresiaContext.Provider 
        value={{
            membresias, createMembresias, getMembresias,deleteMembresia,getMembresia,updateMembresia}}>
            {children}
        </MembresiaContext.Provider>
    )
}
import { createContext, useContext, useState } from "react";
import {createSedesRequest, getSedesRequest, getSedeRequest, 
    deleteSedesRequest, updateSedesRequest} from '../api/sedes.js'

const SedeContext = createContext();

export const useSedes = () => {
    const context = useContext(SedeContext);

    if(!context){
        throw new Error("Error")
    }
    return context;
}

export function SedeProvider({children}) {

    const [sedes, setSedes] = useState([]);

    const getSedes = async() => {
        try{
            const res = await getSedesRequest();
            return res.data;
        }catch (error){
            console.log(error)
        }
    }

    const createSede = async (Sede) => { 
         try{
            const res = await createSedesRequest(sede)
            console.log(res.data)
         }catch(error){
         console.log(error)
    }}

    const deleteSede = async(id) => {
        try{
            const res = await deleteSedesRequest(id);
            if(res.status == 204) setSedes(sedes.filter(sede => sede._id != id))
        }catch(error){
            console.log(error)
        }
    }

    const getSede = async (id) => {
        try{
            const res = await getSedeRequest(id)
            return res.data
        }catch(error){
            console.log(error)
        }
    }

    const updateSede = async (id, sede) => {
        try{
            await updateSedesRequest(id, sede)
        }catch(error){
            console.log(error)
        }
    }

    return (
        <SedeContext.Provider 
        value={{
            sedes, createSede, getSedes,deleteSede,getSede,updateSede}}>
            {children}
        </SedeContext.Provider>
    )
}
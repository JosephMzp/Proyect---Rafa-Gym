import { createContext, useContext, useState } from "react";
import {createInvitadosRequest, getInvitadosRequest, getInvitadoRequest, 
    deleteInvitadoRequest, updateInvitadoRequest} from '../api/invitados.js'

const InvitadoContext = createContext();

export const useInvitados = () => {
    const context = useContext(InvitadoContext);

    if(!context){
        throw new Error("Error")
    }
    return context;
}

export function InvitadoProvider({children}) {

    const [invitados, setInvitados] = useState([]);
    const [total, setTotal] = useState(0);

    const getInvitados = async(page=1, limit=10) => {
        try{
            const res = await getInvitadosRequest(page, limit);
              console.log('Initados desde backend:', res.data.invitados);
            setTotal(res.data.total);
            setInvitados(res.data.invitados);
        }catch (error){
            console.log(error)
        }
    }

    const createInvitado = async (invitado) => { 
         try{
            const res = await createInvitadosRequest(invitado)
            console.log(res.data)
            console.log("Creando invitado desde contexto:", invitado);
         }catch(err){
            console.error("Error en createInvitado contexto:", err.response?.data?.message || err.message);
            throw err;
    }}

    const deleteInvitado = async(id) => {
        try{
            const res = await deleteInvitadoRequest(id);
            if(res.status == 204) setInvitados(invitados.filter(invitado => invitado._id != id))
        }catch(error){
            console.log(error)
        }
    }

    const getInvitado = async (id) => {
        try{
            const res = await getInvitadoRequest(id)
            return res.data
        }catch(error){
            console.log(error)
        }
    }

    const updateInvitado = async (id, invitado) => {
        try{
            await updateInvitadoRequest(id, invitado)
        }catch(error){
            console.log(error)
        }
    }

    return (
        <InvitadoContext.Provider 
        value={{
            invitados, total, createInvitado, getInvitados,deleteInvitado,getInvitado,updateInvitado}}>
            {children}
        </InvitadoContext.Provider>
    )
}
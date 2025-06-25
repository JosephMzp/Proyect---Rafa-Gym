import { createContext, useContext, useState } from "react";
import {createClientesRequest, getClientesRequest, getClienteRequest, 
    deleteClientesRequest, updateClientesRequest, getClientePorDniRequest} from '../api/clientes.js'

const ClienteContext = createContext();

export const useClientes = () => {
    const context = useContext(ClienteContext);

    if(!context){
        throw new Error("Error")
    }
    return context;
}

export function ClienteProvider({children}) {

    const [clientes, setClientes] = useState([]);

    const getClientes = async() => {
        try{
            const res = await getClientesRequest()
            setClientes(res.data);
            console.log(res.data)
        }catch (error){
            console.log(error)
        }
    }

    const createClientes = async (cliente) => { 
         try{
            const res = await createClientesRequest(cliente)
            console.log(res.data)
         }catch(error){
         console.log(error)
    }}

    const deleteCliente = async(id) => {
        try{
            const res = await deleteClientesRequest(id);
            if(res.status == 204) setClientes(clientes.filter(cliente => cliente._id != id))
        }catch(error){
            console.log(error)
        }
    }

    const getCliente = async (id) => {
        try{
            const res = await getClienteRequest(id)
            return res.data
        }catch(error){
            console.log(error)
        }
    }

     const getClienteDni = async(dni) => {
         try{
             const res = await getClientePorDniRequest(dni);
             return res.data
         }catch{
             console.log(error)
         }
     }

    const updateCliente = async (id, cliente) => {
        try{
            await updateClientesRequest(id, cliente)
        }catch(error){
            console.log(error)
        }
    }

    return (
        <ClienteContext.Provider 
        value={{
            clientes, createClientes, getClientes,deleteCliente,getCliente,updateCliente,getClienteDni}}>
            {children}
        </ClienteContext.Provider>
    )
}
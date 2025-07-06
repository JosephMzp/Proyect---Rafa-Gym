import { createContext, useContext, useState } from "react";
import {createPagosRequest, getPagosRequest, getPagoRequest, 
    deletePagoRequest, updatePagoRequest} from '../api/pagos.js'

const PagoContext = createContext();

export const usePagos = () => {
    const context = useContext(PagoContext);

    if(!context){
        throw new Error("Error")
    }
    return context;
}

export function PagoProvider({children}) {

    const [pagos, setPagos] = useState([]);
    const [total, setTotal] = useState(0);

    const getPagos = async(page = 1, limit = 10) => {
        try {
              const res = await getPagosRequest(page, limit);
              console.log('Pagos desde backend:', res.data.pagos);
              setPagos(res.data.pagos);
              setTotal(res.data.total);
            } catch (error) {
              console.log(error);
            }
    }

    const createPagos = async (pago) => { 
         try{
            const res = await createPagosRequest(pago)
            console.log(res.data)
         }catch(error){
         console.log(error)
    }}

    const deletePago = async(id) => {
        try{
            const res = await deletePagoRequest(id);
            if(res.status == 204) setPagos(pagos.filter(pago => pago._id != id))
        }catch(error){
            console.log(error)
        }
    }

    const getPago = async (id) => {
        try{
            const res = await getPagoRequest(id)
            return res.data
        }catch(error){
            console.log(error)
        }
    }

    const updatePago = async (id, pago) => {
        try{
            await updatePagoRequest(id, pago)
        }catch(error){
            console.log(error)
        }
    }

    return (
        <PagoContext.Provider 
        value={{
            pagos, createPagos, getPagos,deletePago,getPago,updatePago}}>
            {children}
        </PagoContext.Provider>
    )
}
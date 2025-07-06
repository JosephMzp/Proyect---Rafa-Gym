import {useForm} from 'react-hook-form'
import { useClientes } from '../context/ClientesContext.jsx';
import { useNavigate, useParams} from 'react-router-dom';
import { useEffect } from 'react';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc'
 dayjs.extend(utc)

function RegistroClientes({mode}) {
    
    const {register, handleSubmit, setValue, formState: { errors }} = useForm();
     const {createClientes, getCliente, updateCliente, clientes} = useClientes();
     const navigate = useNavigate();
     const handleClose = () => navigate(-1, { replace: true });
     const params = useParams();
     const isViewMode = mode === "view";

     useEffect(() => {
     async function loadCliente(){
         if(params.id) {
             const cliente = await getCliente(params.id)
             setValue('dni', cliente.dni)
             setValue('nombre', cliente.nombre)
             setValue('apellidos', cliente.apellidos)
             setValue('telefono', cliente.telefono)
             setValue('email', cliente.email)
             //setValue("date", dayjs(task.date).utc().format("YYYY-MM-DD"));
         }
     }
     loadCliente()
     }, [])

    const onSumit = handleSubmit((data) => {
          const dataValid = {
              ...data,
              dni: Number(data.dni),
              telefono: Number(data.telefono),

        }
        
          if(params.id) {
              updateCliente(params.id, dataValid)
          }else {
              createClientes(dataValid)
          }
         navigate('/clientes')
    })

    return (
        <div className='flex h-[calc(100vh-100px)] items-center justify-center'>
        <div className='relative  bg-zinc-800 max-w-md w-full p-10 rounded-md'>
            <button
          onClick={handleClose}
          className="absolute top-2 right-2 bg-red-600 px-3 py-2 text-gray-400 hover:text-white"
          title="Cerrar">✕</button>
            <form onSubmit={!isViewMode ? onSumit : undefined}>
            <label htmlFor='dni'>DNI</label>
            <input disabled={isViewMode} type="text" placeholder="DNI"
            {...register('dni', { required: true })}
            className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
            autoFocus
            />

            <label htmlFor='nombre'>Nombres</label>
            <input disabled={isViewMode} type="text" placeholder="Nombres"
            {...register("nombre", { required: true })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            />
            {errors.nombre && <p className="text-red-500">Se requiere nombre</p>}

            <label htmlFor='apellidos'>Apellidos</label>
            <input disabled={isViewMode} type="text" placeholder="Apellidos"
            {...register("apellidos", { required: true })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            />
            {errors.apellidos && <p className="text-red-500">Se requiere apellidos</p>}

            <label htmlFor='telefono'>Teléfono</label>
            <input disabled={isViewMode} type="text" placeholder="Teléfono"
            {...register("telefono", { required: true })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            />
            {errors.telefono && <p className="text-red-500">Se requiere telefono</p>}

            <label htmlFor='email'>Email</label>
            <input disabled={isViewMode} type="email" placeholder="Email"
            {...register("email", { required: true })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            />
            {errors.email && <p className="text-red-500">Email is Requerido</p>}
            {!isViewMode && (
            <button className='bg-indigo-500 px-3 py-2 rounded-md'>
                Save
            </button>)}
            </form>
        </div>
    </div>
    )
}

export default RegistroClientes
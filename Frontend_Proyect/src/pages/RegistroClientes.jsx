import {useForm} from 'react-hook-form'
import { useClientes } from '../context/ClientesContext.jsx';
import { useNavigate, useParams, Link} from 'react-router-dom';
import { HiArrowLeft } from 'react-icons/hi';
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
  <div className="relative flex justify-center items-start bg-gradient-to-br from-zinc-900 to-zinc-800 z-10"
  style={{ minHeight: 'calc(100vh - 100px)', paddingTop: '1rem' }}>
    <div className="relative bg-zinc-700 max-w-md w-full p-8 rounded-xl shadow-xl z-20">
      <Link
        to="/clientes"
        className="absolute top-4 right-4 z-30 w-40 h-10 gap-2 bg-sky-600 hover:bg-sky-700 flex items-center justify-center rounded focus:outline-none"
      >
        <HiArrowLeft className="w-5 h-5" />
        Volver a clientes
      </Link>
      <h2 className="text-2xl font-bold text-center mb-4 mt-8">
        {isViewMode ? 'Ver Cliente' : 'Registrar Cliente'}
      </h2>

      <form onSubmit={!isViewMode ? onSumit : undefined} className="space-y-4">
        {[
          { id: 'dni', label: 'DNI', type: 'text' },
          { id: 'nombre', label: 'Nombres', type: 'text' },
          { id: 'apellidos', label: 'Apellidos', type: 'text' },
          { id: 'telefono', label: 'Teléfono', type: 'text' },
          { id: 'email', label: 'Email', type: 'email' },
        ].map(({ id, label, type }) => (
          <div key={id}>
            <label htmlFor={id} className="block text-sm font-medium text-gray-200">
              {label}
            </label>
            <input
              disabled={isViewMode}
              type={type}
              placeholder={label}
              {...register(id, { required: true })}
              className="mt-1 w-full bg-zinc-600 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
            {errors[id] && (
              <p className="text-red-400 text-sm mt-1">El campo {label} es obligatorio</p>
            )}
          </div>
        ))}

        {!isViewMode && (
          <button
            type="submit"
            className="w-full bg-sky-600 hover:bg-sky-700 text-white py-2 rounded-md font-medium transition"
          >
            Guardar Cliente
          </button>
        )}
      </form>
    </div>
  </div>
);
}

export default RegistroClientes
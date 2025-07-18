import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import {Link, useNavigate} from 'react-router-dom'
import { useEffect } from 'react';

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signin, errors: signinErrors, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const onSubmit = handleSubmit((data) => {
    signin(data);
  });

   useEffect(() => {
     if(isAuthenticated) {navigate('/datos')}
   }, [isAuthenticated])

  return (
    <div className="flex h-[calc(100vh-100px)] items-center justify-center">
      <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
        {Array.isArray(signinErrors) &&
          signinErrors.map((error, i) => (
            <div key={i} className="bg-red-500 p-2 text-white text-center my-2">
              {typeof error === "string" ? error : error.message}
            </div>
          ))}

        <h1 className="text-3xl font-bold my-2">Login</h1>
        <form onSubmit={onSubmit}>
          <input
            type="email"
            {...register("email", { required: true })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Email"
          />
          {errors.email && <p className="text-red-500">Email is Requerido</p>}

          <input
            type="password"
            {...register("password", { required: true })}
            className="w-full  bg-zinc-700  text-white px-4 py-2 rounded-md my-2"
            placeholder="Password"
          />
          {errors.password && (
            <p className="text-red-500">Password is Requerido</p>
          )}

          <button
            type="submit"
            className="bg-sky-500 text-white px-4 py-2 rounded-md my-2"
          >
            Login
          </button>
        </form>
         <p className='flex gap-x-2 justify-between'>
              ¿No tienes una cuenta? <Link to='/register' 
              className='text-sky-500'>Registrate</Link>
          </p> 
      </div>
    </div>
  );
}

export default LoginPage;

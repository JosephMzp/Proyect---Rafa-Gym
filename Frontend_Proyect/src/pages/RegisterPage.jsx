import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext.jsx";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const {
    signup,
    usuario,
    isAuthenticated,
    errors: RegisterErrors,
  } = useAuth();

  const navigate = useNavigate();

  const onSubmit = handleSubmit(async (values) => {
    signup(values);
  });

  useEffect(() => {
    if (isAuthenticated) {navigate("/tasks")};
  }, [isAuthenticated]);

  return (
    <div className="flex h-[calc(100vh-100px)] items-center justify-center">
      <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
        <h1 className="text-3xl font-bold my-2">Registro</h1>
        {Array.isArray(RegisterErrors) &&
          RegisterErrors.map((error, i) => (
            <div key={i} className="bg-red-500 p-2 text-white text-center my-2">
              {error}
            </div>
          ))}
        <form onSubmit={onSubmit}>
          <input
            type="text"
            {...register("username", { required: true })}
            className="w-full bg-zinc-700  text-white px-4 py-2 rounded-md my-2"
            placeholder="Username"
          />
          {errors.username && (
            <p className="text-red-500">Username es Requerido</p>
          )}

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
          
          <select
            type="text"
            {...register("rol", { required: true })}
            className="w-full  bg-zinc-700  text-white px-4 py-2 rounded-md my-2"
            placeholder="Rol"
          >
            <option value="">Selecciona un rol</option>
            <option value="Admin">Admin</option>
            <option value="Recepcionista">Recepcionista</option>
            <option value="Entrenador">Entrenador</option>
          </select>
          {errors.rol && <p className="text-red-500">Rol is Requerido</p>}

          <button
            type="submit"
            className="bg-sky-500 text-white px-4 py-2 rounded-md my-2"
          >
            Register
          </button>
        </form>
        <p className="flex gap-x-2 justify-between">
          ¿Ya tienes una cuenta?{" "}
           <Link to="/login" className="text-sky-500">
          Login
        </Link> 
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;

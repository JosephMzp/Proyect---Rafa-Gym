import {BrowserRouter,Routes, Route, NavLink} from 'react-router-dom'
import {AuthProvider} from './context/AuthContext.jsx'

import RegisterPage from './pages/RegisterPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import TasksPage from './pages/TasksPage.jsx'
import TaskFormPage from './pages/TaskFormPage.jsx'
import ProfilePage from './pages/ProfilePage.jsx'
import HomePage from './pages/HomePage.jsx'
import UsuariosPage from './pages/UsuariosPage.jsx'

import ProtectedRoute from './ProtectedRoute.jsx'
import { TaskProvider } from './context/TasksContext.jsx'
import Navbar from './components/Navbar.jsx'
import ClientesPage from './pages/ClientesPage.jsx'
import { ClienteProvider } from './context/ClientesContext.jsx'
import RegistroClientes from './pages/RegistroClientes.jsx'
import LayoutPrivado from './LayoutPrivado.jsx'
import AsistenciasPage from './pages/AsistenciasPage.jsx'
import RegistrarAsistencia from './pages/RegistrarAsistencia.jsx'
import { AsistenciaProvider } from './context/AsistenciaContext.jsx'
import { SedeProvider } from './context/SedesContext.jsx'

function App(){
  return (
 <AuthProvider>
  <ClienteProvider>
      <TaskProvider>
        <AsistenciaProvider>
          <SedeProvider>
         <BrowserRouter>
         <main className='container mx-auto'>
         <Navbar/>
          <Routes>
           <Route path='/' element={<HomePage/>} />
           <Route path='/login' element={<LoginPage/>} />
           <Route path='/register' element={<RegisterPage/>} />

          <Route element={<ProtectedRoute/>}>
          <Route element={<LayoutPrivado />}>
           <Route path='/tasks' element={<TasksPage/>} />
           <Route path='/add-task' element={<TaskFormPage/>} />
           <Route path='/tasks/:id' element={<TaskFormPage/>} />
           <Route path='/profile' element={<ProfilePage/>} />
           <Route path='/usuarios' element={<UsuariosPage/>} />
           <Route path='/clientes' element={<ClientesPage/>} />
           <Route path='/add-clientes' element={<RegistroClientes/>} />
           <Route path='/asistencias' element={<AsistenciasPage/>} />
           <Route path='/add-asistencias' element={<RegistrarAsistencia/>} />
          </Route>
          </Route>
          </Routes>
          </main>
         </BrowserRouter>
         </SedeProvider>
         </AsistenciaProvider>
      </TaskProvider>
      </ClienteProvider>
  </AuthProvider>

  );
}

export default App
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
import MembresiasPage from './pages/MembresiasPage.jsx'
import { MembresiaProvider } from './context/MembresiaContext.jsx'
import PagosPage from './pages/PagosPage.jsx'
import { PagoProvider } from './context/PagosContext.jsx'
import InvitadosPage from './pages/InvitadosPage.jsx'
import { InvitadoProvider } from './context/InvitadosContext.jsx'
import RegistrarInvitado from './pages/RegistrarInvitados.jsx'
import RegistrarPagos from './pages/RegistrarPagos.jsx'
import VerPago from './pages/VerPagoPage.jsx'
import DatosPage from './pages/DatosPage.jsx'
import VerInvitado from './pages/VerInvitado.jsx'
import VerMembresia from './pages/VerMembresia.jsx'
import EditarMembresia from './pages/EditarMembresia.jsx'

function App(){
  return (
 <AuthProvider>
  <ClienteProvider>
      <TaskProvider>
        <AsistenciaProvider>
          <SedeProvider>
            <MembresiaProvider>
              <PagoProvider>
                <InvitadoProvider>
         <BrowserRouter>
         <main className='container mx-auto'>
         <Navbar/>
          <Routes>
           <Route path='/' element={<HomePage/>} />
           <Route path='/login' element={<LoginPage/>} />
           <Route path='/register' element={<RegisterPage/>} />

          <Route element={<ProtectedRoute/>}>
          <Route element={<LayoutPrivado />}>
           <Route path='/datos' element={<DatosPage/>} />
           <Route path='/tasks' element={<TasksPage/>} />
           <Route path='/add-task' element={<TaskFormPage/>} />
           <Route path='/tasks/:id' element={<TaskFormPage/>} />
           <Route path='/profile' element={<ProfilePage/>} />
           <Route path='/usuarios' element={<UsuariosPage/>} />
           <Route path='/clientes' element={<ClientesPage/>} />
           <Route path='/add-clientes' element={<RegistroClientes/>} />
           <Route path='/clientes/:id' element={<RegistroClientes/>} />
           <Route path='/clientes/ver/:id' element={<RegistroClientes mode="view"/>} />
           <Route path='/asistencias' element={<AsistenciasPage/>} />
           <Route path='/add-asistencias' element={<RegistrarAsistencia/>} />
           <Route path='/invitados' element={<InvitadosPage/>} />
           <Route path='/invitados/:id' element={<VerInvitado/>} />
           <Route path='/invitados/nuevo' element={<RegistrarInvitado/>} />
           <Route path='/membresias' element={<MembresiasPage/>} />
           <Route path='/membresias/:id' element={<VerMembresia/>} />
           <Route path='/edit-membresias/:id' element={<EditarMembresia/>} />
           <Route path='/pagos' element={<PagosPage/>} />
           <Route path='/add-pagos' element={<RegistrarPagos/>} />
           <Route path='/pagos/:id' element={<VerPago/>} />    
          </Route>
          </Route>
          </Routes>
          </main>
         </BrowserRouter>
         </InvitadoProvider>
         </PagoProvider>
         </MembresiaProvider>
         </SedeProvider>
         </AsistenciaProvider>
      </TaskProvider>
      </ClienteProvider>
  </AuthProvider>

  );
}

export default App
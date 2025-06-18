import {Link} from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Navbar() {

    const {isAuthenticated, logout, usuario} = useAuth();

    return (
        <nav className="bg-zinc-700  flex justify-between py-4 px-10">
            <Link to={
                isAuthenticated ? "/tasks" : "/"
            }>
            <h1 className="text-2xl font-bold">Rafa Gym</h1>
            </Link>
            <ul className="flex gap-x-2">
                {isAuthenticated ? (
                <>
                    <li>
                     Wellcome {usuario.username}
                    </li>
                    <li>
                     <Link to='/add-task'
                     className='bg-green-400 px-4 py-1 rounded-sm'>Añade tarea</Link>
                    </li>
                    <li>
                     <Link to='/'
                     className='bg-green-400 px-4 py-1 rounded-sm' onClick={() => {logout();}}
                     >Logout</Link>
                    </li>
                </>
                ) : (
                <>
                    <li>
                     <Link to='/login' 
                     className='bg-indigo-500 px-4 py-1 rounded-sm'>Login</Link>
                    </li>
                    <li>
                     <Link to='/register'
                     className='bg-indigo-500 px-4 py-1 rounded-sm'>Register</Link>
                    </li>
                </>
                )}
            </ul>
        </nav>
    )
}

export default Navbar
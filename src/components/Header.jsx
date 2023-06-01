import { Link } from "react-router-dom"
import useAuth from "../hooks/useAuth"

export const Header = () => {

  const {cerrarSesion}= useAuth();
  
  return (
    <header className="py-10 bg-indigo-600">
        <div className="container flex flex-col items-center justify-between mx-auto lg:flex-row">
            <h1 className="text-2xl font-bold text-center text-indigo-200">Administrador de Pacientes de {''} <span className="text-2xl font-black text-white"> Veterinaria</span>
            </h1>

            <nav className="flex flex-col items-center gap-4 mt-5 lg:flex-row lg:mt-0">
                <Link to ='/admin'className="text-sm font-bold text-white uppercase">Pacietnes</Link>
                <Link to ='/admin/perfil'className="text-sm font-bold text-white uppercase">Perfil</Link>
             

             <button type="button" className="text-sm font-bold text-white uppercase"
             onClick={cerrarSesion}
             >Cerrar Sesion
             </button>
            </nav>
        </div>

    </header>
  )
}

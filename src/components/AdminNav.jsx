import { Link } from "react-router-dom"
export const AdminNav = () => {
  return (
    <>
    
        <nav className="flex gap-3 ">

            <Link className="font-bold text-gray-500 uppercase" to='/admin/perfil'>Perfil</Link>
            |
            <Link className="font-bold text-gray-500 uppercase" to='/admin/cambiar-password'>Cambiar Password</Link>

        </nav>
    </>
  )
}

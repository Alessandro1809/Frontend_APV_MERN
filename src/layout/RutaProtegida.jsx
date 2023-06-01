import { Outlet,Navigate } from "react-router-dom"
import useAuth from "../hooks/useAuth"
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
export const RutaProtegida = () => {
    const {Auth,cargando}= useAuth();
    console.log(Auth);

    if (cargando) return 'Cargando....'

    return (
    <>
      <Header/>

       {Auth?._id ? (
      <main className="container mx-auto mt-10">
        <Outlet/>
      </main> 
      ): <Navigate to='/' />}
      <Footer/>
    
    </>
   
  )
}

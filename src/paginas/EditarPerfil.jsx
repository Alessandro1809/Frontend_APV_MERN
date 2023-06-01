import { AdminNav } from "../components/AdminNav";
import useAuth from '../hooks/useAuth'
import { useEffect, useState} from "react";
import { Alerta } from '../components/Alerta';


export const EditarPerfil = () => {
const {Auth, actualizarPerfil}= useAuth();
const [perfil,setPerfil]= useState({});
const [alerta, setAlerta]= useState({});
useEffect(()=>{
setPerfil(Auth) 


},[Auth]);

const handleSubmit= async e=>{
    e.preventDefault();

    const {nombre, email}= perfil;
    if ([nombre,email].includes('')) {
      setAlerta({mensaje:'Email y Nombre son obligatorios', error:true})
      return;
    }

   const resultado = await actualizarPerfil(perfil);
   setAlerta(resultado);
}   
const {mensaje}= alerta;
  return (
    <>
        <AdminNav/> 
        
        <h2 className="mt-10 text-3xl font-black text-center" >Editar Perfil</h2>
    <p className="mt-5 mb-10 text-xl text-center">Edita tu {''} <span className="font-bold text-indigo-600">Informacion</span></p>

    <div className="flex justify-center">
        <div className="w-full p-5 bg-white rounded-lg shadow-md md:w-1/2">
            
            {mensaje && <Alerta
                alerta={alerta}
            />}
            <form 
            onSubmit={handleSubmit}>
                <div className="my-3">
                    <label htmlFor="nombre" className="font-bold text-gray-600 uppercase">Nombre</label>    
                    <input type="text" className="w-full p-2 mt-5 border rounded-lg bg-gray-50"
                    name="nombre"
                    value={perfil.nombre||''}
                    onChange={e=>setPerfil({
                        ...perfil,
                        [e.target.name] : e.target.value
                    })}/>
                </div>
                <div className="my-3">
                    <label htmlFor="web" className="font-bold text-gray-600 uppercase">Sitio web</label>    
                    <input type="text" className="w-full p-2 mt-5 border rounded-lg bg-gray-50"
                    name="web"
                    value={perfil.web||''}
                    onChange={e=>setPerfil({
                        ...perfil,
                        [e.target.name] : e.target.value
                    })}/>
                </div>
                <div className="my-3">
                    <label htmlFor="telefono" className="font-bold text-gray-600 uppercase">Telefono</label>    
                    <input type="text" className="w-full p-2 mt-5 border rounded-lg bg-gray-50"
                    name="telefono"
                    value={perfil.telefono||''}
                    onChange={e=>setPerfil({
                        ...perfil,
                        [e.target.name] : e.target.value
                    })}/>
                </div>
                <div className="my-3">
                    <label htmlFor="email" className="font-bold text-gray-600 uppercase">Email</label>    
                    <input type="email" className="w-full p-2 mt-5 border rounded-lg bg-gray-50"
                    name="email"
                    value={perfil.email||''}
                    onChange={e=>setPerfil({
                        ...perfil,
                        [e.target.name] : e.target.value
                    })}/>
                </div>

                <input type="submit" className="w-full px-10 py-3 mt-5 font-bold text-white uppercase transition-colors bg-indigo-700 rounded-lg hover:cursor-pointer hover:bg-indigo-900" value='Guardar cambios' />
                
            </form>    
        </div> 
    </div>
    </>
  )
}

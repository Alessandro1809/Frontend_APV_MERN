import { useState } from "react";
import { AdminNav } from "../components/AdminNav";
import { Alerta } from "../components/Alerta";
import useAuth from "../hooks/useAuth";
export const CambiarPasswoord = () => {
const {guardarPassword}= useAuth();
const [alerta,setAlerta]= useState({});
const [password,setPassword]= useState({
    pwd_actual:'',
    pwd_nuevo:''

});


    const {mensaje}=alerta;
    

const handleSubmit= async (e)=>{
    e.preventDefault();
    if (Object.values(password).some(campo=> campo==="")) {
        setAlerta({mensaje:"Todos los campos son obligatorios!",error:true})

        return;
    }

    if (password.pwd_nuevo.length< 6) {
        setAlerta({mensaje:"El password debe tener minimo 6 caracteres",error:true})

    }
    const resultado = await guardarPassword(password);
    setAlerta(resultado);
}
  return (
    <>
    <AdminNav/>

    <h2 className="mt-10 text-3xl font-black text-center">Cambiar Password</h2>
    <p className="mt-5 mb-10 text-xl text-center">Modifica tu {''} <span className="font-bold text-indigo-600">Password</span></p>
    <div className="flex justify-center">
        <div className="w-full p-5 bg-white rounded-lg shadow-md md:w-1/2">
            
            {mensaje && <Alerta
                alerta={alerta}
            />}
            <form 
            onSubmit={handleSubmit}>
                <div className="my-3">
                    <label htmlFor="nombre" className="font-bold text-gray-600 uppercase">Password Actual</label>    
                    <input type="password" className="w-full p-2 mt-5 border rounded-lg bg-gray-50"
                    placeholder="Escribe tu password actual"
                    name="pwd_actual"
                    onChange={e=>setPassword({
                            ...password,
                            [e.target.name]:e.target.value
                        
                    })}/>
                    
                </div>
                
                <div className="my-3">
                    <label htmlFor="nombre" className="font-bold text-gray-600 uppercase">Nuevo Password</label>    
                    <input type="password" className="w-full p-2 mt-5 border rounded-lg bg-gray-50"
                    placeholder="Escribe tu nuevo password"
                    name="pwd_nuevo"
                    onChange={e=>setPassword({
                        ...password,
                        [e.target.name]:e.target.value
                    
                    })}/>
                    
                </div>

                <input type="submit" className="w-full px-10 py-3 mt-5 font-bold text-white uppercase transition-colors bg-indigo-700 rounded-lg hover:cursor-pointer hover:bg-indigo-900" value='Actualizar Password' />
                
                
            </form> 
               
        </div> 
    </div>
</>
  )
}

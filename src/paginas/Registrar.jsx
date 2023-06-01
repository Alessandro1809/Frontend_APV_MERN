import { Link } from "react-router-dom"
import { useState } from "react"
import { Alerta } from "../components/Alerta";
import clienteAxios from "../config/axios";
export const Registrar = () => {

const [nombre, setNombre]= useState('');
const [email,setEmail]=useState('');
const [password,setPassword]=useState('');
const [confirmaPassword,setConfirmaPassword]=useState('');
const [alerta, setAlerta]=useState({});

const handleSubmit = async e=>{
e.preventDefault();
if ([nombre, email,password,confirmaPassword].includes('')) {
    setAlerta({mensaje:'Parece que alguno de los campos esta vacio',error:true});
    return;
}
if (password !== confirmaPassword) {
    setAlerta({mensaje:'Las passwords deben ser iguales!',error:true});

    return;
}
if (password.length<6) {
    setAlerta({mensaje:'El password que ingresaste es muy corto, agrega mas de 6 caracteres', error:true});
    return;
}

setAlerta({});

//crear el usuario en la API

try {

  await clienteAxios.post('/veterinarios', {nombre,email,password});
   setAlerta({mensaje:'Creado Correctamente, revisa tu correo', error:false});

    
} catch (error) {
    console.log(error.response)
  setAlerta({mensaje:error.response.data.msg,error:true});
}



}
const {mensaje}= alerta;
  return (
    <>
         <div>
                <h1 className="text-6xl font-black text-indigo-600" >Crea tu cuenta y administra tus{" "}<span className="text-black">Pacientes</span></h1>
            </div>
             <div className="px-5 py-10 mt-20 bg-white shadow-lg md:mt-5 rounded-xl">
                {mensaje&&<Alerta
                    alerta={alerta}
                />  }
                <form onSubmit={handleSubmit}
                 >
                    <div className="my-5">
                        <label className="block font-bold text-gray-600 uppercase txt-xl">Nombre:</label>
                        <input type="text" 
                                placeholder="Tu nombre"
                                className="w-full p-3 mt-3 border bg-gray-50 rounded-xl"
                                value={nombre}
                                onChange={e=> setNombre(e.target.value)}
                        />
                    </div>
                    <div className="my-5">
                        <label className="block font-bold text-gray-600 uppercase txt-xl">Email:</label>
                        <input type="email" 
                                placeholder="Email de registro"
                                className="w-full p-3 mt-3 border bg-gray-50 rounded-xl"
                                value={email}
                                onChange={e=> setEmail(e.target.value)}
                        />
                    </div>
                    <div className="my-5">
                        <label className="block font-bold text-gray-600 uppercase txt-xl">Password:</label>
                        <input type="password" 
                                placeholder="Ingresa tu password"
                                className="w-full p-3 mt-3 border bg-gray-50 rounded-xl"
                                value={password}
                                onChange={e=>setPassword(e.target.value)}
                        />
                    </div>
                    <div className="my-5">
                        <label className="block font-bold text-gray-600 uppercase txt-xl">Confirma tu password:</label>
                        <input type="password" 
                                placeholder="Repite tu password"
                                className="w-full p-3 mt-3 border bg-gray-50 rounded-xl"
                                value={confirmaPassword}
                                onChange={e=>setConfirmaPassword(e.target.value)}
                        />
                    </div>

                    <input type="submit" value='Crear cuenta' className="w-full px-10 py-3 mt-5 font-bold text-white uppercase bg-indigo-700 rounded-xl hover:cursor-pointer hover:bg-indigo-500 md:w-auto" />
                </form>
                <nav className="mt-10 lg:flex lg:justify-between">
                    <Link className="block my-5 text-center text-gray-500" 
                        to="/">¿Ya tienes una cuenta? Inicia Sesion </Link>
                    <Link className="block my-5 text-center text-gray-500"
                        to="/OlvidePassword">Olvide mi password</Link>
                </nav>
                
            </div>
    </>
  )
}


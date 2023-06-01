
import { useState } from "react";
import { Link, useNavigate} from "react-router-dom";
import { Alerta } from "../components/Alerta";
import useAuth from "../hooks/useAuth";
import clienteAxios from "../config/axios";

const Login = () => {

    //States
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [alerta,setAlerta]= useState({});
    
    const {setAuth}= useAuth();  

const {mensaje}= alerta;
const navigate= useNavigate();

const handleSubmit= async (e)=>{
    e.preventDefault();

    if ([email,password].includes('')) {
        setAlerta({mensaje:'Todos los campos son requeridos', error:true})
        return;
    }

    try {
        const {data} = await clienteAxios.post('/veterinarios/login',{email,password});
        localStorage.setItem('token', data.token);
        setAuth(data);
        navigate('/admin');
    } catch (error) {
      setAlerta({mensaje: error.response.data.msg,error:true});
    }
    
};
  return (
    <>
            <div>
                <h1 className="text-6xl font-black text-indigo-600" >Inicia Sesion y Administra tus{" "}<span className="text-black">Pacientes</span></h1>
            </div>
            <div className="px-5 py-10 mt-20 bg-white shadow-lg md:mt-5 rounded-xl">
            {mensaje && <Alerta
                alerta={alerta}
                />}
                <form onSubmit={handleSubmit} >
                    <div className="my-5">
                        <label className="block font-bold text-gray-600 uppercase txt-xl">Email:</label>
                        <input type="email" 
                                placeholder="Email de registro"
                                className="w-full p-3 mt-3 border bg-gray-50 rounded-xl"
                                value={email}
                                onChange={e=>setEmail(e.target.value)}
                        />
                    </div>
                    <div className="my-5">
                        <label className="block font-bold text-gray-600 uppercase txt-xl">Password:</label>
                        <input type="password" 
                                placeholder="Ingresa tu password"
                                className="w-full p-3 mt-3 border bg-gray-50 rounded-xl"
                                value={password}
                                onChange={e=> setPassword(e.target.value)}
                        />
                    </div>

                    <input type="submit" value='Iniciar Sesion' className="w-full px-10 py-3 mt-5 font-bold text-white uppercase bg-indigo-700 rounded-xl hover:cursor-pointer hover:bg-indigo-500 md:w-auto" />
                </form>
                <nav className="mt-10 lg:flex lg:justify-between">
                    <Link className="block my-5 text-center text-gray-500" 
                        to="/registrar">¿No tienes una cuenta aún? Registrate gratis</Link>
                    <Link className="block my-5 text-center text-gray-500"
                        to="/OlvidePassword">Olvide mi password</Link>
                </nav>
            </div>

    </>
  )
}

export default Login
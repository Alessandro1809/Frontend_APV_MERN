import { Link } from "react-router-dom"
import { useState } from "react"
import clienteAxios from "../config/axios"
import { Alerta } from "../components/Alerta"
const OlvidePassword = () => {

const [email,setEmail]=useState('');
const [alerta,setAlerta]= useState({});

const handleSubmit= async (e)=>{
    e.preventDefault();
    
    if (email===''|| email.length< 6 ) {
        setAlerta({mensaje: 'El email es obligatorio',error:true});

        setTimeout(() => {
            setAlerta({});
        }, 3000);
        return;
    }
    try {
            const {data}= await clienteAxios.post('/veterinarios/olvide-password',{email});

            setAlerta({mensaje:data.msg})
            setTimeout(() => {
                setAlerta({});
            }, 5000);
    } catch (error) {
        setAlerta({mensaje: error.response.data.msg,error:true});

        setTimeout(() => {
            setAlerta({});
        }, 3000);
    }
    
}
    const {mensaje}=alerta;
  return (
    <>
       <div>
                <h1 className="text-6xl font-black text-indigo-600" >Recupera tu acceso y no pierdas tus {" "}<span className="text-black">Pacientes</span></h1>
            </div>
            <div className="px-5 py-10 mt-20 bg-white shadow-lg md:mt-5 rounded-xl">
            {mensaje&&<Alerta
                    alerta={alerta}
                />  }
                <form 
                onSubmit={handleSubmit}>
                    <div className="my-5">
                        <label className="block font-bold text-gray-600 uppercase txt-xl">Ingresa el email:</label>
                        <input type="email" 
                                placeholder="email de recuperacion"
                                className="w-full p-3 mt-3 border bg-gray-50 rounded-xl"
                                value={email}
                                onChange={e=>setEmail(e.target.value)}
                        />
                    </div>
                    <input type="submit" value='Enviar mail de recuperacion' className="w-full px-10 py-3 mt-5 font-bold text-white uppercase bg-indigo-700 rounded-xl hover:cursor-pointer hover:bg-indigo-500 md:w-full" />
                </form>
                <nav className="mt-10 lg:flex lg:justify-between">
                    <Link className="block my-5 text-center text-gray-500" 
                        to="/">¿Ya tienes una cuenta? Inicia Sesion </Link>
                    <Link className="block my-5 text-center text-gray-500" 
                        to="/registrar">¿No tienes una cuenta aún? Registrate gratis</Link>
                </nav>
            </div>
    </>
  )
}

export default OlvidePassword
import { useEffect, useState} from 'react'
import { useParams, Link } from 'react-router-dom'
import { Alerta } from '../components/Alerta';
import clienteAxios from '../config/axios'

export const ConfirmarCuenta = () => {
    const [cuentaConfirmada, setCuentaConfirmada] = useState(false)
    const [cargando, setCargando] = useState(true);
    const [alerta, setAlerta] = useState({});

    const params = useParams();
    const {id} = params;

    useEffect(() => {
        const confirmarCuenta = async () => {
          try {
            const url = `/veterinarios/confirmar/${id}`;
            const {data} = await clienteAxios(url);
            setCuentaConfirmada(true)
            
            setTimeout(() => {
              setAlerta({
                mensaje: data.msg
              });
            }, 200);
            
        
          } catch (error) {
            setAlerta({
              mensaje: error.response.data.msg,
              error: true
            });
          }

          setCargando(false)
        }
        confirmarCuenta();
    }, []);

    return (
        <>
          <div>
                <h1 className="text-6xl font-black text-indigo-600">
                    Confirma tu Cuenta y Comienza a Administrar  {""} 
                    <span className="text-black">tus Pacientes</span>
                </h1>
            </div>

            <div className='px-5 py-10 mt-20 bg-white shadow-lg md:mt-5 rounded-xl'>
                {!cargando &&  
                  <Alerta 
                    alerta={alerta}
                  />}

                  {cuentaConfirmada && (
                    <Link
                      className='block my-5 text-center text-gray-500'
                      to="/">Iniciar Sesión</Link>
                  ) }
            </div>
        </>
    )
  };
  
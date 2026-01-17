import { useEffect, useRef, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Alerta } from '../components/Alerta';
import clienteAxios from '../config/axios';

export const ConfirmarCuenta = () => {
  const [cuentaConfirmada, setCuentaConfirmada] = useState(false);
  const [cargando, setCargando] = useState(true);
  const [alerta, setAlerta] = useState({});

  const { id } = useParams();
  const lastIdRef = useRef(null);

  useEffect(() => {
    if (!id || lastIdRef.current === id) return;
    lastIdRef.current = id;

    const confirmarCuenta = async () => {
      try {
        const { data } = await clienteAxios(`/veterinarios/confirmar/${id}`);
        setCuentaConfirmada(true);
        setAlerta({ mensaje: data.msg });
      } catch (error) {
        setAlerta({
          mensaje: error?.response?.data?.msg || 'Hubo un error',
          error: true,
        });
      } finally {
        setCargando(false);
      }
    };

    confirmarCuenta();
  }, [id]);

  return (
    <>
      <div>
        <h1 className="text-6xl font-black text-indigo-600">
          Confirma tu Cuenta y Comienza a Administrar {''}
          <span className="text-black">tus Pacientes</span>
        </h1>
      </div>

      <div className="px-5 py-10 mt-20 bg-white shadow-lg md:mt-5 rounded-xl">
        {!cargando && alerta.mensaje && <Alerta alerta={alerta} />}

        {cuentaConfirmada && (
          <Link className="block my-5 text-center text-gray-500" to="/">
            Iniciar Sesión
          </Link>
        )}
      </div>
    </>
  );
};

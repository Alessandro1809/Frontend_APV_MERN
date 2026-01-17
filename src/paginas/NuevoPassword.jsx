import { useState, useEffect } from "react";
import clienteAxios from "../config/axios";
import { useParams, Link } from "react-router-dom";
import { Alerta } from "../components/Alerta";

export const NuevoPassword = () => {
  const [password, setPassword] = useState("");
  const [alerta, setAlerta] = useState({});
  const [tokenValido, setTokenValido] = useState(false);
  const [passwordModificado, setPasswordModificado] = useState(false);

  const { token } = useParams();

  useEffect(() => {
    let isMounted = true;

    const comprobarToken = async () => {
      try {
        await clienteAxios(`/veterinarios/olvide-password/${token}`);
        if (!isMounted) return;
        setAlerta({ mensaje: "Coloca tu nuevo Password" });
        setTokenValido(true);
      } catch (error) {
        if (!isMounted) return;
        setAlerta({ mensaje: "Error en el enlace", error: true });
      }
    };

    comprobarToken();
    return () => {
      isMounted = false;
    };
  }, [token]);

  const { mensaje } = alerta;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password.length < 6) {
      setAlerta({
        mensaje: "El password debe tener mas de 6 caracteres",
        error: true,
      });
      return;
    }

    try {
      const url = `/veterinarios/olvide-password/${token}`;
      const { data } = await clienteAxios.post(url, { password });
      setAlerta({ mensaje: data.msg });
      setPasswordModificado(true);
    } catch (error) {
      setAlerta({
        mensaje: error?.response?.data?.msg || "Hubo un error",
        error: true,
      });
    }
  };

  return (
    <>
      <div>
        <h1 className="text-6xl font-black text-indigo-600">
          Reestablece tu password y no pierdas acceso a tus{" "}
          <span className="text-black">Pacientes</span>
        </h1>
      </div>

      <div className="px-5 py-10 mt-20 bg-white shadow-lg md:mt-5 rounded-xl">
        {mensaje && <Alerta alerta={alerta} />}

        {tokenValido && (
          <form onSubmit={handleSubmit}>
            <div className="my-5">
              <label className="block font-bold text-gray-600 uppercase txt-xl">
                Nuevo password:
              </label>
              <input
                type="password"
                placeholder="Ingresa tu nuevo password"
                className="w-full p-3 mt-3 border bg-gray-50 rounded-xl"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <input
              type="submit"
              value="Reestablecer"
              className="w-full px-10 py-3 mt-5 font-bold text-white uppercase bg-indigo-700 rounded-xl hover:cursor-pointer hover:bg-indigo-500 md:w-auto"
            />
          </form>
        )}

        {passwordModificado && (
          <Link className="block my-5 text-center text-gray-500" to="/">
            Inicia Sesion
          </Link>
        )}
      </div>
    </>
  );
};

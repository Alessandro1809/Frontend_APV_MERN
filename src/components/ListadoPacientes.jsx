import usePacientes from "../hooks/usePacientes";
import Paciente from "./Paciente";

export const ListadoPacientes = () => {

    const {pacientes}=usePacientes();
  return (
   <>
    {pacientes.length ? (
         <>
              <h2 className="text-3xl font-black">Listado de pacientes</h2>

                <p className="mt-5 mb-10 text-xl font-bold text-center">Administra tus{''} <span className="font-bold text-indigo-600">Pacientes y Citas</span></p>
         
            
            {pacientes.map(paciente=>(<Paciente
                key={paciente._id}
                paciente={paciente}
            
            />))}


         
         </>
    ): 
    (

        <>
            <h2 className="text-3xl font-black">No hay pacientes</h2>

            <p className="mt-5 mb-10 text-xl text-center">Comienza agregando un paciente {''} <span className="font-bold text-indigo-600">y visualizalos en este espacio</span></p>
        </>
    )}
   
   
   
   </>
  )
}

export default ListadoPacientes;

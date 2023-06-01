import usePacientes from "../hooks/usePacientes";


export const Paciente = ({paciente}) => {

  const {setEdicion,eliminarPaciente}= usePacientes();
  
    const {email, fecha, nombre, propietario, sintomas,_id}= paciente;


    const formatearFecha=(fecha)=>{
      
      const nuevaFecha = new Date(fecha);

      return new Intl.DateTimeFormat('es-MX',{dateStyle:'long'}).format(nuevaFecha);
      
    }

  return (
   <>

   <div className="px-5 py-10 mx-5 my-10 bg-white shadow-md rounded-xl">

          <p className="font-bold text-indigo-800 uppercase ">Nombre:{''} <span className="font-normal text-black normal-case">{nombre}</span></p>
          <p className="font-bold text-indigo-800 uppercase ">Propietario:{''} <span className="font-normal text-black normal-case">{propietario}</span></p>
          <p className="font-bold text-indigo-800 uppercase ">Email:{''} <span className="font-normal text-black normal-case">{email}</span></p>
          <p className="font-bold text-indigo-800 uppercase ">Fecha de alta:{''} <span className="font-normal text-black normal-case">{formatearFecha(fecha)}</span></p>
          <p className="font-bold text-indigo-800 uppercase ">Sintomas:{''} <span className="font-normal text-black normal-case">{sintomas}</span></p>
        
      <div className="flex justify-between my-5">
        <button type="button"
          className="px-10 py-2 font-bold text-white uppercase bg-indigo-600 rounded-lg hover:bg-indigo-700"
          onClick={()=>setEdicion(paciente)}>
          Editar
        </button>
        <button type="button"
          className="px-10 py-2 font-bold text-white uppercase bg-red-600 rounded-lg hover:bg-red-700"
          onClick={(()=>eliminarPaciente(_id))}>
          Eliminar
        </button>
      </div>
   
   </div>
   </>
  )
}

export default Paciente;

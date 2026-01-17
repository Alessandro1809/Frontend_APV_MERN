import { useState } from "react";
import { Alerta } from "./Alerta";
import usePacientes from "../hooks/usePacientes";
import { useEffect } from "react";

export const Formulario = () => {
    
    const [nombre,setNombre]= useState('');
    const [propietario,setPropietario]= useState('');
    const [email,setEmail]= useState('');
    const [fecha,setFecha]= useState('');
    const [sintomas,setSintomas]= useState('');
    const [id,setId]= useState(null);

    const [alerta, setAlerta]=useState({});

    const {guardarPaciente,paciente}= usePacientes();
        

    useEffect(()=>{
       const pacienteId = paciente?._id || paciente?.id;
       if (pacienteId) {
        setNombre(paciente.nombre || '');
        setPropietario(paciente.propietario || '');
        setEmail(paciente.email || '');
        setFecha(paciente.fecha ? paciente.fecha.split('T')[0] : '');
        setSintomas(paciente.sintomas || '');
        setId(pacienteId);
        return;
       }

       setNombre(''); 
       setPropietario('');
       setEmail('');
       setFecha('');
       setSintomas('');
       setId(null);
    },[paciente]);



const handleSubmit = e =>{
    e.preventDefault();
    //Validar el formulario 
    if ([nombre,propietario,email,fecha,sintomas].includes('')) {
        setAlerta({
            mensaje: 'Todos los campos son obligatorios', error: true
        });
        return;
        
    }

    setAlerta({})

    guardarPaciente({nombre,propietario,email,fecha,sintomas,id})
    
    setAlerta({
        mensaje:'Paciente guardado corectamente'
    });
    setNombre(''); 
    setPropietario('');
    setEmail('');
    setFecha('');
    setSintomas('');
    setId(null);
}
    const {mensaje}= alerta;
  return (
    <>
    <h2 className="text-3xl font-black">Administrador de pacientes</h2>
    
     <p className="mt-5 mb-10 text-xl font-bold text-center">Agrega tus{''} <span className="font-bold text-indigo-600">Pacientes y Administralos</span></p>
         
   
    <form className="px-5 py-10 mb-5 bg-white rounded-md shadow-2xl lg:mb-5"
    onSubmit={handleSubmit}>
        <div className="mb-5 ">
            <label htmlFor="mascota"
            className="font-bold text-gray-700 uppercase"
            >Nombre de la Mascota</label>
            <input 
            id="mascota"
            type="text"
            placeholder="Nombre de la mascota"
            className="w-full p-2 mt-2 placeholder-gray-400 border-2 rounded-md"
            value={nombre}
            onChange={e=> setNombre(e.target.value)}
            
            />
        </div>

        <div className="mb-5 ">
            <label htmlFor="propietario"
            className="font-bold text-gray-700 uppercase"
            >Propietario de la Mascota</label>
            <input 
            id="propietario"
            type="text"
            placeholder="Propietario de la mascota"
            className="w-full p-2 mt-2 placeholder-gray-400 border-2 rounded-md"
            value={propietario}
            onChange={e=> setPropietario(e.target.value)}
            />
        </div>

        <div className="mb-5 ">
            <label htmlFor="email"
            className="font-bold text-gray-700 uppercase"
            >Email del propietario</label>
            <input 
            id="email"
            type="email"
            placeholder="Email de contacto del propietario"
            className="w-full p-2 mt-2 placeholder-gray-400 border-2 rounded-md"
            value={email}
            onChange={e=> setEmail(e.target.value)}
            />
        </div>

        <div className="mb-5 ">
            <label htmlFor="fecha"
            className="font-bold text-gray-700 uppercase"
            >Fecha de alta</label>
            <input 
            id="fecha"
            type="date"
            className="w-full p-2 mt-2 placeholder-gray-400 border-2 rounded-md"
            value={fecha}
            onChange={e=> setFecha(e.target.value)}
            />
        </div>

        <div className="mb-5">
            <label htmlFor="sintomas"
            className="font-bold text-gray-700 uppercase"
            >Sintomas de la mascota</label>
            <textarea 
            id="sintomas"
            placeholder="Sintomas detectados en el paciente"
            className="w-full p-2 mt-2 placeholder-gray-400 border-2 rounded-md"
            value={sintomas}
            onChange={e=> setSintomas(e.target.value)}
            />
        </div>
        
        <input type="submit"
        value={id ? 'Guardar cambios':'Agregar paciente'}
        className="w-full p-3 font-bold text-white uppercase transition-colors bg-indigo-600 rounded-md shadow-sm cursor-pointer hover:bg-indigo-800"  />
    </form>
    {mensaje && <Alerta alerta={alerta}/>}
    </>
  )
}


export default Formulario;

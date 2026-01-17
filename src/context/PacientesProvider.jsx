import { createContext, useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import clienteAxios from "../config/axios";

const PacienteContext = createContext();

export const PacientesProvider =({children})=>{

const [pacientes, setPacientes]= useState([]);
const [paciente, setPaciente]= useState({});
const {Auth}= useAuth();

    const normalizarPaciente = (paciente) => {
        if (!paciente) return {};
        return { 
            ...paciente, 
            _id: paciente._id || paciente.id,
        };
    }

    const obtenerPacientes= async ()=>{

        try {
            const token= localStorage.getItem('token');
            if (!token) return;

            const config={
                headers:{
                    "Content-Type": "application/json", 
                    Authorization: `Bearer ${token}`
                }
            }

            const {data}= await clienteAxios('/pacientes',config);
            const pacientesNormalizados = Array.isArray(data)
                ? data.map((paciente) => normalizarPaciente(paciente))
                : [];
            setPacientes(pacientesNormalizados);
      } catch (error) {
            console.log(error)
        }


    }

useEffect(()=>{
obtenerPacientes();
},[Auth]);

        const guardarPaciente= async (paciente)=>{

            const token = localStorage.getItem('token');
            const config={
                headers:{
                    "Content-Type": "application/json", 
                    Authorization: `Bearer ${token}`
                }
            }

            if (paciente.id) {
               try {
                const {data}= await clienteAxios.put(`/pacientes/${paciente.id}`, paciente, config)
                const pacienteRespuesta = data?.paciente ?? data;
                const pacienteNormalizado = normalizarPaciente(pacienteRespuesta);
                if (!pacienteNormalizado._id) {
                    await obtenerPacientes();
                    setPaciente({});
                    return;
                }
                setPacientes((pacientesState)=>
                    pacientesState.map((pacienteState)=>
                        pacienteState._id===pacienteNormalizado._id ? pacienteNormalizado : pacienteState
                    )
                )
                setPaciente({})
               } catch (error) {
                console.log(error)
               }
            }else{
                try {
                  
    
                    const {data}= await clienteAxios.post('/pacientes', paciente,config);

                   const pacienteRespuesta = data?.paciente ?? data;
                   const {createAt,updateAt,__v,...pacienteAlmacenado}= pacienteRespuesta || {};
                   const pacienteNormalizado = normalizarPaciente(pacienteAlmacenado);
                   if (!pacienteNormalizado._id) {
                        await obtenerPacientes();
                        setPaciente({});
                        return;
                   }
                   setPacientes((pacientesState)=>[pacienteNormalizado,...pacientesState]);
                   setPaciente({});
                } catch (error) {
                    console.log(error.response.data.msg);
                }
            }
            
            

        }


        const setEdicion=(paciente)=>{
           setPaciente(normalizarPaciente(paciente));
        }

        const eliminarPaciente=async (id)=>{
           const confirmar = confirm('¿Deseas eliminar este paciente?');
           if (confirmar) {
                try {
                    const token = localStorage.getItem('token');
                    const config={
                        headers:{
                            "Content-Type": "application/json", 
                            Authorization: `Bearer ${token}`
                        }
                    }
                    const {data}= await clienteAxios.delete(`/pacientes/${id}`,config);
                    setPacientes((pacientesState)=>
                        pacientesState.filter((pacientesState)=>pacientesState._id!==id)
                    );
                    setPaciente((pacienteState)=>
                        pacienteState?._id===id ? {} : pacienteState
                    );
                } catch (error) {
                    console.log(error)
                }
           }
        }
    return(
        <PacienteContext.Provider
        value={{
            pacientes,
            guardarPaciente,
            paciente,
            setEdicion,
            eliminarPaciente
        }}>

            {children}

        </PacienteContext.Provider>
    )
}



export default PacienteContext;

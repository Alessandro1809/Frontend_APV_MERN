import { createContext, useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import clienteAxios from "../config/axios";

const PacienteContext = createContext();

export const PacientesProvider =({children})=>{

const [pacientes, setPacientes]= useState([]);
const [paciente, setPaciente]= useState({});
const {Auth}= useAuth();

useEffect(()=>{

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
            setPacientes(data);
      } catch (error) {
            console.log(error)
        }


    }

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
                const pacienteActualizado= pacientes.map(pacienteState=> pacienteState._id===data._id ? data: pacienteState)
                setPacientes(pacienteActualizado)
               } catch (error) {
                console.log(error)
               }
            }else{
                try {
                  
    
                    const {data}= await clienteAxios.post('/pacientes', paciente,config);
    
                   const {createAt,updateAt,__v,...pacienteAlmacenado}= data;
                   setPacientes([pacienteAlmacenado,...pacientes]);
                } catch (error) {
                    console.log(error.response.data.msg);
                }
            }
            
            

        }


        const setEdicion=(paciente)=>{
           setPaciente(paciente);
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
                    const pacienteActualizado= pacientes.filter(pacientesState=> pacientesState._id!==id);
                    setPacientes(pacienteActualizado);
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


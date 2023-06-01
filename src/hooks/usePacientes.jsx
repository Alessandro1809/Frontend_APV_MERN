import { useContext} from 'react'
import PacienteContext, { PacientesProvider } from '../context/PacientesProvider'

const usePacientes = () => {
    return useContext(PacienteContext)
}

export default usePacientes
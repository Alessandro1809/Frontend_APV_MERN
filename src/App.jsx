import {BrowserRouter, Routes, Route} from 'react-router-dom'
import AuthLayout from './layout/AuthLayout'
import { RutaProtegida } from './layout/RutaProtegida'

import {Login} from './paginas/login'
import Registrar from './paginas/Registrar'
import OlvidePassword from './paginas/OlvidePassword'
import ConfirmarCuenta from './paginas/ConfirmarCuenta'
import { NuevoPassword } from './paginas/NuevoPassword'
import { AuthProvider } from './context/AuthProvider'
import { PacientesProvider } from './context/PacientesProvider'
import { AdministrarPacientes } from './paginas/AdministrarPacientes'
import { EditarPerfil } from './paginas/EditarPerfil'
import { CambiarPasswoord } from './paginas/CambiarPasswoord'

function App() {
  
    
  return (
    
    <BrowserRouter>
      <AuthProvider>
        <PacientesProvider>
          <Routes>
          {/* rutas publicas */}
            <Route path='/' element={<AuthLayout/>}>
              <Route index element={<Login/>}/>
              <Route path='registrar' element={<Registrar/>}/>
              <Route path='olvidepassword' element={<OlvidePassword/>}/>
              <Route path='olvidepassword/:token' element={<NuevoPassword/>}/>
              <Route path='confirmarcuenta/:id' element={<ConfirmarCuenta/>}/>
            </Route>
          
            {/* rutas privadas */}
          
            <Route path='admin' element={<RutaProtegida/>}>
              <Route index element={<AdministrarPacientes/>} />
              <Route path='perfil' element={<EditarPerfil/>}/>
              <Route path='cambiar-password' element={<CambiarPasswoord/>}/>
            </Route>
            

            

          </Routes>
        </PacientesProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App

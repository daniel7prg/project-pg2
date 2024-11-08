import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { PrivateRoute } from './PrivateRoute';
import { Login } from '../components/componentes'
import {
  HomePage, Cursos, Secciones, Unidades,
  Grados, Notas, Alumnos, UsersPage,
  Error_404, Boleta
} from '../pages/paginas'
import { useAuthStore } from '../store/storages'

export const Routing = () => {
  const admin = useAuthStore((state) => state.user.user_type)

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<PrivateRoute />} >
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/cursos" element={<Cursos />} />
          <Route path="/secciones" element={<Secciones />} />
          <Route path="/unidades" element={<Unidades />} />
          <Route path="/grados" element={<Grados />} />
          <Route path="/notas" element={<Notas />} />
          <Route path="/alumnos" element={<Alumnos />} />
          {admin == 1 ? (<Route path="/users" element={<UsersPage />} />) 
          : (<Route path="/users" element={<Navigate to="/home" />} />)}
          <Route path="/boleta" />
        </Route>
        <Route path="*" element={<Error_404 />} />
      </Routes>
    </BrowserRouter>
  )
}

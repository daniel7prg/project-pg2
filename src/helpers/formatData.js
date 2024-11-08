import { useSeccionesStore } from '../store/storages'

export const changeData = (data, pathname, request, formMultiple = []) => {
  const setSecciones = useSeccionesStore((state) => state.setSecciones)
  if (request === 'Edit') {
    if (pathname === '/alumnos') {
      const { ID, Nombre, Apellido, Grado, Seccion } = data
      return {
        id: ID,
        nombre_alumno: Nombre,
        apellido_alumno: Apellido,
        grado_id: Grado == 0 ? 1 : Grado,
        seccion_id: Seccion == 0 ? 1 : Seccion,
        curso_id: formMultiple
      }
    }
    else if (pathname === '/notas') {
      const { ID, Nombre, Unidad, Nota, Talentos } = data
      console.log(data);
      
      return {
        id: ID,
        alumno_id: Nombre == 0 ? 1 : Nombre,
        unidad_id: Unidad == 0 ? 1 : Unidad,
        valor_nota: Nota,
        valor_talento: Talentos,
        curso_id: formMultiple
      }
    }
    else if (pathname === '/unidades') {
      const { ID, Nombre } = data
      return {
        id: ID,
        nombre_unidad: Nombre,
      }
    }
    else if (pathname === '/cursos') {
      const { ID, Nombre, Grado } = data
      return {
        id: ID,
        nombre_curso: Nombre,
        grado_id: Grado == 0 ? 1 : Grado
      }
    }
    else if (pathname === '/secciones') {
      const { ID, Nombre, Grado } = data
      return {
        id: ID,
        nombre_seccion: Nombre,
        grado_id: Grado == 0 ? 1 : Grado
      }
    }
    else if (pathname === '/grados') {
      const { ID, Nombre } = data
      return {
        id: ID,
        nombre_grado: Nombre,
      }
    }
    else if (pathname === '/users') {      
      const { ID, Nombre_Usuario, Nombre, Apellido, Password } = data
      return {
        id: ID,
        username: Nombre_Usuario,
        first_name: Nombre,
        last_name: Apellido,
        grado_id: formMultiple.grado_id,
        curso_id: formMultiple.curso_id,
        password: Password
      }
    }
  }
  else if (request === 'Create') {
    if (pathname === '/alumnos') {
      const { Nombre, Apellido, Grado, Seccion } = data
      return {
        nombre_alumno: Nombre,
        apellido_alumno: Apellido,
        grado_id: Grado == 0 ? 1 : Grado,
        seccion_id: Seccion == 0 ? 1 : Seccion,
        curso_id: formMultiple
      }
    }
    else if (pathname === '/notas') {
      const { Nombre, Unidad, Nota, Talentos } = data
      return {
        alumno_id: Nombre == 0 ? 1 : Nombre,
        unidad_id: Unidad == 0 ? 1 : Unidad,
        valor_nota: Nota,
        valor_talento: Talentos,
        curso_id: formMultiple
      }
    }
    else if (pathname === '/unidades') {
      const { Nombre } = data
      return {
        nombre_unidad: Nombre,
      }
    }
    else if (pathname === '/cursos') {
      const { Nombre, Grado } = data
      return {
        nombre_curso: Nombre,
        grado_id: Grado == 0 ? 1 : Grado
      }
    }
    else if (pathname === '/secciones') {
      const { ID, Nombre, Grado } = data
      const newData = {
        nombre_seccion: Nombre,
        grado_id: Grado == 0 ? 1 : Grado
      }
      setSecciones(newData)
      return newData
    }
    else if (pathname === '/grados') {
      const { ID, Nombre } = data
      return {
        id: ID,
        nombre_grado: Nombre,
      }
    }
    else if (pathname === '/users') {      
      const { Nombre_Usuario, Nombre, Apellido, Password } = data
      console.log(formMultiple);
      
      return {
        usernames: Nombre_Usuario,
        first_name: Nombre,
        last_names: Apellido,
        grado_id: formMultiple.grado_id,
        seccion_id: formMultiple.seccion_id,
        curso_id: formMultiple.curso_id,
        password: Password
      }
    }
  }
}
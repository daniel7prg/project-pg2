import { Layout } from "../helpers/Layout"
import { DataTable, Header } from "../components/componentes"
import { useEffect, useState } from "react"
import { columnsUsuarios as columns, DatoProvider, api } from '../helpers/helpers'
import { useRequest } from "../hooks/chooks"
import { toast } from "sonner"
import { useAuthStore, useGradosStore, useCursosStore, useSeccionesStore } from '../store/storages'

const Users = () => {
  const [info, setInfo] = useState([])
  const { load, setLoad } = useRequest()
  const setToken = useAuthStore((state) => state.setToken)
  const token = useAuthStore((state) => state.token)
  const refreshToken = useAuthStore((state) => state.refresh)
  const grados = useGradosStore((state) => state.grados)
  const cursos = useCursosStore((state) => state.cursos)
  const secciones = useSeccionesStore((state) => state.secciones)

  const initialForm = {
    Nombre_Usuario: {
      tag: 'input',
      type: 'text',
      value: '',
      disabled: false,
      multiple: false
    },
    Nombre: {
      tag: 'input',
      type: 'text',
      value: '',
      disabled: false,
      multiple: false
    },
    Apellido: {
      tag: 'input',
      type: 'text',
      value: '',
      disabled: false,
      multiple: false
    },
    Rol: {
      tag: "select",
      type: "text",
      value: 1,
      disabled: false,
      multiple: false,
      options: [
        { id: 1, value: 'Administrador' },
        { id: 2, value: 'Secretario' },
        { id: 3, value: 'Profesor' },
      ]
    },
    Grados: {
      tag: 'select',
      type: 'text',
      value: [],
      disabled: false,
      multiple: true,
      options: grados
    },
    Secciones: {
      tag: 'select',
      type: 'text',
      value: [],
      disabled: false,
      multiple: true,
      options: secciones
    },
    Cursos: {
      tag: 'select',
      type: 'text',
      value: [],
      disabled: false,
      multiple: true,
      options: cursos
    },
    Password: {
      tag: 'input',
      type: 'password',
      value: '',
      disabled: false,
      multiple: false
    }
  }

  useEffect(() => {
    toast.promise(api.get('/users/', { headers: { 'Authorization': `Bearer ${token}` } }), {
      loading: 'Cargando...',
      success: (e) => {
        setInfo(e.data)
        setLoad(false)
        return "Proceso finalizado correctamente"
      },
      error: (e) => {
        if (e.response.data === "token_not_valid" || e.response.status === 401) {
          api.post('/refresh_token/', { refresh: refreshToken }).then((e) => {
            setToken(e.data.access, e.data.refresh)
          }).catch((e) => { return "ADV: Recargando pagina..." })
          return "Error: Recargue la pagina..."
        }
        else {

        }
      },
      onAutoClose: (t) => console.log(`Toast with id ${t.id} has been closed automatically`),
    })
  }, [load, token])

  return (
    <Layout>
      <Header title="Usuarios" form={initialForm} />
      {info.length > 0 ? <DataTable data={info} columns={columns} /> : <p>Cargando...</p>}
    </Layout>
  )
}

export const UsersPage = () => (
  <DatoProvider>
    <Users />
  </DatoProvider>
)

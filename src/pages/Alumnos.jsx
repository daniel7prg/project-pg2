import { Layout } from "../helpers/Layout"
import { DataTable, Header } from "../components/componentes"
import { useEffect, useState } from "react"
import { columnsAlumnos as columns, DatoProvider, api } from '../helpers/helpers'
import { useRequest } from "../hooks/chooks"
import { toast } from "sonner"
import { useAuthStore, useGradosStore, useCursosStore, useSeccionesStore } from '../store/storages'

const AlumnosPage = () => {
  const [info, setInfo] = useState([])
  const { load, setLoad } = useRequest()
  const setToken = useAuthStore((state) => state.setToken)
  const token = useAuthStore((state) => state.token)
  const refreshToken = useAuthStore((state) => state.refresh)
  const grados = useGradosStore((state) => state.grados)
  const cursos = useCursosStore((state) => state.cursos)
  const secciones = useSeccionesStore((state) => state.secciones)

  const initialForm = {
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
    Grado: {
      tag: 'select',
      type: 'text',
      value: 0,
      disabled: false,
      multiple: false,
      options: grados
    },
    Seccion: {
      tag: 'select',
      type: 'text',
      value: 0,
      disabled: false,
      multiple: false,
      options: secciones
    },
    Cursos: {
      tag: 'select',
      type: 'text',
      value: [],
      disabled: false,
      multiple: true,
      options: cursos
    }
  }

  useEffect(() => {
    toast.promise(api.get('/alumnos/', { headers: { 'Authorization': `Bearer ${token}` } }), {
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
            setLoad(true)
          }).catch((e) => { setLoad(true) })
          return "ADV: Recargando pagina..."
        }
        else {
          return e.response.data.detail
        }
      },
      onAutoClose: (t) => console.log(`Toast with id ${t.id} has been closed automatically`),
    })
  }, [load, token])

  return (
    <Layout>
      <Header title="Alumnos" form={initialForm} />
      {info.length > 0 ? <DataTable data={info} columns={columns} /> : <p>Cargando...</p>}
    </Layout>
  )
}

export const Alumnos = () => (
  <DatoProvider>
    <AlumnosPage />
  </DatoProvider>
)
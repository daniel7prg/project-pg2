import { Layout } from "../helpers/Layout"
import { DataTable, Header } from "../components/componentes"
import { useEffect, useState } from "react"
import { columnsNotas as columns, DatoProvider, api } from '../helpers/helpers'
import { useRequest } from "../hooks/chooks"
import { toast } from "sonner"
import { useAuthStore, useAlumnosStore, useCursosStore, useUnidadesStore } from '../store/storages'

const NotasPage = () => {
  const [info, setInfo] = useState([])
  const { load, setLoad } = useRequest()
  const setToken = useAuthStore((state) => state.setToken)
  const token = useAuthStore((state) => state.token)
  const refreshToken = useAuthStore((state) => state.refresh)
  const alumnos = useAlumnosStore((state) => state.alumnos)
  const cursos = useCursosStore((state) => state.cursos)
  const unidades = useUnidadesStore((state) => state.unidades)

  const initialForm = {
    Nombre: {
      tag: 'select',
      type: 'text',
      value: '',
      disabled: false,
      multiple: false,
      options: alumnos
    },
    Cursos: {
      tag: 'select',
      type: 'text',
      value: [],
      disabled: false,
      multiple: true,
      options: cursos
    },
    Unidad: {
      tag: 'select',
      type: 'text',
      value: 0,
      disabled: false,
      multiple: false,
      options: unidades
    },
    Nota: {
      tag: 'input',
      type: 'number',
      value: 0,
      disabled: false,
      multiple: false
    },
    Talentos: {
      tag: 'input',
      type: 'number',
      value: 0,
      disabled: false,
      multiple: false
    },
  }

  useEffect(() => {
    toast.promise(api.get('/notas/', { headers: { 'Authorization': `Bearer ${token}` } }), {
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
          return e.response.data.detail
        }
      },
      onAutoClose: (t) => console.log(`Toast with id ${t.id} has been closed automatically`),
    })
  }, [load, token])

  return (
    <Layout>
      <Header title="Notas" form={initialForm} />
      {info.length > 0 ? <DataTable data={info} columns={columns} /> : <p>Cargando...</p>}
    </Layout>
  )
}

export const Notas = () => (
  <DatoProvider>
    <NotasPage />
  </DatoProvider>
)
import { TrashIcon, CheckIcon } from "@heroicons/react/24/outline"
import { Forms } from "./componentes"
import { toast } from 'sonner';
import { useLocation } from "react-router-dom";
import { useRequest } from '../hooks/chooks';
import { api } from '../helpers/helpers';
import { Button } from "@headlessui/react";
import { useAuthStore } from "../store/auth";

export const Actions = ({ data }) => {
  const { original } = data.row
  const location = useLocation();
  const { setLoad } = useRequest();
  const setToken = useAuthStore((state) => state.setToken)
  const token = useAuthStore((state) => state.token)
  const refreshToken = useAuthStore((state) => state.refresh)
  
  const onDelete = () => {
    toast('¿Desea eliminar el registro?', {
      action: <Button className="text-mirage-50 bg-bull-shot-500 items-center justify-center ms-2 py-2 px-8 border-b-2 rounded-full shadow-sm text-sm font-medium hover:text-mirage-50 hover:bg-bull-shot-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-bull-shot-800 hover:border-minsk-500"
        onClick={
          () => {
            toast.promise(api.delete(`${location.pathname}/${original.ID.value}/`, { headers: { 'Authorization': `Bearer ${token}` } }), {
              loading: 'Eliminando...',
              success: (e) => {
                setLoad(true)
                return 'Eliminado con exito'
              },
              error: (e) => {
                if (e.response.data === "token_not_valid" || e.response.status === 401) {
                  api.post('/refresh_token/', { refresh: refreshToken }).then((e) => {
                    setToken(e.data.access, e.data.refresh)
                    setLoad(true)
                  }).catch((e) => { setLoad(true) })
                  return "ADV: recargando pagina..."
                }
                else {
                  const formatErrors = (errorData) => {
                    return Object.entries(errorData)
                      .map(([field, messages]) => `${field.toUpperCase()}: ${messages.join(", ")}`)
                      .join("\n");
                  };
        
                  return `${formatErrors(e.response.data)}`
                }
              },
            })
          }
        }>
        <CheckIcon className="h-5 w-5" aria-hidden="true" />
      </Button>,
      onAutoClose: (t) => console.log(`Toast with id ${t.id} has been closed automatically`),
    })
  }

  return (
    <>
      <div className='flex gap-x-2'>
        <Forms initialForm={original} method="Editar" />
        <button onClick={onDelete} className='flex items-center justify-center px-2 py-1 gap-x-1 border-2 rounded-full shadow-sm text-base font-medium text-minsk-400 border-minsk-400 hover:border-minsk-700 hover:text-minsk-700'>
          Eliminar
          <TrashIcon className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>
    </>
  )
}

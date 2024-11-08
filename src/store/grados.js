import { create } from 'zustand';
import { toast } from 'sonner';
import { api } from '../helpers/helpers';
import { useAuthStore } from './auth';

export const useGradosStore = create(
  (set) => ({
    grados: [],

    getGrados: api.get('/grados/', {
      transformResponse: [(data) => {
        const parsedData = JSON.parse(data); // Convertir la respuesta en un objeto JS
        return parsedData.map(item => ({
          id: item.ID.value,       // Extraer el valor de "ID"
          value: item.Nombre.value // Extraer el valor de "Nombre"
        }));
      }],
      headers: {
        'Authorization': `Bearer ${useAuthStore.getState().token}`
      }
    }).then((e) => {
      set({grados: e.data})
    }).catch((e) => { 
      const refreshToken = useAuthStore.getState().refresh
      const setToken = useAuthStore.getState().setToken
      if (e.response.data === "token_not_valid" || e.response.status === 401) {
        api.post('/refresh_token/', { refresh: refreshToken }).then((e) => {
          setToken(e.data.access, e.data.refresh)
        }).catch((e) => { toast.error("Error: Recargue la pagina...") })
        toast.warning("ADV: Recargando pagina...")
      }
      else { toast.error(`${e.response.data.detail}`)}
    }),

    reset: () => set({ grados: [] }),

  })
)
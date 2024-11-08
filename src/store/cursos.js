import { create } from 'zustand';
import { toast } from 'sonner';
import { api } from '../helpers/helpers';
import { useAuthStore } from './auth';

export const useCursosStore = create(
  (set) => ({
    cursos: [],

    getCursos: api.get('/cursos/', {
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
      set({cursos: e.data})
    }).catch((e) => { toast.error(`${e.response.data.detail}`)}),

    reset: () => set({ cursos: [] }),

  })
)
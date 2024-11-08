import { create } from 'zustand';
import { toast } from 'sonner';
import { api } from '../helpers/helpers';
import { useAuthStore } from './auth';

export const useAlumnosStore = create(
  (set) => ({
    alumnos: [],

    getAlumnos: api.get('/alumnos/', {
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
      set({alumnos: e.data})
    }).catch((e) => { toast.error(`${e.response.data.detail}`)}),

    reset: () => set({ alumnos: [] }),

  })
)
import { create } from 'zustand';
import { toast } from 'sonner';
import { api } from '../helpers/helpers';
import { useAuthStore } from './auth';

export const useSeccionesStore = create(
  (set) => ({
    secciones: [],

    setSecciones: (secciones) => set({ secciones }),

    getSecciones: api.get('/secciones/', {
      transformResponse: [(data) => {
        const parsedData = JSON.parse(data); // Convertir la respuesta en un objeto JS
        return parsedData.map(item => ({
          id: item.ID.value,       // Extraer el valor de "ID"
          value: item.Nombre.value // Extraer el valor de "Nombre"
        })).filter((item, index, self) =>
          index === self.findIndex((s) => s.value === item.value) // Mantiene solo el primer elemento con el mismo nombre
        );
      }],
      headers: {
        'Authorization': `Bearer ${useAuthStore.getState().token}`
      }
    }).then((e) => {
      set({secciones: e.data})
    }).catch((e) => { toast.error(`${e.response.data.detail}`)}),

    reset: () => set({ secciones: [] }),

  })
)
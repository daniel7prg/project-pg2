import axios from 'axios'

export const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}`,
});

// Obtener el token de acceso y refresh desde el localStorage
// const getAccessToken = () => localStorage.getItem('token');
// const getRefreshToken = () => localStorage.getItem('refresh_token');

/* // Agregar el token a las solicitudes
api.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}); */

// Manejar errores en las respuestas (e.g., token expirado)
/* api.interceptors.response.use(
  (response) => response, // Si la respuesta es exitosa, continuamos
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      // Si es un 401 (token expirado) y no hemos reintentado aún
      originalRequest._retry = true;

      try {
        // Obtener nuevo token usando el refresh token
        const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/refresh_token/`, {
          refreshToken: getRefreshToken(),
        });

        // Guardar el nuevo token
        const newAccessToken = response.data.token;
        localStorage.setItem('token', newAccessToken);

        // Actualizar el header Authorization en la solicitud original
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        // Reintentar la solicitud original con el nuevo token
        return api(originalRequest);
      } catch (err) {
        console.error('Error al refrescar el token', err);
        // Manejo adicional de errores, por ejemplo, redirigir al login
      }
    }

    // Si no es un 401 o hay otro tipo de error, propagar el error
    return Promise.reject(error);
  }
) */

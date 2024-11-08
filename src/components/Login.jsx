import { LockClosedIcon, UserIcon } from '@heroicons/react/24/outline'
import { useForm } from '../hooks/chooks'
import { loadingStyle, api } from '../helpers/helpers'
import logo from '../logo-tecno.jpg'
import { useNavigate } from 'react-router-dom'
import { Toaster, toast } from 'sonner'
import { useState } from 'react'
import { useAuthStore } from '../store/auth'

export const Login = () => {
  const initialForm = {
    username: '',
    password: ''
  }

  const [attempt, setAttempt] = useState(0)
  const navigate = useNavigate()
  const { formData, onInputChange, onReset } = useForm(initialForm)
  const { username, password } = formData
  const datos = { username: username, password: password }
  const setToken = useAuthStore((state) => state.setToken)
  const setProfile = useAuthStore((state) => state.setProfile)

  const onSubmit = (e) => {
    e.preventDefault()
    toast.promise(api.post('/login/', datos), {
      loading: 'Iniciando sesion...',
      success: (e) => {
        
        const { token, refresh_token, user } = e.data
        setToken(token, refresh_token)
        setProfile(user)
        onReset()
        navigate('/home')
      },
      error: (e) => {
        const { message } = e.response.data
        setAttempt(attempt + 1)
        return attempt < 5 ? message : 'Error al iniciar sesion, reinicie la pagina'
      },
      onAutoClose: (t) => console.log(`Toast with id ${t.id} has been closed automatically`),
    })
  }

  return (
    <>
      <style>{`body { background-color: #ffbb02; }`}</style>
      <div className="bg-bull-shot-500 flex justify-center items-center h-screen">
        <div className="w-1/2 h-screen hidden lg:block">
          <img src={logo}
            alt="Placeholder Image" className="object-cover w-full h-full" />
        </div>
        <div className="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
          <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-mirage-50 py-8 px-4 shadow sm:rounded-xl sm:px-10 font-poppins border-b-2 border-r-4 border-minsk-700">
              <h2 className="mb-6 text-center text-4xl font-semibold text-minsk-900">Iniciar Sesión</h2>
              <form className="space-y-6" method="POST" onSubmit={onSubmit}>
                <div>
                  <div className='flex items-center'>
                    <label htmlFor="username" className="block text-sm font-medium text-minsk-900">Usuario</label>
                    <span className="inline-flex items-center justify-center h-10 w-10 text-minsk-900">
                      <UserIcon className="h-6 w-6" aria-hidden="true" />
                    </span>
                  </div>
                  <div className="mt-1">
                    <input
                      id='username'
                      name="username"
                      type="text"
                      autoComplete="username"
                      required
                      value={username}
                      onChange={onInputChange}
                      className="appearance-none block w-full px-3 py-2 border-2 border-mirage-200 rounded-md shadow-sm placeholder-mirage-300 focus:outline-none focus:ring-minsk-500 focus:border-minsk-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <div className='flex items-center'>
                    <label htmlFor="password" className="block text-sm font-medium text-minsk-900">Contraseña</label>
                    <span className="inline-flex items-center justify-center h-10 w-10 text-minsk-900">
                      <LockClosedIcon className="h-6 w-6" aria-hidden="true" />
                    </span>
                  </div>

                  <div className="mt-1 mb-8">
                    <input
                      id='password'
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      required
                      value={password}
                      onChange={onInputChange}
                      className="appearance-none block w-full px-3 py-2 border-2 border-mirage-200 rounded-md shadow-sm placeholder-mirage-300 focus:outline-none focus:ring-minsk-500 focus:border-minsk-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border-b-2 rounded-full shadow-sm text-sm font-medium text-mirage-50 bg-minsk-500 hover:bg-minsk-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-minsk-800 hover:border-bull-shot-500">
                    Ingresar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Toaster toastOptions={loadingStyle} position="top-center" closeButton />
    </>
  )
}
import { Layout } from "../helpers/Layout"
import { Link } from "react-router-dom"
import { iconsModulesAdmin, iconsModulesTeacher, iconsModulesSecretary } from '../helpers/helpers'
import { useAuthStore } from '../store/auth'
import { useState, useEffect } from 'react'

export const HomePage = () => {
  const user = useAuthStore((state) => state.user.name)
  const [iconsModules, setModules] = useState([])

  useEffect(() => {
    if (useAuthStore.getState().user.user_type == 1) {
      setModules(iconsModulesAdmin)
    }
    else if (useAuthStore.getState().user.user_type == 2) {
      setModules(iconsModulesSecretary)
    }
    else if (useAuthStore.getState().user.user_type == 3) {
      setModules(iconsModulesTeacher)
    }
  }, [])

  return (
    <Layout>
      <div className="md:flex items-center justify-center h-2/4">
        <div className="bg-mirage-50 shadow sm:rounded-xl sm:px-10 px-8 py-12 m-8 border-b-2 border-r-4 border-minsk-700">
          <h2 className="mb-6 text-center text-6xl font-semibold text-minsk-900">Bienvenido</h2>
          <p className="block text-center text-md font-medium text-minsk-900">{user} - ¿Qué deseas gestionar?</p>
        </div>
        <div className="grid lg:grid-cols-3 gap-3 md:py-12 md:px-16 sm:20 p-8 w-full lg:w-fit items-center">
          {iconsModules.map((item) => (
            <div key={item.id} className="grid gap-y-5 px-4 bg-mirage-50 py-8 sm:grid-cols-1 sm:gap-x-8 sm:py-4 sm:px-4 lg:px-6 xl:pr-8 sm:rounded-xl border-b-2 border-r-4 border-minsk-700">
              <span className="items-center justify-center flex">
                <item.icon className="h-24 w-fit text-minsk-400" aria-hidden="true" />
              </span>
              <div >
                <Link to={item.path} className="w-full flex items-center justify-center px-4 py-2 border-2 rounded-full shadow-sm text-s font-medium text-minsk-400 border-minsk-400 hover:border-minsk-700 hover:text-minsk-700">
                  {item.name}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  )
}
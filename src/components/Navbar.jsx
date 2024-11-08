import { Fragment } from 'react'
import { Popover, PopoverButton, PopoverGroup, PopoverPanel, Transition } from '@headlessui/react'
import {
  Bars3Icon,XMarkIcon,
  UserCircleIcon,Cog6ToothIcon,
  UserIcon, BuildingOfficeIcon
} from '@heroicons/react/24/outline'
import { NavLink, Link } from 'react-router-dom'
import { modulesAdmin, modulesTeacher, modulesSecretary } from '../helpers/helpers'
import logo from '../logo-tecno.jpg'
import {
  useAuthStore, useAlumnosStore, useCursosStore,
  useGradosStore, useSeccionesStore, useUnidadesStore
} from '../store/storages'
import { useState, useEffect } from 'react'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export const Navbar = () => {

  const reseting = (e) => {
    e.preventDefault()
    useAlumnosStore.getState().reset()
    useCursosStore.getState().reset()
    useGradosStore.getState().reset()
    useSeccionesStore.getState().reset()
    useUnidadesStore.getState().reset()
    useAuthStore.getState().logout()
  }

  const [modules, setModules] = useState([])
  const [userInfo, setUserinfo] = useState([])

  useEffect(() => {
    if (useAuthStore.getState().user.user_type == 1) {
      setModules(modulesAdmin)
      setUserinfo(
        [
          { id: 1, name: useAuthStore.getState().user.username, icon: UserIcon },
          { id: 2, name: 'Administrador', icon: BuildingOfficeIcon }
        ]
      )
    }
    else if (useAuthStore.getState().user.user_type == 2) {
      setModules(modulesSecretary)
      setUserinfo(
        [
          { id: 1, name: useAuthStore.getState().user.username, icon: UserIcon },
          { id: 2, name: 'Administrador', icon: BuildingOfficeIcon }
        ]
      )
    }
    else if (useAuthStore.getState().user.user_type == 3) {
      setModules(modulesTeacher)
      setUserinfo(
        [
          { id: 1, name: useAuthStore.getState().user.username, icon: UserIcon },
          { id: 2, name: 'Administrador', icon: BuildingOfficeIcon }
        ]
      )
    }
  }, [])

  return (
    <>
      <Popover className="relative bg-bull-shot-500">
        <div className="absolute inset-0 shadow z-30 pointer-events-none" aria-hidden="true" />
        <div className="relative z-20">
          <div className="max-w-7xl mx-auto flex justify-between items-center px-4 py-5 sm:px-6 sm:py-4 lg:px-8 md:justify-start md:space-x-10">
            <div>
              <Link to="/home" className="flex">
                <span className="sr-only">Workflow</span>
                <img
                  className="h-8 w-auto sm:h-10"
                  src={logo}
                  alt=""
                />
              </Link>
            </div>
            <div className="-mr-2 -my-2 md:hidden">
              <PopoverButton className="bg-bull-shot-500 rounded-md p-2 inline-flex items-center justify-center text-mirage-50 hover:text-minsk-500">
                <span className="sr-only">Open menu</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              </PopoverButton>
            </div>
            <div className="hidden md:flex-1 md:flex md:items-center md:justify-end">
              <PopoverGroup as="nav" className="flex space-x-10">
                {modules.map((item) => (
                  <NavLink key={item.id} className="text-base font-medium text-mirage-50 hover:text-minsk-700" to={item.path}>
                    {item.name}
                  </NavLink>
                ))}
                <Popover>
                  {({ open }) => (
                    <>
                      <PopoverButton
                        className={classNames(
                          open ? 'text-minsk-700' : 'text-mirage-50',
                          'group bg-bull-shot-500 inline-flex items-center'
                        )}
                      >
                        <span>
                          <UserCircleIcon
                            className={classNames(
                              open ? 'text-minsk-700' : 'text-mirage-50',
                              'sm:h-7 w-auto group-hover:text-minsk-900'
                            )}
                            aria-hidden="true"
                          />
                        </span>
                      </PopoverButton>

                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="opacity-0 -translate-y-1"
                        enterTo="opacity-100 translate-y-0"
                        leave="transition ease-in duration-150"
                        leaveFrom="opacity-100 translate-y-0"
                        leaveTo="opacity-0 -translate-y-1"
                      >
                        <PopoverPanel className="hidden md:block absolute z-10 top-full right-1 inset-x-3/4 transform shadow-lg">

                          <div className="relative max-w-md mx-auto">
                            <nav className="grid gap-y-5 px-4 bg-mirage-50 py-8 sm:grid-cols-1 sm:gap-x-8 sm:py-8 sm:px-6 lg:px-8 xl:pr-8">
                              <div>
                                <div className="flex items-center justify-between">
                                  <div>
                                    <h3 className="text-sm font-medium tracking-wide text-minsk-900 uppercase">Usuario</h3>
                                  </div>
                                  <div className="-mr-2">
                                    <button className="bg-mirage-50 rounded-md p-2 inline-flex items-center justify-center text-minsk-400 hover:text-minsk-700">
                                      <Cog6ToothIcon className="h-6 w-6" aria-hidden="true" />
                                    </button>
                                  </div>
                                </div>
                                <ul role="list" className="mt-5 space-y-6">
                                  {userInfo.map((item) => (
                                    <li key={item.name} className="flow-root">
                                      <div className="-m-3 p-3 flex items-center rounded-md text-base font-medium text-minsk-900">
                                        <item.icon className="flex-shrink-0 h-6 w-6 text-minsk-400" aria-hidden="true" />
                                        <span className="ml-4">{item.name}</span>
                                      </div>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              <div className="mt-6">
                                <Link
                                  onClick={reseting}
                                  to="/"
                                  className="w-full flex items-center justify-center px-4 py-2 border-2 rounded-full shadow-sm text-base font-medium text-minsk-400 border-minsk-400 hover:border-minsk-700 hover:text-minsk-700"
                                >
                                  Cerrar sesión
                                </Link>
                              </div>
                            </nav>
                          </div>
                        </PopoverPanel>
                      </Transition>
                    </>
                  )}
                </Popover>
              </PopoverGroup>
            </div>
          </div>
        </div>

        <Transition
          as={Fragment}
          enter="duration-200 ease-out"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="duration-100 ease-in"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <PopoverPanel
            focus
            className="absolute z-30 top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"
          >
            <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-mirage-50">
              <div className="pt-4 pb-2 px-4 sm:pb-4">
                <div className="flex items-center justify-between">
                  <div className="items-center">
                    <h3 className="text-sm font-medium tracking-wide text-minsk-900 uppercase">Administrador</h3>
                    <h1 className="text-sm tracking-wide text-minsk-900">nameUser</h1>
                  </div>
                  <div className="-mr-2">
                    <PopoverButton className="bg-mirage-50 rounded-md p-2 inline-flex items-center justify-center text-minsk-400 hover:text-minsk-700">
                      <span className="sr-only">Close menu</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </PopoverButton>
                  </div>
                </div>
              </div>
              <div className="py-6 px-5">
                <div className="grid grid-cols-2 gap-3">
                  {modules.map((item) => (
                    <Link key={item.id} className="rounded-md text-base font-medium text-minsk-900 hover:text-minsk-700" to={item.path}>
                      {item.name}
                    </Link>
                  ))}
                  <Link to="/MiPerfil" className="rounded-md text-base font-medium text-minsk-900 hover:text-minsk-700">
                    Mi Perfil
                  </Link>
                </div>
                <div className="mt-6">
                  <Link
                    to="/"
                    className="w-full flex items-center justify-center px-4 py-2 border-2 rounded-full shadow-sm text-base font-medium text-minsk-400 border-minsk-400 hover:border-minsk-700 hover:text-minsk-700"
                  >
                    Cerrar sesión
                  </Link>
                </div>
              </div>
            </div>
          </PopoverPanel>
        </Transition>
      </Popover>
    </>
  )
}

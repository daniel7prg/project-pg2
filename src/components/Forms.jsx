import { Fragment, useState } from 'react'
import { Popover, PopoverButton, PopoverPanel, Transition } from '@headlessui/react'
import { ChevronDownIcon, PlusCircleIcon, PencilSquareIcon, XMarkIcon, CheckIcon } from '@heroicons/react/24/outline'
import { useForm, useRequest } from '../hooks/chooks'
import { useLocation } from "react-router-dom";
import { toast } from 'sonner';
import { api, changeData } from '../helpers/helpers'
import { useAuthStore } from '../store/auth'

export function Forms({ initialForm, method }) {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()
  const { pathname } = location
  const { setLoad } = useRequest()
  const setToken = useAuthStore((state) => state.setToken)
  const token = useAuthStore((state) => state.token)
  const refreshToken = useAuthStore((state) => state.refresh)

  const initialState = Object.keys(initialForm).reduce((obj, item) => {
    obj[item] = initialForm[item].value;
    return obj;
  }, {});

  const { formData, formMultiple, onInputChange, onInputMultipleChange, onReset } = useForm(initialState)

  const onAdd = (data) => {
    const datos = changeData(data, pathname, 'Create', formMultiple)
    toast.promise(api.post(`${pathname}/`, datos, { headers: { 'Authorization': `Bearer ${token}` } }), {
      loading: 'Creando...',
      success: (e) => {
        setLoad(true)
        onReset()
        return 'Creado con exito'
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

  const onEdit = (data) => {
    const datos = changeData(data, pathname, 'Edit', formMultiple)
    toast.promise(api.put(`${pathname}/${data.ID}/`, datos, { headers: { 'Authorization': `Bearer ${token}` } }), {
      loading: 'Editando...',
      success: (e) => {
        setLoad(true)
        return 'Editado con exito'
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

  const onSubmit = async (e) => {
    e.preventDefault()
    method === 'Agregar' ? onAdd(formData) : onEdit(formData)
  }

  return (
    <>
      <div className="flex items-center justify-center">
        <Popover className="relative">
          {({ open }) => (
            <>
              {method === 'Agregar' ? (
                <PopoverButton
                  className={`
                ${open ? 'text-mirage-50 bg-bull-shot-500' : 'text-mirage-50 bg-bull-shot-500'}
                group inline-flex w-auto items-center justify-center py-2 px-6 border-b-2 rounded-full shadow-sm text-sm font-medium hover:text-mirage-50 hover:bg-bull-shot-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-bull-shot-800 hover:border-minsk-500
              `}
                  onClick={() => setIsOpen(!isOpen)}
                >
                  {method}
                  <span className="ms-2">
                    <PlusCircleIcon className="h-6 w-6" aria-hidden="true" />
                  </span>
                </PopoverButton>
              ) : (
                <PopoverButton
                  className={`
                ${open ? 'text-minsk-400 border-2 border-minsk-400' : 'text-minsk-500 border-2 border-minsk-500'} 
                group inline-flex w-auto items-center justify-center py-2 px-3 rounded-full shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-mirage-600 hover:border-minsk-700 hover:text-minsk-700
              `}
                  onClick={() => setIsOpen(!isOpen)}
                >
                  {method}
                  <span className="ms-2">
                    <PencilSquareIcon className="h-6 w-6" aria-hidden="true" />
                  </span>
                </PopoverButton>
              )}
              <Transition
                show={isOpen}
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
                <PopoverPanel
                  static
                  className="fixed inset-0 z-10 overflow-y-auto"
                >
                  <div className="flex min-h-screen items-center justify-center p-4 text-center">
                    <PopoverPanel
                      static
                      className="w-full max-w-md transform overflow-hidden rounded-2xl bg-mirage-50 p-6 align-middle shadow-xl transition-all"
                    >
                      <form className="space-y-6" onSubmit={onSubmit}>
                        <div className="mt-2 flex flex-col space-y-4">
                          <div className="mt-1">
                            {Object.entries(initialForm).map(([key, field]) => (
                              <div key={key}>
                                <label htmlFor={key} className='block text-left text-sm font-medium text-minsk-900'>
                                  {key}:
                                </label>
                                <div className="mt-2 mb-4">
                                  {field.tag === 'select' ? (
                                    <div className="relative">
                                      <select
                                        id={key}
                                        name={key}
                                        value={field.multiple ? formMultiple[key]?.map((item) => item.id) : formData[key] || ""}
                                        onChange={(e) => field.multiple ? onInputMultipleChange(e, key) : onInputChange(e)}
                                        disabled={field.disabled}
                                        multiple={field.multiple}
                                        className="appearance-none block w-full px-3 py-2 border-2 border-mirage-200 rounded-md shadow-sm placeholder-mirage-300 focus:outline-none focus:ring-minsk-500 focus:border-minsk-500 sm:text-sm"
                                      >
                                        {field.options.map((option) => (
                                          <option key={option.id} value={option.id}>
                                            {option.value}
                                          </option>
                                        ))}
                                      </select>
                                      {field.multiple || field.disabled ? null : <ChevronDownIcon className='group pointer-events-none absolute top-2.5 right-2.5 size-4 fill-white/60' aria-hidden="true" />}
                                    </div>
                                  ) : (
                                    <input
                                      id={key}
                                      type={field.type}
                                      name={key}
                                      required
                                      value={formData[key] || ""}
                                      onChange={onInputChange}
                                      className="appearance-none block w-full px-3 py-2 border-2 border-mirage-200 rounded-md shadow-sm placeholder-mirage-300 focus:outline-none focus:ring-minsk-500 focus:border-minsk-500 sm:text-sm"
                                      disabled={field.disabled}
                                    />
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="mt-4 items-center justify-center flex">
                          <button
                            type="button"
                            className="flex text-mirage-50 bg-bull-shot-500 items-center justify-center ms-2 py-2 px-6 border-b-2 rounded-full shadow-sm text-sm font-medium hover:text-mirage-50 hover:bg-bull-shot-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-bull-shot-800 hover:border-minsk-500"
                            onClick={() => setIsOpen(false)}
                          >
                            Cancelar
                            <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                          </button>
                          <button
                            type="submit"
                            className="flex text-mirage-50 bg-minsk-500 items-center justify-center ms-2 py-2 px-6 border-b-2 rounded-full shadow-sm text-sm font-medium hover:text-mirage-50 hover:bg-minsk-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-minsk-800 hover:border-bull-shot-500"
                          >
                            Aceptar
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </button>
                        </div>
                      </form>
                    </PopoverPanel>
                  </div>
                </PopoverPanel>
              </Transition>
            </>
          )}
        </Popover>
      </div>
    </>
  )
}
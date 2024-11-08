import { Fragment, useState } from 'react'
import { Popover, PopoverButton, PopoverPanel, Transition } from '@headlessui/react'
import { ChevronDownIcon, PlusCircleIcon, PencilSquareIcon } from '@heroicons/react/24/outline'

export function Views({ initialForm }) {
  const [isOpen, setIsOpen] = useState(false)

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
                      className="w-full max-w-md transform overflow-hidden rounded-2xl bg-mirage-50 p-6 text-left align-middle shadow-xl transition-all"
                    >
                      <div className="mt-4 items-center justify-center">
                        <button
                          type="button"
                          className="text-mirage-50 bg-bull-shot-500 items-center justify-center ms-2 py-2 px-8 border-b-2 rounded-full shadow-sm text-sm font-medium hover:text-mirage-50 hover:bg-bull-shot-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-bull-shot-800 hover:border-minsk-500"
                          onClick={() => setIsOpen(false)}
                        >
                          Cerrar
                        </button>
                      </div>
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
import { Forms } from "./componentes" 

export const Header = ({title, form}) => {
  return (
    <div className="md:flex items-center justify-between pt-6 pb-2 px-24">
      <h2 className="text-left text-6xl font-semibold text-minsk-900 justify-center flex">{title}</h2>
      <div className="flex items-center justify-center gap-x-2 text-base">
        <Forms initialForm={form} method="Agregar"/>
        <button className='flex items-center justify-center px-2 py-1 gap-x-1 border-2 rounded-full shadow-sm text-base font-medium text-minsk-400 border-minsk-400 hover:border-minsk-700 hover:text-minsk-700'>
          Eliminar
        </button>
      </div>
    </div>
  )
}

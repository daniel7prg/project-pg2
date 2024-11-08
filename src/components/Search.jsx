import { MagnifyingGlassIcon } from "@heroicons/react/24/outline"
import { useState, useEffect } from "react"

export const Search = ({value, onType, ...props}) => {
  const [data, setData] = useState(value) 
  
  useEffect(() => {
    const timeout = setTimeout(() => onType(data), 500)
    return () => clearTimeout(timeout)
  }, [data])

  return (
    <div className="relative">
      <div className="absolute inset-y-0 start-0 grid w-10 place-content-center">
        <MagnifyingGlassIcon className="h-5 w-5" aria-hidden="true" />
      </div>
      <input
        {...props}
        value={data}
        onChange={(e) => setData(e.target.value)}
        className="ps-9 pe-3 py-2 border-2 border-mirage-200 rounded-md placeholder-mirage-300 focus:outline-none focus:ring-minsk-500 focus:border-minsk-500 sm:text-sm"
      />
    </div>
  )
}

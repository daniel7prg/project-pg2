export const Cinput = ({ name, type, value, onChange, placeholder, autoComplete, required }) => {
    if (required) {
      return<input
        name={name}
        type={type}
        autoComplete={autoComplete}
        required
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="appearance-none block w-full px-3 py-2 border-2 border-mirage-200 rounded-md placeholder-mirage-300 focus:outline-none focus:ring-minsk-500 focus:border-minsk-500 sm:text-sm"
      />
    }
    else {
      return <input
        name={name}
        type={type}
        autoComplete={autoComplete}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="appearance-none block w-full px-3 py-2 border-2 border-mirage-200 rounded-md placeholder-mirage-300 focus:outline-none focus:ring-minsk-500 focus:border-minsk-500 sm:text-sm"
      />
    }
}

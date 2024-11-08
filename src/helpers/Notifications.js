export const defaultStyle = {
  unstyled: true,
  classNames: {
    toast: 'w-96 flex items-center bg-minsk-50 px-4 py-8 rounded-lg border-b-4 border-bull-shot-500',
    title: 'text-minsk-900',
    description: 'text-minsk-700',
    closeButton: 'bg-minsk-100 text-minsk-700 hover:bg-minsk-200 hover:text-minsk-900',
  }
}

export const errorStyle = {
  unstyled: true,
  classNames: {
    error: "w-96 text-red-400 flex items-center w- bg-red-50 px-4 py-8 gap-2 rounded-lg border-b-4 border-red-500",
    closeButton: 'bg-red-400 text-red-50 hover:bg-red-500 hover:text-red-900',
  }
}

export const successStyle = {
  unstyled: true,
  classNames: {
    success: 'w-96 text-green-400 flex items-center bg-green-50 px-4 py-8 gap-2 rounded-lg border-b-4 border-green-500', 
    closeButton: 'bg-green-400 text-green-50 hover:bg-green-500 hover:text-green-900',
  }
}

export const loadingStyle = {
  unstyled: true,
  classNames: {
    toast: 'w-96 flex items-center justify-center bg-minsk-50 px-4 py-8 rounded-lg border-b-4 border-bull-shot-500',
    loading: "w-96 text-minsk-700 flex items-center bg-minsk-50 px-4 py-8 gap-2 rounded-lg border-b-4 border-bull-shot-500",
    success: 'w-96 text-green-400 flex items-center bg-green-50 px-4 py-8 gap-2 rounded-lg border-b-4 border-green-500', 
    error: "w-96 text-red-400 flex items-center bg-red-50 px-4 py-8 gap-2 rounded-lg border-b-4 border-red-500",
    closeButton: 'bg-green-400 text-green-50 hover:bg-green-500 hover:text-green-900',
  }
}
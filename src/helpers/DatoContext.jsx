import React, { createContext, useState } from 'react';

export const DatoContext = createContext(null);

export function DatoProvider({ children }) {
  const [load, setLoad] = useState(false);

  const value = { load, setLoad }

  return (
    <DatoContext.Provider value={value}>
      {children}
    </DatoContext.Provider>
  )
}

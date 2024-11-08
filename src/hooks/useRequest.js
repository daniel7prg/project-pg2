import { useContext } from 'react';
import { DatoContext } from '../helpers/DatoContext';

export const useRequest = () => {
  const context = useContext(DatoContext);
  
  if (!context) {
    throw new Error('useRequest debe usarse dentro de un DatoProvider');
  }

  return context;
}


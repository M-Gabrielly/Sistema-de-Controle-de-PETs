
// MensagemAPI.jsx
import { createContext, useState, useContext, useRef } from 'react';

const MensagemContext = createContext();

export function MensagemProvider({ children }) {
  const [message, setMessage] = useState(null);
  const timeoutRef = useRef(null); // <- guarda o timeout atual

  const showMessage = (text, type = 'success', duration = 3000) => {
    setMessage({ text, type });

    // limpa qualquer timeout anterior antes de criar um novo
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setMessage(null);
      timeoutRef.current = null; // limpa a ref
    }, duration);
  };

  return (
    <MensagemContext.Provider value={{ message, showMessage }}>
      {children}
    </MensagemContext.Provider>
  );
}

export function MensagemAPI() {
  return useContext(MensagemContext);
}

import { createContext, useState, useContext } from 'react';

const MensagemContext = createContext();

export function MensagemProvider({ children }) {
  const [message, setMessage] = useState(null);

  const showMessage = (text, type = 'success', duration = 3000) => {
    setMessage({ text, type });
    setTimeout(() => setMessage(null), duration);
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
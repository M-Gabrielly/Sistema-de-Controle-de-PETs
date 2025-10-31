import React from 'react';
import { MensagemAPI } from '../context/MensagemAPI';

export default function Notificacao() {
  const { message } = MensagemAPI();

  if (!message) return null;

  return (
    <div
      style={{
        position: 'fixed',
        // top: '20px',
        bottom: '20px',
        left: '50%',
        padding: '10px 15px',
        borderRadius: '8px',
        color: message.type === 'error' ? '#721c24' : '#155724',
        backgroundColor: message.type === 'error' ? '#f8d7da' : '#d4edda',
        border: `1px solid ${
          message.type === 'error' ? '#f5c6cb' : '#c3e6cb'
        }`,
        boxShadow: '0 2px 10px rgba(0,0,0,0.15)',
        zIndex: 9999,
        fontWeight: 500,
        fontSize: '14px',
        transform: 'translate(-50%, -50%)',
      }}
    >
      {message.text}
    </div>
  );
}
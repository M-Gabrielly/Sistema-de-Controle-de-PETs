import React from 'react';
import { MensagemAPI } from '../context/MensagemAPI';

export default function Notificacao() {
  const { message } = MensagemAPI();

  if (!message) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '12px 20px',
        borderRadius: '8px',
        color: message.type === 'error' ? '#721c24' : '#155724',
        backgroundColor: message.type === 'error' ? '#f8d7da' : '#d4edda',
        border: `1px solid ${
          message.type === 'error' ? '#f5c6cb' : '#c3e6cb'
        }`,
        boxShadow: '0 2px 10px rgba(0,0,0,0.15)',
        zIndex: 9999,
        fontWeight: 500,
      }}
    >
      {message.text}
    </div>
  );
}
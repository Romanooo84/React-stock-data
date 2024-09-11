import React from 'react';
import css from '../styles/Modal.module.css'


export const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null; // Modal jest renderowany tylko gdy isOpen jest true
  
    return (
      <div className={css.modalOverlay} onClick={onClose}>
        <div className={css.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={css.closeButton} onClick={onClose}>
          &times;
        </button>
          {children}
        </div>
      </div>
    );
  };

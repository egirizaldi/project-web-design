import React from 'react';
import { useToast } from '../context/ToastContext';

export default function Toast() {
  const { toast, hideToast } = useToast();

  if (!toast.show) return null;

  return (
    <div id="toast" className="toast" role="status" aria-live="polite">
      <span id="toastMessage">{toast.message}</span>
      <button
        id="toastClose"
        type="button"
        className="btn btn-ghost"
        style={{ minHeight: '32px', padding: '2px 8px', color: 'inherit', borderColor: 'currentColor' }}
        onClick={hideToast}
      >
        Tutup
      </button>
    </div>
  );
}

// index.js
import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Optional: Suppress ResizeObserver loop errors (non-breaking browser issue)
window.addEventListener('error', (e) => {
  if (e.message === 'ResizeObserver loop completed with undelivered notifications.') {
    e.stopImmediatePropagation();
  }
});

// Optional: Patch workaround to preempt ResizeObserver issue
if (typeof window !== 'undefined') {
  const observer = new ResizeObserver(() => {});
  observer.observe(document.body);
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

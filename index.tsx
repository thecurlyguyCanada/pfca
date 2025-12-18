import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const removeSkeleton = () => {
  const skeleton = document.getElementById('loading-skeleton');
  if (skeleton && skeleton.parentElement) {
    skeleton.parentElement.removeChild(skeleton);
  }
};

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Ensure the static loading skeleton disappears as soon as React mounts
// and as a safety net once the window finishes loading.
requestAnimationFrame(removeSkeleton);
window.addEventListener('load', removeSkeleton);

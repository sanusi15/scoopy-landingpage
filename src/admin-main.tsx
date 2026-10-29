import { createRoot } from 'react-dom/client';
import { AdminCmsApp } from './admin-cms/AdminCmsApp';
import './index.css';

createRoot(document.getElementById('admin-root')!).render(
  <AdminCmsApp
    onOpenStorefront={() => {
      window.location.href = '/';
    }}
  />
);

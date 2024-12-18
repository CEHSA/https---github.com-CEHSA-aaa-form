import { createHashRouter } from 'react-router-dom';
import App from './App';
import PaymentSuccess from './pages/PaymentSuccess';
import PaymentCancel from './pages/PaymentCancel';
import { PaymentNotify } from './pages/PaymentNotify';

export const router = createHashRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/payment/success',
    element: <PaymentSuccess />,
  },
  {
    path: '/payment/cancel',
    element: <PaymentCancel />,
  },
  {
    path: '/payment/notify',
    element: <PaymentNotify />,
  },
], {
  future: {
    v7_relativeSplatPath: true,
    v7_fetcherPersist: true,
    v7_normalizeFormMethod: true,
    v7_partialHydration: true,
    v7_skipActionErrorRevalidation: true,
  }
});
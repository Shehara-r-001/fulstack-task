import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Provider } from 'react-redux';

import App from './App.tsx';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { store } from './redux/store.ts';

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: '/',
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <ReactQueryDevtools />
      <RouterProvider router={router} />
      <App />
    </Provider>
  </QueryClientProvider>
);

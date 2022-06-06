import React from 'react';
import ReactDom from 'react-dom/client';
import './index.css';
import App from './App';
import { QueryClientProvider, QueryClient } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

const root = document.querySelector('#root');
const client = new QueryClient();

ReactDom.createRoot(root).render(
  <QueryClientProvider client={client}>
    <App />
    <ReactQueryDevtools initialIsOpen/>
  </QueryClientProvider>
)
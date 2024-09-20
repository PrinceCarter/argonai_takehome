import React from 'react';
import ReactDOM from 'react-dom/client';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import './index.css';
import App from './App';

// Create Apollo Client instance
const client = new ApolloClient({
  uri: 'http://localhost:4000',
  cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <ApolloProvider client={client}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ApolloProvider>
);

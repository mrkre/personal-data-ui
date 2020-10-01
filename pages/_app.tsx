import React from 'react';
import { AppProps } from 'next/app';
import { AuthProvider } from '../contexts/auth';
import '../styles/globals.css';

function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default App;

import '../styles/globals.css'
import type { AppProps } from 'next/app';
import Layout from '../components/layout';
import { useEffect } from 'react';
import { initializeStore } from '../store/productsStore';
import { initializeStoreSettings } from '../store/settingsStore';

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    initializeStore(pageProps);
    initializeStoreSettings(pageProps);
    console.log(pageProps, 'pageProps');
    
  }, [pageProps])
  return (
      <Layout>
        <Component {...pageProps} />
      </Layout>
  )
}

export default MyApp

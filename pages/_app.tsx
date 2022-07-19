import '../styles/globals.css'
import type { AppProps } from 'next/app';
import Layout from '../components/layout';
import { useEffect } from 'react';
import { initializeStore } from '../store/productsStore';

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    initializeStore(pageProps);
    console.log(pageProps, 'pageProps')
  }, [pageProps])
  return (
      <Layout>
        <Component {...pageProps} />
      </Layout>
  )
}

export default MyApp

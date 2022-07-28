import '../styles/globals.css'
import type { AppProps } from 'next/app';
import Layout from '../components/layout';
import { useEffect } from 'react';
import { initializeStore } from '../store/productsStore';
import { initializeStoreSettings } from '../store/settingsStore';
import client_api, { factoryBaseModal } from '../utils/client_api';
import { GetServerSideProps } from 'next';
import { ISettings } from '../utils/types';

interface PropsInitStore {
  children: JSX.Element;
  initialState: any;
}


function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    initializeStore(pageProps);
    initializeStoreSettings(pageProps);
  }, [pageProps]);
  return (
      <Layout {...pageProps}>
        <Component {...pageProps} />
      </Layout>
  )
}

export default MyApp

const wrapper = async (request: () => Promise<ISettings[]>) => {
  return (await request()).map((el: ISettings) => factoryBaseModal(el)) 
}

export const mainGetServerSideProps = async () => {
  const requests = [
    wrapper(client_api.brand),
    wrapper(client_api.category),
    wrapper(client_api.product_type),
    wrapper(client_api.tag),
  ];
  const result = await Promise.all(requests);
  
  return {
    brands: result[0],
    categories: result[1],
    productType: result[2],
    tagsList: result[3],
  }
}
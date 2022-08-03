import type { GetServerSideProps, NextPage } from 'next';
import styles from '../styles/Home.module.css';
import Image from 'next/image';
import backgroundTwo from '../public/background2.png';
import { mainGetServerSideProps } from './_app';

const Home: NextPage = () => {

  return (
    
        <main className={styles.container}>
          <div className={styles.containerImage}>
            <Image width={1920} height={750} src={backgroundTwo} alt='background'/>
          </div>
        </main>
  )
}

export default Home

export  const getServerSideProps: GetServerSideProps = async ({ query }) =>  {
  const mainProps = await mainGetServerSideProps();
  return { props: {...mainProps } }
}
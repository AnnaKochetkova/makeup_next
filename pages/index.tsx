import type { GetServerSideProps, NextPage } from 'next';
import styles from '../styles/Home.module.css';
import Image from 'next/image';
import eyes from '../public/eyes.png';
import brushes from '../public/brushes.png';
import blush from '../public/blush.png';
import lipstick from '../public/lipstick.png';
import nail from '../public/nail.png';
import { mainGetServerSideProps } from './_app';

const Home: NextPage = () => {

  return (
    
        <main className={styles.container}>
          <div className={styles.containerImage}>
              <div className={styles.wrapper}>
                <Image width={395} height={263} src={brushes} alt="brushes" />
                <Image width={395} height={263} src={blush} alt="blush" />
              </div>
              <Image width={395} height={536} src={lipstick} alt="lipstick"/>
              <div className={styles.wrapper}>
                <Image width={395} height={263} src={nail} alt="nail" />
                <Image width={395} height={263} src={eyes} alt="eyes" />
              </div>
          </div>
        </main>
  )
}

export default Home

export  const getServerSideProps: GetServerSideProps = async ({ query }) =>  {
  const mainProps = await mainGetServerSideProps();
  return { props: {...mainProps } }
}
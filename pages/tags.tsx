import { observer } from 'mobx-react-lite';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { useEffect } from 'react';
import productsStore from '../store/productsStore';
import storeSettings from '../store/settingsStore';
import styles from '../styles/listpage.module.css';
import api from '../utils/api';
import { mainGetServerSideProps } from './_app';

const Tags = observer(() => {

    const clickTag = (tag: string) => {
        productsStore.fetchProducts(tag, 'product_tags');
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.header}>Tags:</h1>
            <div className={styles.line}/>
            <ul className={styles.listBrand}>
                {
                    storeSettings.tagsList?.map((el, index) => {
                        return (<li key={index} className={styles.brand} onClick={()=>clickTag(el.name)}>
                                    <Link href={`/tags/${el.name}`}>
                                        {el.name}
                                    </Link>
                                </li>)
                    })
                }
                
            </ul>
        </div>
    )
})

export default Tags;

export  const getServerSideProps: GetServerSideProps = async ({ query }) =>  {
    const mainProps = await mainGetServerSideProps();
    return { props: {...mainProps } }
}
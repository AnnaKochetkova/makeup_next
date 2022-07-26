import { observer } from "mobx-react-lite";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { useEffect } from "react";
import productsStore from "../store/productsStore";
import storeSettings from "../store/settingsStore";
import styles from '../styles/listpage.module.css';
import api from "../utils/api";
import { mainGetServerSideProps } from "./_app";

const Brands = observer(() => {

    // const clickBrand = (brand: string) => {
    //     productsStore.fetchProducts(brand, 'brand');
    // }
    
    return (
        <div className={styles.container}>
            <h1 className={styles.header}>Brands:</h1>
            <div className={styles.line}/>
            <ul className={styles.listBrand}>
                {
                    
                    storeSettings.brands?.map((el, index) => {
                            return (<li key={index} className={styles.brand} >
                                    <Link href={`/brands/${el.name}`}>
                                        <a>{el.name}</a>
                                    </Link>
                                    </li>)
                    })
                    
                }
                
            </ul>
        </div>
    )
})

export default Brands;

export  const getServerSideProps: GetServerSideProps = async ({ query }) =>  {
    const mainProps = await mainGetServerSideProps();
    return { props: {...mainProps } }
}
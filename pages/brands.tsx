import { observer } from "mobx-react-lite";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { useEffect } from "react";
import productsStore from "../store/productsStore";
import storeSettings from "../store/settingsStore";
import styles from '../styles/listpage.module.css';
import api from "../utils/api";

const Brands = observer(() => {

    const clickBrand = (brand: string) => {
        productsStore.fetchProducts(brand, 'brand');
    }

    useEffect(() => {
        storeSettings.getBrands();
    }, [])

    return (
        <div className={styles.container}>
            <h1 className={styles.header}>Brands:</h1>
            <div className={styles.line}/>
            <ul className={styles.listBrand}>
                {
                    
                    storeSettings.brands?.map((el, index) => {
                        return (<li key={index} className={styles.brand} onClick={()=>clickBrand(el.name)}>
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

export  const getServerSideProps: GetServerSideProps = async (context) =>  {
    const result = await api.getBrands()
    return { props: { products: result} }
}
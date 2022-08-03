import { observer } from "mobx-react-lite";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import Loading from "../../components/loading";
import Pagination from "../../components/pagination";
import ProductCard from "../../components/productCard";
import store from "../../store/productsStore";
import storeSettings from "../../store/settingsStore";
import styles from '../../styles/categories.module.css';
import client_api from "../../utils/client_api";
import { factoryProduct } from "../../utils/factoryProduct";
import useWrapperStore from "../../utils/useWrapperStore";
import { mainGetServerSideProps } from "../_app";

const Brand = observer(({brand}: any) => {
    const router = useRouter()
    const { query } = router;
    const [currentPage, setCurrentPage] = useState(0);
    const taskStore = useCallback((item: any) => {
        store.fetchProductsByBrand(item._id);
    }, []);

    const taskFind = useCallback((name: string) => {
        return  storeSettings.brands?.find(el => el.name === name);
    }, []);

    useWrapperStore('brand', brand, taskStore, taskFind);

    const onPage = useCallback((page: number) => {
        setCurrentPage(page);
        const currentBrand = taskFind(brand);
        if(currentBrand){
            store.fetchProductsByBrand(currentBrand?._id, page);
        }
    }, [])

    useEffect(() => {
        if(query.page !== undefined){
            setCurrentPage(Number(query.page) - 1);
            const currentBrand = taskFind(brand);
            if(currentBrand){
                store.fetchProductsByBrand(currentBrand?._id, (Number(query.page) - 1));
            }
        }
    }, [])

    return (
        <div className={styles.container}>
            <h1 className={styles.header}>Brand: {query.brand}, Найдено {store.counterProduct}</h1>
            <div className={styles.line} />
            {
                store.loading ? <Loading /> : (
                    <div className={styles.products}>
                        {
                            store.products?.map(el => {
                                return (
                                    <ProductCard
                                        key={el._id}
                                        brand={el.brand}
                                        name={el.name} 
                                        category={el.category} 
                                        price={el.price} 
                                        image_link={el.image_link} 
                                        _id={el._id} 
                                        product_colors={el.product_colors} 
                                    />
                                )
                            })
                        }

                    </div>
                )
            }
            <Pagination counter={store.counterProduct} currentPage={currentPage} onPage={onPage}/>
        </div>
    )
})

export  const getServerSideProps = async ({ query }: any) =>  {
    const mainProps = await mainGetServerSideProps();
    const currentBrand = mainProps.brands.find(el => el.name === query.brand)
    if(currentBrand){
        const [product, {counter}] = await client_api.productByBrand(currentBrand._id);
        const result = product.map(el => factoryProduct(el));
        return { props: { ...mainProps, brand: currentBrand.name, products: result, counterProduct: Number(counter)} }
    }
    return {props: {}}
}

export default Brand;
import { observer } from "mobx-react-lite";
import { useCallback, useEffect, useState} from "react";
import Loading from "../components/loading";
import ProductCard from "../components/productCard";
import store from "../store/productsStore";
import styles from '../styles/categories.module.css';
import client_api from "../utils/client_api";
import { factoryProduct } from "../utils/factoryProduct";
import { mainGetServerSideProps } from "./_app";
import { useRouter } from 'next/router';
import storeSettings from '../store/settingsStore';
import useWrapperStore from "../utils/useWrapperStore";
import Pagination from "../components/pagination";


const Categories = observer(({categories}: any) => {
    const router = useRouter()
    const { query } = router;
    const [currentPage, setCurrentPage] = useState(0);

    const taskStore = useCallback((item: any) => {
        store.fetchProductsByType(item._id);
    }, []);

    const taskFind = useCallback((name: string) => {
        return  storeSettings.productType?.find(el => el.name === name);
    }, []);

    const isEmptyStore = useCallback(() => {
        
        return store.products?.length === 0;
    }, []);

    const onPage = useCallback((page: number) => {
        setCurrentPage(page);
        const currentType = taskFind(categories);
        
        if(currentType){
            store.fetchProductsByType(currentType?._id, page);
        }
        
    }, [])

    useWrapperStore('categories', categories, taskStore, taskFind, isEmptyStore);

    useEffect(() => {
        if(query.page !== undefined){
            setCurrentPage(Number(query.page) - 1);
            const currentType = taskFind(categories);
            if(currentType){
                store.fetchProductsByType(currentType?._id, (Number(query.page) - 1));
            }
        }
    }, [])

    return (
        <div className={styles.container}>
            <h1 className={styles.header}>{query.categories} , Найдено {store.counterProduct}</h1>
            <div className={styles.line}/>
            {
                store.loading ? <Loading/> : (
                    <div className={styles.products}>
                        {
                            store.products?.map(el => {
                                return (
                                    <ProductCard 
                                        key={el._id}
                                        {...el}
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
    const currentType = mainProps.productType.find(el => el.name === query.categories)
    if(currentType){
        const [product, {counter}] = await client_api.productByProductType(currentType._id);
        const result = product.map(el => factoryProduct(el));
        return { props: { ...mainProps, categories: currentType.name, products: result, counterProduct: Number(counter)} }
    }
    return {props: {}}
}

export default Categories;
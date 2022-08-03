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

const Tag = observer(({tag}: any) => {
    const router = useRouter()
    const { query } = router;
    const [currentPage, setCurrentPage] = useState(0);

    const taskStore = useCallback((item: any) => {
        store.fetchProductsByTag(item._id);
    }, []);

    const taskFind = useCallback((name: string) => {
        return  storeSettings.tagsList?.find(el => el.name === name);
    }, []);

    const onPage = useCallback((page: number) => {
        setCurrentPage(page);
        const currentTag = taskFind(tag);
        
        if(currentTag){
            store.fetchProductsByTag(currentTag?._id, page);
        }
        
    }, [])

    useWrapperStore('tag', tag, taskStore, taskFind);

    useEffect(() => {
        if(query.page !== undefined){
            setCurrentPage(Number(query.page) - 1);
            const currentTag = taskFind(tag);
            if(currentTag){
                store.fetchProductsByTag(currentTag?._id, (Number(query.page) - 1));
            }
        }
    }, [])

    return (
        <div className={styles.container}>
            <h1 className={styles.header}>Tag: {query.tag} Найдено: {store.counterProduct}</h1>
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
    const currentTag = mainProps.tagsList.find(el => el.name === query.tag);
    if(currentTag){
        const [product, {counter}] = (await client_api.productByTag(currentTag._id));
        const result = product.map(el => factoryProduct(el));
        return { props: {...mainProps, tag: currentTag.name, products: result, counterProduct: Number(counter)} }
    }
    return {props: {}}
}

export default Tag;
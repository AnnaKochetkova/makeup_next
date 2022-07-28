import { observer } from "mobx-react-lite";
import { GetServerSideProps } from "next";
import { useCallback, useEffect, useRef } from "react";
import Loading from "../components/loading";
import ProductCard from "../components/productCard";
import store from "../store/productsStore";
import styles from '../styles/categories.module.css';
import api from "../utils/api";
import client_api from "../utils/client_api";
import { factoryProduct } from "../utils/factoryProduct";
import { IProduct } from "../utils/types";
import { mainGetServerSideProps } from "./_app";
import { useRouter } from 'next/router';
import storeSettings from '../store/settingsStore';
import useWrapperStore from "../utils/useWrapperStore";

// const useWrapperStore = (slug: string, cashSlug: string, taskStore: (item: any)=>void, taskFind: (name: string)=>any|null) => {
//     const router = useRouter()
//     const { query } = router;
//     const cash = useRef(cashSlug);
//     useEffect(() => {
//         console.log(query, 'query', query[slug] && cash.current !== query[slug]);
        
//         if(query[slug] && cash.current !== query[slug]){
//             const item = taskFind(query[slug] as string);
//             if(item){
//                 taskStore(item);
//                 cash.current = query[slug] as string;
//             }
//         }
//     }, [query])
// }

const Categories = observer(({categories}: any) => {
    // const cashCategories = useRef(categories.name);
    const router = useRouter()
    const { query } = router
    const clickProduct = (product: IProduct) => {
        // store.saveProduct(product);
    }

    const taskStore = useCallback((item: any) => {
        store.fetchProductsByType(item._id);
    }, []);

    const taskFind = useCallback((name: string) => {
        return  storeSettings.productType?.find(el => el.name === name);
    }, []);

    useWrapperStore('categories', categories.name, taskStore, taskFind);
    // useEffect(() => { 
    //     if (query.categories && cashCategories.current !== query.categories) {
    //         const currentType = storeSettings.productType?.find(el => el.name === query.categories);
    //         if(currentType) {
    //             store.fetchProductsByType(currentType._id);
    //             cashCategories.current = query.categories;
                
    //         }
    //         console.log('query', query);
    //         // store.fetchProductsByType(categories._id)
    //     }
    //     // 
    //     // return () => {
    //     //     store.deleteProducts();
    //     // }
    // }, [query]);

    return (
        <div className={styles.container}>
            <h1 className={styles.header}>{query.categories}</h1>
            <div className={styles.line}/>
            {
                store.loading ? <Loading/> : (
                    <div className={styles.products}>
                        {
                            store.products?.map(el => {
                                return (
                                    <ProductCard 
                                        key={el._id}
                                        onClick={()=>clickProduct(el)}
                                        {...el}
                                    />
                                )
                            })
                        }
                        
                    </div>
                )
            }
            
            
        </div>
    )
})

export  const getServerSideProps = async ({ query }: any) =>  {
    console.log('page categories');
    
    const mainProps = await mainGetServerSideProps();
    const currentType = await client_api.product_typeByName(query.categories)
    if(currentType.length === 1){
        const result = (await client_api.productByProductType(currentType[0]._id)).map(el => factoryProduct(el))
        return { props: { ...mainProps, categories: currentType[0], products: result} }
    }
    return {props: {}}
}

export default Categories;
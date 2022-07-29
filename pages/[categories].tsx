import { observer } from "mobx-react-lite";
import { useCallback} from "react";
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


const Categories = observer(({categories}: any) => {
    const router = useRouter()
    const { query } = router

    const taskStore = useCallback((item: any) => {
        store.fetchProductsByType(item._id);
    }, []);

    const taskFind = useCallback((name: string) => {
        return  storeSettings.productType?.find(el => el.name === name);
    }, []);

    const isEmptyStore = useCallback(() => {
        console.log('store.products?.length', store.products?.length);
        console.log('store.loading', store.loading);
        
        return store.products?.length === 0;
    }, []);

    useWrapperStore('categories', categories.name, taskStore, taskFind, isEmptyStore);

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
    
    const mainProps = await mainGetServerSideProps();
    const currentType = await client_api.product_typeByName(query.categories)
    if(currentType.length === 1){
        const result = (await client_api.productByProductType(currentType[0]._id)).map(el => factoryProduct(el))
        return { props: { ...mainProps, categories: currentType[0], products: result} }
    }
    return {props: {}}
}

export default Categories;
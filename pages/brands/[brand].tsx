import { observer } from "mobx-react-lite";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useCallback, useEffect, useRef } from "react";
import Loading from "../../components/loading";
import ProductCard from "../../components/productCard";
import store, { useStoreProduct } from "../../store/productsStore";
import storeSettings from "../../store/settingsStore";
import styles from '../../styles/categories.module.css';
import api from "../../utils/api";
import client_api from "../../utils/client_api";
import { factoryProduct } from "../../utils/factoryProduct";
import { IProduct, ISettings } from "../../utils/types";
import useWrapperStore from "../../utils/useWrapperStore";
import { mainGetServerSideProps } from "../_app";

// const useFirstRender = (cb, reCb) => {
//     const count = useRef(true);
//     useEffect(() => {
//         if (count.current) {
//             cb();
//             count.current = false;
//         }
//         return () => {
//             if (count.current = false) {
//                 reCb()
//             }
//         }
//     }, [cb, reCb])
// }

const Brand = observer(({brand}: any) => {
    const ustore = useStoreProduct();
    const router = useRouter()
    const { query } = router
    const clickProduct = (product: IProduct) => {
        // ustore.saveProduct(product);
    }

    const taskStore = useCallback((item: any) => {
        store.fetchProductsByBrand(item._id);
    }, []);

    const taskFind = useCallback((name: string) => {
        return  storeSettings.brands?.find(el => el.name === name);
    }, []);

    useWrapperStore('brand', brand.name, taskStore, taskFind);
   
    // useFirstRender(() => store.fetchProductsByBrand(brand._id), store.deleteProducts);
    // useEffect(() => {
    //     ustore.fetchProductsByBrand(brand._id)
    //     console.log('useEffect fetch product mount');
        
             
    //     return () => {
    //         console.log('useEffect fetch product unmount');
    //         ustore.deleteProducts();
    //     }
    // }, [ustore]);
    return (
        <div className={styles.container}>
            <h1 className={styles.header}>Brand: {query.brand}</h1>
            <div className={styles.line} />
            {
                ustore.loading ? <Loading /> : (
                    <div className={styles.products}>
                        {
                            ustore.products?.map(el => {
                                return (
                                    <ProductCard
                                        key={el._id}
                                        onClick={()=>clickProduct(el)}
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
        </div>
    )
})

export  const getServerSideProps = async ({ query }: any) =>  {
    const mainProps = await mainGetServerSideProps();
    const currentBrand = await client_api.brandByName(query.brand)
    if(currentBrand.length === 1){
        const result = (await client_api.productByBrand(currentBrand[0]._id)).map(el => factoryProduct(el))
        return { props: { ...mainProps, brand: currentBrand[0], products: result} }
    }
    return {props: {}}
}

export default Brand;
import { observer } from "mobx-react-lite";
import { useRouter } from "next/router";
import { useCallback } from "react";
import Loading from "../../components/loading";
import ProductCard from "../../components/productCard";
import store, { useStoreProduct } from "../../store/productsStore";
import storeSettings from "../../store/settingsStore";
import styles from '../../styles/categories.module.css';
import client_api from "../../utils/client_api";
import { factoryProduct } from "../../utils/factoryProduct";
import useWrapperStore from "../../utils/useWrapperStore";
import { mainGetServerSideProps } from "../_app";

const Brand = observer(({brand}: any) => {
    const ustore = useStoreProduct();
    const router = useRouter()
    const { query } = router

    const taskStore = useCallback((item: any) => {
        store.fetchProductsByBrand(item._id);
    }, []);

    const taskFind = useCallback((name: string) => {
        return  storeSettings.brands?.find(el => el.name === name);
    }, []);

    useWrapperStore('brand', brand.name, taskStore, taskFind);

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
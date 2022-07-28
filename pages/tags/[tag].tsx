import { observer } from "mobx-react-lite";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useCallback, useEffect } from "react";
import Loading from "../../components/loading";
import ProductCard from "../../components/productCard";
import store from "../../store/productsStore";
import storeSettings from "../../store/settingsStore";
import styles from '../../styles/categories.module.css';
import api from "../../utils/api";
import client_api from "../../utils/client_api";
import { factoryProduct } from "../../utils/factoryProduct";
import { IProduct } from "../../utils/types";
import useWrapperStore from "../../utils/useWrapperStore";
import { mainGetServerSideProps } from "../_app";

const Tag = observer(({tag}: any) => {
    const router = useRouter()
    const { query } = router

    const clickProduct = (product: IProduct) => {
        // store.saveProduct(product);
    }

    const taskStore = useCallback((item: any) => {
        store.fetchProductsByTag(item._id);
    }, []);

    const taskFind = useCallback((name: string) => {
        return  storeSettings.tagsList?.find(el => el.name === name);
    }, []);

    useWrapperStore('tag', tag.name, taskStore, taskFind);

    // useEffect(() => {
    //     store.fetchProductsByTag(tag._id)

    //     return () => {
    //         store.deleteProducts();
    //     }
    // }, [tag]);

    return (
        <div className={styles.container}>
            <h1 className={styles.header}>Tag: {query.tag}</h1>
            <div className={styles.line} />
            {
                store.loading ? <Loading /> : (
                    <div className={styles.products}>
                        {
                            store.products?.map(el => {
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
    const currentTag = await client_api.tagByName(query.tag)
    if(currentTag.length === 1){
        const result = (await client_api.productByTag(currentTag[0]._id)).map(el => factoryProduct(el))
        return { props: {...mainProps, tag: currentTag[0], products: result} }
    }
    return {props: {}}
}

export default Tag;
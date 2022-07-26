import { observer } from "mobx-react-lite";
import { GetServerSideProps } from "next";
import { useEffect } from "react";
import Loading from "../../components/loading";
import ProductCard from "../../components/productCard";
import store from "../../store/productsStore";
import storeSettings from "../../store/settingsStore";
import styles from '../../styles/categories.module.css';
import api from "../../utils/api";
import client_api from "../../utils/client_api";
import { factoryProduct } from "../../utils/factoryProduct";
import { IProduct, ISettings } from "../../utils/types";

const Brand = observer(({brand}: any) => {

    const clickProduct = (product: IProduct) => {
        store.saveProduct(product);
    }

    useEffect(() => {
        store.fetchProductsByBrand(brand._id)
             
        return () => {
            store.deleteProducts();
        }
    }, [brand]);
    return (
        <div className={styles.container}>
            <h1 className={styles.header}>Brand: {brand.name}</h1>
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
    const currentBrand = await client_api.brandByName(query.brand)
    if(currentBrand.length === 1){
        const result = (await client_api.productByBrand(currentBrand[0]._id)).map(el => factoryProduct(el))
        return { props: { brand: currentBrand[0], result: result} }
    }
    return {props: {}}
}

export default Brand;
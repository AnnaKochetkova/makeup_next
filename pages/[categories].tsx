import { observer } from "mobx-react-lite";
import { GetServerSideProps } from "next";
import { useEffect } from "react";
import Loading from "../components/loading";
import ProductCard from "../components/productCard";
import store from "../store/productsStore";
import styles from '../styles/categories.module.css';
import api from "../utils/api";
import client_api from "../utils/client_api";
import { factoryProduct } from "../utils/factoryProduct";
import { IProduct } from "../utils/types";
import { mainGetServerSideProps } from "./_app";

const Categories = observer(({categories}: any) => {

    const clickProduct = (product: IProduct) => {
        store.saveProduct(product);
    }

    useEffect(() => {        
        store.fetchProductsByType(categories._id)
        return () => {
            store.deleteProducts();
        }
    }, [categories]);

    return (
        <div className={styles.container}>
            <h1 className={styles.header}>{categories.name}</h1>
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
    const currentType = await client_api.product_typeByName(query.categories)
    if(currentType.length === 1){
        const result = (await client_api.productByProductType(currentType[0]._id)).map(el => factoryProduct(el))
        return { props: { categories: currentType[0], result: result} }
    }
    return {props: {}}
}

export default Categories;
import { observer } from "mobx-react-lite";
import { GetServerSideProps } from "next";
import { useEffect } from "react";
import Loading from "../components/loading";
import ProductCard from "../components/productCard";
import store, {IInfoProduct} from "../store/productsStore";
import styles from '../styles/categories.module.css';
import api from "../utils/api";

const Categories = observer(({categories}: any) => {

    const clickProduct = (product: IInfoProduct) => {
        store.saveProduct(product);
    }

    useEffect(() => {
        store.fetchProducts(categories, 'product_type');
        return () => {
            store.deleteProducts();
        }
    }, []);

    return (
        <div className={styles.container}>
            <h1 className={styles.header}>{categories}</h1>
            <div className={styles.line}/>
            {
                store.loading ? <Loading/> : (
                    <div className={styles.products}>
                        {
                            store.products?.map(el => {
                                return (
                                    <ProductCard 
                                        key={el.id}
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

export  const getServerSideProps: GetServerSideProps = async ({ query }) =>  {
    const result = await api.getProductsByCategories(query.categories)
    return { props: { products: result, categories:  query.categories} }
}

export default Categories;
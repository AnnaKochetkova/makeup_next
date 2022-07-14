import { observer } from "mobx-react-lite";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Loading from "../components/loading";
import Product from "../components/product";
import productsStore, { IInfoProduct } from "../store/productsStore";
import styles from '../styles/categories.module.css';

const Categories = observer(() => {
    const router = useRouter();
    const { categories } = router.query;

    const clickProduct = (product: IInfoProduct) => {
        productsStore.saveProduct(product);
    }

    useEffect(() => {
        productsStore.fetchProducts(categories, 'product_type');

        return () => {
            productsStore.deleteProducts();
        }
    }, [categories]);

    return (
        <div className={styles.container}>
            <h1 className={styles.header}>{categories}</h1>
            <div className={styles.line}/>
            {
                productsStore.loading ? <Loading/> : (
                    <div className={styles.products}>
                        {
                            productsStore.products.map(el => {
                                return (
                                    <Product 
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

export default Categories;
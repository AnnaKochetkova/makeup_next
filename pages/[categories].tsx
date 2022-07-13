import { observer } from "mobx-react-lite";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Loading from "../components/loading";
import Product from "../components/product";
import productsStore from "../store/productsStore";
import styles from '../styles/categories.module.css';

const Categories = observer(() => {
    const router = useRouter();
    const { categories } = router.query;

    useEffect(() => {
        productsStore.fetchProducts(categories);

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
                                        brand={el.brand} 
                                        name={el.name} 
                                        category={el.category} 
                                        price={el.price} 
                                        api_featured_image={el.api_featured_image} 
                                        id={el.id} 
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

export default Categories;
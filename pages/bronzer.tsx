import Product from "../components/product";
import styles from '../styles/categories.module.css';
import { useEffect } from "react";
import productsStore from "../store/productsStore";
import { observer } from "mobx-react-lite";
import Loading from "../components/loading";

const Bronzer = observer(() => {

    useEffect(() => {
        console.log(productsStore.loading, 'load до фетч')
        productsStore.fetchProducts('bronzer');
        console.log(productsStore.loading, 'load после фетч')
        return () => {
            productsStore.deleteProducts();
            console.log(productsStore.loading, 'load в ретурн')
        }
    }, []);

    return (
        <div className={styles.container}>
            <h1 className={styles.header}>Bronzer</h1>
            <div className={styles.line}/>
            {
                productsStore.loading ? <Loading/> : (
                    <div className={styles.products}>
                        {
                            productsStore.products.map(el => {
                                return (
                                    <Product key={el.id} brand={el.brand} name={el.name} category={el.category} price={el.price} api_featured_image={el.api_featured_image} id={""} product_colors={el.product_colors}/>
                                )
                            })
                        }
                        
                    </div>
                )
            }
        </div>
    )
})

export default Bronzer;
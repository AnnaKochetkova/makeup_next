import Product from "../components/product";
import styles from '../styles/categories.module.css';
import { useEffect } from "react";
import productsStore from "../store/productsStore";
import Loading from "../components/loading";
import { observer } from "mobx-react-lite";

interface IColors{
    hex_value: string
}

export interface IBlush {
    id: string;
    api_featured_image: string,
    brand: string,
    category: string,
    name: string,
    price: string,
    product_colors: IColors[]
}

const Blush = observer(() => {

    useEffect(() => {
        productsStore.fetchProducts('blush');

        return () => {
            productsStore.deleteProducts();
        }
    }, []);

    return (
        <div className={styles.container}>
            <h1 className={styles.header}>Blushes</h1>
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

export default Blush;
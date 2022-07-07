import Product from "../components/product";
import styles from '../styles/categories.module.css';
import { useEffect, useState } from "react";

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



const Blush = () => {
    const url = 'http://makeup-api.herokuapp.com/api/v1/products.json?product_type=blush';
    const [blush, setBlush] = useState<IBlush[]>([])

    useEffect(() => {
        fetch(url)
            .then(response => response.json())
            .then(data => setBlush(data))
    }, []);

    console.log(blush)

    return (
        <div className={styles.container}>
            <h1 className={styles.header}>Blushes</h1>
            <div className={styles.line}/>
            <div className={styles.products}>
                {
                    blush.map(el => {
                        return (
                            <Product key={el.id} brand={el.brand} name={el.name} category={el.category} price={el.price} api_featured_image={el.api_featured_image} id={""} product_colors={el.product_colors}/>
                        )
                    })
                }
                
            </div>
        </div>
    )
}

export default Blush;
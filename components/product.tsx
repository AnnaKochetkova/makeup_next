import { IBlush } from '../pages/blush';
import styles from '../styles/product.module.css';

const Product = ({brand, name, category, price, api_featured_image, product_colors}: IBlush) => {
    return (
        <div className={styles.container}>
            <img className={styles.image} src={api_featured_image} alt="" />
            <div className={styles.text}>
                <p className={styles.bold}>{brand}</p>
                <p className={styles.bold}>{name}</p>
                {
                    category ? <p>Category: {category}</p> : null
                }
                <p>$ {price}</p>
            </div>

            <div className={styles.colors}>
                {
                    product_colors.map(el => {
                        return (
                            <span className={styles.color} style={{backgroundColor : `${el.hex_value}`, width: 20, height: 20}}/>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Product;
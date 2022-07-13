import { IBlush } from '../store/productsStore';
import styles from '../styles/product.module.css';

const Product = ({brand, name, category, price, api_featured_image, product_colors}: IBlush) => {
    return (
        <div className={styles.container}>
            <div className={styles.containerImage}>
                <img className={styles.image} src={api_featured_image} alt={name}/>
            </div>
            
            <div className={styles.text}>
                <p className={styles.name}>{name}</p>
                <p className={styles.brand}>{brand}</p>
                <p className={styles.price}>$ {price}</p>
            </div>

            <div className={styles.colors}>
                {
                    product_colors.map((el, index) => {
                        return (
                            <span key={index} className={styles.color} style={{backgroundColor : `${el.hex_value}`, width: 20, height: 20}}/>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Product;
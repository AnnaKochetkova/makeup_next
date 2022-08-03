import styles from '../styles/product.module.css';
import { useRouter } from 'next/router';
import { IProduct } from '../utils/types';

const ProductCard = ({brand, name, price, image_link, product_colors, _id,category}: IProduct) => {

    const router = useRouter();

    const click = () => {
        router.push(`/product/${_id}`, undefined, { shallow: true });
    }    
    
    return (
        <div className={styles.container} onClick={click}>
            <div className={styles.containerImage}>
                <img className={styles.image} src={image_link} alt={name}/>
            </div>
            
            <div className={styles.text}>
                <p className={styles.name}>{name}</p>
                <p className={styles.brand}>{brand.name}</p>
                <p className={styles.price}>$ {price}</p>
            </div>

            <div className={styles.colors}>
                {
                    product_colors.map((el, index) => {
                        return (
                            <span key={index}  className={styles.color} style={{backgroundColor : `${el.hex_value}`, width: 20, height: 20}}/>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default ProductCard;
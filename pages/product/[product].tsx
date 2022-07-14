import { observer } from "mobx-react-lite";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import productsStore, { IInfoProduct } from "../../store/productsStore";
import styles from '../../styles/productList.module.css';

const Product = observer(() => {    
    const {name, brand, description, api_featured_image, price, product_colors, product_link, tag_list} = productsStore.productInfo;
    const router = useRouter();
    const { product } = router.query;
    // const {name, brand, description, api_featured_image, price, product_colors, product_link, tag_list} = product;
    // console.log(props, 'props');
    
    useEffect(() => {
        if(product){
            productsStore.updateProduct(product);
        }
        
        return () => {
            productsStore.deleteProducts();
        }
    }, [product])

    return (
        <div className={styles.container}>
            <div className={styles.wrapperInfo}>
                <img className={styles.image} src={api_featured_image} alt={name} />
                <div className={styles.wrapperText}>
                    <h1 className={styles.header}>{name}</h1>
                    <p>Brand: <strong className={styles.uppercase}>{brand}</strong></p>
                    <p className={styles.price}>Price: <strong>{price} $</strong></p>
                    <div className={styles.line}/>
                    <div className={styles.colors}>
                        {
                            product_colors.map((el, index) => {
                                return (
                                    <div key={index} className={styles.colorsWraper}>
                                        <span className={styles.color} style={{backgroundColor : `${el.hex_value}`, width: 20, height: 20}}/>
                                        <span>{el.colour_name}</span>
                                    </div>
                                    
                                    
                                )
                            })
                        }
                    </div>
                    <a href={product_link} className={styles.link}>Buy now</a>
                </div>
            </div>
            
            <div className={styles.description}>
                {
                    description ? 
                        (<p className={styles.descriptionText}><strong>Description:</strong> {description}</p>) 
                        : <p className={styles.descriptionText}><strong>Description:</strong> No information</p>
                }
                
                <ul className={styles.listTags}>Tags list: 
                    {
                        tag_list?.map((el, index) => {
                            return (
                                <li className={styles.tag} key={index}>
                                    <Link href={`/tags/${el}`}>
                                        <a>{el}</a>
                                    </Link>
                                </li>
                            )
                        })
                    }
                </ul>
  
            </div>
        </div>
    )
})

// export async function getServerSideProps({ query }) {
//     const url = `http://makeup-api.herokuapp.com/api/v1/products/${query.product}.json`;
//     const res = await fetch(url);
//     const result = await res.json();
//     return { props: { product: result } }
// }
export default Product;
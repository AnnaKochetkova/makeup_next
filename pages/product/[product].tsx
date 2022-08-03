import { observer } from "mobx-react-lite";
import Link from "next/link";
import { useEffect } from "react";
import store from "../../store/productsStore";
import styles from '../../styles/productList.module.css';
import client_api from "../../utils/client_api";
import { factoryProduct } from "../../utils/factoryProduct";
import { IColors } from "../../utils/types";

const Product = observer(({ productInfo }: any) => {    
    
    useEffect(() => {
        store.fetchProduct(productInfo._id);

    }, [productInfo])

    return (
        <div className={styles.container}>
            <div className={styles.wrapperInfo}>
                <img className={styles.image} src={store.productInfo?.image_link} alt={store.productInfo?.name} />
                <div className={styles.wrapperText}>
                    <h1 className={styles.header}>{store.productInfo?.name}</h1>
                    <p>Brand: <strong className={styles.uppercase}>{store.productInfo?.brand.name}</strong></p>
                    <p className={styles.price}>Price: <strong>{store.productInfo?.price} $</strong></p>
                    <div className={styles.line}/>
                    <div className={styles.colors}>
                        {
                            store.productInfo?.product_colors?.map((el: IColors, index: number) => {
                                return (
                                    <div key={index} className={styles.colorsWraper}>
                                        <span className={styles.color} style={{backgroundColor : `${el.hex_value}`, width: 20, height: 20}}/>
                                        <span>{el.colour_name}</span>
                                    </div>
                                    
                                    
                                )
                            })
                        }
                    </div>
                    <a href={store.productInfo?.product_link} className={styles.link}>Buy now</a>
                </div>
            </div>
            
            <div className={styles.description}>
                {
                    store.productInfo?.description ? 
                        (<p className={styles.descriptionText}><strong>Description:</strong> {store.productInfo?.description}</p>) 
                        : <p className={styles.descriptionText}><strong>Description:</strong> No information</p>
                }
                
                <ul className={styles.listTags}>Tags list: 
                    {
                        store.productInfo?.tag_list?.map((el, index) => {
                            return (
                                <li className={styles.tag} key={index}>
                                    <Link 
                                        href={{
                                            pathname: `/tags/[tag]`,
                                            query: { tag: el.name },
                                        }}
                                        shallow
                                    >
                                        <a>{el.name}</a>
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

export  const getServerSideProps = async ({ query }: any) =>  {
    const result = factoryProduct(await client_api.productById(query.product))        
    return { props: { productInfo: result} }
}
export default Product;
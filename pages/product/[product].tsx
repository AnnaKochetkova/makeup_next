import { observer } from "mobx-react-lite";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { useEffect } from "react";
import store, { IColors } from "../../store/productsStore";
import styles from '../../styles/productList.module.css';
import api from "../../utils/api";

const Product = observer(({ product }: any) => {    
    
    useEffect(() => {
        
        return () => {
            store.deleteProducts();
        }
    }, [product])

    return (
        <div className={styles.container}>
            <div className={styles.wrapperInfo}>
                <img className={styles.image} src={store.productInfo?.api_featured_image} alt={store.productInfo?.name} />
                <div className={styles.wrapperText}>
                    <h1 className={styles.header}>{store.productInfo?.name}</h1>
                    <p>Brand: <strong className={styles.uppercase}>{store.productInfo?.brand}</strong></p>
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

export  const getServerSideProps: GetServerSideProps = async({ query }) => {
    const result = await api.getInfoByProduct(query.product)
    return { props: { productInfo: result } }
}
export default Product;
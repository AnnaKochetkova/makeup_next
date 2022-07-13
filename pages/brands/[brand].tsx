import { observer } from "mobx-react-lite";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Loading from "../../components/loading";
import Product from "../../components/product";
import productsStore from "../../store/productsStore";
import styles from '../../styles/categories.module.css';

const Brand = observer(() => {
    const router = useRouter();
    const { brand } = router.query;
    useEffect(() => {
        productsStore.fetchProductsByBrend(brand);

        return () => {
            productsStore.deleteProducts();
        }
    }, [brand]);
    return (
        <div className={styles.container}>
            <h1 className={styles.header}>Brand: {brand}</h1>
            <div className={styles.line} />
            {
                productsStore.loading ? <Loading /> : (
                    <div className={styles.products}>
                        {
                            productsStore.productsBrand.map(el => {
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

export default Brand;
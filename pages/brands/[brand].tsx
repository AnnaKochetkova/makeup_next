import { observer } from "mobx-react-lite";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Loading from "../../components/loading";
import ProductCard from "../../components/productCard";
import productsStore, { IInfoProduct } from "../../store/productsStore";
import styles from '../../styles/categories.module.css';

const Brand = observer(() => {
    const router = useRouter();
    const { brand } = router.query;

    const clickProduct = (product: IInfoProduct) => {
        productsStore.saveProduct(product);
    }

    useEffect(() => {
        productsStore.fetchProducts(brand, 'brand');

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
                            productsStore.products.map(el => {
                                return (
                                    <ProductCard
                                        key={el.id}
                                        onClick={()=>clickProduct(el)}
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
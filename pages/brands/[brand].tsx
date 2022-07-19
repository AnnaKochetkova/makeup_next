import { observer } from "mobx-react-lite";
import { GetServerSideProps } from "next";
import { useEffect } from "react";
import Loading from "../../components/loading";
import ProductCard from "../../components/productCard";
import store, { IInfoProduct } from "../../store/productsStore";
import styles from '../../styles/categories.module.css';
import api from "../../utils/api";

const Brand = observer(({brand}: any) => {

    const clickProduct = (product: IInfoProduct) => {
        store.saveProduct(product);
    }

    useEffect(() => {
        store.fetchProducts(brand, 'brand');        

        return () => {
            store.deleteProducts();
        }
    }, [brand]);
    return (
        <div className={styles.container}>
            <h1 className={styles.header}>Brand: {brand}</h1>
            <div className={styles.line} />
            {
                store.loading ? <Loading /> : (
                    <div className={styles.products}>
                        {
                            store.products?.map(el => {
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

export  const getServerSideProps: GetServerSideProps = async ({ query }) =>  {
    const result = await api.getProductsByBrand(query.brand)
    return { props: { products: result, brand:  query.brand} }
}

export default Brand;
import Link from "next/link";
import productsStore from "../store/productsStore";
import styles from '../styles/listpage.module.css';

const Brands = () => {
    const brands: string[] = ['almay', 'alva', 'anna sui', 'annabelle', 'benefit', 'boosh', "burt's bees", 'butter london', "c'est moi", 'cargo cosmetics', 'china glaze', 
    'clinique', 'coastal classic creation', 'colourpop', 'covergirl', 'dalish', 'deciem', 'dior', 'dr. hauschka', 'e.l.f.', 'essie', 'fenty', 'glossier', 'green people',
    'iman', "l'oreal", 'lotus cosmetics usa', "maia's mineral galaxy", 'marcelle', 'marienatie', 'maybelline', 'milani', 'mineral fusion', 'misa', 'mistura', 
    'moov', 'nudus', 'nyx', 'orly', 'pacifica', 'penny lane organics', 'physicians formula', 'piggy paint', 'pure anada', 'rejuva minerals', 'revlon',
    "sally b's skin yummies", 'salon perfect', 'sante', 'sinful colours', 'smashbox', 'stila', 'suncoat', 'w3llpeople', "wet n wild", 'zorah', 'zorah biocosmetiques'];

    const clickBrand = (brand: string) => {
        productsStore.fetchProducts(brand, 'brand');
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.header}>Brands:</h1>
            <div className={styles.line}/>
            <ul className={styles.listBrand}>
                {
                    brands.map((el, index) => {
                        return (<li key={index} className={styles.brand} onClick={()=>clickBrand(el)}>
                                    <Link href={`/brands/${el}`}>
                                        {el}
                                    </Link>
                                </li>)
                    })
                }
                
            </ul>
        </div>
    )
}

export default Brands;
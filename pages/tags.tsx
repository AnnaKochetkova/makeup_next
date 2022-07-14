import Link from 'next/link';
import productsStore from '../store/productsStore';
import styles from '../styles/listpage.module.css';

const Tags = () => {
    const tags: string[] = ['Canadian', 'CertClean', 'Chemical Free', 'Dairy Free', 'EWG Verified', 'EcoCert', 'Fair Trade', 'Gluten Free',
    'Hypoallergenic', 'Natural', 'No Talc', 'Non-GMO', 'Organic', 'Peanut Free Product', 'Sugar Free', 'USDA Organic', 'Vegan',
    'alcohol free', 'cruelty free', 'oil free', 'purpicks', 'silicone free', 'water free'];

    const clickTag = (tag: string) => {
        productsStore.fetchProducts(tag, 'product_tags');
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.header}>Tags:</h1>
            <div className={styles.line}/>
            <ul className={styles.listBrand}>
                {
                    tags.map((el, index) => {
                        return (<li key={index} className={styles.brand} onClick={()=>clickTag(el)}>
                                    <Link href={`/tags/${el}`}>
                                        {el}
                                    </Link>
                                </li>)
                    })
                }
                
            </ul>
        </div>
    )
}

export default Tags;
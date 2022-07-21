import { observer } from 'mobx-react-lite';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { useEffect } from 'react';
import productsStore from '../store/productsStore';
import storeSettings from '../store/settingsStore';
import styles from '../styles/listpage.module.css';
import api from '../utils/api';

const Tags = observer(() => {
    // const tags: string[] = ['Canadian', 'CertClean', 'Chemical Free', 'Dairy Free', 'EWG Verified', 'EcoCert', 'Fair Trade', 'Gluten Free',
    // 'Hypoallergenic', 'Natural', 'No Talc', 'Non-GMO', 'Organic', 'Peanut Free Product', 'Sugar Free', 'USDA Organic', 'Vegan',
    // 'alcohol free', 'cruelty free', 'oil free', 'purpicks', 'silicone free', 'water free'];

    const clickTag = (tag: string) => {
        productsStore.fetchProducts(tag, 'product_tags');
    }

    useEffect(() => {
        storeSettings.getTagList();
    }, [])

    return (
        <div className={styles.container}>
            <h1 className={styles.header}>Tags:</h1>
            <div className={styles.line}/>
            <ul className={styles.listBrand}>
                {
                    storeSettings.tagsList?.map((el, index) => {
                        return (<li key={index} className={styles.brand} onClick={()=>clickTag(el.name)}>
                                    <Link href={`/tags/${el.name}`}>
                                        {el.name}
                                    </Link>
                                </li>)
                    })
                }
                
            </ul>
        </div>
    )
})

export default Tags;

export  const getServerSideProps: GetServerSideProps = async (context) =>  {
    const result = await api.getTagList()
    return { props: { products: result} }
}
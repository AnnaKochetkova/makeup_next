import styles from '../styles/Home.module.css';
import productsStore from '../store/productsStore';
import Link from 'next/link';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
    const categories: string[] = ['blush', 'bronzer', 'eyebrow', 'eyeliner', 'eyeshadow', 'foundation', 'lip_liner', 'lipstick', 'mascara', 'nail_polish'];

    const clickBrand = (categories: string) => {
        productsStore.fetchProducts(categories, 'product_type');
    }

    return (
        <div className={styles.containerLayout}>
            <header className={styles.mainHeader}>
                <div className={styles.header}>
                    <Link href='/'>
                        <a className={styles.linkHeader}>Make up</a>
                    </Link>
                </div>
                <div className={styles.navbarContainer}>
                    <div className={styles.navbar}>Categories
                        <ul className={styles.navbarMenu}>
                            {
                                categories.map((el, index) => {
                                    return (<li key={index} onClick={()=>clickBrand(el)} className={styles.menu}>
                                                <Link  href={`/${el}`} >
                                                    <a className={styles.link}>
                                                        {el}
                                                    </a>
                                                </Link>
                                            </li>)
                                })
                            }
                        </ul>
                    </div>
                    <div className={styles.navbar}>
                        <Link  href={`/brands`} >
                            <a className={styles.navbarLink}> 
                                Brands
                            </a>
                        </Link>
                    </div>
                    <div className={styles.navbar}>
                        <Link  href={`/tags`} >
                            <a className={styles.navbarLink}>
                                Tags
                            </a>    
                        </Link>
                    </div>
                </div>
            </header>
            {children}
        </div>
    )
}

export default Layout;
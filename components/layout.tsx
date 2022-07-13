import styles from '../styles/Home.module.css';
import productsStore from '../store/productsStore';
import Link from 'next/link';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
    const categories: string[] = ['blush', 'bronzer', 'eyebrow', 'eyeliner', 'eyeshadow', 'foundation', 'lip_liner', 'lipstick', 'mascara', 'nail_polish'];

    const clickBrand = (categories: string) => {
        productsStore.fetchProducts(categories);
    }

    return (
        <div className={styles.containerLayout}>
            <header className={styles.mainHeader}>
                <div className={styles.header}>
                    <Link href='/'>Makeup</Link>
                </div>
                <div className={styles.navbarContainer}>
                    <div className={styles.navbar}>Categories
                        <ul className={styles.navbarMenu}>
                            {
                                categories.map((el, index) => {
                                    return (<li key={index} onClick={()=>clickBrand(el)} className={styles.menu}>
                                                <Link href={`/${el}`}className={styles.link}>
                                                    {el}
                                                </Link>
                                            </li>)
                                })
                            }
                        </ul>
                    </div>
                    <div className={styles.navbar}>
                        <Link  href={`/brands`} >Brands</Link>
                    </div>
                    <div className={styles.navbar}>
                        <Link  href={`/tags`} >Tags</Link>
                    </div>
                </div>
            </header>
            {children}
        </div>
    )
}

export default Layout;
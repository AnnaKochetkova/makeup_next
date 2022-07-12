import styles from '../styles/Home.module.css';
import productsStore from '../store/productsStore';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
    const categories: string[] = ['blush', 'bronzer', 'eyebrow', 'eyeliner', 'eyeshadow', 'foundation', 'lip_liner', 'lipstick', 'mascara', 'nail_polish'];

    



    return (
        <div className={styles.containerLayout}>
            <header className={styles.mainHeader}>
                <div className={styles.header}>
                    <Link href='/'>Makeup</Link>
                </div>
                <div className={styles.navbarContainer}>
                    <div className={styles.navbar}>Categories
                        <ul className={styles.navbarMenu}>
                            <li className={styles.menu}><Link href={`/blush`}className={styles.link}>Blush</Link></li>
                            <li className={styles.menu}><Link href={`/bronzer`}className={styles.link}>Bronzer</Link></li>
                            <li className={styles.menu}><Link href={`/eyebrow`}className={styles.link}>Eyebrow</Link></li>
                            <li className={styles.menu}><Link href={`/eyeliner`}className={styles.link}>Eyeliner</Link></li>
                            <li className={styles.menu}><Link href={`/eyeshadow`}className={styles.link}>Eyeshadow</Link></li>
                            <li className={styles.menu}><Link href={`/foundation`}className={styles.link}>Foundation</Link></li>
                            <li className={styles.menu}><Link href={`/lip_liner`}className={styles.link}>Lip liner</Link></li>
                            <li className={styles.menu}><Link href={`/lipstick`}className={styles.link}>Lipstick</Link></li>
                            <li className={styles.menu}><Link href={`/mascara`}className={styles.link}>Mascara</Link></li>
                            <li className={styles.menu}><Link href={`/nail_polish`}className={styles.link}>Nail polish</Link></li>
                        </ul>
                    </div>
                    <div className={styles.navbar}>
                        <Link  href={`/brands`} >Brands</Link>
                    </div>
                </div>
            </header>
            {children}
        </div>
    )
}

export default Layout;
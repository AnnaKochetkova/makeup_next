import styles from '../styles/Home.module.css';
import Link from 'next/link';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
    const categories: string[] = ['Blush', 'Bronzer', 'Eyebrow', 'Eyeliner', 'Eyeshadow', 'Foundation', 'Lip liner', 'Lipstick', 'Mascara', 'Nail polish'];
    return (
        <div className={styles.containerLayout}>
            <header className={styles.mainHeader}>
                <div className={styles.header}>
                    Makeup
                </div>
                <ul className={styles.navbar}>
                {
                    categories.map(el => {
                    return <li className={styles.menu}><Link href='/blush' className={styles.link}>{el}</Link></li>
                    })
                }
                </ul>
            </header>
            {children}
            {/* <footer className={styles.footer}>
              
            </footer> */}
        </div>
    )
}

export default Layout;
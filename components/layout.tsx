import styles from '../styles/Home.module.css';
import Link from 'next/link';
import storeSettings from '../store/settingsStore';
import { observer } from 'mobx-react-lite';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout = observer(({ children }: LayoutProps) => {
    
    return (
        <div className={styles.containerLayout}>
            <header className={styles.mainHeader}>
                <div className={styles.header}>
                    <Link href='/' shallow>
                        <a className={styles.linkHeader}>Make up</a>
                    </Link>
                </div>
                <div className={styles.navbarContainer}>
                    <div className={styles.navbar}>Categories
                        <ul className={styles.navbarMenu}>
                            {
                                storeSettings.productType?.map((el) => {
                                    return (<li key={el._id} className={styles.menu}>
                                                <Link 
                                                      href={{
                                                        pathname: `/[categories]`,
                                                        query: { categories: el.name },
                                                      }}
                                                      shallow
                                                >
                                                    <a className={styles.link}>
                                                        {el.name}
                                                    </a>
                                                </Link>
                                            </li>)
                                })
                            }
                        </ul>
                    </div>
                    <div className={styles.navbar}>
                        <Link  href={`/brands`} shallow>
                            <a className={styles.navbarLink}> 
                                Brands
                            </a>
                        </Link>
                    </div>
                    <div className={styles.navbar}>
                        <Link  href={`/tags`} shallow>
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
})



export default Layout;


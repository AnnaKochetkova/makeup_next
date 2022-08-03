import { observer } from "mobx-react-lite";
import { GetServerSideProps } from "next";
import Link from "next/link";
import storeSettings from "../store/settingsStore";
import styles from '../styles/listpage.module.css';
import { mainGetServerSideProps } from "./_app";

const Brands = observer(() => {
    
    return (
        <div className={styles.container}>
            <h1 className={styles.header}>Brands:</h1>
            <div className={styles.line}/>
            <ul className={styles.listBrand}>
                {
                    storeSettings.brands?.map((el) => {
                            return (<li key={el._id} className={styles.brand} >
                                    <Link 
                                        href={{
                                            pathname: `/brands/[brand]`,
                                            query: { brand: el.name },
                                        }}
                                        shallow
                                    >
                                        <a>{el.name}</a>
                                    </Link>
                                    </li>)
                    })
                }
                
            </ul>
        </div>
    )
})

export default Brands;

export  const getServerSideProps: GetServerSideProps = async ({ query }) =>  {
    
    const mainProps = await mainGetServerSideProps();
    return { props: {...mainProps } }
}
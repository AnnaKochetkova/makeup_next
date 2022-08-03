import { observer } from 'mobx-react-lite';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import storeSettings from '../store/settingsStore';
import styles from '../styles/listpage.module.css';
import { mainGetServerSideProps } from './_app';

const Tags = observer(() => {

    return (
        <div className={styles.container}>
            <h1 className={styles.header}>Tags:</h1>
            <div className={styles.line}/>
            <ul className={styles.listBrand}>
                {
                    storeSettings.tagsList?.map((el) => {
                        return (<li key={el._id} className={styles.brand} >
                                    <Link 
                                        href={{
                                            pathname: `/tags/[tag]`,
                                            query: { tag: el.name },
                                        }}
                                        shallow
                                    >
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

export  const getServerSideProps: GetServerSideProps = async ({ query }) =>  {
    const mainProps = await mainGetServerSideProps();
    return { props: {...mainProps } }
}
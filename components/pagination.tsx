import {useMemo} from 'react';
import styles from '../styles/pagination.module.css';
import Router, { useRouter } from 'next/router';

interface IPaginationProps {
    counter: number;
    currentPage: number;
    onPage: (page: number) => void;
}

const limit = 12;

const Pagination = ({counter, currentPage, onPage}: IPaginationProps) => {
    const router = useRouter();

    const listPage = useMemo(() => {
        const countPage = Math.ceil(counter / limit);
        return Array.from(Array(countPage).keys())
    }, [counter])

    const onClickButton = (page: number) => {
        onPage(page);
        router.query.page = (page + 1).toString();
        router.push(router, undefined, {
            shallow: true,
        });
    }

    return (
        <div className={styles.wrapper}>
            {
                listPage.map((el, index) => <button key={index} className={currentPage == (el) ? styles.buttonActive : styles.button} onClick={()=>onClickButton(el)}>{el + 1}</button>)
            }
        </div>
    )
}

export default Pagination;
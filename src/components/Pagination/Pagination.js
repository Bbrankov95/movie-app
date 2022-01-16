import styles from './Pagination.module.scss';

const Pagination = ({
    onClick,
    current,
    total
}) => {
    return(
        <div onClick={onClick} className={styles.pagination}>
            <p className={current === 1 ? styles.hidden : ''}>Prev</p>
            <p>Page: {current} / {total}</p>
            <p className={current === total ? styles.hidden : ''}>Next</p>
        </div>
    );
}

export default Pagination;
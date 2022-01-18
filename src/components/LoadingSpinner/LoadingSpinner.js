import styles from './LoadingSpinner.module.scss';

const LoadingSpinner = () => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.spinner}></div>
            <p>Loading<span>...</span></p>
        </div>
    );
}

export default LoadingSpinner;
import styles from "./LoadingSpinner.module.scss";

const LoadingSpinner = () => {
  return (
    <div className={styles.Wrapper}>
      <div className={styles.Spinner}></div>
      <p>
        Loading<span>...</span>
      </p>
    </div>
  );
};

export default LoadingSpinner;

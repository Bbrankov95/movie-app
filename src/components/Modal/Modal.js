import MovieCard from '../MovieCard/MovieCard';
import styles from './Modal.module.scss';

const Modal = (movie, onClick) => {
    return (
        <div className={styles.wrapper}>
            {movie ? MovieCard(movie) : 'Loading...'}
            <button onClick={onClick} className={styles.btn}>Close Preview</button>
        </div >
    );
}

export default Modal;
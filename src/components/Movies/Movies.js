import { useEffect } from 'react';
import styles from './Movies.module.scss';


const Movies = ({
    Title, Year, Type, Poster, imdbID
}, handler) => {

    return (
        <div onClick={handler} key={imdbID} id={imdbID} className={styles.movie}>
            <img src={Poster}></img>
            <h3><label htmlFor='title'></label>{Title}</h3>
            <p><label htmlFor='year'>Year: </label>{Year}</p>
            <p><label htmlFor='type'>Type: </label>{Type}</p>
        </div>
    );
}

export default Movies;
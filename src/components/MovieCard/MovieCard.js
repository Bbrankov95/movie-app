import styles from './MovieCard.module.scss';
import { FaStar, FaUsers } from 'react-icons/fa';

const MovieCard = ({
    Title, Plot, Poster, Year, Actors, Rated, Released, Runtime, Genre, imdbRating, imdbVotes, imdbID, Director, BoxOffice
}) => {
    return (
        <div key={imdbID} className={styles.wrapper}>
            <img src={Poster} className={styles.poster}></img>
            <div className={styles.info}>
                <h3><label htmlFor='title'></label>{Title}</h3>
                <p><label htmlFor='plot'>Plot: </label>{Plot}</p>        
                <p><label htmlFor='director'>Director: </label>{Director}</p>        
                <p><label htmlFor='box-office'>Box Office: </label>{BoxOffice}</p>        
                <p><label htmlFor='year'>Year: </label>{Year}</p>             
                <p><label htmlFor='actors'>Cast: </label>{Actors}</p>
                <p><label htmlFor='rating'>Rating: </label>{Rated}</p>  
                <p><label htmlFor='released'>Released: </label>{Released}</p> 
                <p><label htmlFor='runtime'>Runtime: </label>{Runtime}</p>
                <p><label htmlFor='genre'>Genre: </label>{Genre}</p>     
                <p><label htmlFor='imdbRating'>Imdb rating: </label>{imdbRating} <FaStar /></p>
                <p><label htmlFor='imdbVotes'>Imdb votes: </label>{imdbVotes} <FaUsers /></p>
            </div>
        </div>
    );
}

export default MovieCard;
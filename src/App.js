import { useState, useEffect } from 'react';
import styles from './App.module.scss';
import MovieCard from './components/MovieCard/MovieCard';
import { FaSearch } from 'react-icons/fa';
import Movies from './components/Movies/Movies';
import Modal from './components/Modal/Modal';
import Pagination from './components/Pagination/Pagination';
import LoadingSpinner from './components/LoadingSpinner/LoadingSpinner';

const API_KEY = 52837047;

function App() {
  const [query, setQuery] = useState('');
  const [matchedMovies, setMatchedMovies] = useState({
    movies: [],
    loading: false,
  });
  const [error, setError] = useState('');
  const [criteria, setCriteria] = useState('s');
  const [modal, setModal] = useState(false);
  const [modalMovie, setModalMovie] = useState([]);
  const [pages, setPages] = useState({
    current: 1,
    total: 0
  })

  const MOVIE_URL = `http://www.omdbapi.com/?${criteria}=${query}&page=${pages.current}&apikey=${API_KEY}`;

  useEffect(async () => {
    const response = await (await fetch(MOVIE_URL)).json();
    const [search, ...rest] = [...Object.entries(response)];
    if (query) {
      setMatchedMovies(matchedMovies => ({
        ...matchedMovies,
        movies: search[1]
      }))
    }
  }, [pages])

  const onSearchHandler = async (e) => {
    e.preventDefault();

    try {
      if (query.trim() === '') {
        throw new Error('Movie name is required');
      }
      setMatchedMovies(matchedMovies => ({
        ...matchedMovies,
        loading: true,
      }))
      
      const response = await fetch(pages.current !== 1 ? `http://www.omdbapi.com/?${criteria}=${query}&page=1&apikey=${API_KEY}`: MOVIE_URL);
      const data = await response.json();

      if (data.hasOwnProperty('Error')) {
        setError(data.Error);
        setMatchedMovies(matchedMovies => ({
          loading: false,
          movies: [],
        }));
      } else {
        setError('');
        if (criteria === 't') {
          setMatchedMovies(matchedMovies => ({
            loading: false,
            movies: [data]
          }));
        } else {
          let [search, totalResults, ...rest] = [...Object.entries(data)];
          let movies = search[1];
          let total = Math.ceil(totalResults[1] / 10);
          setPages(pages => ({
            total,
            current: 1,
          }))
          setMatchedMovies({
            loading: false,
            movies
          })
        }
      }

    } catch (err) {
      setMatchedMovies(matchedMovies => ({
        ...matchedMovies,
        movies: []
      }));
      setError(err.message);
    }
  }
  const onChangeHandler = (value) => {
    setQuery(value);
  }

  const radioChangeHandler = (e) => {
    setCriteria(e.target.value);
    setMatchedMovies(matchedMovies => ({
      ...matchedMovies,
      movies: []
    }));
    setQuery('');
  }

  const previewHandler = async (e) => {
    if (e.target.tagName === 'IMG') {
      const id = e.target.parentNode.id;
      const movie = await (await fetch(`http://www.omdbapi.com/?i=${id}&plot=full&apikey=${API_KEY}`)).json();
      setModalMovie(movie);
      setModal(!modal)
    }
  }

  const onTestHandler = (e) => {
    if (e.target.textContent === 'Prev') {
      let current = pages.current > 1 ? pages.current - 1 : 1;
      setPages(pages => ({
        ...pages,
        current
      }))
    } else if (e.target.textContent === 'Next') {
      let current = pages.current < pages.total ? pages.current + 1 : current;
      setPages(pages => ({
        ...pages,
        current
      }))
    }
  }

  return (
    <div className={styles.App}>
      <main className={styles.main}>
        <div className={styles.wrapper}>
          <h1>Your Favourite Movies in One Place</h1>
          <div className={styles.formWrapper}>
            <form onSubmit={onSearchHandler} className={styles.form}>
              <div className={styles.radio}>
                <label>Search All <input onChange={radioChangeHandler} type='radio' name='search' checked={criteria === 's' ? true : false} value='s'></input></label>
                <label>Search by title <input onChange={radioChangeHandler} type='radio' name='search' checked={criteria === 't' ? true : false} value='t'></input></label>
              </div>
              <input onChange={(e) => onChangeHandler(e.target.value)} type='text' value={query} placeholder="Enter movie name ..."></input>
              <button type='submit'>Search <span><FaSearch /></span></button>
            </form>
          </div>
          {matchedMovies.loading === false ? <div className={styles.wrapperResult}>
            {criteria === 's' && matchedMovies.movies.length > 0 ? <Pagination onClick={onTestHandler} current={pages.current} total={pages.total} /> : ''}
            {error ? <div className={styles.error}>{error}</div> : ''}
            {matchedMovies.movies.length > 0 ?
              <div className={criteria === 't' ?
                styles.results : styles.resultsAll}>
                {matchedMovies.movies && criteria === 't'
                  ? matchedMovies.movies.map(m => MovieCard(m)) :
                  matchedMovies.movies.map(m => Movies(m, previewHandler))}
              </div> : ''}
          </div> : <LoadingSpinner />}
        </div>
      </main>
      {modal ? Modal(modalMovie, () => setModal(!modal)) : ''}
    </div>
  );
}

export default App;

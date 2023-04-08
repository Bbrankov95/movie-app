import { useState, useCallback, useRef, useEffect } from "react";

import { searchMovies } from "../../services/movieServices";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import SearchForm from "../SearchForm/SearchForm";
import Modal from "../Modal/Modal";
import MovieResults from "../MovieResults/MovieResults";

import classes from "./MovieFinder.module.scss";

const MovieFinder = () => {
  const [matchedMovies, setMatchedMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [modalMovie, setModalMovie] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const lastSearchRef = useRef(null);

  const getMovies = useCallback(async ({ page, searchQuery }) => {
    setLoading(true);
    try {
      const {
        Error,
        Search: movies,
        totalResults,
        Response,
      } = await searchMovies({
        searchQuery,
        page,
      });

      if (Response.toLowerCase() === "false") {
        setError(Error);
        setLoading(false);
        return;
      }
      setTotalResults(totalResults);
      setMatchedMovies(movies);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setError(err);
      setLoading(false);
    }
  }, []);

  const onSearchInputChangeHandler = (val) => {
    setError(null);
    setSearchQuery(val);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    setMatchedMovies([]);
    modalMovie && setModalMovie(null);
    lastSearchRef.current = searchQuery;
    setCurrentPage(1);
    if (searchQuery.trim() !== "") {
      getMovies({ page: 1, searchQuery });
    }
  };

  const newSearch = currentPage === 1 && !matchedMovies.length;

  useEffect(() => {
    !newSearch &&
      getMovies({ page: currentPage, searchQuery: lastSearchRef.current });
  }, [currentPage, getMovies, newSearch]);

  return (
    <div className={classes.Wrapper}>
      <h1 className={classes.Title}>Your Favourite Movies in One Place</h1>
      <div className={classes.FormWrapper}>
        <SearchForm
          value={searchQuery}
          onChange={onSearchInputChangeHandler}
          onSubmit={onSubmitHandler}
        />
      </div>
      {!loading ? (
        <div className={classes.WrapperResult}>
          <MovieResults
            error={error}
            matchedMovies={matchedMovies}
            totalResults={totalResults}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            setModalMovie={setModalMovie}
            modalMovie={modalMovie}
          />
        </div>
      ) : (
        <LoadingSpinner />
      )}
      {modalMovie ? (
        <Modal movie={modalMovie} onClick={() => setModalMovie(null)} />
      ) : null}
    </div>
  );
};

export default MovieFinder;

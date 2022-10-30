import { memo, useMemo } from "react";
import { getMovieByImdbId } from "../../services/movieServices";
import Movies from "../Movies/Movies";
import Pagination from "../Pagination/Pagination";

import classes from "./MovieResults.module.scss";

const MovieResults = ({
  matchedMovies = [],
  currentPage,
  totalResults,
  error,
  setCurrentPage,
  setModalMovie,
  modalMovie,
  findMovies,
}) => {
  const previewHandler = async (imdbID) => {
    const movie = await getMovieByImdbId(imdbID);
    setModalMovie(movie);
  };

  const isListEmpty = !matchedMovies?.length;

  const perPage = 10;

  const totalPages = useMemo(
    () => Math.round(totalResults / perPage) ?? 0,
    [perPage, totalResults]
  );

  const shouldShowResults = !isListEmpty && !error && !modalMovie;

  return (
    <>
      {shouldShowResults ? (
        <Pagination
          currentPage={currentPage}
          total={totalPages}
          setCurrentPage={setCurrentPage}
        />
      ) : null}
      {error ? <div className={classes.Error}>{error}</div> : null}
      {shouldShowResults ? (
        <div className={classes.ResultsAll}>
          {matchedMovies?.map((movie, index) => (
            <Movies
              movie={movie}
              onClick={previewHandler}
              key={`${movie?.imdbID}-${index}`}
            />
          ))}
        </div>
      ) : null}
    </>
  );
};

export default memo(MovieResults);

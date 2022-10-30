import MovieInfoRow from "../MovieCard/MovieInfoRow/MovieInfoRow";
import classes from "./Movies.module.scss";

const Movies = ({ movie = {}, onClick }) => {
  const rows = Object.entries(movie);
  const { imdbID, Poster } = movie;

  const posterIsMissing = Poster === "N/A";
  return (
    <div
      onClick={() => onClick(imdbID)}
      id={movie?.imdbID}
      className={classes.Movie}
    >
      <div
        className={[
          classes.ImgWrapper,
          posterIsMissing ? classes.NoImage : "",
        ].join(" ")}
      >
        <img src={movie?.Poster} alt="movie poster is missing"></img>
        <p className={classes.HiddenText}>Click To Enter Preview Mode</p>
      </div>
      <div className={classes.MovieDetails}>
        {rows?.map(([label, data], i) => (
          <MovieInfoRow
            key={`${data}-${i}`}
            label={label}
            hideLabel={label === "Title"}
            data={data}
          />
        ))}
      </div>
    </div>
  );
};

export default Movies;

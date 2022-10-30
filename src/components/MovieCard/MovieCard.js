import MovieInfoRow from "./MovieInfoRow/MovieInfoRow";

import classes from "./MovieCard.module.scss";

const MovieCard = ({ movie = {}, onClick }) => {
  const rows = Object.entries(movie);
  const isPosterAvailable = !!movie?.Poster;
  return (
    <div className={classes.Wrapper}>
      <button onClick={onClick} className={classes.Btn}>
        Close Preview
      </button>
      <div className={classes.ImgWrapper}>
        <img
          src={movie?.Poster}
          className={[
            classes.Poster,
            isPosterAvailable ? "" : classes.NoImage,
          ].join(" ")}
          alt="movie-poster"
        ></img>
      </div>
      <div className={classes.Info}>
        {rows?.map(([label, data], i) => (
          <MovieInfoRow
            customLabelClass={classes.InfoLabel}
            customDataClass={classes.InfoData}
            data={data}
            label={label}
            key={`${i}-${label}`}
          />
        ))}
      </div>
    </div>
  );
};

export default MovieCard;

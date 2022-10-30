import MovieCard from "../MovieCard/MovieCard";
import classes from "./Modal.module.scss";

const Modal = ({ movie, onClick }) => {
  return (
    <div className={classes.Wrapper}>
      {movie ? (
        <MovieCard onClick={onClick} movie={movie} />
      ) : (
        <p>'Loading...'</p>
      )}
    </div>
  );
};

export default Modal;

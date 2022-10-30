import { FaUsers, FaStar } from "react-icons/fa";

import classes from "./MovieInfoRow.module.scss";

const MovieInfoRow = ({
  label,
  data,
  hideLabel,
  customLabelClass = "",
  customDataClass = "",
}) => {
  const shouldNotRender =
    label === "imdbID" ||
    label === "Poster" ||
    label === "Response" ||
    label === "Ratings" ||
    label === "Production" ||
    label === "Website";

  const isTitle = label === "Title";

  const isImdbRating = label === "imdbRating";
  const isImdbVotes = label === "imdbVotes";

  if (shouldNotRender) {
    return null;
  }
  return (
    <div className={classes.Wrapper}>
      {hideLabel ? null : (
        <label className={[classes.Label, customLabelClass].join(" ")}>
          {`${label}:`}
        </label>
      )}
      <p
        className={[
          isTitle ? classes.Title : classes.Data,
          customDataClass,
        ].join(" ")}
      >
        {isImdbRating ? <FaStar /> : null}
        {isImdbVotes ? <FaUsers /> : null}
        {data}
      </p>
    </div>
  );
};

export default MovieInfoRow;

import { FaSearch } from "react-icons/fa";

import classes from "./SearchForm.module.scss";

const SearchForm = ({ onChange, value, onSubmit }) => {
  return (
    <form onSubmit={onSubmit} className={classes.Form}>
      <div className={classes.SearchWrapper}>
        <input
          onChange={(e) => onChange(e?.currentTarget?.value)}
          type="text"
          value={value}
          placeholder="Find your movie"
          className={classes.SearchInput}
        ></input>
      </div>
      <button type="submit">
        Search
        <span>
          <FaSearch />
        </span>
      </button>
    </form>
  );
};

export default SearchForm;

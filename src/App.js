import classes from "./App.module.scss";
import MovieFinder from "./components/MovieFinder/MovieFinder";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";

function App() {
  return (
    <div className={classes.App}>
      <MovieFinder />
      <ScrollToTop />
    </div>
  );
}

export default App;

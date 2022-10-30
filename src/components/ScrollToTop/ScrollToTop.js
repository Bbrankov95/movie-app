import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";

import classes from "./ScrollToTop.module.scss";

const ScrollToTop = () => {
  const [scrollToTop, setScrollToTop] = useState(false);

  const scrollToTopHandler = () => {
    window.scrollTo({
      behavior: "smooth",
      top: 0,
    });
  };

  const setScrollToTopHandler = () => {
    if (window.scrollY > 100) {
      setScrollToTop(true);
    } else {
      setScrollToTop(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", setScrollToTopHandler);

    return () => {
      window.addEventListener("scroll", setScrollToTopHandler);
    };
  }, []);

  return (
    <button
      disabled={!scrollToTop}
      onClick={scrollToTopHandler}
      className={[
        classes.Wrapper,
        scrollToTop ? classes.FadedIn : classes.Faded,
      ].join(" ")}
    >
      <p className={classes.Hidden}>Scroll to top</p>
      <FaArrowUp color="white" fontSize={20} />
    </button>
  );
};

export default ScrollToTop;

const API_KEY = process.env.REACT_APP_API_KEY;

export const searchMovies = async ({ searchQuery, page }) => {
  const url = `http://www.omdbapi.com/?s=${searchQuery}&page=${page}&apikey=${API_KEY}`;
  const response = await (await fetch(url)).json();

  return response;
};

export const getMovieByImdbId = async (imdbID) => {
  const url = `http://www.omdbapi.com/?i=${imdbID}&plot=full&apikey=${API_KEY}`;
  const response = await (await fetch(url)).json();

  return response;
};

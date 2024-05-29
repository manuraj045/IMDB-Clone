/* ----------------- Getting the html elements for the favorite page ---------------- */
const moviesListContainer = document.getElementById("movies_list");
const favoriteMoviesList = JSON.parse(localStorage.getItem("favoriteMovies"));

/* ----------------- Function to display Movies list from Local Storage ---------------- */
favoriteMoviesList.forEach((movie, index) => {
  const movieCard = document.createElement("div");
  const movieFigure = document.createElement("figure");
  const movieImage = document.createElement("img");
  const movieCaption = document.createElement("figcaption");

  movieCard.classList.add("movie-card");
  movieImage.src = movie.moviePoster;
  movieImage.alt = `${movie.movieTitle} poster`;
  movieImage.classList.add("movie_image");
  movieCaption.textContent = `${movie.movieTitle}, ${movie.movieYear}`;
  movieCaption.classList.add("movie_caption");
  movieFigure.classList.add("movie_figure");
  const removeMovieBtn = document.createElement("button");
  removeMovieBtn.classList.add("remove_favorite_button");
  removeMovieBtn.innerHTML = "Remove from favorite";

  //Event Listener for Remove Favorite Button
  removeMovieBtn.addEventListener("click", () => {
    removeFavoriteMovie(index);
    movieCard.remove();
  });

  movieFigure.appendChild(movieImage);
  movieFigure.appendChild(movieCaption);
  movieCard.appendChild(movieFigure);
  movieCard.appendChild(removeMovieBtn);
  moviesListContainer.appendChild(movieCard);
});

/* ----------------- Function to remove Movie from Local Storage ---------------- */
function removeFavoriteMovie(index) {
  let favMovies = JSON.parse(localStorage.getItem("favoriteMovies")) || [];
  favMovies.splice(index, 1); // Remove the movie at the specified index
  localStorage.setItem("favoriteMovies", JSON.stringify(favMovies));
}

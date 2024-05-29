/* ----------------- Getting the html elements for the Movie page ---------------- */
const moviePoster = document.getElementById("poster");
const movieTitle = document.getElementById("title");
const movieReleasedDate = document.getElementById("release");
const movieGenre = document.getElementById("genre");
const movieDirector = document.getElementById("director");
const movieActors = document.getElementById("actors");
const moviePlot = document.getElementById("plot");
const movieRating = document.getElementById("rating");

/* ----------------- Function to Fetch MovieID from Url ---------------- */
function getMovieId(id) {
  const url = new URLSearchParams(window.location.search);
  return url.get(id);
}

const imdbID = getMovieId("imdbID");

/* ----------------- Function to Fetch Movie details from API ---------------- */
const fetchMovie = async () => {
  try {
    const resource = await fetch(
      `https://www.omdbapi.com/?apikey=7e1025df&i=${imdbID}`
    );
    const movieData = await resource.json();
    return movieData;
  } catch (err) {
    console.error(err);
  }
};

/* ----------------- Function to display Movies list ---------------- */
async function displayMovie() {
  const movieDetails = await fetchMovie();
  moviePoster.src = `${movieDetails.Poster}`;
  moviePoster.alt = `${movieDetails.Poster} image`;
  movieTitle.innerHTML = `${movieDetails.Title}`;
  movieReleasedDate.innerHTML = `<b>Released In: </b>${movieDetails.Released}`;
  movieGenre.innerHTML = `<b>Genre: </b>${movieDetails.Genre}`;
  movieDirector.innerHTML = `<b>Director: </b>${movieDetails.Director}`;
  movieActors.innerHTML = `<b>Actors: </b>${movieDetails.Actors}`;
  moviePlot.innerHTML = `<b>Plot: </b>${movieDetails.Plot}`;
  movieRating.innerHTML = `<b>IMDB Rating: </b>${movieDetails.imdbRating}`;
}

/* ----------------- Adding Event Listener for Favorite Movies Button ---------------- */
const favoriteMoviesbtn = document.getElementById("favMoviesbtn");
favoriteMoviesbtn.addEventListener("click", () => {
  window.location.href = "favorite.html";
});

displayMovie();

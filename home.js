/* ----------------- Getting the html elements for the home page ---------------- */
const searched_movie = document.getElementById("searched_movie");
const searchBtn = document.getElementById("searchBtn");
const moviesListContainer = document.getElementById("movies_list");

/* ----------------- Function to Fetch Movies details from API ---------------- */
const fetchMovies = async (searchKeyword) => {
  try {
    const resource = await fetch(
      `https://www.omdbapi.com/?apikey=7e1025df&s=` + searchKeyword
    );
    const MovieData = await resource.json();
    return MovieData;
  } catch (err) {
    console.error(err);
  }
};

/* ----------------- Function to display Movies list ---------------- */
function displayMovies(movies) {
  moviesListContainer.innerHTML = "";

  if (movies) {
    movies.forEach((movie) => {
      const movieTitle = movie.Title;
      const movieYear = movie.Year;
      const moviePoster = movie.Poster;
      const movieId = movie.imdbID;

      const movieCard = document.createElement("div");
      const movieFigure = document.createElement("figure");
      const movieImage = document.createElement("img");
      const movieCaption = document.createElement("figcaption");
      const favoriteButton = document.createElement("button");
      movieCard.classList.add("movie-card");

      favoriteButton.classList.add("favorite_button");
      favoriteButton.innerHTML = "Add to Favorite";

      favoriteButton.addEventListener("click", () => {
        let favoriteMovies =
          JSON.parse(localStorage.getItem("favoriteMovies")) || [];

        // To make sure duplicates are not added to favorite list
        let flag = true;
        favoriteMovies.forEach((iteam) => {
          if (iteam.movieId === movieId) {
            flag = false;
          }
        });
        if (flag) {
          favoriteMovies.push({ movieTitle, moviePoster, movieYear, movieId });
          localStorage.setItem(
            "favoriteMovies",
            JSON.stringify(favoriteMovies)
          );
          window.alert(`${movieTitle} added to Favorite`);
        } else {
          window.alert(`${movieTitle} already Present in Favorite`);
        }
      });

      movieImage.src = moviePoster;
      movieImage.alt = `${movieTitle} poster`;
      movieImage.classList.add("movie_image");

      movieCaption.textContent = `${movieTitle}, ${movieYear}`;
      movieCaption.classList.add("movie_caption");

      movieFigure.appendChild(movieImage);
      movieFigure.appendChild(movieCaption);
      movieFigure.classList.add("movie_figure");

      movieFigure.addEventListener("click", () => {
        window.location.href = `movie.html?imdbID=${movieId}`;
      });

      movieCard.appendChild(movieFigure);
      movieCard.appendChild(favoriteButton);
      moviesListContainer.appendChild(movieCard);
    });
  } else {
    moviesListContainer.innerHTML =
      '<h2 style="color:red; text-align:center;">No results found!</h2>';
  }
}

/* ----------------- Adding Event Listener for input ---------------- */
searched_movie.addEventListener("input", async function () {
  let searchKeyword = this.value.trim();
  if (searchKeyword !== "") {
    const movies = await fetchMovies(searchKeyword);
    displayMovies(movies.Search);
  } else {
    moviesListContainer.innerHTML = "";
  }
});

/* ----------------- Adding Event Listener for Search Button ---------------- */
searchBtn.addEventListener("click", async function (event) {
  event.preventDefault();
  let searchKeyword = searched_movie.value.trim();
  if (searchKeyword !== "") {
    const movies = await fetchMovies(searchKeyword);
    displayMovies(movies.Search);
  } else {
    moviesListContainer.innerHTML =
      '<h2 style="color:red; text-align:center;">Please enter movie name first</h2>';
  }
});

/* ----------------- Adding Event Listener for Favorite Movies Button ---------------- */
const favoriteMoviesbtn = document.getElementById("favMoviesbtn");
favoriteMoviesbtn.addEventListener("click", () => {
  window.location.href = "favorite.html";
});

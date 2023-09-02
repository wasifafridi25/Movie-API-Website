const movieList = document.querySelector(".movies");
const search = document.querySelector(".search__btn");
const searchResults = document.querySelector(".search__results");
const loading = document.querySelector(".loading");
const filter = document.querySelector("#filter");
const toggle = document.querySelector(".toggle");
let searchValue = "";
let isToggle = false;

// Renders movies based on the selected filter value.
async function renderMovie(filterValue) {
  showLoading();

  const movieData = await fetchMovieData();
  if (!movieData) {
    return;
  }

  const movieArray = extractMovieArray(movieData);

  sortMovies(movieArray, filterValue);

  displayMovies(movieArray);
}
// Shows a loading indicator while fetching movie data.
function showLoading() {
  loading.classList.add("movie__loading");
  movieList.style.visibility = "hidden";
}

// Fetches movie data from the OMDB API.
async function fetchMovieData() {
  try {
    const movie = await fetch(
      `https://www.omdbapi.com/?apikey=e43bdcdf&s=${searchValue}`
    );
    return await movie.json();
  } catch (error) {
    console.error(
      "An error occurred while fetching or processing the data:",
      error
    );
    return null;
  }
}

// Extracts the movie array from the movie data.
function extractMovieArray(movieData) {
  return movieData.Search || [];
}

// Sorts the movies based on the selected filter value.
function sortMovies(movieArray, filterValue) {
  if (filterValue === "New To Old") {
    movieArray.sort((a, b) => b.Year - a.Year);
  } else if (filterValue === "Old To New") {
    movieArray.sort((a, b) => a.Year - b.Year);
  }
}

// Displays the movies in the UI.
function displayMovies(movieArray) {
  setTimeout(() => {
    loading.classList.remove("movie__loading");
    movieList.innerHTML = movieArray.map((movie) => movieHTML(movie)).join("");
    movieList.style.visibility = "visible";
  }, 700);
}

// Event listener for the search input field.
search.addEventListener("change", (e) => {
  searchValue = e.target.value;
  if (searchValue === "") {
    searchResults.textContent = `Search Results For: `;
  } else {
    searchResults.textContent = `Search Results For: ${searchValue}`;
    filter.style.display = "flex";
    filter.value = "Sort";
  }
  renderMovie();
});

// Event listener for the filter select input.
filter.addEventListener("change", (e) => {
  renderMovie(e.target.value);
});

// Redirects to the movie details page.
function showMovie(imdb) {
  localStorage.setItem("imdb", imdb);
  window.location.href = `${window.location.origin}/movie.html`;
}

// Generates HTML for a movie item.
function movieHTML(movie) {
  return `
        <div class="movie" onclick = "showMovie('${movie.imdbID}')">
            <img class="movie__poster" src=${movie.Poster} alt="">
            <h3 class="movie__title">${movie.Title}</h3>
            <h3 class="movie__year">${movie.Year}</h3>
        </div>
    `;
}

// Event listener for the toggle button to change the contrast.
toggle.addEventListener("click", () => {
  isToggle = !isToggle;
  if (isToggle) {
    document.body.classList.add("toggleContrast");
  } else {
    document.body.classList.remove("toggleContrast");
  }
});

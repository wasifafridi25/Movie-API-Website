//https://www.omdbapi.com/?i=tt7767422&apikey=e43bdcdf
const imdb = localStorage.getItem("imdb");
const content = document.querySelector(".movie__content");
const toggle = document.querySelector(".toggle");
let isToggle = false;

async function main(imdb) {
  const movie = await fetch(
    `https://www.omdbapi.com/?i=${imdb}&apikey=e43bdcdf`
  );
  const movieData = await movie.json();
  content.innerHTML = movieHTML(movieData);
}

main(imdb);

// Generates HTML for the summary a movie.
function movieHTML(movieData) {
  return `
    <div class="left__section">
        <img class="movie__poster new__poster" src="${movieData.Poster}" alt="">
        <h3 class="movie__title">${movieData.Title}</h3>
        <h3 class="movie__year">${movieData.Year}</h3>
    </div>
    <div class="right__section">
        <ul class="summary__points">
            <li><h2 class="summary"><span class = "red">Genre: </span> ${
              movieData.Genre
            }</h2></li>
            <li><h2 class="summary"><span class = "red">Type: </span> ${
              movieData.Type
            }</h2></li>
            <li><h2 class="summary"><span class = "red">Writer: </span> ${
              movieData.Writer
            }</h2></li>
            <li><h2 class="summary"><span class = "red">Actors: </span> ${
              movieData.Actors
            }</h2></li>
            <li><h2 class="summary plot" ><span class = "red">Plot: </span> ${
              movieData.Plot
            }</h2></li>
            <li><h2 class="summary"><span class = "red">Language: </span> ${
              movieData.Language
            }</h2></li>
            <li><h2 class="summary"><span class = "red">Country: </span> ${
              movieData.Country
            }</h2></li>
            <li><h2 class="summary"><span class = "red">Awards: </span> ${
              movieData.Awards
            }</h2></li>
            <li><h2 class="summary"><span class = "red">imdb Rating: </span> ${
              movieData.imdbRating
            }</h2></li>
        </ul>
        <div class="ratings">
            ${ratingHTML(movieData.imdbRating)}
        </div>
               
    </div>`;
}

function ratingHTML(rating) {
  let ratings = "";
  if (rating.toString().endsWith(".0")) {
    for (let i = 0; i < Math.floor(rating); i++) {
      ratings += `<i class="fas fa-star"></i>`;
    }
  } else {
    for (let i = 0; i < Math.floor(rating); i++) {
      ratings += `<i class="fas fa-star"></i>`;
    }
    ratings += `<i class="fas fa-star-half-alt"></i>`;
  }
  return ratings;
}

toggle.addEventListener("click", () => {
  isToggle = !isToggle;
  if (isToggle) {
    document.body.classList.add("toggleContrast");
  } else {
    document.body.classList.remove("toggleContrast");
  }
});

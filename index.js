const movieList = document.querySelector(".movies");
const search = document.querySelector(".search__btn");
const searchResults = document.querySelector(".search__results");

async function main(searchValue){
    const movie = await fetch(`https://www.omdbapi.com/?apikey=e43bdcdf&s=${searchValue}`);
    const movieData = await movie.json();
    console.log(movieData.Search);
    movieList.innerHTML = movieData.Search.map((movie) => movieHTML(movie)).join("");
    
}

search.addEventListener('change', (e)=> {
    searchValue = e.target.value;
    main(searchValue);
    if (searchValue === ''){
        searchResults.textContent = `Search Results For: `
    }
    else {
        searchResults.textContent = `Search Results For: ${searchValue}`
    }
})

function showMovie(imdb){
    localStorage.setItem("imdb", imdb)
    window.location.href = `${window.location.origin}/movie.html`
}

function movieHTML(movie){
    return `
        <div class="movie" onclick = "showMovie('${movie.imdbID}')">
            <img class="movie__poster" src=${movie.Poster} alt="">
            <h3 class="movie__title">${movie.Title}</h3>
            <h3 class="movie__year">${movie.Year}</h3>
        </div>
    `
}


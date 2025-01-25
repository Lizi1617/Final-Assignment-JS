import { fetchMovies } from "./API.js";

const searchInput = document.getElementById('search');
const searchBtn = document.getElementById('searchBtn');
const resultsContainer = document.getElementById('API');

searchBtn.addEventListener('click', () => {
    const query = searchInput.value.trim();
    if (!query) return;

    fetchMovies(`search/movie&query=${query}`)
        .then(data => showMovies(data.results));
});

function showMovies(movies) {
    resultsContainer.innerHTML = "";
    movies.forEach(movie => {
        const { title, poster_path, vote_average } = movie;
        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');

        movieEl.innerHTML = `
            <img src="https://image.tmdb.org/t/p/w500${poster_path}" alt="${title}">
            <h3>${title}</h3>
            <p>⭐ ${vote_average}</p>
        `;

        resultsContainer.appendChild(movieEl);
    });
}

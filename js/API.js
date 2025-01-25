const moviesApi = document.getElementById('moviesApi');
const API_KEY = '37c7b5ee9715374b9d06ee42d5931a13';

function fetchMovies(query = '') {
    let apiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`;
    if (query) {
        apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`;
    }

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            moviesApi.innerHTML = '';
            if (data.results && data.results.length > 0) {
                data.results.forEach(movie => {
                    const movieElement = document.createElement('div');
                    movieElement.classList.add('card');
                    movieElement.style.width = '18rem';
                    movieElement.innerHTML = `
                        <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" class="card-img-top" alt="${movie.title}">
                        <div class="card-body">
                            <h5 class="card-title">${movie.title}</h5>
                            <p class="card-text">${movie.overview}</p>
                            <a href="details.html?id=${movie.id}" class="btn btn-primary">View Details</a>
                        </div>
                    `;
                    moviesApi.appendChild(movieElement);
                });
            } else {
                moviesApi.innerHTML = '<p>No movies found.</p>';
            }
        })
        .catch(error => {
            console.error('Error fetching movie data:', error);
        });
}

fetchMovies();


const searchForm = document.getElementById('searchForm');
searchForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const searchQuery = document.getElementById('searchInput').value.trim();
    fetchMovies(searchQuery);
});









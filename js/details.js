const API_KEY = '37c7b5ee9715374b9d06ee42d5931a13';

function getMovieIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id');
}

function fetchMovieDetails() {
    const movieId = getMovieIdFromUrl();
    
    if (!movieId) {
        document.getElementById('movie-details').innerHTML = "<p>Movie not found.</p>";
        return;
    }

    const apiUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=en-US`;
    const videoApiUrl = `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${API_KEY}&language=en-US`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(movie => {
            document.getElementById('movie-poster').src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
            document.getElementById('movie-title').textContent = movie.title;
            document.getElementById('movie-release-date').textContent = `Release Date: ${movie.release_date}`;
            document.getElementById('movie-overview').textContent = movie.overview;
            document.getElementById('movie-rating').textContent = `${movie.vote_average} / 10`;

            const genresList = document.getElementById('movie-genres');
            genresList.innerHTML = '';
            movie.genres.forEach(genre => {
                const li = document.createElement('li');
                li.textContent = genre.name;
                genresList.appendChild(li);
            });
        })
        .catch(error => {
            console.error('Error fetching movie details:', error);
            document.getElementById('movie-details').innerHTML = "<p>Failed to load movie details.</p>";
        });

    fetch(videoApiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.results.length > 0) {
                const trailer = data.results.find(video => video.type === "Trailer" && video.site === "YouTube");
                if (trailer) {
                    document.getElementById('youtube-button').href = `https://www.youtube.com/watch?v=${trailer.key}`;
                } else {
                    document.getElementById('youtube-button').style.display = "none";
                }
            } else {
                document.getElementById('youtube-button').style.display = "none";
            }
        })
        .catch(error => console.error('Error fetching trailer:', error));
}

document.addEventListener('DOMContentLoaded', fetchMovieDetails);




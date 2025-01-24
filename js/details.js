document.addEventListener("DOMContentLoaded", () => {
    const API_KEY = "37c7b5ee9715374b9d06ee42d5931a13"; // Replace with your TMDB API key
    const BASE_URL = "https://api.themoviedb.org/3";
    const IMAGE_URL = "https://image.tmdb.org/t/p/w500";

    // Get the movie ID from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const movieId = urlParams.get("id");

    const movieDetailsContainer = document.getElementById("movie-details");
    const movieTitle = document.getElementById("movie-title");
    const trailerBtn = document.getElementById("trailer-btn");

    if (movieId) {
        fetchMovieDetails(movieId);
    } else {
        movieDetailsContainer.innerHTML = "<p class='text-danger'>Movie ID not provided. Redirecting...</p>";
        setTimeout(() => {
            window.location.href = "../pages/index.html"; // Redirect to home page
        }, 3000);
    }

    // Fetch the movie details
    function fetchMovieDetails(id) {
        fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=en-US`)
            .then(response => response.json())
            .then(data => {
                if (!data) {
                    movieDetailsContainer.innerHTML = "<p class='text-danger'>No details found.</p>";
                    return;
                }
                displayMovieDetails(data);
            })
            .catch(error => {
                console.error("⚠️ Error fetching movie details:", error);
                movieDetailsContainer.innerHTML = "<p class='text-danger'>Error fetching movie details.</p>";
            });
    }

    // Display the movie details
    function displayMovieDetails(movie) {
        const { title, overview, release_date, poster_path, genres, runtime, vote_average, id } = movie;

        movieTitle.textContent = title;

        // Movie details layout
        movieDetailsContainer.innerHTML = `
            <div class="col-md-4">
                <img src="${poster_path ? IMAGE_URL + poster_path : '../images/no-image.jpg'}" class="img-fluid" alt="${title}">
            </div>
            <div class="col-md-8">
                <h3>Overview</h3>
                <p>${overview ? overview : "No overview available."}</p>
                <p><strong>Release Date:</strong> ${release_date ? release_date : "N/A"}</p>
                <p><strong>Genres:</strong> ${genres ? genres.map(genre => genre.name).join(", ") : "N/A"}</p>
                <p><strong>Runtime:</strong> ${runtime ? runtime + " mins" : "N/A"}</p>
                <p><strong>Rating:</strong> ${vote_average ? vote_average : "N/A"}</p>
            </div>
        `;

        // Get YouTube trailer URL
        fetch(`${BASE_URL}/movie/${id}/videos?api_key=${API_KEY}&language=en-US`)
            .then(response => response.json())
            .then(videoData => {
                const youtubeTrailer = videoData.results.find(video => video.site === "YouTube" && video.type === "Trailer");
                if (youtubeTrailer) {
                    trailerBtn.style.display = "inline-block";
                    trailerBtn.href = `https://www.youtube.com/watch?v=${youtubeTrailer.key}`;
                }
            })
            .catch(error => console.error("⚠️ Error fetching video data:", error));
    }
});
function displayMovies(movies) {
    movieContainer.innerHTML = "";
    movies.forEach(movie => {
        const imageUrl = movie.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : 'path/to/default-image.jpg'; // Set a default image

        console.log("Image URL:", imageUrl);

        const movieCard = document.createElement("div");
        movieCard.classList.add("card", "p-2");
        movieCard.style.width = "18rem";

        movieCard.innerHTML = `
            <img src="${imageUrl}" class="card-img-top" alt="${movie.title}">
            <div class="card-body">
                <h5 class="card-title">${movie.title}</h5>
                <p class="card-text">${movie.release_date}</p>
                <a href="details.html?id=${movie.id}" class="btn btn-primary">More Details</a>
            </div>
        `;
        movieContainer.appendChild(movieCard);
    });
}







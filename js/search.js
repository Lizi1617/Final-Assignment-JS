document.addEventListener("DOMContentLoaded", () => {
    console.log("✅ search.js loaded");

    const API_KEY = "37c7b5ee9715374b9d06ee42d5931a13"; // Replace with your TMDB API key
    const BASE_URL = "https://api.themoviedb.org/3";
    const IMAGE_URL = "https://image.tmdb.org/t/p/w500";

    const searchForm = document.querySelector("form");
    const searchInput = document.querySelector("input[type='search']");
    const moviesContainer = document.getElementById("movies");
    const paginationContainer = document.getElementById("pagination");

    let currentPage = 1;
    let totalPages = 1;
    let currentQuery = "";

    // Hide search results by default unless on list.html
    if (moviesContainer && !window.location.href.includes("list.html")) {
        moviesContainer.style.display = "none";
        paginationContainer.style.display = "none";
    }

    // Search form submission event
    searchForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const query = searchInput.value.trim();
        if (query) {
            currentQuery = query;
            currentPage = 1;
            searchMovies(query, currentPage);
        }
    });

    // Fetch movies from API
    function searchMovies(query, page = 1) {
        fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}&page=${page}`)
            .then(response => response.json())
            .then(data => {
                if (data.results.length === 0) {
                    moviesContainer.innerHTML = "<p class='text-danger'>No movies found.</p>";
                    paginationContainer.innerHTML = "";
                    return;
                }
                totalPages = data.total_pages;
                displayMovies(data.results);
                displayPagination();
            })
            .catch(error => console.error("⚠️ Error fetching search results:", error));
    }

    // Display movies
    function displayMovies(movies) {
        moviesContainer.style.display = "flex"; // Make it visible only when searching
        paginationContainer.style.display = "flex";
        
        moviesContainer.innerHTML = movies
            .map(movie => `
                <div class="movie-card">
                    <img src="${movie.poster_path ? IMAGE_URL + movie.poster_path : '../images/no-image.jpg'}" class="movie-poster" alt="${movie.title}">
                    <div class="movie-info">
                        <h5>${movie.title}</h5>
                        <p>${movie.release_date ? movie.release_date.split("-")[0] : "N/A"}</p>
                        <a href="../pages/details.html?id=${movie.id}" class="btn btn-primary">View Details</a>
                    </div>
                </div>
            `)
            .join("");
    }

    // Display pagination
    function displayPagination() {
        paginationContainer.innerHTML = `
            <button class="btn btn-outline-primary" ${currentPage === 1 ? "disabled" : ""} onclick="changePage(-1)">⬅️ Prev</button>
            <span>Page ${currentPage} of ${totalPages}</span>
            <button class="btn btn-outline-primary" ${currentPage === totalPages ? "disabled" : ""} onclick="changePage(1)">Next ➡️</button>
        `;
    }

    // Change page function
    window.changePage = (direction) => {
        currentPage += direction;
        searchMovies(currentQuery, currentPage);
    };
});

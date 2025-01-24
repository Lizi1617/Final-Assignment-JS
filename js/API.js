window.onload = function () {
    console.log("✅ API.js loaded on", window.location.pathname);

    const movieContainer = document.getElementById("movies");
    const paginationContainer = document.getElementById("pagination");

    // Check if we're on list.html
    if (!movieContainer) {
        console.warn("⚠️ No movie container found. API.js will not run.");
        return;
    }

    const API_KEY = "37c7b5ee9715374b9d06ee42d5931a13";
    const BASE_URL = "https://api.themoviedb.org/3";
    let currentPage = 1;

    function fetchMovies(page = 1) {
        const url = `${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${page}`;
        console.log(`Fetching movies from: ${url}`);

        fetch(url)
            .then(response => {
                if (!response.ok) throw new Error("❌ API request failed");
                return response.json();
            })
            .then(data => {
                console.log("✅ API Data:", data);
                displayMovies(data.results);
                setupPagination(data.page, data.total_pages);
            })
            .catch(error => console.error("⚠️ Error fetching movies:", error));
    }

    function displayMovies(movies) {
        movieContainer.innerHTML = "";
        movies.forEach(movie => {
            const movieCard = document.createElement("div");
            movieCard.classList.add("card", "p-2");
            movieCard.style.width = "18rem";

            const posterPath = movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : "../images/no-image.jpg";

            movieCard.innerHTML = `
                <img src="${posterPath}" class="card-img-top" alt="${movie.title}">
                <div class="card-body">
                    <h5 class="card-title">${movie.title}</h5>
                    <p class="card-text">${movie.release_date}</p>
                    <a href="details.html?id=${movie.id}" class="btn btn-primary">More Details</a>
                </div>
            `;
            movieContainer.appendChild(movieCard);
        });
    }

    function setupPagination(current, total) {
        paginationContainer.innerHTML = "";
        // Adjust to display all pages if needed
        const totalPages = total > 5 ? 5 : total;
        for (let i = 1; i <= totalPages; i++) {
            const pageButton = document.createElement("button");
            pageButton.classList.add("btn", "btn-outline-primary");
            pageButton.textContent = i;
            if (i === current) pageButton.classList.add("active");

            pageButton.addEventListener("click", () => {
                currentPage = i;
                fetchMovies(i);
            });
            paginationContainer.appendChild(pageButton);
        }
    }

    fetchMovies(currentPage);
};



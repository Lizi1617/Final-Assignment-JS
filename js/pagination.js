import { fetchMovies } from "./API.js";

const pagination = document.getElementById('pagination');
let currentPage = 1;
let totalPages = 1;

export function setupPagination(endpoint) {
    fetchMovies(endpoint, currentPage).then(data => {
        totalPages = data.total_pages;
        showMovies(data.results);
        updatePagination();
    });
}

function updatePagination() {
    pagination.innerHTML = "";

    if (currentPage > 1) {
        let prevBtn = document.createElement('button');
        prevBtn.innerText = "Prev";
        prevBtn.addEventListener('click', () => changePage(currentPage - 1));
        pagination.appendChild(prevBtn);
    }

    let pageInfo = document.createElement('span');
    pageInfo.innerText = `Page ${currentPage} of ${totalPages}`;
    pagination.appendChild(pageInfo);

    if (currentPage < totalPages) {
        let nextBtn = document.createElement('button');
        nextBtn.innerText = "Next";
        nextBtn.addEventListener('click', () => changePage(currentPage + 1));
        pagination.appendChild(nextBtn);
    }
}

function changePage(newPage) {
    currentPage = newPage;
    setupPagination("movie/popular"); 
}

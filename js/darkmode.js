//Dark mode
function toggleMode() {
    let body = document.body;
    let switchButton = document.querySelector(".switch");
    let lampIcon = document.querySelector(".lamp-icon");
    let navbar = document.querySelector(".navbar");

    body.classList.toggle("dark-mode");
    switchButton.classList.toggle("dark");

    if (body.classList.contains("dark-mode")) {
        lampIcon.textContent = "💡"; // Lamp stays same, just color changes
        lampIcon.style.color = "yellow";
        localStorage.setItem("theme", "dark");
    } else {
        lampIcon.textContent = "💡";
        lampIcon.style.color = "black";
        localStorage.setItem("theme", "light");
    }
}

// Load mode from localStorage
window.onload = function () {
    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark-mode");
        document.querySelector(".switch").classList.add("dark");
        let lampIcon = document.querySelector(".lamp-icon");
        lampIcon.textContent = "💡";
        lampIcon.style.color = "yellow";
    }
};



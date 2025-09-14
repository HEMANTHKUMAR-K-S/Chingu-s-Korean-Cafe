// Define DOM elements
const menuToggle = document.querySelector(".menu-toggle");
const menu = document.querySelector(".menu");
const icon = document.querySelector(".menu-toggle i");
const navLinks = document.querySelectorAll(".nav-link");

menuToggle.addEventListener("click", () => {
    menu.classList.toggle("active");

    if (menu.classList.contains("active")) {
        icon.classList.remove("fa-bars");
        icon.classList.add("fa-times");
    } else {
        icon.classList.remove("fa-times");
        icon.classList.add("fa-bars");
        document.body.classList.remove("no-scroll");
    }
});

navLinks.forEach(link => {
    link.addEventListener("click", () => {
        if (menu.classList.contains("active")) {
            menu.classList.remove("active");
            icon.classList.remove("fa-times");
            icon.classList.add("fa-bars");
            document.body.classList.remove("no-scroll");
        }
    });
});

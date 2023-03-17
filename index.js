const nav = document.querySelector(".navigation-container");
const navToggle = document.querySelector(".mobile-nav-toggle");
const shaded = document.querySelector(".dark-overlay");

/* function currentWindowWidth() {
    return document.documentElement.clientWidth;
} */ 

function removeStuff() {
    nav.setAttribute("data-visible", false);
    navToggle.setAttribute("aria-expanded", false);
    /* this is here to prevent sudden close */
    setTimeout(function () {
        nav.classList.remove("animate-on-mobile");
        shaded.classList.add("hidden");
        document.querySelector("body").classList.remove("overflow-hidden");
        document.querySelector("html").classList.remove("overflow-hidden");    
    }, 300);
    /* not working as expected, px-17 should be the last to be removed */
    /* setTimeout(function () {
        document.querySelector("body").classList.remove("px-17");
    },300); */
}

navToggle.addEventListener("click", (e) => {
    e.preventDefault();
    const visibility = nav.getAttribute("data-visible");
    if (visibility === "false") {
        nav.setAttribute("data-visible", true);
        navToggle.setAttribute("aria-expanded", true);
        /* adds css transition only when button is clicked, and not from working when screen is resizing */
        nav.classList.add("animate-on-mobile");
        /* darkens the body */
        shaded.classList.remove("hidden");
        document.querySelector("body").classList.add("overflow-hidden");
        document.querySelector("html").classList.add("overflow-hidden");
        /* document.querySelector("body").classList.add("px-17"); */
    } else {
        removeStuff();
    }
})

window.addEventListener("resize", () => {
    console.log("passed here");
    removeStuff();
})

document.addEventListener("click", (e) => {
    /* console.log(e.target.closest("nav")); */
    if (!e.target.closest("nav")) {
        removeStuff();
    }
})
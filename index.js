const nav = document.querySelector(".navigation-container"),
    navToggle = document.querySelector(".mobile-nav-toggle"),
    shaded = document.querySelector(".dark-overlay"),
    dropdown = document.querySelectorAll("a.dropdown-toggle"),
    body = document.querySelector("body"),
    html = document.querySelector("html");
    
function resetDropdowns() {
    dropdown.forEach( selection => {
        selection.nextElementSibling.classList.add('hidden');
        selection.setAttribute('aria-expanded', "false");
    })
}

/* At certain viewport widths, a vertical scrollbar appears. This function is here so that the 'x' and the underlying html does not shift  */
function compensateForScrollbar() {
    if (window.innerWidth > document.body.clientWidth && nav.getAttribute("data-visible") === "true") {
        navToggle.classList.add("tx--17");
        body.classList.add("px-17");
        html.classList.add("px-17");
    } else {
        navToggle.classList.remove("tx--17");
        body.classList.remove("px-17");
        html.classList.remove("px-17");
    }
}

function removeStuff() {
    nav.setAttribute("data-visible", false);
    /* this is here to prevent sudden close */
    setTimeout(function () {
        nav.classList.remove("animate-on-mobile");
        shaded.classList.add("hidden");
        compensateForScrollbar();
        body.classList.remove("overflow-hidden");
        html.classList.remove("overflow-hidden");
    }, 300);
    navToggle.setAttribute("aria-expanded", false);
}

dropdown.forEach((item, index, arr) => {
    item.addEventListener('click', (e) => {
        /* if (item.nextElementSibling.className == "dropdown-menu animate slideIn hidden") { */
        if (item.nextElementSibling.classList.contains("hidden")) {
            item.nextElementSibling.classList.remove('hidden');
            item.setAttribute('aria-expanded', "true");
            /* the next code block closes the current dropdown-menu if another dropdown-menu is clicked on */
            /* Works with however many dropdown-menus a navigation bar has */
            arr.forEach((el, i) => {
                if (i !== index) {
                    el.nextElementSibling.classList.add('hidden');
                    el.setAttribute('aria-expanded', "false");
                }
            });
        } else {
            /* close ALL open dropdown-menus */
            resetDropdowns();
        }
        e.preventDefault();
    })
})
navToggle.addEventListener("click", (e) => {
    e.preventDefault();
    const visibility = nav.getAttribute("data-visible");
    if (visibility === "false") {
        nav.setAttribute("data-visible", true);
        /* adds css transition only when button is clicked, and not from working when screen is resizing */
        nav.classList.add("animate-on-mobile");
        /* darkens the body */
        shaded.classList.remove("hidden");
        compensateForScrollbar();
        body.classList.add("overflow-hidden");
        html.classList.add("overflow-hidden");
        navToggle.setAttribute("aria-expanded", true);
    } else {
        removeStuff();
    }
})

window.addEventListener("resize", () => {
    removeStuff();
    /* is it a good idea to close all dropdown-menus on resize? */
    resetDropdowns();

})

document.addEventListener("click", (e) => {
    /* console.log(e.target.closest("nav")); */
    if (!e.target.closest("nav")) {
        removeStuff();
        /* is it a good idea to close all dropdown-menus on resize? */
        resetDropdowns();
    }
})

const nav = document.querySelector(".navigation-container"),
    navToggle = document.querySelector(".mobile-nav-toggle"),
    shaded = document.querySelector(".dark-overlay"),
    dropdown = document.querySelectorAll("a.dropdown-toggle"),
    /* ultest = document.querySelector(".dropdown-menu"), */
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
        /* console.log(`window.innerWidth > document.body.clientWidth = ${window.innerWidth>document.body.clientWidth}`);
        console.log(`navToggle.classList.contains("tx-17") = ${navToggle.classList.contains("tx-17")}`); */
        navToggle.classList.add("tx--17");
        body.classList.add("px-17");
        html.classList.add("px-17");
    } else {
        navToggle.classList.remove("tx--17");
        body.classList.remove("px-17");
        html.classList.remove("px-17");
        /* console.log(`navToggle.classList.contains("tx-17") = ${navToggle.classList.contains("tx-17")}`); */
    }
}

function removeStuff() {
    nav.setAttribute("data-visible", false);
    navToggle.setAttribute("aria-expanded", false);
    /* this is here to prevent sudden close */
    setTimeout(function () {
        nav.classList.remove("animate-on-mobile");
        shaded.classList.add("hidden");
        compensateForScrollbar();
        body.classList.remove("overflow-hidden");
        html.classList.remove("overflow-hidden");
    }, 300);
}

dropdown.forEach((item, index, arr) => {
    /* console.log(item.textContent, arr.length); */
    /* console.log(item.textContent, arr[index].textContent); */
    /* console.log(item.textContent, index); */

    item.addEventListener('click', (e) => {
        /* console.log(`${e.target.textContent}, ${item.textContent}`); */
        /* console.log(item.nextElementSibling); */

        if (item.nextElementSibling.className == "dropdown-menu hidden") {
            item.nextElementSibling.classList.remove('hidden');
            item.setAttribute('aria-expanded', "true");
            /* the next code block closes the current dropdown-menu if another dropdown-menu is clicked on */
            /* this works with however many dropdown-menus a navigation bar has */
            arr.forEach((el, i) => {
                /* console.log(el.textContent, arr[i].nextElementSibling); */
                /* console.log(i == index); */
                if (i !== index) {
                    el.nextElementSibling.classList.add('hidden');
                    el.setAttribute('aria-expanded', "false");
                }
            });
        } else {
            /* item.nextElementSibling.classList.add('hidden');
            item.setAttribute('aria-expanded', "false"); */
            /* close all open dropdown-menus */
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
        navToggle.setAttribute("aria-expanded", true);
        /* adds css transition only when button is clicked, and not from working when screen is resizing */
        nav.classList.add("animate-on-mobile");
        /* darkens the body */
        shaded.classList.remove("hidden");
        compensateForScrollbar();
        body.classList.add("overflow-hidden");
        html.classList.add("overflow-hidden");
        /* console.log(`navToggle.classList.contains("tx-17") = ${navToggle.classList.contains("tx-17")}`); */
    } else {
        removeStuff();
    }
})

window.addEventListener("resize", () => {
    /* console.log("passed here"); */
    /* console.log(`window.innerWidth= ${window.innerWidth}`);
    console.log(`document.body.clientWidth= ${document.body.clientWidth}`); */
    removeStuff();
    /* is it a good idea to close all dropdown menus on resize? */
    resetDropdowns();

})

document.addEventListener("click", (e) => {
    /* console.log(e.target.closest("nav")); */
    if (!e.target.closest("nav")) {
        removeStuff();
        /* is it a good idea to close all dropdown menus on resize? */
        resetDropdowns();
    }
})

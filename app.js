let controller;
let slideScene;
let pageScene;

function animateSlides() {
    controller = new ScrollMagic.Controller();
    const sliders = document.querySelectorAll(".slide");
    const nav = document.querySelector(".nav-header");
    sliders.forEach((slide, index, slides) => {
        const revealImg = slide.querySelector(".reveal-img");
        const img = slide.querySelector("img");
        const revealText = slide.querySelector(".reveal-text");
        const slideTl = gsap.timeline({
            defaults: { duration: 1, ease: "power2.inOut" },
        });
        slideTl.fromTo(revealImg, { x: "0%" }, { x: "100%" });
        slideTl.fromTo(img, { scale: 2 }, { scale: 1 }, "-=1");
        slideTl.fromTo(revealText, { x: "0%" }, { x: "100%" }, "-=0.75");
        slideTl.fromTo(nav, { y: "-100%" }, { y: "0%" }, "-=0.5");

        slideScene = new ScrollMagic.Scene({
            triggerElement: slide,
            triggerHook: 0.25,
            reverse: false,
        })
            .setTween(slideTl)
            // .addIndicators({
            //     colorStart: "white",
            //     colorTrigger: "white",
            //     name: "slide",
            // })
            .addTo(controller);

        const pageTl = gsap.timeline();
        let newSlide = slides.length - 1 === index ? "end" : slides[index + 1];
        pageTl.fromTo(newSlide, { y: "0%" }, { y: "50%" });
        pageTl.fromTo(
            slide,
            { opacity: 1, scale: 1 },
            { opacity: 0, scale: 0.5 }
        );
        pageTl.fromTo(newSlide, { y: "50%" }, { y: "0%" }, "-=0.5");
        pageScene = new ScrollMagic.Scene({
            triggerElement: slide,
            duration: "100%",
            triggerHook: 0,
        })
            // .addIndicators({
            //     colorStart: "white",
            //     colorTrigger: "white",
            //     name: "page",
            //     indent: 200,
            // })
            .setPin(slide, { pushFollowers: false })
            .setTween(pageTl)
            .addTo(controller);
    });
}

let mouse = document.querySelector(".cursor");
let mouseText = mouse.querySelector("span");

function cursor(e) {
    mouse.style.top = e.pageY + "px";
    mouse.style.left = e.pageX + "px";

    if (window.screenY > 0) {
        mouse.classList.add("locked");
    }
}

function activeCursor(e) {
    const item = e.target;
    if (item.id === "logo" || item.classList.contains("burger")) {
        mouse.classList.add("nav-active");
    } else {
        mouse.classList.remove("nav-active");
    }
    if (item.classList.contains("explore")) {
        mouse.classList.add("explore-active");
        gsap.to(".title-swipe", 1, { y: "0%" });
        mouseText.innerText = "Tap";
    } else {
        mouse.classList.remove("explore-active");
        gsap.to(".title-swipe", 1, { y: "100%" });
        mouseText.innerText = "";
    }
}

window.addEventListener("mousemove", cursor);
window.addEventListener("mouseover", activeCursor);

animateSlides();

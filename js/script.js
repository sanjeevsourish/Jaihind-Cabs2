// =========================================================
// JAIHIND CABS - MAIN JAVASCRIPT
// =========================================================

document.addEventListener("DOMContentLoaded", function () {

    // =====================================================
    // MOBILE MENU
    // =====================================================

    const menuToggle = document.querySelector(".menu-toggle");
    const navbar = document.querySelector(".navbar");

    if (menuToggle && navbar) {

        menuToggle.addEventListener("click", function () {

            navbar.classList.toggle("open");
            menuToggle.classList.toggle("active");

        });

    }


    // Close mobile menu when clicking a navigation link

    const navLinks = document.querySelectorAll(".navbar a");

    navLinks.forEach(function (link) {

        link.addEventListener("click", function () {

            if (navbar) {
                navbar.classList.remove("open");
            }

            if (menuToggle) {
                menuToggle.classList.remove("active");
            }

        });

    });


    // =====================================================
    // HEADER SCROLL EFFECT
    // =====================================================

    const header = document.querySelector(".header");

    function updateHeader() {

        if (!header) return;

        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }

    }

    window.addEventListener("scroll", updateHeader);

    updateHeader();


    // =====================================================
    // SMOOTH SCROLL
    // =====================================================

    document.querySelectorAll('a[href^="#"]').forEach(function (link) {

        link.addEventListener("click", function (event) {

            const targetId = this.getAttribute("href");

            if (!targetId || targetId === "#") {
                return;
            }

            const target = document.querySelector(targetId);

            if (target) {

                event.preventDefault();

                const headerHeight = header
                    ? header.offsetHeight
                    : 80;

                const targetPosition =
                    target.getBoundingClientRect().top +
                    window.scrollY -
                    headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: "smooth"
                });

            }

        });

    });


    // =====================================================
    // SCROLL REVEAL ANIMATION
    // =====================================================

const revealElements = document.querySelectorAll(
    ".reveal, .section-heading, .service-card, .benefit-card, .destination-card, .step, .contact-card, .booking-info-card, .booking-form-card, .vehicle-visual, .vehicle-content, .service-cta, .experience-section, .how-section, .sightseeing-card, .review-card"
);

if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
        function (entries, observer) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.15
        }
    );

    revealElements.forEach(function (element) {
        revealObserver.observe(element);
    });
} else {
    revealElements.forEach(function (element) {
        element.classList.add("visible");
    });
}


    // =====================================================
    // BACK TO TOP BUTTON
    // =====================================================

    const backToTop = document.querySelector(".back-to-top");

    if (backToTop) {

        window.addEventListener("scroll", function () {

            if (window.scrollY > 500) {
                backToTop.classList.add("show");
            } else {
                backToTop.classList.remove("show");
            }

        });

        backToTop.addEventListener("click", function () {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        });

    }


    // =====================================================
    // CURRENT YEAR IN FOOTER
    // =====================================================

    const yearElements = document.querySelectorAll(".current-year");

    yearElements.forEach(function (element) {

        element.textContent = new Date().getFullYear();

    });


    // =====================================================
    // SERVICE CARD HOVER EFFECT
    // =====================================================

    const serviceCards = document.querySelectorAll(".service-card");

    serviceCards.forEach(function (card) {

        card.addEventListener("mouseenter", function () {
            card.classList.add("hovered");
        });

        card.addEventListener("mouseleave", function () {
            card.classList.remove("hovered");
        });

    });


    // =====================================================
    // DESTINATION CARD EFFECT
    // =====================================================

    const destinationCards =
        document.querySelectorAll(".destination-card");

    destinationCards.forEach(function (card) {

        card.addEventListener("mouseenter", function () {
            card.classList.add("active");
        });

        card.addEventListener("mouseleave", function () {
            card.classList.remove("active");
        });

    });


    // =====================================================
    // PHONE NUMBER CLICK TRACKING
    // =====================================================

    const phoneLinks =
        document.querySelectorAll('a[href^="tel:"]');

    phoneLinks.forEach(function (link) {

        link.addEventListener("click", function () {

            console.log("Calling Jaihind Cabs...");

        });

    });


    // =====================================================
    // WHATSAPP BUTTON
    // =====================================================

    const whatsappLinks =
        document.querySelectorAll(".whatsapp-link");

    whatsappLinks.forEach(function (link) {

        link.addEventListener("click", function () {

            console.log("Opening WhatsApp...");

        });

    });


    // =====================================================
    // BUTTON RIPPLE EFFECT
    // =====================================================

    const buttons = document.querySelectorAll(".btn");

    buttons.forEach(function (button) {

        button.addEventListener("click", function (event) {

            const ripple = document.createElement("span");

            ripple.classList.add("button-ripple");

            const rect = button.getBoundingClientRect();

            const size = Math.max(
                rect.width,
                rect.height
            );

            ripple.style.width = size + "px";
            ripple.style.height = size + "px";

            ripple.style.left =
                event.clientX - rect.left - size / 2 + "px";

            ripple.style.top =
                event.clientY - rect.top - size / 2 + "px";

            button.appendChild(ripple);

            setTimeout(function () {
                ripple.remove();
            }, 600);

        });

    });


    // =====================================================
    // PRELOADER
    // =====================================================

    const preloader =
        document.querySelector(".preloader");

    if (preloader) {

        window.addEventListener("load", function () {

            setTimeout(function () {

                preloader.classList.add("loaded");

                setTimeout(function () {

                    preloader.style.display = "none";

                }, 500);

            }, 500);

        });

    }


    // =====================================================
    // ACTIVE NAVIGATION LINK
    // =====================================================

    const sections =
        document.querySelectorAll("section[id]");

    const navigationLinks =
        document.querySelectorAll('.navbar a[href^="#"]');

    function updateActiveNavigation() {

        let currentSection = "";

        sections.forEach(function (section) {

            const sectionTop =
                section.offsetTop - 150;

            const sectionHeight =
                section.offsetHeight;

            if (
                window.scrollY >= sectionTop &&
                window.scrollY < sectionTop + sectionHeight
            ) {

                currentSection = section.getAttribute("id");

            }

        });

        navigationLinks.forEach(function (link) {

            link.classList.remove("active");

            if (
                link.getAttribute("href") ===
                "#" + currentSection
            ) {

                link.classList.add("active");

            }

        });

    }

    window.addEventListener(
        "scroll",
        updateActiveNavigation
    );


    // =====================================================
    // DISABLE BROKEN # LINKS
    // =====================================================

    document.querySelectorAll('a[href="#"]').forEach(function (link) {

        link.addEventListener("click", function (event) {
            event.preventDefault();
        });

    });


    // =====================================================
    // PAGE LOADED
    // =====================================================

    console.log(
        "Jaihind Cabs website loaded successfully."
    );

});
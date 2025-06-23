document.addEventListener("DOMContentLoaded", function () {
  // ------ Load header content  ------
  const loadHeaderPromise = fetch("header.html") // Capture the promise
    .then((response) => response.text())
    .then((data) => {
      const headerPlaceholder = document.getElementById("header-placeholder");
      if (headerPlaceholder) {
        headerPlaceholder.innerHTML = data;
      } else {
        console.error("Header placeholder not found.");
      }
    })
    .catch((error) => console.error("Error loading header:", error));

  // ------ Load footer content  ------
  const loadFooterPromise = fetch("footer.html") // Capture the promise
    .then((response) => response.text())
    .then((data) => {
      const footerPlaceholder = document.getElementById("footer-placeholder");
      if (footerPlaceholder) {
        footerPlaceholder.innerHTML = data;
      } else {
        console.error("Footer placeholder not found.");
      }
    })
    .catch((error) => console.error("Error loading footer:", error));

  // Wait for both header and footer to load before initializing logic
  Promise.all([loadHeaderPromise, loadFooterPromise])
    .then(() => {
      // All elements from header.html and footer.html are now in the DOM
      // You can safely select them and attach event listeners

      const hamburger = document.getElementById("hamburger");
      const navMobile = document.getElementById("navMobile");

      // Always add checks before interacting with potentially null elements
      if (hamburger && navMobile) {
        hamburger.addEventListener("click", function () {
          hamburger.classList.toggle("active");
          navMobile.classList.toggle("show");
        });
      } else {
        console.warn(
          "Hamburger or navMobile elements not found after header load."
        );
      }

      const aboutLink = document.querySelector(".about");
      const aboutDeskLink = document.querySelector(".aboutDesk");
      const projectLink = document.querySelector(".project");
      const projectDeskLink = document.querySelector(".projectDesk");
      const contactLink = document.querySelector(".contact");
      const contactDeskLink = document.querySelector(".contactDesk");

      // These sections are assumed to be in the main index.html body,
      // not in header/footer, so they should be available.
      const aboutSection = document.querySelector("#aboutMe");
      const projectSection = document.querySelector("#todaDiv");
      const contactSection = document.querySelector("#contactSection");

      function hideMenu() {
        if (navMobile) navMobile.classList.remove("show");
        if (hamburger) hamburger.classList.remove("active");
      }

      function isIndexPage() {
        const path = window.location.pathname;
        return (
          path.endsWith("index.html") ||
          path === "/" ||
          path === "/portfolio/" ||
          path === "/portfolio/index.html"
        );
      }

      function navigateAndScroll(e, sectionId, hideMobileMenu = false) {
        e.preventDefault();
        if (isIndexPage()) {
          const section = document.querySelector(sectionId);
          if (section) {
            section.scrollIntoView({ behavior: "smooth" });
          }
          if (hideMobileMenu) {
            hideMenu();
          }
        } else {
          window.location.href = "index.html" + sectionId;
        }
      }

      // Event Listeners for About links
      if (aboutLink) {
        aboutLink.addEventListener("click", function (e) {
          navigateAndScroll(e, "#aboutMe", true);
        });
      }

      if (aboutDeskLink) {
        aboutDeskLink.addEventListener("click", function (e) {
          navigateAndScroll(e, "#aboutMe");
        });
      }

      // Event Listeners for Project links
      if (projectLink) {
        projectLink.addEventListener("click", function (e) {
          navigateAndScroll(e, "#todaDiv", true);
        });
      }

      if (projectDeskLink) {
        projectDeskLink.addEventListener("click", function (e) {
          navigateAndScroll(e, "#todaDiv");
        });
      }

      // Contact links remain the same as they only scroll on the current page
      if (contactLink) {
        contactLink.addEventListener("click", function (e) {
          e.preventDefault();
          if (contactSection) {
            contactSection.scrollIntoView({ behavior: "smooth" });
          }
          hideMenu();
        });
      }

      if (contactDeskLink) {
        contactDeskLink.addEventListener("click", function (e) {
          e.preventDefault();
          if (contactSection) {
            contactSection.scrollIntoView({ behavior: "smooth" });
          }
        });
      }

      // Handle scrolling when arriving from a different page with a hash
      if (isIndexPage() && window.location.hash) {
        const targetSectionId = window.location.hash;
        const targetSection = document.querySelector(targetSectionId);
        if (targetSection) {
          setTimeout(() => {
            targetSection.scrollIntoView({ behavior: "smooth" });
          }, 100);
        }
      }

      // --- Image Carousel (remains the same) ---
      const images = ["./asset/TI1.png", "./asset/TI2.png", "./asset/TI3.png"];
      let currentIndex = 0;

      const carouselImage = document.getElementById("carouselImage");
      const leftBtn = document.querySelector(".arrow.left");
      const rightBtn = document.querySelector(".arrow.right");

      function showImage(index) {
        if (carouselImage) {
          carouselImage.src = images[index];
        }
      }

      if (leftBtn) {
        leftBtn.addEventListener("click", function () {
          currentIndex = (currentIndex - 1 + images.length) % images.length;
          showImage(currentIndex);
        });
      }

      if (rightBtn) {
        rightBtn.addEventListener("click", function () {
          currentIndex = (currentIndex + 1) % images.length;
          showImage(currentIndex);
        });
      }

      const bgVideo = document.getElementById("introVideo");
      if (bgVideo) {
        bgVideo.addEventListener("ended", function () {
          bgVideo.currentTime = 0; // Reset the video to the start
          bgVideo.play(); // Play the video again
        });
      }
    })
    .catch((error) => {
      console.error("Error initializing page due to fetch issues:", error);
    });
});

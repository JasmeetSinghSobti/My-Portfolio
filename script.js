(function () {
  "use strict";

  // Array of items to be displayed one after another
  const typedItems = ["Web Developer", "AI Engineer", "Electronics Engineer"];
  const typedElement = document.getElementById("typed-element");
  let currentItemIndex = 0;
  let currentText = "";
  let isDeleting = false;
  function typeText() {
    const item = typedItems[currentItemIndex];
    currentText = isDeleting
      ? item.substring(0, currentText.length - 1)
      : item.substring(0, currentText.length + 1);

    typedElement.textContent = currentText;

    // Delay between adding/removing characters
    const typingSpeed = isDeleting ? 40 : 100;

    if (!isDeleting && currentText === item) {
      // Pause at end of typing
      setTimeout(() => {
        isDeleting = true;
      }, 1000);
    } else if (isDeleting && currentText === "") {
      // Move to the next item after deleting text
      isDeleting = false;
      currentItemIndex = (currentItemIndex + 1) % typedItems.length;
    }
    setTimeout(typeText, typingSpeed);
  }

  // Start the typing animation when the page loads
  window.addEventListener("load", () => {
    typeText();
  });

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim();
    if (all) {
      return [...document.querySelectorAll(el)];
    } else {
      return document.querySelector(el);
    }
  };

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all);
    if (selectEl) {
      if (all) {
        selectEl.forEach((e) => e.addEventListener(type, listener));
      } else {
        selectEl.addEventListener(type, listener);
      }
    }
  };

  /**
   * Easy on scroll event listener
   */
  const onscroll = (el, listener) => {
    el.addEventListener("scroll", listener);
  };

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select("#navbar .scrollto", true);
  const navbarlinksActive = () => {
    let position = window.scrollY + 200;
    navbarlinks.forEach((navbarlink) => {
      if (!navbarlink.hash) return;
      let section = select(navbarlink.hash);
      if (!section) return;
      if (
        position >= section.offsetTop &&
        position <= section.offsetTop + section.offsetHeight
      ) {
        navbarlink.classList.add("active");
      } else {
        navbarlink.classList.remove("active");
      }
    });
  };
  window.addEventListener("load", navbarlinksActive);
  onscroll(document, navbarlinksActive);

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let elementPos = select(el).offsetTop;
    window.scrollTo({
      top: elementPos,
      behavior: "smooth",
    });
  };

  /**
   * Back to top button
   */
  let backtotop = select(".back-to-top");
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add("active");
      } else {
        backtotop.classList.remove("active");
      }
    };
    window.addEventListener("load", toggleBacktotop);
    onscroll(document, toggleBacktotop);
  }

  /**
   * Mobile nav toggle
   */
  on("click", ".mobile-nav-toggle", function (e) {
    select("body").classList.toggle("mobile-nav-active");
    this.classList.toggle("bi-list");
    this.classList.toggle("bi-x");
  });

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on(
    "click",
    ".scrollto",
    function (e) {
      if (select(this.hash)) {
        e.preventDefault();

        let body = select("body");
        if (body.classList.contains("mobile-nav-active")) {
          body.classList.remove("mobile-nav-active");
          let navbarToggle = select(".mobile-nav-toggle");
          navbarToggle.classList.toggle("bi-list");
          navbarToggle.classList.toggle("bi-x");
        }
        scrollto(this.hash);
      }
    },
    true
  );

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener("load", () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash);
      }
    }
  });

  /**
   * Skills animation
   */
  document.addEventListener("DOMContentLoaded", function () {
    let skillsContent = document.querySelector(".skills-content");
    if (skillsContent) {
      new Waypoint({
        element: skillsContent,
        offset: "80%",
        handler: function (direction) {
          let progressBars = document.querySelectorAll(".progress-bar");
          progressBars.forEach((bar) => {
            let valuenow = bar.getAttribute("aria-valuenow");
            bar.style.width = valuenow + "%";
          });
        },
      });
    }
  });
  new PureCounter();
})();

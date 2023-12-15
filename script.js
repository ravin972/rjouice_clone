var tl = gsap.timeline();

function locoScroll() {
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true,
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector("#main").style.transform
      ? "transform"
      : "fixed",
  });

  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();
}

function cursorEffect() {
  var page1Content = document.querySelector("#page1-content");
  var cursor = document.querySelector(".cursor");

  page1Content.addEventListener("mousemove", (e) => {
    gsap.to(cursor, {
      x: e.x,
      y: e.y,
    });
  });

  page1Content.addEventListener("mouseenter", (e) => {
    gsap.to(cursor, {
      scale: 1,
      opacity: 1,
    });
  });

  page1Content.addEventListener("mouseleave", (e) => {
    gsap.to(cursor, {
      scale: 0,
      opacity: 0,
    });
  });
}

function page2Animation() {
  gsap.from("#page2 h1", {
    y: 120,
    opacity: 0,
    stagger: 0.25,
    duration: 1,
    scrollTrigger: {
      trigger: "#page2",
      scroller: "#main",
      start: "top 40%",
      end: "top 37%",
      // markers: true,
      scrub: 2,
    },
  });
}

function swiperAnimation() {
  var swiper = new Swiper(".mySwiper", {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: true,
    },
  });
}

tl.from("#loader h3", {
  x: 70,
  opacity: 0,
  duration: 1,
  stagger: 0.02,
});

tl.to("#loader h3", {
  opacity: 0,
});

tl.to("#loader", {
  opacity: 0,
});

tl.from("#page1-content h1 span", {
  y: 100,
  opacity: 0,
  stagger: 0.1,
  delay: -0.5,
});

tl.to("#loader", {
  display: "none",
});

swiperAnimation();
locoScroll();
cursorEffect();
page2Animation();

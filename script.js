const nav = document.querySelector(".nav");
const toggle = document.querySelector(".nav__toggle");
const links = document.querySelectorAll(".nav__links a[href^='#']");
const sections = [...document.querySelectorAll("section[id]")];

const closeNav = () => {
  nav.classList.remove("is-open");
  toggle.setAttribute("aria-expanded", "false");
  toggle.setAttribute("aria-label", "Open menu");
};

toggle.addEventListener("click", () => {
  const open = nav.classList.toggle("is-open");
  toggle.setAttribute("aria-expanded", String(open));
  toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
});

links.forEach((link) => {
  link.addEventListener("click", closeNav);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeNav();
  }
});

const setActive = (id) => {
  links.forEach((link) => {
    const match = link.getAttribute("href") === `#${id}`;
    link.classList.toggle("is-active", match);
  });
};

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) {
        setActive(visible.target.id);
      }
    },
    { rootMargin: "-20% 0px -60% 0px", threshold: [0.15, 0.4, 0.7] },
  );

  sections.forEach((section) => observer.observe(section));
}

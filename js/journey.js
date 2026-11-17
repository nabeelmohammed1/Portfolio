/* About page: the journey walk. Built by the About page generator. */
/* The walk: while the tall section passes, the scene is pinned and scrolling down
   moves the billboards and road left (the character walks), with the scenery
   behind moving slower for depth. Reduced motion gets a simple grid instead. */
(() => {
  const walk = document.querySelector("[data-walk]");
  if (!walk || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  walk.classList.add("is-on");
  const frameEl = walk.querySelector(".walk-frame");
  const track = walk.querySelector(".walk-track");
  const hudLevel = walk.querySelector(".walk-hud__level");
  const boards = [...walk.querySelectorAll(".bb")];
  let distance = 0;
  let lastTravel = 0;
  let stopTimer = 0;

  const layout = () => {
    const w = frameEl.clientWidth;
    const h = frameEl.clientHeight;
    const small = w < 768;
    // Sand starts about 68% down the drawing, and the palms are about 75% of its height.
    walk.style.setProperty("--road-h", `${Math.round(h * 0.32)}px`);
    // Palms about 3x the character's height; the banner (60% of the pair's width) must fit the screen.
    const groupFromWidth = (w - 32) / 0.6029 / (2878 / 1763);
    const groupH = Math.round(Math.min(h * 0.62 / 0.9302, groupFromWidth));
    const palmH = groupH * 0.9302;
    walk.style.setProperty("--grp-h", `${groupH}px`);
    walk.style.setProperty("--walker-h", `${Math.round(Math.max(64, palmH / 3.1))}px`);
    // Figma leaves 490 between pairs, relative to a 1640-tall palm.
    walk.style.setProperty("--gap", `${Math.round(palmH * 490 / 1640)}px`);
    walk.style.setProperty("--board-w", `${small ? Math.min(300, w - 90) : 440}px`);
    walk.style.setProperty("--post-h", `${small ? 30 : Math.max(36, h * 0.08)}px`);
    walk.style.setProperty("--b-scale", `${Math.min(1, h / 900)}`);
    // The first billboard starts just off the right of the screen.
    walk.style.setProperty("--start", `${Math.round(w * (small ? 0.9 : 0.6))}px`);
    distance = Math.max(0, track.scrollWidth - w * 0.55);
    walk.style.setProperty("--length", `${distance}px`);
  };

  let frame = 0;
  const update = () => {
    frame = 0;
    const box = walk.getBoundingClientRect();
    const progress = Math.min(1, Math.max(0, -box.top / Math.max(1, walk.offsetHeight - frameEl.offsetHeight)));
    const travel = progress * distance;
    track.style.transform = `translate3d(${-travel}px, 0, 0)`;
    walk.style.setProperty("--road-x", `${-travel}px`);
    walk.style.setProperty("--mid-x", `${-travel * 0.5}px`);
    walk.style.setProperty("--far-x", `${-travel * 0.2}px`);
    walk.style.setProperty("--progress", `${progress * 100}%`);
    // The character walks while you scroll, faces the way you're going, then stops.
    if (travel !== lastTravel && progress > 0 && progress < 1) {
      walk.classList.add("is-walking");
      walk.classList.toggle("is-backwards", travel < lastTravel);
      clearTimeout(stopTimer);
      stopTimer = setTimeout(() => walk.classList.remove("is-walking"), 160);
    }
    lastTravel = travel;
    // HUD shows the last Level sign you've passed.
    const walkerX = frameEl.getBoundingClientRect().left + frameEl.clientWidth * 0.2;
    let level = boards[0].dataset.level || "Level 01";
    boards.forEach((b) => { if (b.dataset.level && b.getBoundingClientRect().left < walkerX + 200) level = b.dataset.level; });
    hudLevel.textContent = level;
    // Fade from the beach to the city as the Level 3 sign approaches the character.
    const cityBoard = boards.find((b) => b.dataset.level === "Level 03");
    if (cityBoard) {
      const gap = cityBoard.getBoundingClientRect().left - walkerX;
      // The switch happens over a longer stretch, with smooth easing so nothing pops.
      const ease = (t) => t * t * (3 - 2 * t);
      const city = ease(Math.min(1, Math.max(0, (1100 - gap) / 1000)));
      walk.style.setProperty("--city", `${city.toFixed(3)}`);
      // Fog builds gently, peaks halfway, then clears; beach billboards fade out before
      // the peak and the city's fade in after it.
      const peak = Math.max(0, 1 - Math.abs(city - 0.5) * 2);
      walk.style.setProperty("--fog", `${(ease(peak) * 0.9).toFixed(3)}`);
      walk.style.setProperty("--beach-vis", `${ease(Math.max(0, 1 - city * 2.4)).toFixed(3)}`);
      walk.style.setProperty("--city-vis", `${ease(Math.max(0, city * 2.4 - 1.4)).toFixed(3)}`);
      walk.classList.toggle("in-city", city > 0.5);
    }
  };
  const queue = () => { if (!frame) frame = requestAnimationFrame(update); };

  /* Fast scroll to a page position (the walk plays at speed on the way). Any wheel,
     touch or key from the visitor stops it so they're never fighting the page. */
  let glide = 0;
  const stopGlide = () => { cancelAnimationFrame(glide); glide = 0; };
  const glideTo = (target, duration) => {
    stopGlide();
    const start = scrollY;
    const began = performance.now();
    const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
    const step = (now) => {
      const t = Math.min(1, (now - began) / duration);
      scrollTo({ top: start + (target - start) * ease(t), behavior: "instant" });
      glide = t < 1 ? requestAnimationFrame(step) : 0;
    };
    glide = requestAnimationFrame(step);
  };
  ["wheel", "touchstart", "keydown"].forEach((type) => addEventListener(type, () => { if (glide) stopGlide(); }, { passive: true }));
  const walkTop = () => walk.getBoundingClientRect().top + scrollY;
  const scrollRange = () => walk.offsetHeight - frameEl.offsetHeight;

  // Skip: fast-forward through the rest of the walk and land on the experience section.
  walk.querySelector("[data-skip]").addEventListener("click", () => {
    const after = document.getElementById("experience");
    const nav = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--nav-height")) || 72;
    const target = after.getBoundingClientRect().top + scrollY - nav - 24;
    const distanceLeft = Math.abs(target - scrollY);
    glideTo(target, Math.min(2600, Math.max(900, distanceLeft * 0.18)));
  });


  layout();
  update();
  addEventListener("scroll", queue, { passive: true });
  addEventListener("resize", () => { layout(); queue(); });
  walk.querySelectorAll("img").forEach((img) => img.addEventListener("load", () => { layout(); queue(); }, { once: true }));
})();

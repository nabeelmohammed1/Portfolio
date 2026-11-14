/* ---------------------------------------------------------------
   Paste your links here. They apply to the nav and footer on every page.
   email can be a plain address; it is turned into a mailto link.
   --------------------------------------------------------------- */
const LINKS = {
  email: "nabeelbashir18@gmail.com",
  github: "https://github.com/nabeelmohammed1",
  linkedin: "https://www.linkedin.com/in/nabeel-mohammed868",
  resume: "assets/docs/NabeelMohammed_Resume.pdf",
  // Project Rod3nt page, "View Here" button. Leave empty until the link is ready.
  rod3ntView: "https://drive.google.com/file/d/1ytS9kJsa942v3FgO07Hnv9ee_MxwSLKs/view",
  // Night of the Living Bubble page, "View Here" button. Leave empty until the link is ready.
  notlbView: "https://linktr.ee/notlb",
  // Buttons on the other project pages. Leave empty until each link is ready.
  ebtView: "https://github.com/nabeelmohammed1/Everything-But-Titans",
  dogView: "https://dogwaterstud.io/",
  cosmicPlay: "https://868nabeel.itch.io/cosmic-assault",
  caveView: "https://youtu.be/R08_zOxtygw",
  triniView: "https://www.youtube.com/watch?v=2DiwEeNf8xA",
  serveView: "https://drive.google.com/file/d/1kaJtqsgdpCy9rXMD3PU3_Mipxup9OeOl/view",
};

/* ---------------------------------------------------------------
   About page: where each role title links, and what its hover preview shows.
   url:   "work.html#card-id" for a project on the Work page, or a full https:// address.
   title: the name shown in the preview window.
   image: the picture shown in the preview window.
   Entries set to null stay as plain text until a link is added.
   --------------------------------------------------------------- */
const STEAM_ART = "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps";
const GAME_JAM_ART = "https://storage-v4.globalgamejam.org/files/styles/flexslider_full/s3/games";
const ABOUT_LINKS = {
  "dogwater-studios": {
    url: "dog.html",
    title: "DogWater Studios",
    image: "assets/images/dogwater-studios.webp",
  },
  "studio-nailgun": {
    url: "notlb.html",
    title: "Night of the Living Bubble",
    image: "assets/images/living-bubble.webp",
  },
  "scadserve-x-ronald-mcdonald-house": {
    url: "serve.html",
    title: "SCADServe X Ronald McDonald House",
    image: "assets/images/scadserve-rmh.webp",
  },
  "under-the-lens-global-game-jam-2026": {
    url: "https://globalgamejam.org/games/2026/under-lensmasks-9",
    title: "Under the Lens",
    image: `${GAME_JAM_ART}/2026/823885/screenshot/Blindness2.png?VersionId=sIjm6aaCE4eYlEnIMFi8ucCKBtV_h6K0&itok=QvyLkR7X`,
  },
  "project-rod3nt": {
    url: "rod3nt.html",
    title: "Project Rod3nt",
    image: "assets/images/project-rodent.webp",
  },
  "scadpro-x-provost": {
    url: "provost.html",
    title: "SCADPRO X Provost",
    image: "assets/images/scadpro-provost.webp",
  },
  "xolo-and-the-forgotten-gods": {
    url: "https://store.steampowered.com/app/3691380/Xolo_the_Forgotten_Gods/",
    title: "Xolo & the Forgotten Gods",
    image: `${STEAM_ART}/3691380/1ad24609f640eeb68db2626b4e87aabc750eb80b/capsule_616x353.jpg?t=1750350434`,
  },
  "scour": {
    url: "https://store.steampowered.com/app/3667000/Scour/",
    title: "Scour",
    image: `${STEAM_ART}/3667000/9d8dff426ed53330c85709a63191e17eaa522a31/capsule_616x353.jpg?t=1747085440`,
  },
  "scadpro-rapid-fire-x-deloitte": null,
  "luck-of-the-maze-unity-game-jam-2026": {
    url: "https://868nabeel.itch.io/luck-of-the-maze",
    title: "Luck of the Maze",
    image: "https://img.itch.zone/aW1nLzMyMTY5Mjg5LmpwZw==/original/yekmOs.jpg",
  },
  "night-of-the-living-bubble-global-game-jam-2025": {
    url: "https://globalgamejam.org/games/2025/night-living-bubble-2",
    title: "Night of the Living Bubble",
    image: "assets/images/living-bubble.webp",
  },
  "eye-love-you-global-game-jam-2024": {
    url: "https://globalgamejam.org/games/2024/eye-love-you-0",
    title: "Eye Love You",
    image: `${GAME_JAM_ART}/2024/791946/screenshot/ELY%20screenshot.png?VersionId=gHfnHe8779yqU68m1YH..xUBD6LkVDkD&itok=WeDH9jkw`,
  },
  "savannah-college-of-art-and-design":null
};

/* ---------------------------------------------------------------
   Home page "More of what I've been up to": the text shown over each photo
   on hover (tap on phones). Leave text empty to show only the title.
   --------------------------------------------------------------- */
const PHOTO_INFO = {
  "scad-group": { title: "GDC Booth", text: "Showcased Project Rod3nt at GDC under the SCAD Booth" },
  "graduation": { title: "Graduation", text: "Graduated SCAD Atlanta with a BFA in Game Development" },
  "team-photo": { title: "Scad Out to Launch", text: "Represented the Game Department at our Out to Laucnh event which highlights top performing seniors from each major" },
  "ai-summit": { title: "AI Summit", text: "Part of the student panel during SCAD AI Summit 2026, this panel was attended by numerous leaders and executives from major companies" },
};

/* Pictures shown by the cursor trail on the home page */
const TRAIL_IMAGES = [
  "project-rodent", "living-bubble", "scad-group", "cosmic-assault",
  "beach-scene", "graduation", "papa-bois", "team-photo",
  "scadpro-provost", "ai-summit", "dogwater-studios", "scadserve-rmh", "everything-but-titans",
].map((name) => `assets/images/${name}.webp`);

const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
/* The trail and link previews only run on desktop browsers with a real mouse */
const mouseDevice = matchMedia("(hover: hover) and (pointer: fine) and (min-width: 768px)");

function setUpLinks() {
  document.querySelectorAll("[data-link]").forEach((link) => {
    const key = link.dataset.link;
    const value = LINKS[key];
    if (!value) {
      // Not filled in yet: stay on the page rather than jumping to the top.
      link.setAttribute("aria-disabled", "true");
      link.addEventListener("click", (event) => event.preventDefault());
      return;
    }
    if (key === "email") {
      link.href = `mailto:${value}`;
    } else {
      link.href = value;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
    }
  });
}

function setUpAboutLinks() {
  const links = [];
  document.querySelectorAll("[data-link-key]").forEach((title) => {
    const entry = ABOUT_LINKS[title.dataset.linkKey];
    if (!entry) return;
    const link = document.createElement("a");
    link.className = "resume-item__link";
    link.href = entry.url;
    if (/^https?:/.test(entry.url)) {
      link.target = "_blank";
      link.rel = "noopener noreferrer";
    }
    link.textContent = title.textContent;
    title.replaceChildren(link);
    links.push({ link, entry });
  });
  if (links.length) setUpLinkPreview(links);
}

/* Small window that follows the cursor over an About page link. Sites such as
   Steam refuse to load inside another page, so it shows artwork and the address. */
function setUpLinkPreview(links) {
  if (!mouseDevice.matches) return;

  const box = document.createElement("div");
  box.className = "link-preview";
  box.setAttribute("aria-hidden", "true");
  box.innerHTML = `
    <div class="link-preview__media"><img class="link-preview__img" alt=""></div>
    <div class="link-preview__text">
      <p class="link-preview__title"></p>
      <p class="link-preview__where"></p>
    </div>`;
  document.body.append(box);
  const img = box.querySelector("img");
  const media = box.querySelector(".link-preview__media");
  img.addEventListener("error", () => { media.hidden = true; });

  const OFFSET = 24;
  const EDGE = 16;
  const place = (x, y) => {
    const width = box.offsetWidth;
    const height = box.offsetHeight;
    const fitsRight = x + OFFSET + width <= innerWidth - EDGE;
    box.style.left = `${fitsRight ? x + OFFSET : Math.max(EDGE, x - OFFSET - width)}px`;
    box.style.top = `${Math.min(Math.max(EDGE, y - height / 2), innerHeight - height - EDGE)}px`;
  };
  const show = (entry) => {
    media.hidden = false;
    img.src = entry.image;
    box.querySelector(".link-preview__title").textContent = entry.title;
    box.querySelector(".link-preview__where").textContent = /^https?:/.test(entry.url)
      ? new URL(entry.url).hostname.replace(/^www\./, "")
      : entry.url.startsWith("work.html") ? "On the Work page" : "Project page";
    box.classList.add("is-visible");
  };
  const hide = () => box.classList.remove("is-visible");

  links.forEach(({ link, entry }) => {
    new Image().src = entry.image; // ready before the first hover
    // Sits past the end of the title, so the title and its arrow stay readable.
    const placeBeside = (event) => place(Math.max(event.clientX, link.getBoundingClientRect().right), event.clientY);
    link.addEventListener("mouseenter", (event) => { show(entry); placeBeside(event); });
    link.addEventListener("mousemove", placeBeside);
    link.addEventListener("mouseleave", hide);
    link.addEventListener("click", hide);
    link.addEventListener("focus", () => {
      if (!link.matches(":focus-visible")) return;
      const rect = link.getBoundingClientRect();
      show(entry);
      place(rect.right, rect.top + rect.height / 2);
    });
    link.addEventListener("blur", hide);
  });
  addEventListener("scroll", hide, { passive: true });
}

function setUpMobileNav() {
  const nav = document.querySelector(".nav");
  const toggle = nav.querySelector(".nav__toggle");
  const setOpen = (open) => {
    nav.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  };
  toggle.addEventListener("click", () => setOpen(!nav.classList.contains("is-open")));
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") setOpen(false);
  });
  document.addEventListener("click", (event) => {
    if (!nav.contains(event.target)) setOpen(false);
  });
}

function setUpFilters() {
  const buttons = document.querySelectorAll(".filter");
  const cards = document.querySelectorAll(".card[data-tags]");
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter;
      buttons.forEach((b) => b.setAttribute("aria-pressed", String(b === button)));
      cards.forEach((card) => {
        card.hidden = filter !== "all" && !card.dataset.tags.split(" ").includes(filter);
      });
    });
  });
}

function shuffled(count) {
  const order = Array.from({ length: count }, (_, i) => i);
  for (let i = count - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [order[i], order[j]] = [order[j], order[i]];
  }
  return order;
}

function setUpImageTrail() {
  const hero = document.querySelector("[data-trail]");
  if (!hero || reducedMotion) return;

  const layer = hero.querySelector(".trail");
  const IMAGE_WIDTH = 150; // keep in step with .trail__img in styles.css
  const IMAGE_HEIGHT = 113;
  const GAP = 24; // empty space between one image and the next
  const APPEAR_MS = 130; // purple blocks resolving into the picture
  const SHARP_MS = 380; // the picture fully sharp
  const DISAPPEAR_MS = 190; // the picture breaking up into blocks
  const TOTAL_MS = APPEAR_MS + SHARP_MS + DISAPPEAR_MS;
  const COLUMNS = 10;
  const ROWS = 8;
  const IDLE_IMAGES = true; // images appear by themselves while the mouse is still
  const IDLE_AFTER_MS = 2500;
  const IDLE_EVERY_MS = 1500;
  const PURPLE = "#6f51e4";
  const scale = Math.min(devicePixelRatio || 1, 2);
  const width = Math.round(IMAGE_WIDTH * scale);
  const height = Math.round(IMAGE_HEIGHT * scale);
  const pictures = TRAIL_IMAGES.map((src) => {
    const picture = new Image();
    picture.src = src;
    return picture;
  });
  const lowRes = document.createElement("canvas");
  const lowResContext = lowRes.getContext("2d");
  const tiles = [];
  for (let row = 0; row < ROWS; row += 1) {
    for (let column = 0; column < COLUMNS; column += 1) {
      const x = Math.round((column * width) / COLUMNS);
      const y = Math.round((row * height) / ROWS);
      tiles.push({
        x,
        y,
        w: Math.round(((column + 1) * width) / COLUMNS) - x,
        h: Math.round(((row + 1) * height) / ROWS) - y,
      });
    }
  }
  let index = 0;
  let last = null;
  let lastMove = 0;

  /* Draws the picture cropped to fill the canvas, in blocks of `block` CSS pixels */
  const paint = (context, picture, block) => {
    const crop = Math.min(picture.naturalWidth / width, picture.naturalHeight / height);
    const sw = width * crop;
    const sh = height * crop;
    const sx = (picture.naturalWidth - sw) / 2;
    const sy = (picture.naturalHeight - sh) / 2;
    if (block <= 1) {
      context.imageSmoothingEnabled = true;
      context.drawImage(picture, sx, sy, sw, sh, 0, 0, width, height);
      return;
    }
    const lowWidth = Math.ceil(IMAGE_WIDTH / block);
    const lowHeight = Math.ceil(IMAGE_HEIGHT / block);
    lowRes.width = lowWidth;
    lowRes.height = lowHeight;
    lowResContext.drawImage(picture, sx, sy, sw, sh, 0, 0, lowWidth, lowHeight);
    context.imageSmoothingEnabled = false;
    context.drawImage(lowRes, 0, 0, lowWidth, lowHeight, 0, 0, width, height);
  };

  /* Each tile is empty, a purple block, or the picture. `reveal` (0-1) sets how
     far through the shuffled order the tiles have changed. */
  const paintTiles = (context, order, reveal) => {
    order.forEach((tileIndex, position) => {
      const tile = tiles[tileIndex];
      const age = reveal - (position / order.length) * 0.75;
      if (age < 0) {
        context.clearRect(tile.x, tile.y, tile.w, tile.h);
      } else if (age < 0.25) {
        context.fillStyle = PURPLE;
        context.fillRect(tile.x, tile.y, tile.w, tile.h);
      }
    });
  };

  const spawn = (x, y) => {
    const picture = pictures[index];
    index = (index + 1) % pictures.length;
    if (!picture.naturalWidth) return;

    const canvas = document.createElement("canvas");
    canvas.className = "trail__img";
    canvas.width = width;
    canvas.height = height;
    canvas.style.left = `${x - IMAGE_WIDTH / 2}px`;
    canvas.style.top = `${y - IMAGE_HEIGHT / 2}px`;
    layer.append(canvas);

    const context = canvas.getContext("2d");
    const order = shuffled(tiles.length);
    const blocks = [15, 10, 6, 3];
    const started = performance.now();
    let sharpDrawn = false;

    const frame = (now) => {
      if (!canvas.isConnected) return;
      const elapsed = now - started;
      if (elapsed < APPEAR_MS) {
        const progress = Math.max(elapsed, 0) / APPEAR_MS;
        paint(context, picture, blocks[Math.floor(progress * blocks.length)]);
        paintTiles(context, order, progress);
      } else if (elapsed < APPEAR_MS + SHARP_MS) {
        if (!sharpDrawn) paint(context, picture, 1);
        sharpDrawn = true;
      } else {
        const progress = Math.min((elapsed - APPEAR_MS - SHARP_MS) / DISAPPEAR_MS, 1);
        paint(context, picture, blocks[blocks.length - 1 - Math.floor(progress * (blocks.length - 0.01))]);
        paintTiles(context, order, 1 - progress);
      }
      requestAnimationFrame(frame);
    };
    requestAnimationFrame(frame);
    setTimeout(() => canvas.remove(), TOTAL_MS);
  };

  hero.addEventListener("mousemove", (event) => {
    if (!mouseDevice.matches) return;
    lastMove = performance.now();
    const box = hero.getBoundingClientRect();
    const x = event.clientX - box.left;
    const y = event.clientY - box.top;
    // Wait until the next image would clear the previous one on an axis.
    const clear = !last
      || Math.abs(x - last.x) >= IMAGE_WIDTH + GAP
      || Math.abs(y - last.y) >= IMAGE_HEIGHT + GAP;
    if (!clear) return;
    last = { x, y };
    spawn(x, y);
  });
  hero.addEventListener("mouseleave", () => { last = null; });

  if (!IDLE_IMAGES) return;
  setInterval(() => {
    const box = hero.getBoundingClientRect();
    if (!mouseDevice.matches || document.hidden || box.bottom < box.height / 2) return;
    if (performance.now() - lastMove < IDLE_AFTER_MS) return;
    // Left or right of the name, so it stays clear.
    const side = Math.random() < 0.5 ? 0 : 0.76;
    spawn(
      box.width * (side + 0.12 * Math.random()) + IMAGE_WIDTH / 2,
      IMAGE_HEIGHT + Math.random() * Math.max(0, box.height - IMAGE_HEIGHT * 2)
    );
  }, IDLE_EVERY_MS);
}

/* Drifting pixels behind the whole home page. They scatter from the cursor and
   run at a low frame rate on purpose, for a retro feel. */
function setUpPixelField(hero, density = 1) {
  let canvas = document.querySelector(".page-pixels");
  if (!canvas) {
    canvas = document.createElement("canvas");
    canvas.className = "page-pixels";
    canvas.setAttribute("aria-hidden", "true");
    document.body.prepend(canvas);
  }
  const context = canvas.getContext("2d");
  const FRAME_MS = 1000 / 18;
  const CURSOR_RADIUS = 170;
  const PARALLAX = 0.05; // how much scrolling moves a pixel, per pixel of its size
  const COLOURS = ["#6f51e4", "#8872dd", "#d9d9d9"];
  const scale = Math.min(devicePixelRatio || 1, 2);
  let width = 0;
  let height = 0;
  let pixels = [];
  let cursor = null;
  let previous = 0;

  const resize = () => {
    const newWidth = canvas.clientWidth;
    const newHeight = canvas.clientHeight;
    if (newWidth === width && newHeight === height) return;
    width = newWidth;
    height = newHeight;
    canvas.width = width * scale;
    canvas.height = height * scale;
    const count = Math.min(110, Math.round(((width * height) / 11000) * density));
    pixels = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: [3, 3, 4, 4, 6, 8][Math.floor(Math.random() * 6)],
      speed: 3 + Math.random() * 11,
      phase: Math.random() * Math.PI * 2,
      colour: COLOURS[Math.random() < 0.82 ? Math.floor(Math.random() * 2) : 2],
      pushX: 0,
      pushY: 0,
    }));
  };

  const draw = (now) => {
    requestAnimationFrame(draw);
    if (now - previous < FRAME_MS) return;
    const seconds = Math.min((now - previous) / 1000, 0.2);
    previous = now;
    const wrapHeight = height + 20;
    // Fainter behind the home page name; other pages have no hero, so no faint zone.
    const heroBox = hero ? hero.getBoundingClientRect() : null;
    const heroMiddle = heroBox ? heroBox.top + heroBox.height / 2 : 0;
    context.setTransform(scale, 0, 0, scale, 0, 0);
    context.clearRect(0, 0, width, height);
    pixels.forEach((pixel) => {
      pixel.y -= pixel.speed * seconds;
      // Bigger pixels look closer, so they move further when the page scrolls.
      const shifted = pixel.y - scrollY * pixel.size * PARALLAX;
      const y = ((shifted % wrapHeight) + wrapHeight) % wrapHeight - 10;
      let glow = 0;
      if (cursor) {
        const dx = pixel.x + pixel.pushX - cursor.x;
        const dy = y + pixel.pushY - cursor.y;
        const distance = Math.hypot(dx, dy) || 1;
        if (distance < CURSOR_RADIUS) {
          const strength = 1 - distance / CURSOR_RADIUS;
          pixel.pushX += (dx / distance) * strength * 7;
          pixel.pushY += (dy / distance) * strength * 7;
          glow = strength * 0.7;
        }
      }
      pixel.pushX *= 0.93;
      pixel.pushY *= 0.93;
      // Stepped twinkle, and fainter behind the name so it stays easy to read.
      const twinkle = Math.round((Math.sin(now / 900 + pixel.phase) * 0.5 + 0.5) * 3) / 3;
      const fromName = heroBox ? Math.hypot((pixel.x - width / 2) / (width / 2), (y - heroMiddle) / (heroBox.height / 2)) : 1;
      context.globalAlpha = Math.min(1, (0.12 + twinkle * 0.5) * Math.min(1, 0.35 + fromName) + glow);
      context.fillStyle = pixel.colour;
      // Whole-number positions keep every square crisp.
      context.fillRect(Math.round(pixel.x + pixel.pushX), Math.round(y + pixel.pushY), pixel.size, pixel.size);
    });
  };

  resize();
  addEventListener("resize", resize);
  addEventListener("mousemove", (event) => { cursor = { x: event.clientX, y: event.clientY }; });
  document.documentElement.addEventListener("mouseleave", () => { cursor = null; });
  requestAnimationFrame(draw);
}

/* Splits the name into letters, plays them in once, then sends a wave through
   every few seconds. Returns the function that starts the intro. */
function setUpHero() {
  const hero = document.querySelector("[data-trail]");
  if (!hero || reducedMotion) return () => {};

  setUpPixelField(hero);

  const name = hero.querySelector(".hero__name");
  name.setAttribute("aria-label", name.textContent);
  const letters = [];
  name.replaceChildren(...name.textContent.split(" ").flatMap((word, wordIndex) => {
    const wordBox = document.createElement("span");
    wordBox.className = "hero__word";
    wordBox.setAttribute("aria-hidden", "true");
    [...word].forEach((character) => {
      const letter = document.createElement("span");
      letter.className = "hero__letter";
      letter.textContent = character;
      wordBox.append(letter);
      letters.push(letter);
    });
    return wordIndex ? [" ", wordBox] : [wordBox];
  }));

  const WAVE_EVERY_MS = 5000;
  const LETTER_DELAY_MS = 32;
  const wave = () => {
    if (document.hidden) return;
    letters.forEach((letter, i) => {
      letter.animate(
        [{ offset: 0.5, transform: "translateY(-.12em)", color: "#8872dd" }],
        { duration: 520, delay: i * LETTER_DELAY_MS, easing: "steps(6)" }
      );
    });
  };

  return (delay = 0) => {
    letters.forEach((letter, i) => {
      letter.animate(
        [
          { opacity: 0, transform: "translateY(.3em)", color: "#6f51e4" },
          { opacity: 1, transform: "none" },
        ],
        { duration: 400, delay: delay + i * LETTER_DELAY_MS, easing: "steps(5)", fill: "backwards" }
      );
    });
    const after = delay + letters.length * LETTER_DELAY_MS;
    [hero.querySelector(".hero__role"), hero.querySelector(".hero__scroll")].forEach((part, i) => {
      part.animate(
        [{ opacity: 0 }, { opacity: 1 }],
        { duration: 360, delay: after + 150 + i * 250, easing: "steps(4)", fill: "backwards" }
      );
    });
    setInterval(wave, WAVE_EVERY_MS);
  };
}

function preload(src) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = img.onerror = resolve;
    img.src = src;
  });
}

/* ---------------------------------------------------------------
   Project pages (rod3nt.html and future ones)
   [data-autoplay-video]  plays once the loading screen clears, pauses off screen
   [data-hover-video]     plays while hovered (tap to play/pause on touch screens)
   [data-embed]           an iframe that only takes the mouse after a click, so
                          scrolling the page never gets caught inside it
   --------------------------------------------------------------- */
function setUpProjectMedia() {
  const canHover = matchMedia("(hover: hover)");

  document.querySelectorAll("[data-hover-video]").forEach((video) => {
    const box = video.closest(".challenge__media") || video;
    const play = () => video.play().catch(() => {});
    box.addEventListener("mouseenter", () => { if (canHover.matches) play(); });
    box.addEventListener("mouseleave", () => { if (canHover.matches) video.pause(); });
    box.addEventListener("click", () => {
      if (canHover.matches) return;
      if (video.paused) play(); else video.pause();
    });
    video.addEventListener("play", () => box.classList.add("is-playing"));
    video.addEventListener("pause", () => box.classList.remove("is-playing"));
  });

  document.querySelectorAll("[data-embed]").forEach((embed) => {
    // A click anywhere on the locked graph (or its button) unlocks it.
    embed.addEventListener("click", () => embed.classList.add("is-active"));
    // Hand scrolling back to the page once the graph leaves the screen.
    new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) embed.classList.remove("is-active");
    }).observe(embed);
  });

  const autoplay = [...document.querySelectorAll("[data-autoplay-video]")];
  return () => {
    autoplay.forEach((video) => {
      let pausedByPage = false;
      video.play().catch(() => {});
      // Pause while scrolled away so it costs nothing, and resume on return,
      // unless the visitor paused it themselves.
      new IntersectionObserver(([entry]) => {
        if (!entry.isIntersecting && !video.paused) {
          pausedByPage = true;
          video.pause();
        } else if (entry.isIntersecting && pausedByPage) {
          pausedByPage = false;
          video.play().catch(() => {});
        }
      }, { threshold: 0.25 }).observe(video);
    });
  };
}

/* Photos with data-info: a dark overlay builds up out of purple pixels, then the
   text appears. Runs in reverse on the way out. */
function setUpPhotoInfo() {
  const COLUMNS = 16;
  const ROWS = 11;
  const DURATION_MS = 320;
  const PURPLE = "#6f51e4";
  const SHADE = "rgba(16, 16, 16, 0.82)";

  document.querySelectorAll("[data-info]").forEach((box) => {
    const info = PHOTO_INFO[box.dataset.info];
    if (!info) return;
    box.classList.add("photo-info");
    box.tabIndex = 0;
    const canvas = document.createElement("canvas");
    canvas.className = "photo-info__pixels";
    canvas.setAttribute("aria-hidden", "true");
    const copy = document.createElement("div");
    copy.className = "photo-info__copy";
    copy.innerHTML = `<h3>${info.title}</h3>${info.text ? `<p>${info.text}</p>` : ""}`;
    box.append(canvas, copy);
    const context = canvas.getContext("2d");
    const order = shuffled(COLUMNS * ROWS).map((n) => n / (COLUMNS * ROWS));

    let progress = 0;
    let target = 0;
    let previous = 0;
    let running = false;
    const draw = () => {
      const width = canvas.width;
      const height = canvas.height;
      context.clearRect(0, 0, width, height);
      for (let i = 0; i < order.length; i += 1) {
        // Each pixel arrives at its own moment, flashes purple, then settles dark.
        const age = progress * 1.25 - order[i];
        if (age <= 0) continue;
        const column = i % COLUMNS;
        const row = Math.floor(i / COLUMNS);
        const x = Math.round((column * width) / COLUMNS);
        const y = Math.round((row * height) / ROWS);
        context.fillStyle = age < 0.18 ? PURPLE : SHADE;
        context.fillRect(x, y, Math.round(((column + 1) * width) / COLUMNS) - x, Math.round(((row + 1) * height) / ROWS) - y);
      }
    };
    const step = (now) => {
      const delta = (now - previous) / DURATION_MS;
      previous = now;
      progress = target > progress ? Math.min(target, progress + delta) : Math.max(target, progress - delta);
      draw();
      box.classList.toggle("is-open", progress >= 0.85);
      if (progress !== target) requestAnimationFrame(step);
      else running = false;
    };
    const show = (open) => {
      target = open ? 1 : 0;
      if (reducedMotion) {
        progress = target;
        canvas.width = 1; canvas.height = 1;
        box.classList.toggle("is-open", open);
        box.classList.toggle("is-plain", open);
        return;
      }
      if (open && progress === 0) {
        // Match the canvas to the photo's size on screen each time it opens.
        canvas.width = box.clientWidth;
        canvas.height = box.clientHeight;
      }
      if (!running) {
        running = true;
        previous = performance.now();
        requestAnimationFrame(step);
      }
    };

    const canHover = matchMedia("(hover: hover)");
    box.addEventListener("mouseenter", () => { if (canHover.matches) show(true); });
    box.addEventListener("mouseleave", () => { if (canHover.matches) show(false); });
    box.addEventListener("focus", () => show(true));
    box.addEventListener("blur", () => show(false));
    box.addEventListener("click", () => { if (!canHover.matches) show(target === 0); });
  });
}

/* ---------------------------------------------------------------
   Motion for every page except the home hero (which has its own):
   - page titles step in letter by letter; section headings draw a pixel underline
   - a lighter version of the drifting pixels sits behind the page
   Nothing runs for visitors who ask their device for reduced motion.
   --------------------------------------------------------------- */
const HEADINGS = ".section-title, .project-heading";

function splitTitle(title) {
  title.setAttribute("aria-label", title.textContent);
  const letters = [];
  title.replaceChildren(...title.textContent.trim().split(/\s+/).flatMap((word, i) => {
    const box = document.createElement("span");
    box.className = "title-word";
    box.setAttribute("aria-hidden", "true");
    [...word].forEach((character) => {
      const letter = document.createElement("span");
      letter.className = "title-letter";
      letter.textContent = character;
      box.append(letter);
      letters.push(letter);
    });
    return i ? [" ", box] : [box];
  }));
  return letters;
}

function setUpMotion() {
  if (reducedMotion) return () => {};
  const onHome = Boolean(document.querySelector("[data-trail]"));
  if (!onHome) setUpPixelField(null, 0.5);

  const headings = [...document.querySelectorAll(HEADINGS)];
  headings.forEach((el) => el.classList.add("reveal-heading"));
  const titles = onHome ? [] : [...document.querySelectorAll("main .page-title")].map(splitTitle);

  return () => {
    // Page titles step in first.
    titles.forEach((letters) => letters.forEach((letter, i) => {
      letter.animate(
        [{ opacity: 0, transform: "translateY(.35em)", color: "#6f51e4" }, { opacity: 1, transform: "none" }],
        { duration: 380, delay: 150 + i * 28, easing: "steps(5)", fill: "backwards" }
      );
    }));

    // Section headings draw their underline once they scroll into view.
    const observer = new IntersectionObserver((entries) => {
      const arriving = entries.filter((entry) => entry.isIntersecting);
      arriving.forEach((entry, i) => {
        const el = entry.target;
        if (!el.style.getPropertyValue("--reveal-delay")) {
          el.style.setProperty("--reveal-delay", `${Math.min(i, 6) * 80}ms`);
        }
        el.classList.add("is-in");
        observer.unobserve(el);
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.12 });
    headings.forEach((el) => observer.observe(el));
  };
}

/* Resolves once a video or iframe marked with data-wait is ready */
/* Phones and tablets don't download video until it plays, so waiting for it there
   would leave the loading screen stuck. Their posters are still waited for. */
const preloadsVideo = matchMedia("(hover: hover) and (pointer: fine)").matches;
const VIDEO_WAIT_MS = 8000; // never hold the loading screen longer than this for one video

function waitFor(element) {
  return new Promise((resolve) => {
    const event = element.dataset.wait;
    if (element.tagName === "IFRAME") {
      if (element.dataset.loaded) return resolve();
      element.addEventListener("load", resolve, { once: true });
      return;
    }
    if (!preloadsVideo) return resolve();
    setTimeout(resolve, VIDEO_WAIT_MS);
    const needed = { loadedmetadata: 1, loadeddata: 2, canplay: 3, canplaythrough: 4 }[event] || 1;
    if (element.readyState >= needed) return resolve();
    element.addEventListener(event, resolve, { once: true });
    element.addEventListener("error", resolve, { once: true });
  });
}

/* The logo as a grid of pixels, made from assets/images/logo.png.
   Each # is one pixel that flies into place on the loading screen. */
const LOGO_PIXELS = [
  "...............#######........#########....#######..............",
  "...............########.......#########...########..............",
  "..............#########......#########....########..............",
  "..............#########......#########....#########.............",
  "..............##########....##########...##########.............",
  ".............###########....#########....##########.............",
  ".............###########...##########...############............",
  "............#############..##########...############............",
  "............#############..#########....#############...........",
  "............########################...##############...........",
  "...........########################....##############...........",
  "...........########################...################..........",
  "..........#########################...################..........",
  "..........########################....#################.........",
  ".........#########################...##################.........",
  ".........########################....##################.........",
  ".........########################...####################........",
  "........##########.#############....####################........",
  "........##########..############....#########..##########.......",
  ".......##########...############...##########..##########.......",
  ".......##########....##########....#########....#########.......",
  ".......##########....##########...##########....##########......",
  "......##########.....#########....#########.....##########......",
  "......##########......########....#########......##########.....",
  ".....##########.......########...##########......##########.....",
  ".....##########.......#######....#########........#########.....",
  "....###########.................##########........##########....",
  "....##########..................#########.........##########....",
  "....##########..................#########..........##########...",
  "...##########..........##################..........##########...",
  "...##########...........################............#########...",
  "..###########...........################............##########..",
  "..##########.............##############.............##########..",
  "..##########.............##############..............##########.",
  ".##########...............#############..............##########.",
  ".##########...............############................#########.",
  "###########................###########................##########",
  "##########.................##########.................##########",
];

function setUpLoaderArt(loader) {
  const canvas = loader.querySelector(".loader__canvas");
  const context = canvas.getContext("2d");
  const spot = loader.querySelector(".loader__logo");
  const PURPLE = "#6f51e4";
  const PURPLE_LIGHT = "#8872dd";
  const WHITE = "#ffffff";
  const TILE = 40; // size of the purple blocks that break away
  const columns = LOGO_PIXELS[0].length;
  const rows = LOGO_PIXELS.length;
  let width = 0;
  let height = 0;
  let cell = 1;
  let originX = 0;
  let originY = 0;

  /* One particle per logo pixel. Positions come from fractions of the screen, so
     resizing mid-load only moves everything rather than restarting it. */
  const particles = [];
  LOGO_PIXELS.forEach((line, row) => {
    [...line].forEach((mark, column) => {
      if (mark !== "#") return;
      const angle = Math.random() * Math.PI * 2;
      particles.push({
        column,
        row,
        startX: Math.random(),
        startY: Math.random(),
        delay: Math.random() * 0.68, // when in the load it sets off
        phase: Math.random() * Math.PI * 2,
        burstX: Math.cos(angle),
        burstY: Math.sin(angle),
        burstSpeed: 0.25 + Math.random() * 0.75,
        burstDelay: Math.random() * 0.2,
      });
    });
  });

  let tiles = [];
  const layout = () => {
    width = canvas.clientWidth;
    height = canvas.clientHeight;
    canvas.width = width;
    canvas.height = height;
    // Whole-pixel cells keep the logo crisp; 60% of the screen width at most.
    cell = Math.max(2, Math.min(5, Math.floor((width * 0.6) / columns)));
    spot.style.width = `${columns * cell}px`;
    spot.style.height = `${rows * cell}px`;
    const box = spot.getBoundingClientRect();
    originX = Math.round(box.left);
    originY = Math.round(box.top);
    tiles = [];
    const reach = Math.hypot(width, height) / 2;
    for (let y = 0; y < height; y += TILE) {
      for (let x = 0; x < width; x += TILE) {
        const distance = Math.hypot(x + TILE / 2 - width / 2, y + TILE / 2 - height / 2);
        // Breaks open from the logo outward, with a little randomness.
        tiles.push({ x, y, leaveAt: (distance / reach) * 0.62 + Math.random() * 0.26 });
      }
    }
  };
  const snap = (value) => Math.round(value / cell) * cell;

  /* progress 0-1: pixels scatter across the screen, then settle into the logo */
  const drawForming = (progress, now) => {
    context.clearRect(0, 0, width, height);
    context.fillStyle = WHITE;
    particles.forEach((particle) => {
      const local = Math.min(Math.max((progress - particle.delay) / 0.32, 0), 1);
      const eased = 1 - (1 - local) ** 3;
      const targetX = originX + particle.column * cell;
      const targetY = originY + particle.row * cell;
      // Waiting pixels hover in place, so it keeps moving even if the load stalls.
      const hover = (1 - local) * 14;
      const fromX = particle.startX * width + Math.cos(now / 700 + particle.phase) * hover;
      const fromY = particle.startY * height + Math.sin(now / 900 + particle.phase) * hover;
      context.globalAlpha = local === 1 ? 1 : 0.28 + local * 0.5;
      context.fillRect(
        local === 1 ? targetX : snap(fromX + (targetX - fromX) * eased),
        local === 1 ? targetY : snap(fromY + (targetY - fromY) * eased),
        cell,
        cell
      );
    });
    context.globalAlpha = 1;
  };

  /* progress 0-1: the purple screen and the logo break apart, showing the page */
  const drawBreaking = (progress) => {
    context.clearRect(0, 0, width, height);
    tiles.forEach((tile) => {
      if (progress >= tile.leaveAt) return;
      context.fillStyle = tile.leaveAt - progress < 0.07 ? PURPLE_LIGHT : PURPLE;
      context.fillRect(tile.x, tile.y, TILE, TILE);
    });
    // The logo breaks into fine, faint specks rather than full-size blocks.
    const BURST_DISTANCE = 0.45; // how far they travel, as a share of the screen
    const BURST_OPACITY = 0.55; // brightest a speck gets
    const BURST_SIZE = 2; // speck size in px once it has shrunk
    const distance = Math.max(width, height) * BURST_DISTANCE;
    context.fillStyle = WHITE;
    particles.forEach((particle, index) => {
      const local = Math.max((progress - particle.burstDelay) / (1 - particle.burstDelay), 0);
      // Only every other pixel flies; the rest simply blink out, which thins the burst.
      if (index % 2 && local > 0.12) return;
      const eased = 1 - (1 - local) ** 2;
      const travel = eased * distance * particle.burstSpeed;
      // Shrinks from a logo pixel down to a small speck within the first fifth.
      const size = Math.max(BURST_SIZE, Math.round(cell * (1 - Math.min(local / 0.2, 1))));
      context.globalAlpha = (Math.round((1 - local) * 4) / 4) * BURST_OPACITY; // fades in steps
      context.fillRect(
        Math.round(originX + particle.column * cell + particle.burstX * travel),
        Math.round(originY + particle.row * cell + particle.burstY * travel),
        size,
        size
      );
    });
    context.globalAlpha = 1;
  };

  layout();
  addEventListener("resize", layout);
  return { drawForming, drawBreaking };
}

function runLoader(startHero) {
  const root = document.documentElement;
  const hasTrail = Boolean(document.querySelector("[data-trail]")) && mouseDevice.matches;
  const trailReady = hasTrail ? TRAIL_IMAGES.map(preload) : [];
  const loader = document.querySelector(".loader");
  if (!root.classList.contains("is-loading")) {
    startHero();
    return;
  }

  const art = setUpLoaderArt(loader);
  const bar = loader.querySelector(".loader__bar");
  const count = loader.querySelector(".loader__count");
  const started = performance.now();
  const MIN_TIME = reducedMotion ? 0 : 1900; // long enough to watch the logo form
  // Never trap a visitor on a slow connection. Project pages wait longer for their videos.
  const MAX_TIME = document.querySelector("[data-wait]") ? 20000 : 6000;
  const HOLD_MS = 280; // the finished logo, before it breaks apart
  const BREAK_MS = 1000;
  const BAR_STEPS = 20;

  const eager = [...document.images].filter((img) => img.loading !== "lazy");
  const waiting = [...document.querySelectorAll("[data-wait]")];
  const posters = waiting.filter((el) => el.poster).map((el) => preload(el.poster));
  const tasks = [
    ...trailReady,
    ...eager.map((img) => (img.complete ? Promise.resolve() : preload(img.currentSrc || img.src))),
    ...waiting.map(waitFor),
    ...posters,
    document.fonts ? document.fonts.ready : Promise.resolve(),
  ];

  let done = 0;
  tasks.forEach((task) => task.then(() => { done += 1; }));

  const finish = () => {
    root.classList.remove("is-loading");
    loader.remove();
  };

  // Timer rather than requestAnimationFrame, which stops in background tabs.
  let shown = 0;
  let previous = performance.now();
  let fullAt = null;
  let breakAt = null;
  const timer = setInterval(() => {
    const now = performance.now();

    if (breakAt !== null) {
      const progress = (now - breakAt) / BREAK_MS;
      if (progress >= 1) {
        clearInterval(timer);
        finish();
      } else {
        art.drawBreaking(progress);
      }
      return;
    }

    const elapsed = now - started;
    const target = elapsed > MAX_TIME
      ? 1
      : Math.min(done / tasks.length, MIN_TIME ? elapsed / MIN_TIME : 1);
    shown += (target - shown) * (1 - Math.exp(-(now - previous) / 90));
    previous = now;
    if (target === 1 && shown > 0.99) shown = 1;

    bar.style.transform = `scaleX(${Math.floor(shown * BAR_STEPS) / BAR_STEPS})`;
    count.textContent = `${Math.round(shown * 100)}%`;
    art.drawForming(reducedMotion ? 1 : shown, now);
    if (shown < 1) return;

    if (fullAt === null) fullAt = now;
    if (now - fullAt < (reducedMotion ? 0 : HOLD_MS)) return;

    sessionStorage.setItem("loaderSeen", "1");
    if (reducedMotion) {
      clearInterval(timer);
      startHero();
      finish();
      return;
    }
    breakAt = now;
    loader.classList.add("is-done");
    art.drawBreaking(0);
    startHero(350); // while the loading screen breaks apart
  }, 16);
}

setUpLinks();
setUpAboutLinks();
setUpMobileNav();
setUpFilters();
setUpImageTrail();
const startHero = setUpHero();
const startProjectMedia = setUpProjectMedia();
setUpPhotoInfo();
const startMotion = setUpMotion();
runLoader((delay) => {
  startHero(delay);
  startProjectMedia();
  startMotion();
});

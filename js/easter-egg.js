/* ---------------------------------------------------------------
   Easter egg: type  ↑ ↑ ↓ ↓ ← → ← → B A  on any page.
   Eevee and its evolutions pop in, bounce, then break into pixels.

   Sprites load from the PokeAPI sprites repo (github.com/PokeAPI/sprites)
   by Pokédex number. The palette is only used if a sprite can't load,
   in which case a built-in pixel creature in those colours stands in.
   --------------------------------------------------------------- */
const EGG_SPRITE_URL = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon";
const EGG_CREATURES = [
  { name: "Eevee", dex: 133, palette: ["#c9a27a", "#f1e2c6", "#8a6a4a", "#4a3424"] },
  { name: "Vaporeon", dex: 134, palette: ["#4aa3df", "#bfe6ff", "#2b6fb3", "#173a63"] },
  { name: "Jolteon", dex: 135, palette: ["#f2d03b", "#fff3b0", "#d29a12", "#6b4a08"] },
  { name: "Flareon", dex: 136, palette: ["#ef6a3a", "#ffd27a", "#c23b1e", "#5e1a0c"] },
  { name: "Espeon", dex: 196, palette: ["#c58bd9", "#f2dbf7", "#8e4fb0", "#432354"] },
  { name: "Umbreon", dex: 197, palette: ["#3b3b4f", "#6b6b85", "#f2d03b", "#121218"] },
  { name: "Leafeon", dex: 470, palette: ["#7cc46b", "#e3f5c8", "#3f8f3a", "#1f4a1c"] },
  { name: "Glaceon", dex: 471, palette: ["#8fd8e8", "#e8fbff", "#4fa8c4", "#235766"] },
  { name: "Sylveon", dex: 700, palette: ["#f4a7c4", "#fff0f6", "#d9638f", "#6b2a45"] },
].map((creature) => ({ ...creature, image: `${EGG_SPRITE_URL}/${creature.dex}.png` }));

const EGG_CODE = ["arrowup", "arrowup", "arrowdown", "arrowdown", "arrowleft", "arrowright", "arrowleft", "arrowright", "b", "a"];
const EGG_MESSAGE = "Eevee is my favourite Pokémon!";

/* Built-in sprite: b body, l belly, a ears, o outline, e eyes (palette order b, l, a, o) */
const EGG_SPRITE = [
  "..o......o..",
  ".oao....oao.",
  ".oaao..oaao.",
  ".obbboobbbo.",
  "obbbbbbbbbbo",
  "obbebbbbebbo",
  "obbebbbbebbo",
  "obbbllllbbbo",
  "obllllllllbo",
  ".obllllllbo.",
  "..obboobbo..",
  "..oo....oo..",
];

(() => {
  const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const PURPLE = "#6f51e4";
  const EYE = "#16161c";
  let typed = [];
  let playing = false;

  /* Turns each creature into a list of coloured pixels, from its image or the sprite */
  const loadPixels = (creature) => new Promise((resolve) => {
    const fromSprite = () => {
      const [body, belly, ears, outline] = creature.palette || EGG_CREATURES[0].palette;
      const colours = { b: body, l: belly, a: ears, o: outline, e: EYE };
      const pixels = [];
      EGG_SPRITE.forEach((line, y) => [...line].forEach((mark, x) => {
        if (colours[mark]) pixels.push({ x, y, colour: colours[mark] });
      }));
      resolve({ pixels, size: EGG_SPRITE.length });
    };
    if (!creature.image) return fromSprite();
    const img = new Image();
    img.crossOrigin = "anonymous"; // lets the canvas read pixels from GitHub
    img.onload = () => {
      try {
        // Read the sprite at its own size, so every pixel of the art is kept.
        const scratch = document.createElement("canvas");
        scratch.width = img.naturalWidth;
        scratch.height = img.naturalHeight;
        const context = scratch.getContext("2d");
        context.drawImage(img, 0, 0);
        const { data, width } = context.getImageData(0, 0, scratch.width, scratch.height);
        const solid = [];
        for (let i = 0; i < data.length; i += 4) {
          if (data[i + 3] < 128) continue;
          solid.push({ x: (i / 4) % width, y: Math.floor(i / 4 / width), colour: `rgb(${data[i]},${data[i + 1]},${data[i + 2]})` });
        }
        if (!solid.length) return fromSprite();
        // Trim the empty border, then centre each sprite with its feet on the floor.
        const minX = Math.min(...solid.map((p) => p.x));
        const maxX = Math.max(...solid.map((p) => p.x));
        const minY = Math.min(...solid.map((p) => p.y));
        const maxY = Math.max(...solid.map((p) => p.y));
        const size = Math.max(maxX - minX, maxY - minY) + 1;
        const offsetX = Math.floor((size - (maxX - minX + 1)) / 2);
        const offsetY = size - (maxY - minY + 1);
        resolve({
          pixels: solid.map((p) => ({ ...p, x: p.x - minX + offsetX, y: p.y - minY + offsetY })),
          size,
        });
      } catch (error) {
        fromSprite(); // the canvas wasn't allowed to read the image
      }
    };
    img.onerror = fromSprite;
    img.src = creature.image;
  });

  const play = async () => {
    if (playing) return;
    playing = true;
    const sprites = await Promise.all(EGG_CREATURES.map(loadPixels));

    const canvas = document.createElement("canvas");
    canvas.setAttribute("aria-hidden", "true");
    canvas.style.cssText = "position:fixed;inset:0;width:100%;height:100%;z-index:90;pointer-events:none;image-rendering:pixelated";
    document.body.append(canvas);
    const context = canvas.getContext("2d");
    const width = (canvas.width = canvas.clientWidth);
    const height = (canvas.height = canvas.clientHeight);

    // Layout: one row on wide screens, a 3x3 grid on phones.
    const columns = width < 640 ? 3 : EGG_CREATURES.length;
    const gridRows = Math.ceil(EGG_CREATURES.length / columns);
    const slot = Math.min(140, (width - 32) / columns);
    const startX = (width - slot * columns) / 2;
    const startY = height / 2 - (slot * gridRows) / 2 - 20;

    const creatures = sprites.map((sprite, i) => {
      // Whole-number scaling keeps the sprite art crisp.
      const cell = Math.max(1, Math.floor(slot / sprite.size));
      const drawn = sprite.size * cell;
      return {
        ...sprite,
        cell,
        left: Math.round(startX + (i % columns) * slot + (slot - drawn) / 2),
        top: Math.round(startY + Math.floor(i / columns) * slot + (slot - drawn) / 2),
        enterAt: 250 + i * 130,
        leaveAt: 2700 + i * 70,
        order: sprite.pixels.map(() => Math.random()), // when each pixel appears
        burst: sprite.pixels.map(() => ({ x: (Math.random() - 0.5) * 2, y: -0.4 - Math.random() * 1.4, speed: 0.4 + Math.random() * 0.6 })),
      };
    });

    const APPEAR_MS = 320;
    const LEAVE_MS = 650;
    const END_MS = creatures[creatures.length - 1].leaveAt + LEAVE_MS + 250;
    const started = performance.now();

    const frame = (now) => {
      const time = reducedMotion ? 2600 : now - started; // reduced motion: freeze on the full line-up
      context.clearRect(0, 0, width, height);

      // Backdrop dims in and out in steps.
      const fade = Math.min(time / 250, 1, Math.max((END_MS - time) / 300, 0));
      context.fillStyle = `rgba(16, 16, 16, ${Math.round(fade * 4) / 4 * 0.7})`;
      context.fillRect(0, 0, width, height);

      creatures.forEach((creature, index) => {
        const since = time - creature.enterAt;
        if (since < 0) return;
        const { cell } = creature;
        // A two-step hop, offset so they bounce in a wave.
        const hop = Math.floor((time / 160 + index) % 4) === 0 ? -cell * 2 : 0;
        const appear = Math.min(since / APPEAR_MS, 1);
        const leave = Math.min(Math.max((time - creature.leaveAt) / LEAVE_MS, 0), 1);

        creature.pixels.forEach((pixel, p) => {
          const shown = creature.order[p];
          if (appear < shown) return;
          let x = creature.left + pixel.x * cell;
          let y = creature.top + pixel.y * cell + (appear === 1 && !leave ? hop : 0);
          let alpha = 1;
          if (leave > 0) {
            const burst = creature.burst[p];
            const travel = (1 - (1 - leave) ** 2) * 160 * burst.speed;
            x += burst.x * travel;
            y += burst.y * travel + leave * leave * 120; // drifts up then falls
            alpha = Math.round((1 - leave) * 4) / 4;
          }
          // Freshly placed pixels flash purple first, like the image trail.
          context.globalAlpha = alpha;
          context.fillStyle = appear - shown < 0.25 && appear < 1 ? PURPLE : pixel.colour;
          context.fillRect(Math.round(x / cell) * cell, Math.round(y / cell) * cell, cell, cell);
        });
        context.globalAlpha = 1;
      });

      // Message under the creatures, typed out one letter at a time.
      const letters = Math.min(EGG_MESSAGE.length, Math.max(0, Math.floor((time - 1500) / 35)));
      if (letters && time < END_MS - 300) {
        context.fillStyle = "#ffffff";
        context.font = `700 ${width < 640 ? 18 : 24}px Inter, system-ui, sans-serif`;
        context.textAlign = "center";
        context.fillText(EGG_MESSAGE.slice(0, letters).toUpperCase(), width / 2, startY + slot * gridRows + 40);
      }

      if (time < END_MS && !reducedMotion) {
        requestAnimationFrame(frame);
      } else if (reducedMotion && now - started < 2500) {
        requestAnimationFrame(frame); // reduced motion: a still picture, shown briefly
      } else {
        canvas.remove();
        playing = false;
      }
    };
    requestAnimationFrame(frame);
  };

  /* How many keys of the code are entered so far (0 to 10). Pages can listen for "egg:progress";
     a completed code reports 10 once, then resets to 0. */
  let lastProgress = 0;
  const reportProgress = () => {
    let count = 0;
    for (let n = Math.min(typed.length, EGG_CODE.length); n > 0; n -= 1) {
      if (typed.slice(-n).join() === EGG_CODE.slice(0, n).join()) { count = n; break; }
    }
    if (playing && typed.length === 0) count = EGG_CODE.length;
    if (count === lastProgress) return;
    lastProgress = count === EGG_CODE.length ? 0 : count;
    dispatchEvent(new CustomEvent("egg:progress", { detail: { count, total: EGG_CODE.length } }));
  };

  addEventListener("keydown", (event) => {
    // Don't listen while someone is typing in a form field.
    if (event.target.closest && event.target.closest("input, textarea, select, [contenteditable]")) return;
    typed = [...typed, event.key.toLowerCase()].slice(-EGG_CODE.length);
    if (typed.join() === EGG_CODE.join()) {
      typed = [];
      play();
    }
    reportProgress();
  });

  /* Touch screens: swipe up, up, down, down, left, right, left, right, then tap twice.
     Phones make this tricky, so:
     - the finger's path is followed while it moves, so a swipe still counts when the browser
       takes over to scroll and ends the touch with "touchcancel" instead of "touchend"
     - pinches (two fingers) are ignored
     - taps on links and buttons don't count (they do their own thing)
     - once the code is under way, pull-to-refresh and double-tap zoom are paused, so a
       "down" swipe at the top of the page or the two final taps don't get swallowed */
  const SWIPE_MIN = 30; // px a finger must travel to count as a swipe
  const TAP_MAX = 14; // px a finger may move and still count as a tap
  const GIVE_UP = 8000; // ms of no progress before the paused browser gestures come back
  const root = document.documentElement;
  let touch = null;
  let restoreTimer = 0;
  const holdGestures = (on) => {
    clearTimeout(restoreTimer);
    root.style.overscrollBehaviorY = on ? "none" : "";
    root.style.touchAction = on ? "manipulation" : "";
    if (on) restoreTimer = setTimeout(() => holdGestures(false), GIVE_UP);
  };
  const enter = (move) => {
    typed = [...typed, move].slice(-EGG_CODE.length);
    if (typed.join() === EGG_CODE.join()) {
      typed = [];
      play();
    }
    reportProgress();
    // Two correct swipes in: the visitor is probably doing the code, so pause browser gestures.
    holdGestures(lastProgress >= 2);
  };
  const finishTouch = () => {
    if (!touch || touch.multi) { touch = null; return; }
    const dx = touch.x - touch.startX;
    const dy = touch.y - touch.startY;
    const travel = Math.max(Math.abs(dx), Math.abs(dy));
    const { onControl } = touch;
    touch = null;
    if (travel >= SWIPE_MIN) {
      // The finger moving up is "up", like pressing the up arrow.
      enter(Math.abs(dx) > Math.abs(dy) ? (dx > 0 ? "arrowright" : "arrowleft") : (dy > 0 ? "arrowdown" : "arrowup"));
    } else if (travel <= TAP_MAX && !onControl) {
      // Taps stand in for B then A, but only once all eight swipes are in.
      const swipes = EGG_CODE.slice(0, 8).join();
      if (typed.slice(-8).join() === swipes) enter("b");
      else if (typed.slice(-9, -1).join() === swipes && typed[typed.length - 1] === "b") enter("a");
    }
  };
  addEventListener("touchstart", (event) => {
    if (event.touches.length > 1) { if (touch) touch.multi = true; return; }
    const t = event.touches[0];
    touch = {
      startX: t.clientX, startY: t.clientY, x: t.clientX, y: t.clientY, multi: false,
      onControl: !!(event.target.closest && event.target.closest("a, button, input, textarea, select, label, [contenteditable]")),
    };
  }, { passive: true });
  addEventListener("touchmove", (event) => {
    if (!touch) return;
    if (event.touches.length > 1) { touch.multi = true; return; }
    const t = event.touches[0];
    touch.x = t.clientX;
    touch.y = t.clientY;
  }, { passive: true });
  addEventListener("touchend", (event) => {
    if (!touch) return;
    const t = event.changedTouches[0];
    if (t) { touch.x = t.clientX; touch.y = t.clientY; }
    finishTouch();
  }, { passive: true });
  addEventListener("touchcancel", finishTouch, { passive: true });

  window.playEasterEgg = play; // handy for testing from the console
})();

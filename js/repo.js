/* ---------------------------------------------------------------
   Repo page: each entry becomes one Blueprint-style node.
   Add, remove or reorder entries here; the wires redraw themselves.

   kind   sets the node's header colour, like Unreal's node types:
          "event" (red), "function" (blue), "pure" (green), "macro" (grey)
   media  { type: "image" | "video", src: "assets/...", poster: "..." },
          { type: "instagram", user: "name" } for a live Instagram profile card,
          or null to show an empty preview slot
   link   optional { url, label }: a button under the description
   pins   short facts shown as data pins (label + value)
   --------------------------------------------------------------- */
const EXPERIMENTS = [
  {
    title: "Y2K Title Sequence",
    kind: "event",
    category: "Title Sequence",
    media: { type: "video", src: "assets/videos/exp-y2k-title.mp4", poster: "assets/images/exp-y2k-title-poster.webp" },
    pins: [["Engine", "Unreal Engine 5"], ["Type", "Title sequence concept"]],
    text: "A title sequence concept for a Y2K movie, built in Unreal Engine 5.",
  },
  {
    title: "Branch Motion",
    kind: "function",
    category: "Motion Experiment",
    media: { type: "video", src: "assets/videos/exp-branch-motion.mp4", poster: "assets/images/exp-branch-motion-poster.webp" },
    pins: [["Engine", "Unreal Engine 5"], ["Focus", "Motion design"]],
    text: "A motion experiment exploring Unreal Engine 5's motion design tools.",
  },
  {
    title: "Visual Music",
    kind: "pure",
    category: "Abstract Animation",
    media: { type: "video", src: "assets/videos/exp-visual-music.mp4", poster: "assets/images/exp-visual-music-poster.webp" },
    pins: [["Software", "After Effects"], ["Format", "Looping video"]],
    text: "An experiment in abstract visual music: a looping video made in After Effects.",
  },
  {
    title: "Desert Render",
    kind: "function",
    category: "Level Design & Sequencer",
    media: { type: "video", src: "assets/videos/exp-desert-render.mp4", poster: "assets/images/exp-desert-render-poster.webp" },
    pins: [["Engine", "Unreal Engine 5"], ["Tools", "Sequencer"]],
    text: "A UE5 level design and Sequencer experiment: a render of a desert as it moves from sunrise to midday.",
  },
  {
    title: "Nova Bomb Rework",
    kind: "event",
    category: "VFX Rework",
    media: { type: "video", src: "assets/videos/exp-nova-bomb.mp4", poster: "assets/images/exp-nova-bomb-poster.webp" },
    pins: [["Tools", "Maya, Houdini, Unreal"], ["Inspired by", "Destiny 2"]],
    text: "A rework of Destiny 2's Nova Bomb that adds a bubble, pulling people in before it explodes. Built with Maya, Houdini and Unreal Engine.",
  },
  {
    title: "Photography",
    kind: "macro",
    category: "Hobby",
    media: { type: "instagram", user: "_n.m_photography" },
    pins: [["Platform", "Instagram"], ["Handle", "@_n.m_photography"]],
    text: "Outside of games, I take photos as a hobby. See more on my photography account.",
    link: { url: "https://www.instagram.com/_n.m_photography/", label: "View on Instagram" },
  },
];

/* Data pin colours, matching Unreal's pin types */
const PIN_COLOURS = ["#ff4fd8", "#7cf26b", "#54c8ff", "#f5c542", "#ff7b6b"];
const KIND_ICONS = { event: "◆", function: "ƒ", pure: "●", macro: "▣" };

/* ---------------------------------------------------------------
   The graph works like Unreal's editor:
   - drag the background to move around
   - Ctrl + scroll (or pinch) to zoom; a plain scroll still scrolls the page
   - drag any node (or the comment) to move it; the wires follow
   Visitors' node positions are remembered in their own browser; Reset puts them back.
   --------------------------------------------------------------- */
(() => {
  const graph = document.querySelector("[data-blueprint]");
  if (!graph) return;
  const world = graph.querySelector(".bp-world");
  const svg = graph.querySelector(".bp-wires");
  const NODE_W = 460;
  // Nodes are shown smaller by default: the graph opens at 62.5% zoom, and the grid
  // is drawn twice as large so it still looks normal. Zoom in to read up close.
  const NODE_SCALE = 0.625;
  const MIN_ZOOM = 0.15;
  const MAX_ZOOM = 1.6;
  const DRAG_START = 4; // px of movement before a press counts as a drag
  const LAYOUT_KEY = "bp-layout-v3";
  const escape = (value) => String(value).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  /* ---------- build the nodes ---------- */
  const mediaHtml = (media, title) => {
    if (!media) return `<div class="bp-node__media bp-node__media--empty"><span>Image or video</span></div>`;
    if (media.type === "instagram") {
      // Instagram's own profile card: header plus a grid of recent posts, kept up to date by Instagram.
      return `<div class="bp-node__media bp-node__media--instagram"><iframe scrolling="no" src="https://www.instagram.com/${escape(media.user)}/embed/"
        title="${escape(title)} on Instagram" loading="lazy" referrerpolicy="strict-origin-when-cross-origin"></iframe></div>`;
    }
    if (media.type === "video") {
      return `<div class="bp-node__media" data-video-box><video src="${media.src}"${media.poster ? ` poster="${media.poster}"` : ""}
        muted loop playsinline preload="metadata" aria-label="${escape(title)}"></video><span class="video-hint" aria-hidden="true">Hover to play</span></div>`;
    }
    return `<div class="bp-node__media"><img src="${media.src}" alt="${escape(media.alt || title)}" loading="lazy" decoding="async" draggable="false"></div>`;
  };
  world.insertAdjacentHTML("beforeend", EXPERIMENTS.map((item, i) => `
    <article class="bp-node bp-node--${item.kind || "function"}" tabindex="0" data-node="${escape(item.title)}">
      <header class="bp-node__head">
        <span class="bp-pin bp-pin--exec bp-pin--in" aria-hidden="true"></span>
        <span class="bp-node__icon" aria-hidden="true">${KIND_ICONS[item.kind] || "ƒ"}</span>
        <div class="bp-node__titles">
          <h2 class="bp-node__title">${escape(item.title)}</h2>
          ${item.category ? `<p class="bp-node__category">${escape(item.category)}</p>` : ""}
        </div>
        <span class="bp-pin bp-pin--exec bp-pin--out" aria-hidden="true"></span>
      </header>
      <div class="bp-node__body">
        ${mediaHtml(item.media, item.title)}
        <ul class="bp-node__pins">
          ${(item.pins || []).map(([label, value], p) => `
            <li><span class="bp-pin bp-pin--data" style="--pin: ${PIN_COLOURS[(i + p) % PIN_COLOURS.length]}" aria-hidden="true"></span>
              <span class="bp-node__label">${escape(label)}</span><span class="bp-node__value">${escape(value)}</span></li>`).join("")}
        </ul>
        ${item.text ? `<p class="bp-node__text">${escape(item.text)}</p>` : ""}
        ${item.link ? `<a class="bp-node__link" href="${item.link.url}" target="_blank" rel="noopener noreferrer">${escape(item.link.label)} <span aria-hidden="true">&#8599;</span></a>` : ""}
      </div>
    </article>`).join(""));

  const movables = [...world.querySelectorAll(".bp-comment, .bp-start, .bp-node")];
  const nodes = [...world.querySelectorAll(".bp-node:not(.bp-start)")];
  const start = world.querySelector(".bp-start");
  const comment = world.querySelector(".bp-comment");
  nodes.forEach((n) => { n.style.width = `${NODE_W}px`; });
  // The comment box stays its original size on screen at the starting zoom.
  comment.style.transform = `scale(${1 / NODE_SCALE})`;
  comment.style.transformOrigin = "0 0";

  /* ---------- the floating title fades whenever a node sits underneath it ---------- */
  const title = graph.querySelector(".bp-title");
  let titleFrame = 0;
  const updateTitle = () => {
    if (!title) return;
    cancelAnimationFrame(titleFrame);
    titleFrame = requestAnimationFrame(() => {
      const t = title.getBoundingClientRect();
      const covered = movables.some((el) => {
        const r = el.getBoundingClientRect();
        return r.left < t.right && r.right > t.left && r.top < t.bottom && r.bottom > t.top;
      });
      title.classList.toggle("is-covered", covered);
    });
  };

  /* ---------- view: pan and zoom ---------- */
  const view = { x: 0, y: 0, zoom: 1 };
  const applyView = () => {
    world.style.transform = `translate(${view.x}px, ${view.y}px) scale(${view.zoom})`;
    // The grid moves and scales with the graph, like the editor.
    const big = (128 / NODE_SCALE) * view.zoom;
    const small = (16 / NODE_SCALE) * view.zoom;
    graph.style.backgroundSize = `${big}px ${big}px, ${big}px ${big}px, ${small}px ${small}px, ${small}px ${small}px`;
    graph.style.backgroundPosition = `${view.x}px ${view.y}px`;
    updateTitle();
  };
  const zoomAt = (factor, clientX, clientY) => {
    const box = graph.getBoundingClientRect();
    const px = clientX - box.left;
    const py = clientY - box.top;
    const next = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, view.zoom * factor));
    // Keep the point under the cursor fixed while zooming.
    view.x = px - ((px - view.x) * next) / view.zoom;
    view.y = py - ((py - view.y) * next) / view.zoom;
    view.zoom = next;
    applyView();
  };

  /* ---------- positions ---------- */
  const place = (el, x, y) => { el.style.left = `${Math.round(x)}px`; el.style.top = `${Math.round(y)}px`; };
  const defaultLayout = () => {
    const narrow = graph.clientWidth < 760;
    // The comment keeps its original on-screen size, so it takes more room in graph units.
    const commentBottom = 40 + comment.offsetHeight / NODE_SCALE;
    place(comment, 40, 40);
    if (narrow) {
      // One column on small screens.
      place(start, 40, commentBottom + 60);
      let y = commentBottom + 160;
      nodes.forEach((n) => { place(n, 40, y); y += n.offsetHeight + 80; });
      return;
    }
    // Wide screens: nodes run left to right in rows that fit the visible graph,
    // alternating up and down a little so the wires flow like a real graph.
    const left = 360;
    const gapX = 140;
    const lift = 120;
    const visibleWidth = graph.clientWidth / NODE_SCALE;
    const perRow = Math.max(1, Math.min(nodes.length, Math.floor((visibleWidth - left - 40 + gapX) / (NODE_W + gapX))));
    const top = commentBottom + 80;
    place(start, 40, top + 40);
    let rowTop = top;
    for (let r = 0; r * perRow < nodes.length; r += 1) {
      const row = nodes.slice(r * perRow, (r + 1) * perRow);
      row.forEach((n, c) => place(n, left + c * (NODE_W + gapX), rowTop + (c % 2) * lift));
      rowTop += Math.max(...row.map((n, c) => n.offsetHeight + (c % 2) * lift)) + 140;
    }
  };
  const fitView = () => {
    const width = Math.max(...movables.map((el) => el.offsetLeft + el.offsetWidth)) + 80;
    view.zoom = Math.min(NODE_SCALE, Math.max(MIN_ZOOM, graph.clientWidth / width));
    // Start below the floating page title, lined up with the page gutter.
    const title = graph.querySelector(".bp-title");
    view.x = title ? title.offsetLeft - 40 * view.zoom : 0;
    view.y = title ? title.offsetTop + title.offsetHeight + 16 - 40 * view.zoom : 0;
    applyView();
  };
  const save = () => {
    try {
      localStorage.setItem(LAYOUT_KEY, JSON.stringify(movables.map((el) => [el.dataset.node || el.className, el.offsetLeft, el.offsetTop])));
    } catch (error) { /* storage blocked: positions just won't be remembered */ }
  };
  const restore = () => {
    try {
      const saved = JSON.parse(localStorage.getItem(LAYOUT_KEY) || "null");
      if (!saved || saved.length !== movables.length) return false;
      movables.forEach((el, i) => {
        const [key, x, y] = saved[i];
        if (key !== (el.dataset.node || el.className)) throw new Error("layout changed");
        place(el, x, y);
      });
      return true;
    } catch (error) { return false; }
  };

  /* ---------- wires ---------- */
  const pinPoint = (pin) => {
    const w = world.getBoundingClientRect();
    const r = pin.getBoundingClientRect();
    return { x: (r.left + r.width / 2 - w.left) / view.zoom, y: (r.top + r.height / 2 - w.top) / view.zoom };
  };
  const curve = (a, b) => {
    const pull = Math.max(80, Math.abs(b.x - a.x) * 0.5);
    return `M${a.x},${a.y} C${a.x + pull},${a.y} ${b.x - pull},${b.y} ${b.x},${b.y}`;
  };
  let wireFrame = 0;
  const drawWires = () => {
    cancelAnimationFrame(wireFrame);
    wireFrame = requestAnimationFrame(() => {
      const outs = [start, ...nodes].map((n) => n.querySelector(".bp-pin--out"));
      const ins = nodes.map((n) => n.querySelector(".bp-pin--in"));
      svg.innerHTML = outs.map((out, i) => {
        if (!ins[i]) return "";
        const d = curve(pinPoint(out), pinPoint(ins[i]));
        return `<path class="bp-wire" d="${d}"/><path class="bp-wire__flow" d="${d}"/>`;
      }).join("");
    });
  };

  /* ---------- dragging: background pans, nodes move ---------- */
  const pointers = new Map();
  let action = null;
  let topZ = 10;
  graph.addEventListener("pointerdown", (event) => {
    // Links and buttons work normally; they never start a drag.
    if (event.button !== 0 || event.target.closest(".bp-controls, a, button")) return;
    pointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
    graph.setPointerCapture(event.pointerId);
    if (pointers.size === 2) {
      // Two fingers: pinch to zoom.
      const [a, b] = [...pointers.values()];
      action = { type: "pinch", distance: Math.hypot(a.x - b.x, a.y - b.y) };
      return;
    }
    const target = event.target.closest(".bp-node, .bp-comment");
    action = target
      ? { type: "node", el: target, startX: event.clientX, startY: event.clientY, left: target.offsetLeft, top: target.offsetTop, moved: false, downOn: event.target, pointerType: event.pointerType }
      : { type: "pan", startX: event.clientX, startY: event.clientY, x: view.x, y: view.y };
    if (target) target.style.zIndex = ++topZ;
    graph.classList.add(target ? "is-dragging-node" : "is-panning");
  });
  graph.addEventListener("pointermove", (event) => {
    if (!pointers.has(event.pointerId) || !action) return;
    pointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
    if (action.type === "pinch" && pointers.size === 2) {
      const [a, b] = [...pointers.values()];
      const distance = Math.hypot(a.x - b.x, a.y - b.y);
      zoomAt(distance / action.distance, (a.x + b.x) / 2, (a.y + b.y) / 2);
      action.distance = distance;
      return;
    }
    const dx = event.clientX - action.startX;
    const dy = event.clientY - action.startY;
    if (action.type === "pan") {
      view.x = action.x + dx;
      view.y = action.y + dy;
      applyView();
    } else if (action.type === "node") {
      if (!action.moved && Math.hypot(dx, dy) < DRAG_START) return;
      action.moved = true;
      place(action.el, action.left + dx / view.zoom, action.top + dy / view.zoom);
      drawWires();
      updateTitle();
    }
  });
  const release = (event) => {
    if (!pointers.has(event.pointerId)) return;
    pointers.delete(event.pointerId);
    if (action && action.type === "node") {
      if (action.moved) save();
      else if (action.pointerType !== "mouse") {
        // A tap (not a drag) on a video plays or pauses it.
        const video = action.downOn.closest("[data-video-box]")?.querySelector("video");
        if (video) { if (video.paused) video.play().catch(() => {}); else video.pause(); }
      }
    }
    if (pointers.size === 0) {
      action = null;
      graph.classList.remove("is-dragging-node", "is-panning");
    }
  };
  graph.addEventListener("pointerup", release);
  graph.addEventListener("pointercancel", release);

  /* Scrolling inside the graph:
     - trackpad pinch (sent as Ctrl + scroll) or Ctrl/Cmd + mouse wheel: zoom
     - two-finger trackpad scroll: move around, in any direction
     - a plain mouse wheel: scrolls the page as normal */
  const isMouseWheel = (event) =>
    event.deltaMode === 1 ||
    (event.wheelDeltaY !== undefined && event.wheelDeltaY !== 0 && event.deltaX === 0 && Math.abs(event.wheelDeltaY) % 120 === 0);
  graph.addEventListener("wheel", (event) => {
    if (event.ctrlKey || event.metaKey) {
      event.preventDefault();
      // Pinches arrive as small steps, mouse wheels as big ones: scale each to feel the same.
      const speed = Math.abs(event.deltaY) < 50 ? 0.01 : 0.0015;
      zoomAt(Math.exp(-event.deltaY * speed), event.clientX, event.clientY);
      return;
    }
    if (isMouseWheel(event)) return;
    event.preventDefault();
    view.x -= event.deltaX;
    view.y -= event.deltaY;
    applyView();
  }, { passive: false });

  /* Safari on Mac reports trackpad pinches as gesture events instead */
  let gestureScale = 1;
  graph.addEventListener("gesturestart", (event) => { event.preventDefault(); gestureScale = 1; });
  graph.addEventListener("gesturechange", (event) => {
    event.preventDefault();
    zoomAt(event.scale / gestureScale, event.clientX, event.clientY);
    gestureScale = event.scale;
  });
  graph.addEventListener("gestureend", (event) => event.preventDefault());

  /* ---------- controls ---------- */
  graph.querySelector("[data-zoom-in]").addEventListener("click", () => {
    const box = graph.getBoundingClientRect();
    zoomAt(1.2, box.left + box.width / 2, box.top + box.height / 2);
  });
  graph.querySelector("[data-zoom-out]").addEventListener("click", () => {
    const box = graph.getBoundingClientRect();
    zoomAt(1 / 1.2, box.left + box.width / 2, box.top + box.height / 2);
  });
  graph.querySelector("[data-reset]").addEventListener("click", () => {
    try { localStorage.removeItem(LAYOUT_KEY); } catch (error) {}
    defaultLayout();
    fitView();
    drawWires();
  });

  /* Keyboard: bring a node into view when it is tabbed to */
  nodes.forEach((n) => n.addEventListener("focus", () => {
    if (!n.matches(":focus-visible")) return; // clicks shouldn't move the view
    const box = graph.getBoundingClientRect();
    const r = n.getBoundingClientRect();
    if (r.left >= box.left && r.right <= box.right && r.top >= box.top && r.bottom <= box.bottom) return;
    view.x += box.left + box.width / 2 - (r.left + r.width / 2);
    view.y += box.top + box.height / 3 - r.top;
    applyView();
  }));

  /* Hover to play videos with a mouse */
  const canHover = matchMedia("(hover: hover)");
  world.querySelectorAll("[data-video-box]").forEach((box) => {
    const video = box.querySelector("video");
    box.addEventListener("mouseenter", () => { if (canHover.matches && !action) video.play().catch(() => {}); });
    box.addEventListener("mouseleave", () => { if (canHover.matches) video.pause(); });
    video.addEventListener("play", () => box.classList.add("is-playing"));
    video.addEventListener("pause", () => box.classList.remove("is-playing"));
  });

  /* Instagram's card tells the page how tall it is; size the frame to match exactly. */
  addEventListener("message", (event) => {
    let host = "";
    try { host = new URL(event.origin).hostname; } catch (error) { return; }
    if (!/(^|\.)instagram\.com$/.test(host)) return;
    let data = event.data;
    try { if (typeof data === "string") data = JSON.parse(data); } catch (error) { return; }
    const height = data && data.details && data.details.height;
    if (!height) return;
    world.querySelectorAll(".bp-node__media--instagram iframe").forEach((frame) => {
      if (frame.contentWindow === event.source) {
        frame.style.height = `${Math.round(height)}px`;
        drawWires();
      }
    });
  });

  /* ---------- start ---------- */
  if (!restore()) defaultLayout();
  fitView();
  drawWires();
  // Images and fonts change node heights as they load, so redraw then.
  world.querySelectorAll("img, video").forEach((el) => el.addEventListener(el.tagName === "IMG" ? "load" : "loadedmetadata", drawWires, { once: true }));
  if (document.fonts) document.fonts.ready.then(drawWires);
  new ResizeObserver(drawWires).observe(world);
})();

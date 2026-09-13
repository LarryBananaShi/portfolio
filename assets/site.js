/* Shared rendering: nav, footer, and data-driven sections. */
(function () {
  const P = window.PROFILE || {};
  const esc = (s) =>
    String(s).replace(/[&<>"]/g, (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c])
    );

  const PAGES = [
    { href: "index.html", label: "about" },
    { href: "experience.html", label: "experience" },
    { href: "extra.html", label: "extra! extra!" },
  ];

  // Logo chip with graceful monogram fallback if the image is missing.
  // Renders a monogram span + (optionally) an <img>. If the image fails to
  // load, the img hides itself and reveals the monogram sibling.
  function logoChip(entry) {
    const initial = esc((entry.company || "?").trim().charAt(0).toUpperCase());
    if (!entry.logo) {
      return `<span class="logo-chip mono" aria-hidden="true">${initial}</span>`;
    }
    return (
      `<span class="logo-wrap">` +
      `<span class="logo-chip mono" aria-hidden="true">${initial}</span>` +
      `<img class="logo-chip" src="${esc(entry.logo)}" alt="${esc(
        entry.company
      )} logo" loading="lazy" ` +
      `onerror="this.previousElementSibling.classList.add('show');this.remove();" />` +
      `</span>`
    );
  }

  function currentPage() {
    const path = location.pathname.split("/").pop() || "index.html";
    return path === "" ? "index.html" : path;
  }

  function renderTopbar() {
    const el = document.querySelector("[data-topbar]");
    if (!el) return;
    const here = currentPage();
    const nav = PAGES.map(
      (p) =>
        `<a href="${p.href}"${
          p.href === here ? ' class="active" aria-current="page"' : ""
        }>${esc(p.label)}</a>`
    ).join("");
    el.innerHTML = `
      <div class="wrap">
        <a class="brand" href="index.html"><span class="prompt">~/</span>${esc(P.name)}<span class="dot">.</span></a>
        <nav class="nav">${nav}</nav>
      </div>`;
  }

  function renderCardNav() {
    const el = document.querySelector("[data-cardnav]");
    if (!el) return;
    const here = currentPage();
    el.innerHTML = PAGES.map(
      (p) =>
        `<a href="${p.href}"${
          p.href === here ? ' class="active" aria-current="page"' : ""
        }>${esc(p.label)}</a>`
    ).join("");
  }

  // Inline SVG icons (currentColor so they inherit link color).
  const ICONS = {
    linkedin: `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.55V9h3.57v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z"/></svg>`,
    github: `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 .5C5.37.5 0 5.87 0 12.5c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58l-.02-2.04c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.2.09 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.5.99.11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.11-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6.01 0c2.29-1.55 3.3-1.23 3.3-1.23.65 1.66.24 2.88.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.61-2.81 5.63-5.49 5.92.43.37.81 1.1.81 2.22l-.01 3.29c0 .32.21.7.82.58A12 12 0 0 0 24 12.5C24 5.87 18.63.5 12 .5z"/></svg>`,
    email: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 6 10 7L22 6"/></svg>`,
  };

  function renderCardLinks() {
    const el = document.querySelector("[data-cardlinks]");
    if (!el) return;
    const L = P.links || {};
    const icon = (href, key, label) =>
      `<a class="social-icon" href="${esc(href)}"${
        key === "email" ? "" : ' target="_blank" rel="noopener"'
      } aria-label="${esc(label)}" title="${esc(label)}">${ICONS[key]}</a>`;

    el.innerHTML = [
      L.linkedin ? icon(L.linkedin, "linkedin", "LinkedIn") : "",
      L.github ? icon(L.github, "github", "GitHub") : "",
      P.email ? icon("mailto:" + P.email, "email", "Email") : "",
    ]
      .filter(Boolean)
      .join("");
  }

  function renderFooter() {
    const el = document.querySelector("[data-footer]");
    if (!el) return;
    el.innerHTML = `
      <div class="wrap">
        <span>© ${new Date().getFullYear()} ${esc(P.name)}</span>
        <span>
          <a href="mailto:${esc(P.email)}">email</a> ·
          <a href="${esc(P.links.github)}" target="_blank" rel="noopener">github</a> ·
          <a href="${esc(P.links.linkedin)}" target="_blank" rel="noopener">linkedin</a>
        </span>
      </div>`;
  }

  /* ---------- ABOUT ---------- */
  function renderAbout() {
    const bullets = document.querySelector("[data-about]");
    if (bullets) {
      const rows = [];
      const role = (e) => `${esc((e.short || e.title).toLowerCase())} @${esc(e.company.toLowerCase())}`;

      // education first (bold + underlined link)
      if (P.education) {
        const e = P.education;
        const label = esc(e.short || `CE @ ${e.school}`);
        const inner = e.url
          ? `<a class="edu" href="${esc(e.url)}" target="_blank" rel="noopener">${label}</a>`
          : `<strong>${label}</strong>`;
        rows.push(`<li>${logoChip(e)}${inner}</li>`);
      }

      // current role
      if (P.current) {
        const c = P.current;
        const inner = c.url
          ? `<a class="ext" href="${esc(c.url)}" target="_blank" rel="noopener">${role(c)}</a>`
          : role(c);
        rows.push(`<li>${logoChip(c)}${inner}</li>`);
      }

      // previously: compact bullet list with the same orange arrows
      const past = (P.experience || []).filter(
        (e) => !P.current || e.company !== P.current.company
      );
      if (past.length) {
        const items = past
          .map((e) => {
            const inner = e.url
              ? `<a class="ext" href="${esc(e.url)}" target="_blank" rel="noopener">${role(e)}</a>`
              : role(e);
            return `<li>${logoChip(e)}${inner}</li>`;
          })
          .join("");
        rows.push(
          `<li class="prev-block">
            <span class="prev-label">previously</span>
            <ul class="prev-list arrow-list">${items}</ul>
          </li>`
        );
      }

      bullets.innerHTML = rows.join("");
    }

    const proj = document.querySelector("[data-projects]");
    if (proj) {
      proj.innerHTML = (P.projects || [])
        .map((pr, i) => {
          const items = (pr.details || [])
            .map((d) => `<li>${esc(d)}</li>`)
            .join("");
          const link = pr.link
            ? `<a class="stack" href="${esc(pr.link)}" target="_blank" rel="noopener">↗ visit</a>`
            : `<span class="stack">${esc(pr.stack)}</span>`;
          return `
          <article class="project reveal-up" data-delay="${(i % 4) + 1}">
            <div class="p-top">
              <h3>${esc(pr.name)}</h3>
              ${link}
            </div>
            <p class="blurb">${esc(pr.blurb)}</p>
            <ul>${items}</ul>
          </article>`;
        })
        .join("");
    }
  }

  /* ---------- EXPERIENCE (tile dropdowns) ---------- */
  function renderExperience() {
    const el = document.querySelector("[data-experience]");
    if (!el) return;
    el.innerHTML = (P.experience || [])
      .map((e, i) => {
        const pts = (e.points || [])
          .map((p) => `<li>${esc(p)}</li>`)
          .join("");
        const visit = e.url
          ? `<a class="exp-visit" href="${esc(e.url)}" target="_blank" rel="noopener" title="visit ${esc(
              e.company
            )}">↗</a>`
          : "";
        return `
          <article class="exp-tile reveal-up" data-delay="${(i % 4) + 1}">
            <details${i === 0 ? " open" : ""}>
              <summary>
                <span class="exp-logo">${logoChip(e)}</span>
                <span class="exp-headings">
                  <span class="exp-company">${esc(e.company)}</span>
                  <span class="exp-role">${esc(e.title)}</span>
                </span>
                <span class="exp-when">${esc(e.date)}</span>
                <span class="chev" aria-hidden="true">▸</span>
              </summary>
              <div class="exp-detail">
                <ul>${pts}</ul>
                ${visit ? `<div class="exp-foot">${visit}</div>` : ""}
              </div>
            </details>
          </article>`;
      })
      .join("");
  }

  /* ---------- BLOG (extra! extra!) ---------- */
  function fmtDate(iso) {
    const d = new Date(iso + "T00:00:00");
    if (isNaN(d)) return iso;
    return d.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }
  function toParagraphs(body) {
    return String(body)
      .trim()
      .split(/\n\s*\n/)
      .map((p) => `<p>${p.trim().replace(/\n/g, " ")}</p>`)
      .join("");
  }
  function slugify(s) {
    return String(s)
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_]+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");
  }
  function allPosts() {
    return (window.POSTS || [])
      .map((p) => ({ ...p, id: p.id || slugify(p.title) }))
      .sort((a, b) => (a.date < b.date ? 1 : -1));
  }

  // Blog list on the extra! extra! page — each post links to its own page.
  function renderPosts() {
    const el = document.querySelector("[data-posts]");
    if (!el) return;
    const posts = allPosts();

    if (!posts.length) {
      el.innerHTML = `<p class="empty">No posts yet. Write one in <code>assets/posts.js</code>.</p>`;
      return;
    }

    el.innerHTML = posts
      .map((post, i) => {
        return `
        <a class="post post-link reveal-up" data-delay="${(i % 4) + 1}"
           href="post.html?id=${encodeURIComponent(post.id)}">
          <span class="post-meta">
            <span class="post-date">${esc(fmtDate(post.date))}</span>
            ${post.tag ? `<span class="post-tag">${esc(post.tag)}</span>` : ""}
          </span>
          <span class="post-title">${esc(post.title)}</span>
          <span class="post-go" aria-hidden="true">→</span>
        </a>`;
      })
      .join("");
  }

  // Dedicated single-post page (post.html).
  function renderSinglePost() {
    const el = document.querySelector("[data-post]");
    if (!el) return;
    const params = new URLSearchParams(location.search);
    const id = params.get("id");
    const posts = allPosts();
    const post = posts.find((p) => p.id === id);

    if (!post) {
      el.innerHTML = `
        <p class="eyebrow">404</p>
        <h1 class="title">post not found<span class="accent">.</span></h1>
        <p class="lede">That post doesn't exist. <a class="ext" href="extra.html">← back to extra! extra!</a></p>`;
      return;
    }

    el.innerHTML = `
      <a class="back-link" href="extra.html">← extra! extra!</a>
      <article class="single-post reveal-up">
        <div class="post-meta">
          <span class="post-date">${esc(fmtDate(post.date))}</span>
          ${post.tag ? `<span class="post-tag">${esc(post.tag)}</span>` : ""}
        </div>
        <h1 class="post-headline">${esc(post.title)}</h1>
        <div class="post-article">${toParagraphs(post.body)}</div>
      </article>`;
  }

  function renderMeta() {
    document.querySelectorAll("[data-fill]").forEach((n) => {
      const key = n.getAttribute("data-fill");
      if (P[key] != null) n.textContent = P[key];
    });
  }

  /* ---------- interactive: typewriter tagline ---------- */
  function typewriter() {
    const el = document.querySelector("[data-type]");
    if (!el) return;
    const full = P[el.getAttribute("data-type")] || el.textContent;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.textContent = full;
      return;
    }
    el.textContent = "";
    el.classList.add("typing");
    let i = 0;
    (function tick() {
      if (i <= full.length) {
        el.textContent = full.slice(0, i++);
        setTimeout(tick, 18 + Math.random() * 30);
      } else {
        el.classList.remove("typing");
      }
    })();
  }

  /* ---------- photo carousel (landing) ---------- */
  function setupCarousel() {
    const root = document.querySelector("[data-carousel]");
    if (!root) return;
    const photos = (P.photos || []).filter((p) => p && p.src);
    const track = root.querySelector("[data-carousel-track]");
    const captionEl = root.querySelector("[data-carousel-caption]");
    const dotsEl = root.querySelector("[data-carousel-dots]");
    const prevBtn = root.querySelector("[data-carousel-prev]");
    const nextBtn = root.querySelector("[data-carousel-next]");

    if (!photos.length) {
      root.innerHTML = `<div class="photo-slot"><span class="photo-hint">add photos in data.js</span></div>`;
      return;
    }

    // Build a hand-drawn "that's me" circle overlay from photo.circle data.
    function circleSVG(c) {
      if (!c) return "";
      const r = c.r != null ? c.r : 16;
      // A slightly irregular, hand-sketched loop that overshoots at the end.
      // viewBox is a square (0..100) so the loop stays circular regardless of
      // the photo's aspect ratio; the SVG itself is sized/positioned in CSS.
      const path =
        "M50 8 " +
        "C74 6 95 26 92 50 " +
        "C90 76 68 95 46 92 " +
        "C22 90 5 68 9 44 " +
        "C12 24 30 10 52 9 " + // close the loop
        "C64 9 74 13 80 20";   // little overshoot tail
      return (
        `<svg class="head-circle" viewBox="0 0 100 100" ` +
        `style="left:${c.x}%;top:${c.y}%;width:${r * 2}%;" aria-hidden="true">` +
        `<path d="${path}" fill="none" stroke="var(--circle-color)" ` +
        `stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>` +
        `</svg>`
      );
    }

    // build slides + dots
    track.innerHTML = photos
      .map(
        (p, i) =>
          `<div class="carousel-slide${i === 0 ? " active" : ""}">
             <img src="${esc(p.src)}" alt="${esc(p.caption || "photo " + (i + 1))}" loading="${
            i === 0 ? "eager" : "lazy"
          }" />
             ${circleSVG(p.circle)}
           </div>`
      )
      .join("");
    dotsEl.innerHTML = photos
      .map(
        (_, i) =>
          `<button class="dot${i === 0 ? " active" : ""}" type="button" data-idx="${i}" aria-label="go to photo ${
            i + 1
          }"></button>`
      )
      .join("");

    const slides = Array.from(track.querySelectorAll(".carousel-slide"));
    const dots = Array.from(dotsEl.querySelectorAll(".dot"));
    let idx = 0;
    let timer = null;
    const INTERVAL = 4000;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function show(n) {
      idx = (n + photos.length) % photos.length;
      slides.forEach((s, i) => s.classList.toggle("active", i === idx));
      dots.forEach((d, i) => d.classList.toggle("active", i === idx));
      captionEl.textContent = photos[idx].caption || "";
      // circle is not drawn here — it draws on hover (see stage handlers below)
    }
    function next() { show(idx + 1); }
    function prev() { show(idx - 1); }

    function start() {
      if (reduce || photos.length < 2) return;
      stop();
      timer = setInterval(next, INTERVAL);
    }
    function stop() { if (timer) clearInterval(timer); timer = null; }

    nextBtn.addEventListener("click", () => { next(); start(); });
    prevBtn.addEventListener("click", () => { prev(); start(); });
    dots.forEach((d) =>
      d.addEventListener("click", () => {
        show(parseInt(d.dataset.idx, 10));
        start();
      })
    );
    root.addEventListener("mouseenter", stop);
    root.addEventListener("mouseleave", start);

    // draw the "that's me!" circle only while hovering the photo
    const stage = root.querySelector(".carousel-stage");
    if (stage) {
      stage.addEventListener("mouseenter", () => {
        const circle = slides[idx].querySelector(".head-circle");
        if (!circle) return;
        circle.classList.remove("draw");
        void circle.getBoundingClientRect(); // restart the sketch animation
        circle.classList.add("draw");
      });
      stage.addEventListener("mouseleave", () => {
        const circle = slides[idx].querySelector(".head-circle");
        if (circle) circle.classList.remove("draw");
      });
    }

    // hide arrows/dots if only one photo
    if (photos.length < 2) {
      prevBtn.style.display = "none";
      nextBtn.style.display = "none";
      dotsEl.style.display = "none";
    }

    show(0);
    start();
  }

  /* ---------- interactive: full-page panel slide (index only) ---------- */
  function setupPanels() {
    const main = document.querySelector("main.panels");
    if (!main) return;
    const panels = Array.from(main.querySelectorAll(".panel"));
    if (panels.length < 2) return;

    let index = 0;
    let animating = false;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function go(to) {
      to = Math.max(0, Math.min(panels.length - 1, to));
      if (to === index) return;
      index = to;
      panels[index].scrollIntoView({
        behavior: reduce ? "auto" : "smooth",
        block: "start",
      });
      if (!reduce) {
        animating = true;
        setTimeout(() => (animating = false), 750);
      }
    }

    // Buttons that jump to a panel by id (the "see my projects!" cue).
    main.querySelectorAll("[data-goto]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const target = panels.findIndex(
          (p) => p.id === btn.getAttribute("data-goto")
        );
        if (target >= 0) go(target);
      });
    });

    // Wheel: one gesture = one panel step.
    main.addEventListener(
      "wheel",
      (e) => {
        if (animating) {
          e.preventDefault();
          return;
        }
        const atTopOfPanel = window.scrollY <= panels[index].offsetTop + 4;
        const dir = e.deltaY > 0 ? 1 : -1;
        // only hijack when the current panel fits the viewport (no inner scroll needed)
        const fits = panels[index].scrollHeight <= window.innerHeight + 8;
        if (fits && (dir > 0 || atTopOfPanel)) {
          const next = index + dir;
          if (next >= 0 && next < panels.length) {
            e.preventDefault();
            go(next);
          }
        }
      },
      { passive: false }
    );

    // Keyboard: arrows / page keys step panels.
    window.addEventListener("keydown", (e) => {
      if (["ArrowDown", "PageDown"].includes(e.key)) {
        e.preventDefault();
        go(index + 1);
      } else if (["ArrowUp", "PageUp"].includes(e.key)) {
        e.preventDefault();
        go(index - 1);
      }
    });

    // Keep index in sync if the user scrolls manually.
    let raf;
    window.addEventListener("scroll", () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const mid = window.scrollY + window.innerHeight / 2;
        panels.forEach((p, i) => {
          if (mid >= p.offsetTop && mid < p.offsetTop + p.offsetHeight) index = i;
        });
      });
    });
  }

  /* ---------- smooth <details> open/close ---------- */
  function animateDetails(selector) {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.querySelectorAll(selector).forEach((d) => {
      const body = d.querySelector(":scope > .exp-detail, :scope > .post-body");
      if (!body) return;

      if (reduce) return; // native instant toggle is fine

      let animating = false;

      const summary = d.querySelector(":scope > summary");
      if (!summary) return;

      summary.addEventListener("click", (e) => {
        e.preventDefault();
        if (animating) return;
        animating = true;

        if (!d.open) {
          // OPEN: reveal, measure, animate 0 -> height
          d.open = true;
          const h = body.scrollHeight;
          body.style.overflow = "hidden";
          body.style.height = "0px";
          body.style.opacity = "0";
          requestAnimationFrame(() => {
            body.style.transition = "height 0.32s cubic-bezier(0.16,1,0.3,1), opacity 0.28s ease";
            body.style.height = h + "px";
            body.style.opacity = "1";
          });
          body.addEventListener(
            "transitionend",
            function done(ev) {
              if (ev.propertyName !== "height") return;
              body.style.transition = "";
              body.style.height = "";
              body.style.overflow = "";
              body.style.opacity = "";
              body.removeEventListener("transitionend", done);
              animating = false;
            }
          );
        } else {
          // CLOSE: animate height -> 0, then set open=false
          const h = body.scrollHeight;
          body.style.overflow = "hidden";
          body.style.height = h + "px";
          body.style.opacity = "1";
          requestAnimationFrame(() => {
            body.style.transition = "height 0.28s cubic-bezier(0.4,0,0.2,1), opacity 0.2s ease";
            body.style.height = "0px";
            body.style.opacity = "0";
          });
          body.addEventListener(
            "transitionend",
            function done(ev) {
              if (ev.propertyName !== "height") return;
              d.open = false;
              body.style.transition = "";
              body.style.height = "";
              body.style.overflow = "";
              body.style.opacity = "";
              body.removeEventListener("transitionend", done);
              animating = false;
            }
          );
        }
      });
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    renderTopbar();
    renderCardNav();
    renderCardLinks();
    renderFooter();
    renderMeta();
    renderAbout();
    renderExperience();
    renderPosts();
    renderSinglePost();
    typewriter();
    setupCarousel();
    setupPanels();
    animateDetails(".exp-tile details");
  });
})();

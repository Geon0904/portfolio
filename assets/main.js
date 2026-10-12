/* 화면 그리기 — 내용은 config.js 와 projects.js 에서 고치세요. 이 파일은 손대지 않아도 돼요. */
(function () {
  var SITE = window.SITE || {};
  var LINKS = SITE.links || {};
  var PROJECTS = Array.isArray(window.PROJECTS) ? window.PROJECTS : [];
  var root = document.documentElement;
  var $ = function (id) { return document.getElementById(id); };

  /* ── 언어 ── */
  var UI = {
    ko: {
      navProjects: "프로젝트", navBlog: "블로그", projects: "프로젝트", blog: "블로그",
      count: function (n) { return n + "개"; }, all: "전체", example: "예시",
      play: "플레이", open: "열기", code: "코드",
      soonTitle: "다음 프로젝트 준비 중", soonText: "새로 만든 게임과 앱이 이곳에 차례로 올라와요.",
      naver: "네이버 블로그", theme: "다크 모드 전환", photo: "프로필 사진",
      types: { game: "게임", app: "앱", web: "웹", tool: "도구" }
    },
    en: {
      navProjects: "Projects", navBlog: "Blog", projects: "Projects", blog: "Blog",
      count: function (n) { return n + (n === 1 ? " project" : " projects"); }, all: "All", example: "Example",
      play: "Play", open: "Open", code: "Code",
      soonTitle: "More on the way", soonText: "New games and apps will show up here as I build them.",
      naver: "Naver Blog", theme: "Toggle dark mode", photo: "Profile photo",
      types: { game: "Game", app: "App", web: "Web", tool: "Tool" }
    }
  };
  var KO_TYPES = { "게임": "game", "앱": "app", "웹": "web", "도구": "tool" };
  var lang = "ko";
  try {
    var savedLang = localStorage.getItem("lang");
    lang = savedLang === "en" || savedLang === "ko" ? savedLang : (/^ko/i.test(navigator.language || "") ? "ko" : "en");
  } catch (e) {}
  function T(v) {                     // "글자" 또는 { ko, en } 를 현재 언어로
    if (v == null) return "";
    if (typeof v === "object") return v[lang] || v.ko || v.en || "";
    return String(v);
  }

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function svg(inner, filled) {
    return '<svg viewBox="0 0 24 24" aria-hidden="true" fill="' + (filled ? "currentColor" : "none") +
      '" stroke="currentColor" stroke-width="' + (filled ? 0 : 1.8) + '" stroke-linecap="round" stroke-linejoin="round">' + inner + "</svg>";
  }
  var ICON = {
    github: svg('<path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21"/>'),
    linkedin: svg('<path d="M8 11v5"/><path d="M8 8v.01"/><path d="M12 16v-5"/><path d="M16 16v-3a2 2 0 1 0-4 0"/><rect x="3" y="3" width="18" height="18" rx="4"/>'),
    mail: svg('<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3.5 7 8.5 6 8.5-6"/>'),
    sun: svg('<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>'),
    moon: svg('<path d="M20 14.5A8 8 0 0 1 9.5 4 8 8 0 1 0 20 14.5z"/>'),
    play: svg('<path d="M7 4.5v15l12.5-7.5z"/>', true),
    code: svg('<path d="m8 8-4 4 4 4"/><path d="m16 8 4 4-4 4"/><path d="m13.5 5-3 14"/>'),
    out: svg('<path d="M7 17 17 7"/><path d="M8 7h9v9"/>')
  };
  var isExternal = function (u) { return /^https?:\/\//i.test(u || ""); };
  var ext = ' target="_blank" rel="noopener"';

  /* ── 프로젝트 데이터 정리: 주소만 있어도 카드가 되도록 ── */
  function hostOf(u) { return (u || "").replace(/^https?:\/\//i, "").replace(/\/.*$/, ""); }
  function titleFromUrl(u) {
    var host = hostOf(u).split(".")[0] || "Project";
    return host.split(/[-_]+/).filter(Boolean).map(function (w) { return w.charAt(0).toUpperCase() + w.slice(1); }).join(" ");
  }
  var ITEMS = PROJECTS.filter(Boolean).map(function (p) {
    var url = p.url || p.play || "";
    var type = KO_TYPES[p.type] || p.type || "app";
    return {
      url: url,
      external: isExternal(url),
      title: p.title || (isExternal(url) ? titleFromUrl(url) : ""),
      summary: p.summary || "",
      type: type,
      year: p.year || "",
      tags: p.tags || [],
      code: p.code || "",
      thumb: p.thumb || "",
      example: !!p.example
    };
  });

  /* ── 테마 ── */
  var themeBtn = $("theme");
  var mq = window.matchMedia ? window.matchMedia("(prefers-color-scheme: dark)") : null;
  function currentTheme() { return root.getAttribute("data-theme") || (mq && mq.matches ? "dark" : "light"); }
  function paintTheme() { themeBtn.innerHTML = currentTheme() === "dark" ? ICON.moon : ICON.sun; }
  themeBtn.addEventListener("click", function () {
    var next = currentTheme() === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    try { localStorage.setItem("theme", next); } catch (e) {}
    paintTheme();
  });
  if (mq && mq.addEventListener) mq.addEventListener("change", paintTheme);
  paintTheme();

  /* ── 프로필 사진: photo 고정값 → profile 폴더의 최신 사진 → 이니셜 ── */
  var name = T(SITE.name);
  var avatar = $("avatar");
  avatar.textContent = name.split(/\s+/).map(function (w) { return w.charAt(0); }).join("").slice(0, 2);
  function setPhoto(src, fallback) {
    var img = new Image();
    img.alt = name;
    img.onload = function () { avatar.textContent = ""; avatar.appendChild(img); };
    img.onerror = function () { if (fallback) setPhoto(fallback); };
    img.src = src;
  }
  function findProfilePhoto(repo) {
    var IMG = /\.(jpe?g|png|webp|gif|avif)$/i;
    var api = "https://api.github.com/repos/" + repo;
    var getJSON = function (u) { return fetch(u).then(function (r) { if (!r.ok) throw r.status; return r.json(); }); };
    getJSON(api + "/contents/profile").then(function (list) {
      var imgs = (Array.isArray(list) ? list : []).filter(function (f) { return f.type === "file" && IMG.test(f.name); });
      if (imgs.length <= 1) return imgs[0];
      // 사진이 여러 장이면 가장 최근에 올린 사진을 골라요
      return getJSON(api + "/commits?path=profile&per_page=1")
        .then(function (cs) { return getJSON(api + "/commits/" + cs[0].sha); })
        .then(function (c) {
          var changed = (c.files || []).map(function (f) { return f.filename; });
          return imgs.filter(function (f) { return changed.indexOf(f.path) >= 0; })[0] || imgs[imgs.length - 1];
        })
        .catch(function () { return imgs[imgs.length - 1]; });
    }).then(function (f) {
      if (f) setPhoto("profile/" + encodeURIComponent(f.name), f.download_url);
    }).catch(function () {});
  }
  if (SITE.photo) setPhoto(SITE.photo);
  else if (SITE.photoRepo) findProfilePhoto(SITE.photoRepo);

  /* ── 프로젝트 카드 ── */
  function hue(str) {
    var h = 0;
    for (var i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) % 360;
    return h;
  }
  function card(p, L) {
    var title = T(p.title);
    var where = p.external ? hostOf(p.url) : "/" + p.url.replace(/\/index\.html$/, "");
    var seed = typeof p.title === "object" ? (p.title.en || p.title.ko || "") : title;
    var thumb = p.thumb
      ? '<div class="thumb"><img src="' + esc(p.thumb) + '" alt="" loading="lazy"></div>'
      : '<div class="thumb gen" style="--h:' + hue(seed) + '"><span class="mark">' + esc(title.charAt(0) || "?") +
        '</span><span class="where">' + esc(where) + "</span></div>";
    var meta = [L.types[p.type] || p.type, p.year].filter(Boolean).map(esc).join("<span>·</span>") +
      (p.example ? '<span class="badge">' + L.example + "</span>" : "");
    var tags = p.tags.length ? '<ul class="tags">' + p.tags.map(function (t) { return "<li>" + esc(t) + "</li>"; }).join("") + "</ul>" : "";
    var actions = "";
    if (p.url) {
      actions += '<a class="btn primary" href="' + esc(p.url) + '"' + (p.external ? ext : "") + ">" +
        (p.type === "game" ? ICON.play + L.play : L.open + (p.external ? ICON.out : "")) + "</a>";
    }
    if (p.code) actions += '<a class="btn ghost" href="' + esc(p.code) + '"' + ext + ">" + ICON.code + L.code + "</a>";
    return '<article class="card">' + thumb +
      '<div class="card-body"><div class="meta">' + meta + "</div>" +
      "<h3>" + esc(title) + "</h3>" + (T(p.summary) ? "<p>" + esc(T(p.summary)) + "</p>" : "") + tags +
      (actions ? '<div class="actions">' + actions + "</div>" : "") + "</div></article>";
  }

  var types = [];
  ITEMS.forEach(function (p) { if (types.indexOf(p.type) < 0) types.push(p.type); });
  var active = "all";
  try { var savedF = localStorage.getItem("projectFilter"); if (savedF && types.indexOf(savedF) >= 0) active = savedF; } catch (e) {}

  function renderProjects() {
    var L = UI[lang];
    $("filters").innerHTML = types.length < 2 ? "" : ["all"].concat(types).map(function (t) {
      return '<button type="button" class="chip" data-type="' + esc(t) + '" aria-pressed="' + (t === active) + '">' +
        esc(t === "all" ? L.all : (L.types[t] || t)) + "</button>";
    }).join("");
    var list = active === "all" ? ITEMS : ITEMS.filter(function (p) { return p.type === active; });
    var soon = ITEMS.length < 3 && active === "all"
      ? '<div class="card soon"><strong>' + L.soonTitle + "</strong><span>" + L.soonText + "</span></div>" : "";
    $("grid").innerHTML = list.map(function (p) { return card(p, L); }).join("") + soon;
    $("count").textContent = L.count(ITEMS.length);
  }
  $("filters").addEventListener("click", function (e) {
    var b = e.target.closest(".chip");
    if (!b) return;
    active = b.getAttribute("data-type");
    try { localStorage.setItem("projectFilter", active); } catch (err) {}
    renderProjects();
  });

  /* ── 언어가 바뀔 때마다 다시 그리는 부분 ── */
  function render() {
    var L = UI[lang];
    root.lang = lang;
    document.querySelectorAll("[data-i18n]").forEach(function (el) { el.textContent = L[el.getAttribute("data-i18n")]; });
    document.querySelectorAll(".lang button").forEach(function (b) { b.setAttribute("aria-pressed", String(b.getAttribute("data-lang") === lang)); });
    themeBtn.setAttribute("aria-label", L.theme);

    $("wordmark").textContent = name;
    $("name").textContent = name;
    $("tagline").textContent = T(SITE.tagline);
    $("bio").textContent = T(SITE.bio);

    var socials = [
      { key: "github", label: "GitHub", href: LINKS.github },
      { key: "linkedin", label: "LinkedIn", href: LINKS.linkedin },
      { key: "mail", label: LINKS.email, href: LINKS.email ? "mailto:" + LINKS.email : "" }
    ].filter(function (s) { return s.href; });
    $("socials").innerHTML = socials.map(function (s) {
      return '<a class="link" href="' + esc(s.href) + '"' + (s.key === "mail" ? "" : ext) + ">" + ICON[s.key] +
        "<span>" + esc(s.label) + "</span>" + (s.key === "mail" ? "" : ICON.out.replace("<svg", '<svg class="arrow"')) + "</a>";
    }).join("");

    renderProjects();

    var blog = SITE.blog || {};
    var bhtml = "";
    if (LINKS.naverBlog) {
      bhtml += '<a class="blog-card" href="' + esc(LINKS.naverBlog) + '"' + ext + ">" +
        '<span class="nmark" aria-hidden="true">N</span>' +
        '<span class="blog-text"><strong>' + L.naver + '</strong><span class="addr">' + esc(LINKS.naverBlog.replace(/^https?:\/\//, "")) + "</span>" +
        (T(blog.intro) ? "<p>" + esc(T(blog.intro)) + "</p>" : "") + "</span>" +
        '<span class="blog-go">' + ICON.out + "</span></a>";
    }
    if ((blog.posts || []).length) {
      bhtml += '<ul class="posts">' + blog.posts.map(function (p) {
        return '<li><a href="' + esc(p.url) + '"' + ext + ">" + (p.date ? "<time>" + esc(p.date) + "</time>" : "") +
          '<span class="post-title">' + esc(T(p.title)) + "</span></a></li>";
      }).join("") + "</ul>";
    }
    $("blogbox").innerHTML = bhtml;
    $("blog").hidden = !bhtml;

    var foot = [];
    if (LINKS.github) foot.push('<a href="' + esc(LINKS.github) + '"' + ext + ">GitHub</a>");
    if (LINKS.linkedin) foot.push('<a href="' + esc(LINKS.linkedin) + '"' + ext + ">LinkedIn</a>");
    if (LINKS.naverBlog) foot.push('<a href="' + esc(LINKS.naverBlog) + '"' + ext + ">" + L.naver + "</a>");
    $("footer").innerHTML = "<span>© " + new Date().getFullYear() + " " + esc(name) + "</span><nav>" + foot.join("") + "</nav>";
  }

  document.querySelector(".lang").addEventListener("click", function (e) {
    var b = e.target.closest("button[data-lang]");
    if (!b || b.getAttribute("data-lang") === lang) return;
    lang = b.getAttribute("data-lang");
    try { localStorage.setItem("lang", lang); } catch (err) {}
    render();
  });
  render();

  /* ── 현재 보고 있는 섹션 표시 ── */
  var navLinks = document.querySelectorAll(".nav a");
  function setActive(id) {
    navLinks.forEach(function (a) { a.classList.toggle("active", a.getAttribute("data-sec") === id); });
  }
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) setActive(en.target.id); });
    }, { rootMargin: "-45% 0px -50% 0px" });
    ["about", "projects", "blog"].forEach(function (id) { var el = $(id); if (el) io.observe(el); });
  }
})();

import { ref as g, onMounted as b, watch as v, openBlock as E, createElementBlock as $, normalizeClass as I, normalizeStyle as C, pushScopeId as _, popScopeId as U, createElementVNode as k } from "vue";
let h = 1;
const x = (e, t, o, a) => {
  const r = e.videoUrl, i = Number(e.width) + 140, c = T(r);
  if (!c)
    throw new Error("Invalid Instagram video URL");
  let n = document.getElementById(t);
  n || (n = document.createElement("div"), n.id = t, document.body.appendChild(n));
  let s = document.querySelector(`.${o}`);
  s || (s = document.createElement("div"), s.className = `video-${a} ${o}`, n.appendChild(s));
  const l = document.createElement("blockquote");
  l.className = "instagram-media", l.setAttribute("data-instgrm-permalink", `https://www.instagram.com/p/${c}/`), l.setAttribute("data-instgrm-version", "13"), l.style.width = `${e.width}px`, l.style.height = `${i}px`, l.style.maxWidth = "380px", l.style.maxheight = "520px";
  const d = document.createElement("a");
  if (d.href = r, l.appendChild(d), s.appendChild(l), !document.getElementById("instagramEmbedScript")) {
    const m = document.createElement("script");
    m.async = !0, m.id = "instagramEmbedScript", m.src = "//www.instagram.com/embed.js", n.appendChild(m);
  }
}, T = (e) => {
  const t = /\/([a-zA-Z0-9_-]+)\/?$/, o = e.match(t);
  return o ? o[1] : null;
}, V = (e) => {
  const t = e.match(/\/(?:video|hub)\/([^_]+)/) || e.match(/(?:^|\/)([a-z0-9]+)(?:_[\w-]*)?$/i);
  if (t && t[1])
    return t[1];
  throw new Error("Invalid Dailymotion video URL");
}, S = (e, t, o) => {
  const a = e.clip, r = V(a), i = e.autoplay ? "1" : "0", c = e.controls ? "1" : "0", n = e.fullscreen ? "1" : "0", s = document.createElement("iframe");
  s.src = `https://www.dailymotion.com/embed/video/${r}?autoplay=${i}&controls=${c}&fullscreen=${n}`, s.width = e.width || 640, s.height = e.height || 360, s.allowFullscreen = e.fullscreen !== !1, s.frameBorder = "0", s.className = o, t.appendChild(s);
}, N = (e) => {
  const t = e.match(/\/(\d+)/);
  return t && t[1] ? t[1] : (console.error("Invalid Vimeo video URL"), "");
}, L = (e, t, o) => {
  const a = e.width || 640, r = e.height || 360, i = e.controls !== void 0 ? e.controls : !0, c = e.autoplay === !0, n = e.loop === "true", s = e.fullscreen === !0, l = N(e.clip), d = document.createElement("div");
  d.className = `video-${l} ${o}`, d.dataset.eWidth = a, d.dataset.eHeight = r, d.dataset.efullscreen = s, d.dataset.eVideoId = l, t.appendChild(d);
  const m = document.createElement("script");
  return m.src = "https://player.vimeo.com/api/player.js", m.async = !0, m.onload = () => {
    new window.Vimeo.Player(d, {
      id: l,
      width: a,
      height: r,
      controls: i,
      // Show controls
      autoplay: c,
      // Autoplay based on the passed value (true/false)
      muted: c,
      // Mute if autoplay is true (to comply with browser restrictions)
      loop: n,
      // Loop based on the loop value
      fullscreen: s
    }).ready().then(() => {
      if (console.log("Vimeo player is ready"), s === !1) {
        const u = d.querySelector("iframe"), w = u.contentDocument || u.contentWindow.document, y = setInterval(() => {
          const f = w.querySelector(".vimeo-control-bar .fullscreen");
          f && (f.style.display = "none", clearInterval(y));
        }, 100);
      }
    }).catch((u) => {
      console.error("Error loading Vimeo player:", u);
    });
  }, document.body.appendChild(m), () => {
    d && (d.innerHTML = ""), m && m.parentNode && document.body.removeChild(m);
  };
}, R = (e, t, o) => {
  const a = (r) => {
    const i = /\/status\/(\d+)/, c = r.match(i);
    return c && c[1] ? c[1] : null;
  };
  try {
    const r = e.videoUrl, i = a(r), c = document.createElement("div");
    c.className = `video-${h} ${o}`, c.id = `tweet-${i}`;
    const n = document.createElement("script");
    n.src = "https://platform.twitter.com/widgets.js", n.charset = "utf-8", n.async = !0, n.addEventListener("load", () => {
      window.twttr.widgets.createTweet(i, c);
    }), t.appendChild(c), t.appendChild(n);
  } catch (r) {
    console.error("Error embedding Twitter content:", r);
  }
}, B = (e, t, o) => {
  const a = (r) => {
    const i = /\/status\/(\d+)/, c = r.match(i);
    return c ? c[1] : null;
  };
  try {
    const r = e.videoUrl, i = a(r);
    if (!i)
      throw new Error("Invalid video URL");
    const c = document.createElement("div");
    c.className = `video-${h} ${o}`, c.id = `tweet-${i}`;
    const n = document.createElement("script");
    n.src = "https://platform.twitter.com/widgets.js", n.charset = "utf-8", n.async = !0, n.addEventListener("load", () => {
      window.twttr.widgets.createTweet(i, c);
    }), t.appendChild(c), t.appendChild(n);
  } catch (r) {
    console.error("Error embedding Twitter content:", r);
  }
}, p = /* @__PURE__ */ new Map(), q = (e, t, o) => {
  const a = e.videoUrl;
  if (p.has(a) || p.has(a))
    return;
  p.set(a, !0);
  const r = e.width || "100%", i = e.height || "100%", c = new XMLHttpRequest();
  c.open("GET", `https://www.tiktok.com/oembed?url=${encodeURIComponent(a)}`, !0), c.onload = function() {
    if (c.status >= 200 && c.status < 300) {
      const n = JSON.parse(c.responseText);
      n.html && (n.html = n.html.replace(/<script[^>]*>.*<\/script>/gi, ""));
      const s = document.createElement("div"), l = Date.now();
      if (s.className = `video-${l} ${o}`, s.style.width = r, s.style.height = i, s.innerHTML = n.html, !document.querySelector('script[src="https://www.tiktok.com/embed.js"]')) {
        const d = document.createElement("script");
        d.src = "https://www.tiktok.com/embed.js", document.body.appendChild(d);
      }
      t ? t.appendChild(s) : document.body && document.body.appendChild(s);
    } else
      console.error("Failed to fetch TikTok oEmbed data: " + c.statusText);
  }, c.onerror = function() {
    console.error("An error occurred while embedding TikTok video.");
  }, c.send();
}, M = (e, t, o) => {
  const a = e.clip, r = e.autoplay ?? !0, i = r, c = e.width || 640, n = e.height || 360, s = new URL("https://www.facebook.com/plugins/video.php");
  s.searchParams.set("href", a), s.searchParams.set("width", c), s.searchParams.set("height", n), s.searchParams.set("show_text", "false"), s.searchParams.set("autoplay", r ? "true" : "false"), s.searchParams.set("muted", i ? "1" : "0");
  const l = document.createElement("iframe");
  l.src = s.toString(), l.width = c, l.height = n, l.frameBorder = "0", l.allow = "autoplay; fullscreen", l.allowFullscreen = e.fullscreen !== !1, l.className = `video-${h} ${o} custom-facebook`, h++, t.appendChild(l);
}, P = (e) => {
  const t = e.match(/(?:shorts\/|v=)([a-zA-Z0-9_-]{11})/);
  if (t && t[1])
    return t[1];
  const o = e.match(/(\?v=|\/embed\/|\/watch\?v=|\/v\/|\/e\/|youtu.be\/)([^#&?]*).*/);
  if (o && o[2].length === 11)
    return o[2];
  throw new Error("Invalid YouTube video URL");
}, A = (e, t, o) => {
  if (!t) {
    console.error("Container element not found.");
    return;
  }
  const a = e.autoplay ? 1 : 0, r = e.autoplay || e.muted ? 1 : 0, i = e.autoplay || e.loop ? 1 : 0, c = P(e.videoUrl), n = document.createElement("iframe");
  n.src = `https://www.youtube.com/embed/${c}?autoplay=${a}&mute=${r}&loop=${i ? 1 : 0}&controls=${e.controls ? 1 : 0}`, n.width = e.width || 640, n.height = e.height || 360, n.frameborder = "0", n.style.border = "none", e.fullscreen && n.setAttribute("allow", "fullscreen"), n.className = o, t.appendChild(n);
}, D = (e) => {
  var a;
  const t = ((a = e.cssname) == null ? void 0 : a.trim()) || "";
  if (!t.match(/^[a-zA-Z_][\w-]*$/))
    throw console.error("Invalid class name:", t), new Error("Invalid class name");
  if (!document.querySelector(`#default-style-${t}`)) {
    const r = document.createElement("style");
    r.id = `default-style-${t}`, r.textContent = `
            .${t} {
              display: flex;
              justify-content: center;
              align-items: center;
              min-width: 256px;
              min-height: 144px;
              margin: auto;
            }
          `, document.head.appendChild(r);
  }
  const o = document.querySelector(`.${t}`);
  if (!o)
    throw console.error("Container not found for class:", t), new Error("Container not found");
  for (; o.firstChild; )
    o.removeChild(o.firstChild);
  if (e.videoUrl.includes("youtube.com") || e.videoUrl.includes("youtu.be"))
    A(e, o, t);
  else if (e.videoUrl.includes("facebook.com") || e.videoUrl.includes("fb.com"))
    M(e, o, t);
  else if (e.videoUrl.includes("tiktok.com") || e.videoUrl.includes("tiktok"))
    q(e, o, t);
  else if (e.videoUrl.includes("twitter.com"))
    R(e, o, t);
  else if (e.videoUrl.includes("x.com"))
    B(e, o, t);
  else if (e.videoUrl.includes("vimeo.com"))
    L(e, o, t);
  else if (e.videoUrl.includes("dailymotion.com") || e.videoUrl.includes("dailymotion"))
    S(e, o, t);
  else if (e.videoUrl.includes("instagram.com") || e.videoUrl.includes("instagram"))
    x(e, o, t);
  else
    throw new Error("Invalid video URL");
};
const W = (e, t) => {
  const o = e.__vccOpts || e;
  for (const [a, r] of t)
    o[a] = r;
  return o;
}, j = {
  name: "EmbediaVue",
  props: {
    clip: {
      type: String,
      required: !0
    },
    width: {
      type: [Number, String],
      default: 640
    },
    height: {
      type: [Number, String],
      default: ""
    },
    autoplay: {
      type: Boolean,
      default: !1
    },
    fullscreen: {
      type: Boolean,
      default: !1
    },
    controls: {
      type: Boolean,
      default: !0
    },
    cssname: {
      type: String,
      default: "default-video-class"
    }
  },
  setup(e) {
    const t = g("56.25%");
    b(() => {
      D({
        videoUrl: e.clip,
        width: e.width,
        height: e.height,
        autoplay: e.autoplay,
        fullscreen: e.fullscreen,
        controls: e.controls,
        cssname: e.cssname
      }), o(e.width, e.height);
    }), v(() => [e.width, e.height], ([a, r]) => {
      o(a, r);
    }, { immediate: !0 });
    function o(a, r) {
      a && r ? t.value = `${r / a * 100}%` : t.value = "56.25%";
    }
    return {
      aspectRatio: t
    };
  }
}, z = (e) => (_("data-v-d26b150f"), e = e(), U(), e), H = /* @__PURE__ */ z(() => /* @__PURE__ */ k("div", { class: "video-content" }, null, -1)), F = [
  H
];
function Y(e, t, o, a, r, i) {
  return E(), $("div", {
    class: I([o.cssname, "responsive-container"]),
    style: C({ "--aspect-ratio": a.aspectRatio, width: "auto", maxWidth: "100%" })
  }, F, 6);
}
const X = /* @__PURE__ */ W(j, [["render", Y], ["__scopeId", "data-v-d26b150f"]]);
export {
  X as EmbediaVue
};

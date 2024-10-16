import { ref as p, onMounted as w, watch as f, openBlock as y, createElementBlock as b, normalizeClass as g, normalizeStyle as $, pushScopeId as x, popScopeId as E, createElementVNode as I } from "vue";
let h = 1;
const k = (e, t, o, a) => {
  const n = e.videoUrl, s = Number(e.width) + 140, r = v(n);
  if (!r)
    throw new Error("Invalid Instagram video URL");
  let i = document.getElementById(t);
  i || (i = document.createElement("div"), i.id = t, document.body.appendChild(i));
  let c = document.querySelector(`.${o}`);
  c || (c = document.createElement("div"), c.className = `video-${a} ${o}`, i.appendChild(c));
  const l = document.createElement("blockquote");
  l.className = "instagram-media", l.setAttribute("data-instgrm-permalink", `https://www.instagram.com/p/${r}/`), l.setAttribute("data-instgrm-version", "13"), l.style.width = `${e.width}px`, l.style.height = `${s}px`, l.style.maxWidth = "380px", l.style.maxheight = "520px";
  const d = document.createElement("a");
  if (d.href = n, l.appendChild(d), c.appendChild(l), !document.getElementById("instagramEmbedScript")) {
    const m = document.createElement("script");
    m.async = !0, m.id = "instagramEmbedScript", m.src = "//www.instagram.com/embed.js", i.appendChild(m);
  }
}, v = (e) => {
  const t = /\/([a-zA-Z0-9_-]+)\/?$/, o = e.match(t);
  return o ? o[1] : null;
}, C = (e) => {
  const t = e.match(/\/(?:video|hub)\/([^_]+)/) || e.match(/(?:^|\/)([a-z0-9]+)(?:_[\w-]*)?$/i);
  if (t && t[1])
    return t[1];
  throw new Error("Invalid Dailymotion video URL");
}, U = (e, t, o) => {
  const a = e.videoUrl, n = C(a), s = e.autoplay ? "1" : "0", r = e.controls ? "1" : "0", i = e.fullscreen ? "1" : "0", c = document.createElement("iframe");
  c.src = `https://www.dailymotion.com/embed/video/${n}?autoplay=${s}&controls=${r}&fullscreen=${i}`, c.width = e.width || 640, c.height = e.height || 360, c.frameBorder = "0", c.allowFullscreen = !0, c.className = o, t.appendChild(c);
}, _ = (e) => {
  const t = e.match(/\/(\d+)/);
  return t && t[1] ? t[1] : (console.error("Invalid Vimeo video URL"), "");
}, T = (e, t, o) => {
  const a = e.width || 640, n = e.height || 360, s = e.controls, r = e.autoplay === "true", i = e.loop === "true", c = _(e.videoUrl), l = document.createElement("div");
  l.className = `video-${h} ${o}`, l.dataset.eWidth = a, l.dataset.eHeight = n, l.dataset.efullscreen = e.fullscreen, l.dataset.eVideoId = c, t.appendChild(l);
  const d = document.createElement("script");
  return d.src = "https://player.vimeo.com/api/player.js", d.async = !0, d.onload = () => {
    new window.Vimeo.Player(l, {
      id: c,
      width: a,
      height: n,
      controls: s,
      autoplay: r,
      muted: r,
      loop: i
      // Set loop based on boolean value
    }).ready().then(() => {
    });
  }, document.body.appendChild(d), () => {
    l && (l.innerHTML = ""), document.body.removeChild(d);
  };
}, V = (e, t, o) => {
  const a = (n) => {
    const s = /\/(?:i\/)?status\/(\d+)/, r = n.match(s);
    return r ? r[1] : null;
  };
  try {
    if (!(t instanceof Node)) {
      console.error("Container is not a valid DOM node.");
      return;
    }
    const n = e.videoUrl, s = a(n);
    if (!n || !s) {
      console.error("Invalid video clip URL or tweet ID.");
      return;
    }
    const r = document.createElement("blockquote");
    r.className = `twitter-tweet ${o}`, r.setAttribute("data-media-max-width", e.width), r.setAttribute("data-media-max-height", e.height), r.innerHTML = `
        <p lang="en" style="min-width: ${e.width}px; display: block;">
          <a href="${n}" style="display: inline-block; min-width: ${e.width}px;">
          </a>
        </p>
      `, t.appendChild(r);
    const i = document.createElement("script");
    i.src = "https://platform.twitter.com/widgets.js", i.charset = "utf-8", i.async = !0, i.addEventListener("load", () => {
      window.twttr.widgets.load();
    }), t.appendChild(i);
  } catch (n) {
    console.error("Error embedding Twitter content:", n);
  }
}, A = (e, t, o) => {
  const a = (n) => {
    n = n.replace("x.com", "twitter.com");
    const s = /\/(?:i\/)?status\/(\d+)/, r = n.match(s);
    return r ? r[1] : null;
  };
  try {
    if (!(t instanceof Node)) {
      console.error("Container is not a valid DOM node.");
      return;
    }
    const n = e.videoUrl, s = a(n);
    if (!n || !s) {
      console.error("Invalid video clip URL or tweet ID.");
      return;
    }
    const r = document.createElement("blockquote");
    r.className = `twitter-tweet ${o}`, r.setAttribute("data-media-max-width", e.width), r.setAttribute("data-media-max-height", e.height), r.innerHTML = `
        <p lang="en" style="min-width: ${e.width}px; display: block;">
          <a href="https://twitter.com/i/status/${s}" style="display: inline-block; min-width: ${e.width}px;">
          </a>
        </p>
      `, t.appendChild(r);
    const i = document.createElement("script");
    i.src = "https://platform.twitter.com/widgets.js", i.charset = "utf-8", i.async = !0, i.addEventListener("load", () => {
      window.twttr.widgets.load();
    }), t.appendChild(i);
  } catch (n) {
    console.error("Error embedding Twitter content:", n);
  }
}, u = /* @__PURE__ */ new Map(), S = (e, t, o) => {
  const a = e.videoUrl;
  if (u.has(a) || u.has(a))
    return;
  u.set(a, !0);
  const n = e.width || "100%", s = e.height || "100%", r = new XMLHttpRequest();
  r.open("GET", `https://www.tiktok.com/oembed?url=${encodeURIComponent(a)}`, !0), r.onload = function() {
    if (r.status >= 200 && r.status < 300) {
      const i = JSON.parse(r.responseText);
      i.html && (i.html = i.html.replace(/<script[^>]*>.*<\/script>/gi, ""));
      const c = document.createElement("div"), l = Date.now();
      if (c.className = `video-${l} ${o}`, c.style.width = n, c.style.height = s, c.innerHTML = i.html, !document.querySelector('script[src="https://www.tiktok.com/embed.js"]')) {
        const d = document.createElement("script");
        d.src = "https://www.tiktok.com/embed.js", document.body.appendChild(d);
      }
      t ? t.appendChild(c) : document.body && document.body.appendChild(c);
    } else
      console.error("Failed to fetch TikTok oEmbed data: " + r.statusText);
  }, r.onerror = function() {
    console.error("An error occurred while embedding TikTok video.");
  }, r.send();
}, N = (e, t, o) => {
  const a = e.videoUrl, n = e.autoplay ? "autoplay=true" : "autoplay=false", s = n ? "muted=true" : "muted=false", r = e.width || 640, i = e.height || 360, c = document.createElement("iframe");
  c.setAttribute("src", `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(a)}&width=${r}&height=${i}&show_text=false&${n}&${s}`), c.setAttribute("width", r), c.setAttribute("height", i), c.setAttribute("frameborder", "0"), e.fullscreen && c.setAttribute("allowfullscreen", "true"), c.className = `video-${h} ${o} custom-facebook`, h++, t.appendChild(c);
}, L = (e) => {
  const t = e.match(/(?:shorts\/|v=)([a-zA-Z0-9_-]{11})/);
  if (t && t[1])
    return t[1];
  const o = e.match(/(\?v=|\/embed\/|\/watch\?v=|\/v\/|\/e\/|youtu.be\/)([^#&?]*).*/);
  if (o && o[2].length === 11)
    return o[2];
  throw new Error("Invalid YouTube video URL");
}, M = (e, t, o) => {
  if (!t) {
    console.error("Container element not found.");
    return;
  }
  const a = e.autoplay ? 1 : 0, n = e.autoplay || e.muted ? 1 : 0, s = e.autoplay || e.loop ? 1 : 0, r = L(e.videoUrl), i = document.createElement("iframe");
  i.src = `https://www.youtube.com/embed/${r}?autoplay=${a}&mute=${n}&loop=${s ? 1 : 0}&controls=${e.controls ? 1 : 0}`, i.width = e.width || 640, i.height = e.height || 360, i.frameborder = "0", i.style.border = "none", e.fullscreen && i.setAttribute("allow", "fullscreen"), i.className = o, t.appendChild(i);
}, R = (e) => {
  var a;
  const t = ((a = e.cssname) == null ? void 0 : a.trim()) || "";
  if (!t.match(/^[a-zA-Z_][\w-]*$/))
    throw console.error("Invalid class name:", t), new Error("Invalid class name");
  if (!document.querySelector(`#default-style-${t}`)) {
    const n = document.createElement("style");
    n.id = `default-style-${t}`, n.textContent = `
            .${t} {
              display: flex;
              justify-content: center;
              align-items: center;
              min-width: 256px;
              min-height: 144px;
              margin: auto;
            }
          `, document.head.appendChild(n);
  }
  const o = document.querySelector(`.${t}`);
  if (!o)
    throw console.error("Container not found for class:", t), new Error("Container not found");
  for (; o.firstChild; )
    o.removeChild(o.firstChild);
  if (e.videoUrl.includes("youtube.com") || e.videoUrl.includes("youtu.be"))
    M(e, o, t);
  else if (e.videoUrl.includes("facebook.com") || e.videoUrl.includes("fb.com"))
    N(e, o, t);
  else if (e.videoUrl.includes("tiktok.com") || e.videoUrl.includes("tiktok"))
    S(e, o, t);
  else if (e.videoUrl.includes("twitter.com"))
    V(e, o, t);
  else if (e.videoUrl.includes("x.com"))
    A(e, o, t);
  else if (e.videoUrl.includes("vimeo.com"))
    T(e, o, t);
  else if (e.videoUrl.includes("dailymotion.com") || e.videoUrl.includes("dailymotion"))
    U(e, o, t);
  else if (e.videoUrl.includes("instagram.com") || e.videoUrl.includes("instagram"))
    k(e, o, t);
  else
    throw new Error("Invalid video URL");
};
const q = (e, t) => {
  const o = e.__vccOpts || e;
  for (const [a, n] of t)
    o[a] = n;
  return o;
}, D = {
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
    const t = p("56.25%");
    w(() => {
      R({
        videoUrl: e.clip,
        width: e.width,
        height: e.height,
        autoplay: e.autoplay,
        fullscreen: e.fullscreen,
        controls: e.controls,
        cssname: e.cssname
      }), o(e.width, e.height);
    }), f(() => [e.width, e.height], ([a, n]) => {
      o(a, n);
    }, { immediate: !0 });
    function o(a, n) {
      a && n ? t.value = `${n / a * 100}%` : t.value = "56.25%";
    }
    return {
      aspectRatio: t
    };
  }
}, B = (e) => (x("data-v-d26b150f"), e = e(), E(), e), H = /* @__PURE__ */ B(() => /* @__PURE__ */ I("div", { class: "video-content" }, null, -1)), j = [
  H
];
function W(e, t, o, a, n, s) {
  return y(), b("div", {
    class: g([o.cssname, "responsive-container"]),
    style: $({ "--aspect-ratio": a.aspectRatio, width: "auto", maxWidth: "100%" })
  }, j, 6);
}
const O = /* @__PURE__ */ q(D, [["render", W], ["__scopeId", "data-v-d26b150f"]]);
export {
  O as EmbediaVue
};

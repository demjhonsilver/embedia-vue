import { ref as p, onMounted as w, watch as f, openBlock as y, createElementBlock as b, normalizeClass as g, normalizeStyle as v, pushScopeId as $, popScopeId as E, createElementVNode as U } from "vue";
let u = 1;
const C = (e, t, o, s) => {
  const r = e.videoUrl, i = Number(e.width) + 140, c = I(r);
  if (!c)
    throw new Error("Invalid Instagram video URL");
  let n = document.getElementById(t);
  n || (n = document.createElement("div"), n.id = t, document.body.appendChild(n));
  let a = document.querySelector(`.${o}`);
  a || (a = document.createElement("div"), a.className = `video-${s} ${o}`, n.appendChild(a));
  const l = document.createElement("blockquote");
  l.className = "instagram-media", l.setAttribute("data-instgrm-permalink", `https://www.instagram.com/p/${c}/`), l.setAttribute("data-instgrm-version", "13"), l.style.width = `${e.width}px`, l.style.height = `${i}px`, l.style.maxWidth = "380px", l.style.maxheight = "520px";
  const d = document.createElement("a");
  if (d.href = r, l.appendChild(d), a.appendChild(l), !document.getElementById("instagramEmbedScript")) {
    const m = document.createElement("script");
    m.async = !0, m.id = "instagramEmbedScript", m.src = "//www.instagram.com/embed.js", n.appendChild(m);
  }
}, I = (e) => {
  const t = /\/([a-zA-Z0-9_-]+)\/?$/, o = e.match(t);
  return o ? o[1] : null;
}, _ = (e) => {
  const t = e.match(/\/(?:video|hub)\/([^_]+)/) || e.match(/(?:^|\/)([a-z0-9]+)(?:_[\w-]*)?$/i);
  if (t && t[1])
    return t[1];
  throw new Error("Invalid Dailymotion video URL");
}, k = (e, t, o) => {
  const s = e.videoUrl, r = _(s), i = e.autoplay ? "1" : "0", c = e.controls ? "1" : "0", n = e.fullscreen ? "1" : "0", a = document.createElement("iframe");
  a.src = `https://www.dailymotion.com/embed/video/${r}?autoplay=${i}&controls=${c}&fullscreen=${n}`, a.width = e.width || 640, a.height = e.height || 360, a.frameBorder = "0", a.allowFullscreen = !0, a.className = o, t.appendChild(a);
}, x = (e) => {
  const t = e.match(/\/(\d+)/);
  return t && t[1] ? t[1] : (console.error("Invalid Vimeo video URL"), "");
}, T = (e, t, o) => {
  const s = e.width || 640, r = e.height || 360, i = e.controls, c = e.autoplay === "true", n = e.loop === "true", a = x(e.videoUrl), l = document.createElement("div");
  l.className = `video-${u} ${o}`, l.dataset.eWidth = s, l.dataset.eHeight = r, l.dataset.efullscreen = e.fullscreen, l.dataset.eVideoId = a, t.appendChild(l);
  const d = document.createElement("script");
  return d.src = "https://player.vimeo.com/api/player.js", d.async = !0, d.onload = () => {
    new window.Vimeo.Player(l, {
      id: a,
      width: s,
      height: r,
      controls: i,
      autoplay: c,
      muted: c,
      loop: n
      // Set loop based on boolean value
    }).ready().then(() => {
    });
  }, document.body.appendChild(d), () => {
    l && (l.innerHTML = ""), document.body.removeChild(d);
  };
}, V = (e, t, o) => {
  const s = (r) => {
    const i = /\/status\/(\d+)/, c = r.match(i);
    return c && c[1] ? c[1] : null;
  };
  try {
    const r = e.videoUrl, i = s(r), c = document.createElement("div");
    c.className = `video-${u} ${o}`, c.id = `tweet-${i}`;
    const n = document.createElement("script");
    n.src = "https://platform.twitter.com/widgets.js", n.charset = "utf-8", n.async = !0, n.addEventListener("load", () => {
      window.twttr.widgets.createTweet(i, c);
    }), t.appendChild(c), t.appendChild(n);
  } catch (r) {
    console.error("Error embedding Twitter content:", r);
  }
}, S = (e, t, o) => {
  const s = (r) => {
    const i = /\/status\/(\d+)/, c = r.match(i);
    return c ? c[1] : null;
  };
  try {
    const r = e.videoUrl, i = s(r);
    if (!i)
      throw new Error("Invalid video URL");
    const c = document.createElement("div");
    c.className = `video-${u} ${o}`, c.id = `tweet-${i}`;
    const n = document.createElement("script");
    n.src = "https://platform.twitter.com/widgets.js", n.charset = "utf-8", n.async = !0, n.addEventListener("load", () => {
      window.twttr.widgets.createTweet(i, c);
    }), t.appendChild(c), t.appendChild(n);
  } catch (r) {
    console.error("Error embedding Twitter content:", r);
  }
}, h = /* @__PURE__ */ new Map(), A = (e, t, o) => {
  const s = e.videoUrl;
  if (h.has(s) || h.has(s))
    return;
  h.set(s, !0);
  const r = e.width || "100%", i = e.height || "100%", c = new XMLHttpRequest();
  c.open("GET", `https://www.tiktok.com/oembed?url=${encodeURIComponent(s)}`, !0), c.onload = function() {
    if (c.status >= 200 && c.status < 300) {
      const n = JSON.parse(c.responseText);
      n.html && (n.html = n.html.replace(/<script[^>]*>.*<\/script>/gi, ""));
      const a = document.createElement("div"), l = Date.now();
      if (a.className = `video-${l} ${o}`, a.style.width = r, a.style.height = i, a.innerHTML = n.html, !document.querySelector('script[src="https://www.tiktok.com/embed.js"]')) {
        const d = document.createElement("script");
        d.src = "https://www.tiktok.com/embed.js", document.body.appendChild(d);
      }
      t ? t.appendChild(a) : document.body && document.body.appendChild(a);
    } else
      console.error("Failed to fetch TikTok oEmbed data: " + c.statusText);
  }, c.onerror = function() {
    console.error("An error occurred while embedding TikTok video.");
  }, c.send();
}, N = (e, t, o) => {
  const s = e.videoUrl, r = e.autoplay ? "autoplay=true" : "autoplay=false", i = r ? "muted=true" : "muted=false", c = e.width || 640, n = e.height || 360, a = document.createElement("iframe");
  a.setAttribute("src", `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(s)}&width=${c}&height=${n}&show_text=false&${r}&${i}`), a.setAttribute("width", c), a.setAttribute("height", n), a.setAttribute("frameborder", "0"), e.fullscreen && a.setAttribute("allowfullscreen", "true"), a.className = `video-${u} ${o} custom-facebook`, u++, t.appendChild(a);
}, R = (e) => {
  const t = e.match(/(?:shorts\/|v=)([a-zA-Z0-9_-]{11})/);
  if (t && t[1])
    return t[1];
  const o = e.match(/(\?v=|\/embed\/|\/watch\?v=|\/v\/|\/e\/|youtu.be\/)([^#&?]*).*/);
  if (o && o[2].length === 11)
    return o[2];
  throw new Error("Invalid YouTube video URL");
}, L = (e, t, o) => {
  if (!t) {
    console.error("Container element not found.");
    return;
  }
  const s = e.autoplay ? 1 : 0, r = e.autoplay || e.muted ? 1 : 0, i = e.autoplay || e.loop ? 1 : 0, c = R(e.videoUrl), n = document.createElement("iframe");
  n.src = `https://www.youtube.com/embed/${c}?autoplay=${s}&mute=${r}&loop=${i ? 1 : 0}&controls=${e.controls ? 1 : 0}`, n.width = e.width || 640, n.height = e.height || 360, n.frameborder = "0", n.style.border = "none", e.fullscreen && n.setAttribute("allow", "fullscreen"), n.className = o, t.appendChild(n);
}, B = (e) => {
  var s;
  const t = ((s = e.cssname) == null ? void 0 : s.trim()) || "";
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
    L(e, o, t);
  else if (e.videoUrl.includes("facebook.com") || e.videoUrl.includes("fb.com"))
    N(e, o, t);
  else if (e.videoUrl.includes("tiktok.com") || e.videoUrl.includes("tiktok"))
    A(e, o, t);
  else if (e.videoUrl.includes("twitter.com"))
    V(e, o, t);
  else if (e.videoUrl.includes("x.com"))
    S(e, o, t);
  else if (e.videoUrl.includes("vimeo.com"))
    T(e, o, t);
  else if (e.videoUrl.includes("dailymotion.com") || e.videoUrl.includes("dailymotion"))
    k(e, o, t);
  else if (e.videoUrl.includes("instagram.com") || e.videoUrl.includes("instagram"))
    C(e, o, t);
  else
    throw new Error("Invalid video URL");
};
const M = (e, t) => {
  const o = e.__vccOpts || e;
  for (const [s, r] of t)
    o[s] = r;
  return o;
}, q = {
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
      B({
        videoUrl: e.clip,
        width: e.width,
        height: e.height,
        autoplay: e.autoplay,
        fullscreen: e.fullscreen,
        controls: e.controls,
        cssname: e.cssname
      }), o(e.width, e.height);
    }), f(() => [e.width, e.height], ([s, r]) => {
      o(s, r);
    }, { immediate: !0 });
    function o(s, r) {
      s && r ? t.value = `${r / s * 100}%` : t.value = "56.25%";
    }
    return {
      aspectRatio: t
    };
  }
}, j = (e) => ($("data-v-d26b150f"), e = e(), E(), e), W = /* @__PURE__ */ j(() => /* @__PURE__ */ U("div", { class: "video-content" }, null, -1)), z = [
  W
];
function D(e, t, o, s, r, i) {
  return y(), b("div", {
    class: g([o.cssname, "responsive-container"]),
    style: v({ "--aspect-ratio": s.aspectRatio, width: "auto", maxWidth: "100%" })
  }, z, 6);
}
const F = /* @__PURE__ */ M(q, [["render", D], ["__scopeId", "data-v-d26b150f"]]);
export {
  F as EmbediaVue
};

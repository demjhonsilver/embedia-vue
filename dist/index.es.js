import { ref as h, onMounted as p, watch as w, openBlock as f, createElementBlock as y, normalizeClass as b, normalizeStyle as g, pushScopeId as v, popScopeId as $, createElementVNode as E } from "vue";
let m = 1;
const U = (e, t, o, s) => {
  const r = e.videoUrl, i = C(r);
  if (!i)
    throw new Error("Invalid Instagram video URL");
  let n = document.getElementById(t);
  n || (n = document.createElement("div"), n.id = t, document.body.appendChild(n));
  let c = document.querySelector(`.${o}`);
  c || (c = document.createElement("div"), c.className = `video-${s} ${o}`, n.appendChild(c));
  const a = document.createElement("blockquote");
  a.setAttribute("class", "instagram-media"), a.setAttribute("data-instgrm-permalink", `https://www.instagram.com/p/${i}/`), a.setAttribute("data-instgrm-version", "13");
  const l = document.createElement("a");
  if (l.setAttribute("href", r), a.appendChild(l), c.appendChild(a), !document.getElementById("instagramEmbedScript")) {
    const d = document.createElement("script");
    d.setAttribute("async", ""), d.setAttribute("id", "instagramEmbedScript"), d.setAttribute("src", "//www.instagram.com/embed.js"), n.appendChild(d);
  }
}, C = (e) => {
  const t = /\/([a-zA-Z0-9_-]+)\/?$/, o = e.match(t);
  return o ? o[1] : null;
}, I = (e) => {
  const t = e.match(/\/(?:video|hub)\/([^_]+)/) || e.match(/(?:^|\/)([a-z0-9]+)(?:_[\w-]*)?$/i);
  if (t && t[1])
    return t[1];
  throw new Error("Invalid Dailymotion video URL");
}, _ = (e, t, o) => {
  const s = e.videoUrl, r = I(s), i = e.autoplay ? "1" : "0", n = e.controls ? "1" : "0", c = e.fullscreen ? "1" : "0", a = document.createElement("iframe");
  a.src = `https://www.dailymotion.com/embed/video/${r}?autoplay=${i}&controls=${n}&fullscreen=${c}`, a.width = e.width || 640, a.height = e.height || 360, a.frameBorder = "0", a.allowFullscreen = !0, a.className = o, t.appendChild(a);
}, k = (e) => {
  const t = e.match(/\/(\d+)/);
  return t && t[1] ? t[1] : (console.error("Invalid Vimeo video URL"), "");
}, T = (e, t, o) => {
  const s = e.width || 640, r = e.height || 360, i = e.controls, n = e.autoplay, c = e.loop, a = k(e.videoUrl), l = document.createElement("div");
  l.className = `video-${m} ${o}`, l.dataset.eWidth = s, l.dataset.eHeight = r, l.dataset.efullscreen = e.fullscreen, l.dataset.eVideoId = a, t.appendChild(l);
  const d = document.createElement("script");
  return d.src = "https://player.vimeo.com/api/player.js", d.async = !0, d.onload = () => {
    new window.Vimeo.Player(l, {
      id: a,
      width: s,
      height: r,
      controls: i,
      autoplay: n,
      muted: !!n,
      // Set muted to true if autoplay is true
      loop: c
    }).ready().then(() => {
    });
  }, document.body.appendChild(d), () => {
    l && (l.innerHTML = ""), document.body.removeChild(d);
  };
}, x = (e, t, o) => {
  const s = (r) => {
    const i = /\/status\/(\d+)/, n = r.match(i);
    return n && n[1] ? n[1] : null;
  };
  try {
    const r = e.videoUrl, i = s(r), n = document.createElement("div");
    n.className = `video-${m} ${o}`, n.id = `tweet-${i}`;
    const c = document.createElement("script");
    c.src = "https://platform.twitter.com/widgets.js", c.charset = "utf-8", c.async = !0, c.addEventListener("load", () => {
      window.twttr.widgets.createTweet(i, n);
    }), t.appendChild(n), t.appendChild(c);
  } catch (r) {
    console.error("Error embedding Twitter content:", r);
  }
}, V = (e, t, o) => {
  const s = (r) => {
    const i = /\/status\/(\d+)/, n = r.match(i);
    return n ? n[1] : null;
  };
  try {
    const r = e.videoUrl, i = s(r);
    if (!i)
      throw new Error("Invalid video URL");
    const n = document.createElement("div");
    n.className = `video-${m} ${o}`, n.id = `tweet-${i}`;
    const c = document.createElement("script");
    c.src = "https://platform.twitter.com/widgets.js", c.charset = "utf-8", c.async = !0, c.addEventListener("load", () => {
      window.twttr.widgets.createTweet(i, n);
    }), t.appendChild(n), t.appendChild(c);
  } catch (r) {
    console.error("Error embedding Twitter content:", r);
  }
}, u = /* @__PURE__ */ new Map(), A = (e, t, o) => {
  const s = e.videoUrl;
  if (u.has(s) || u.has(s))
    return;
  u.set(s, !0);
  const r = e.width || "100%", i = e.height || "100%", n = new XMLHttpRequest();
  n.open("GET", `https://www.tiktok.com/oembed?url=${encodeURIComponent(s)}`, !0), n.onload = function() {
    if (n.status >= 200 && n.status < 300) {
      const c = JSON.parse(n.responseText);
      c.html && (c.html = c.html.replace(/<script[^>]*>.*<\/script>/gi, ""));
      const a = document.createElement("div"), l = Date.now();
      if (a.className = `video-${l} ${o}`, a.style.width = r, a.style.height = i, a.innerHTML = c.html, !document.querySelector('script[src="https://www.tiktok.com/embed.js"]')) {
        const d = document.createElement("script");
        d.src = "https://www.tiktok.com/embed.js", document.body.appendChild(d);
      }
      t ? t.appendChild(a) : document.body && document.body.appendChild(a);
    } else
      console.error("Failed to fetch TikTok oEmbed data: " + n.statusText);
  }, n.onerror = function() {
    console.error("An error occurred while embedding TikTok video.");
  }, n.send();
}, S = (e, t, o) => {
  const s = e.videoUrl, r = e.autoplay ? "autoplay=true" : "autoplay=false", i = r ? "muted=true" : "muted=false", n = e.width || 640, c = e.height || 360, a = document.createElement("iframe");
  a.setAttribute("src", `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(s)}&width=${n}&height=${c}&show_text=false&${r}&${i}`), a.setAttribute("width", n), a.setAttribute("height", c), a.setAttribute("frameborder", "0"), e.fullscreen && a.setAttribute("allowfullscreen", "true"), a.className = `video-${m} ${o} custom-facebook`, m++, t.appendChild(a);
}, N = (e) => {
  const t = e.match(/(?:shorts\/|v=)([a-zA-Z0-9_-]{11})/);
  if (t && t[1])
    return t[1];
  const o = e.match(/(\?v=|\/embed\/|\/watch\?v=|\/v\/|\/e\/|youtu.be\/)([^#&?]*).*/);
  if (o && o[2].length === 11)
    return o[2];
  throw new Error("Invalid YouTube video URL");
}, R = (e, t, o) => {
  if (!t) {
    console.error("Container element not found.");
    return;
  }
  const s = e.autoplay ? 1 : 0, r = e.autoplay || e.muted ? 1 : 0, i = e.autoplay || e.loop ? 1 : 0, n = N(e.videoUrl), c = document.createElement("iframe");
  c.src = `https://www.youtube.com/embed/${n}?autoplay=${s}&mute=${r}&loop=${i ? 1 : 0}&controls=${e.controls ? 1 : 0}`, c.width = e.width || 640, c.height = e.height || 360, c.frameborder = "0", c.style.border = "none", e.fullscreen && c.setAttribute("allow", "fullscreen"), c.className = o, t.appendChild(c);
}, L = (e) => {
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
    R(e, o, t);
  else if (e.videoUrl.includes("facebook.com") || e.videoUrl.includes("fb.com"))
    S(e, o, t);
  else if (e.videoUrl.includes("tiktok.com") || e.videoUrl.includes("tiktok"))
    A(e, o, t);
  else if (e.videoUrl.includes("twitter.com"))
    x(e, o, t);
  else if (e.videoUrl.includes("x.com"))
    V(e, o, t);
  else if (e.videoUrl.includes("vimeo.com"))
    T(e, o, t);
  else if (e.videoUrl.includes("dailymotion.com") || e.videoUrl.includes("dailymotion"))
    _(e, o, t);
  else if (e.videoUrl.includes("instagram.com") || e.videoUrl.includes("instagram"))
    U(e, o, t);
  else
    throw new Error("Invalid video URL");
};
const B = (e, t) => {
  const o = e.__vccOpts || e;
  for (const [s, r] of t)
    o[s] = r;
  return o;
}, M = {
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
    const t = h("56.25%");
    p(() => {
      L({
        videoUrl: e.clip,
        width: e.width,
        height: e.height,
        autoplay: e.autoplay,
        fullscreen: e.fullscreen,
        controls: e.controls,
        cssname: e.cssname
      }), o(e.width, e.height);
    }), w(() => [e.width, e.height], ([s, r]) => {
      o(s, r);
    }, { immediate: !0 });
    function o(s, r) {
      s && r ? t.value = `${r / s * 100}%` : t.value = "56.25%";
    }
    return {
      aspectRatio: t
    };
  }
}, q = (e) => (v("data-v-d26b150f"), e = e(), $(), e), j = /* @__PURE__ */ q(() => /* @__PURE__ */ E("div", { class: "video-content" }, null, -1)), z = [
  j
];
function D(e, t, o, s, r, i) {
  return f(), y("div", {
    class: b([o.cssname, "responsive-container"]),
    style: g({ "--aspect-ratio": s.aspectRatio, width: "auto", maxWidth: "100%" })
  }, z, 6);
}
const F = /* @__PURE__ */ B(M, [["render", D], ["__scopeId", "data-v-d26b150f"]]);
export {
  F as EmbediaVue
};

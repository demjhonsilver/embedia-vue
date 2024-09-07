import { ref as h, onMounted as p, watch as f, openBlock as w, createElementBlock as y, normalizeClass as b, normalizeStyle as g, pushScopeId as v, popScopeId as $, createElementVNode as E } from "vue";
let u = 1;
const C = (e, t, o, a) => {
  const r = e.videoUrl, i = I(r);
  if (!i)
    throw new Error("Invalid Instagram video URL");
  let n = document.getElementById(t);
  n || (n = document.createElement("div"), n.id = t, document.body.appendChild(n));
  let c = document.querySelector(`.${o}`);
  c || (c = document.createElement("div"), c.className = `video-${a} ${o}`, n.appendChild(c));
  const s = document.createElement("blockquote");
  s.setAttribute("class", "instagram-media"), s.setAttribute("data-instgrm-permalink", `https://www.instagram.com/p/${i}/`), s.setAttribute("data-instgrm-version", "13");
  const l = document.createElement("a");
  if (l.setAttribute("href", r), s.appendChild(l), c.appendChild(s), !document.getElementById("instagramEmbedScript")) {
    const d = document.createElement("script");
    d.setAttribute("async", ""), d.setAttribute("id", "instagramEmbedScript"), d.setAttribute("src", "//www.instagram.com/embed.js"), n.appendChild(d);
  }
}, I = (e) => {
  const t = /\/([a-zA-Z0-9_-]+)\/?$/, o = e.match(t);
  return o ? o[1] : null;
}, _ = (e) => {
  const t = e.match(/\/(?:video|hub)\/([^_]+)/) || e.match(/(?:^|\/)([a-z0-9]+)(?:_[\w-]*)?$/i);
  if (t && t[1])
    return t[1];
  throw new Error("Invalid Dailymotion video URL");
}, U = (e, t, o) => {
  const a = e.videoUrl, r = _(a), i = e.autoplay ? "1" : "0", n = e.controls ? "1" : "0", c = e.fullscreen ? "1" : "0", s = document.createElement("iframe");
  s.src = `https://www.dailymotion.com/embed/video/${r}?autoplay=${i}&controls=${n}&fullscreen=${c}`, s.width = e.width || 640, s.height = e.height || 360, s.frameBorder = "0", s.allowFullscreen = !0, s.className = o, t.appendChild(s);
}, k = (e) => {
  const t = e.match(/\/(\d+)/);
  return t && t[1] ? t[1] : (console.error("Invalid Vimeo video URL"), "");
}, V = (e, t, o) => {
  const a = e.width || 640, r = e.height || 360, i = e.controls, n = e.autoplay, c = e.loop, s = k(e.videoUrl), l = document.createElement("div");
  l.className = `video-${u} ${o}`, l.dataset.eWidth = a, l.dataset.eHeight = r, l.dataset.efullscreen = e.fullscreen, l.dataset.eVideoId = s, t.appendChild(l);
  const d = document.createElement("script");
  return d.src = "https://player.vimeo.com/api/player.js", d.async = !0, d.onload = () => {
    new window.Vimeo.Player(l, {
      id: s,
      width: a,
      height: r,
      controls: i,
      autoplay: n,
      muted: !0,
      // Set muted to true for autoplay
      loop: c
    }).ready().then(() => {
    });
  }, document.body.appendChild(d), () => {
    l && (l.innerHTML = ""), document.body.removeChild(d);
  };
}, T = (e, t, o) => {
  const a = (r) => {
    const i = /\/status\/(\d+)/, n = r.match(i);
    return n && n[1] ? n[1] : null;
  };
  try {
    const r = e.videoUrl, i = a(r), n = document.createElement("div");
    n.className = `video-${u} ${o}`, n.id = `tweet-${i}`;
    const c = document.createElement("script");
    c.src = "https://platform.twitter.com/widgets.js", c.charset = "utf-8", c.async = !0, c.addEventListener("load", () => {
      window.twttr.widgets.createTweet(i, n);
    }), t.appendChild(n), t.appendChild(c);
  } catch (r) {
    console.error("Error embedding Twitter content:", r);
  }
}, m = /* @__PURE__ */ new Map(), x = (e, t, o) => {
  const a = e.videoUrl;
  if (m.has(a) || m.has(a))
    return;
  m.set(a, !0);
  const r = e.width || "100%", i = e.height || "100%", n = new XMLHttpRequest();
  n.open("GET", `https://www.tiktok.com/oembed?url=${encodeURIComponent(a)}`, !0), n.onload = function() {
    if (n.status >= 200 && n.status < 300) {
      const c = JSON.parse(n.responseText);
      c.html && (c.html = c.html.replace(/<script[^>]*>.*<\/script>/gi, ""));
      const s = document.createElement("div"), l = Date.now();
      if (s.className = `video-${l} ${o}`, s.style.width = r, s.style.height = i, s.innerHTML = c.html, !document.querySelector('script[src="https://www.tiktok.com/embed.js"]')) {
        const d = document.createElement("script");
        d.src = "https://www.tiktok.com/embed.js", document.body.appendChild(d);
      }
      t ? t.appendChild(s) : document.body && document.body.appendChild(s);
    } else
      console.error("Failed to fetch TikTok oEmbed data: " + n.statusText);
  }, n.onerror = function() {
    console.error("An error occurred while embedding TikTok video.");
  }, n.send();
}, A = (e, t, o) => {
  const a = e.videoUrl, r = e.autoplay ? "autoplay=true" : "autoplay=false", i = r ? "muted=true" : "muted=false", n = e.width || 640, c = e.height || 360, s = document.createElement("iframe");
  s.setAttribute("src", `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(a)}&width=${n}&height=${c}&show_text=false&${r}&${i}`), s.setAttribute("width", n), s.setAttribute("height", c), s.setAttribute("frameborder", "0"), e.fullscreen && s.setAttribute("allowfullscreen", "true"), s.className = `video-${u} ${o} custom-facebook`, u++, t.appendChild(s);
}, S = (e) => {
  const t = e.match(/(?:shorts\/|v=)([a-zA-Z0-9_-]{11})/);
  if (t && t[1])
    return t[1];
  const o = e.match(/(\?v=|\/embed\/|\/watch\?v=|\/v\/|\/e\/|youtu.be\/)([^#&?]*).*/);
  if (o && o[2].length === 11)
    return o[2];
  throw new Error("Invalid YouTube video URL");
}, N = (e, t, o) => {
  if (!t) {
    console.error("Container element not found.");
    return;
  }
  const a = e.autoplay ? 1 : 0, r = e.autoplay || e.muted ? 1 : 0, i = e.autoplay || e.loop ? 1 : 0, n = S(e.videoUrl), c = document.createElement("iframe");
  c.src = `https://www.youtube.com/embed/${n}?autoplay=${a}&mute=${r}&loop=${i ? 1 : 0}&controls=${e.controls ? 1 : 0}`, c.width = e.width || 640, c.height = e.height || 360, c.frameborder = "0", e.fullscreen && c.setAttribute("allow", "fullscreen"), c.className = o, t.appendChild(c);
}, R = (e) => {
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
    N(e, o, t);
  else if (e.videoUrl.includes("facebook.com") || e.videoUrl.includes("fb.com"))
    A(e, o, t);
  else if (e.videoUrl.includes("tiktok.com") || e.videoUrl.includes("tiktok"))
    x(e, o, t);
  else if (e.clip.includes("twitter.com") || e.clip.includes("x.com"))
    T(e, o, t);
  else if (e.videoUrl.includes("vimeo.com"))
    V(e, o, t);
  else if (e.videoUrl.includes("dailymotion.com") || e.videoUrl.includes("dailymotion"))
    U(e, o, t);
  else if (e.videoUrl.includes("instagram.com") || e.videoUrl.includes("instagram"))
    C(e, o, t);
  else
    throw new Error("Invalid video URL");
};
const L = (e, t) => {
  const o = e.__vccOpts || e;
  for (const [a, r] of t)
    o[a] = r;
  return o;
}, B = {
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
      R({
        videoUrl: e.clip,
        width: e.width,
        height: e.height,
        autoplay: e.autoplay,
        fullscreen: e.fullscreen,
        controls: e.controls,
        cssname: e.cssname
      }), o(e.width, e.height);
    }), f(() => [e.width, e.height], ([a, r]) => {
      o(a, r);
    }, { immediate: !0 });
    function o(a, r) {
      a && r ? t.value = `${r / a * 100}%` : t.value = "56.25%";
    }
    return {
      aspectRatio: t
    };
  }
}, M = (e) => (v("data-v-d26b150f"), e = e(), $(), e), q = /* @__PURE__ */ M(() => /* @__PURE__ */ E("div", { class: "video-content" }, null, -1)), j = [
  q
];
function z(e, t, o, a, r, i) {
  return w(), y("div", {
    class: b([o.cssname, "responsive-container"]),
    style: g({ "--aspect-ratio": a.aspectRatio, width: "auto", maxWidth: "100%" })
  }, j, 6);
}
const W = /* @__PURE__ */ L(B, [["render", z], ["__scopeId", "data-v-d26b150f"]]);
export {
  W as EmbediaVue
};

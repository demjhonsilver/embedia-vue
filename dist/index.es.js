import { ref as h, onMounted as p, watch as f, openBlock as w, createElementBlock as y, normalizeClass as b, normalizeStyle as g, pushScopeId as v, popScopeId as $, createElementVNode as E } from "vue";
let u = 1;
const C = (e, t, o, s) => {
  const a = e.videoUrl, i = I(a);
  if (!i)
    throw new Error("Invalid Instagram video URL");
  let n = document.getElementById(t);
  n || (n = document.createElement("div"), n.id = t, document.body.appendChild(n));
  let r = document.querySelector(`.${o}`);
  r || (r = document.createElement("div"), r.className = `video-${s} ${o}`, n.appendChild(r));
  const c = document.createElement("blockquote");
  c.setAttribute("class", "instagram-media"), c.setAttribute("data-instgrm-permalink", `https://www.instagram.com/p/${i}/`), c.setAttribute("data-instgrm-version", "13");
  const l = document.createElement("a");
  if (l.setAttribute("href", a), c.appendChild(l), r.appendChild(c), !document.getElementById("instagramEmbedScript")) {
    const d = document.createElement("script");
    d.setAttribute("async", ""), d.setAttribute("id", "instagramEmbedScript"), d.setAttribute("src", "//www.instagram.com/embed.js"), n.appendChild(d);
  }
}, I = (e) => {
  const t = /\/([a-zA-Z0-9_-]+)\/?$/, o = e.match(t);
  return o ? o[1] : null;
}, U = (e) => {
  const t = e.match(/\/(?:video|hub)\/([^_]+)/) || e.match(/(?:^|\/)([a-z0-9]+)(?:_[\w-]*)?$/i);
  if (t && t[1])
    return t[1];
  throw new Error("Invalid Dailymotion video URL");
}, _ = (e, t, o) => {
  const s = e.videoUrl, a = U(s), i = e.autoplay ? "1" : "0", n = e.controls ? "1" : "0", r = e.fullscreen ? "1" : "0", c = document.createElement("iframe");
  c.src = `https://www.dailymotion.com/embed/video/${a}?autoplay=${i}&controls=${n}&fullscreen=${r}`, c.width = e.width || 640, c.height = e.height || 360, c.frameBorder = "0", c.allowFullscreen = !0, c.className = o, t.appendChild(c);
}, k = (e) => {
  const t = e.match(/\/(\d+)/);
  return t && t[1] ? t[1] : (console.error("Invalid Vimeo video URL"), "");
}, V = (e, t, o) => {
  const s = e.width || 640, a = e.height || 360, i = e.controls, n = e.autoplay, r = e.loop, c = k(e.videoUrl), l = document.createElement("div");
  l.className = `video-${u} ${o}`, l.dataset.eWidth = s, l.dataset.eHeight = a, l.dataset.efullscreen = e.fullscreen, l.dataset.eVideoId = c, t.appendChild(l);
  const d = document.createElement("script");
  return d.src = "https://player.vimeo.com/api/player.js", d.async = !0, d.onload = () => {
    new window.Vimeo.Player(l, {
      id: c,
      width: s,
      height: a,
      controls: i,
      autoplay: n,
      muted: !0,
      // Set muted to true for autoplay
      loop: r
    }).ready().then(() => {
    });
  }, document.body.appendChild(d), () => {
    l && (l.innerHTML = ""), document.body.removeChild(d);
  };
}, T = (e, t, o) => {
  const s = (a) => {
    const i = /\/status\/(\d+)/, n = a.match(i);
    return n && n[1] ? n[1] : null;
  };
  try {
    const a = e.videoUrl, i = s(a), n = document.createElement("div");
    n.className = `video-${u} ${o}`, n.id = `tweet-${i}`;
    const r = document.createElement("script");
    r.src = "https://platform.twitter.com/widgets.js", r.charset = "utf-8", r.async = !0, r.addEventListener("load", () => {
      window.twttr.widgets.createTweet(i, n);
    }), t.appendChild(n), t.appendChild(r);
  } catch (a) {
    console.error("Error embedding Twitter content:", a);
  }
}, m = /* @__PURE__ */ new Map(), x = (e, t, o) => {
  const s = e.videoUrl;
  if (m.has(s) || m.has(s))
    return;
  m.set(s, !0);
  const a = e.width || "100%", i = e.height || "100%", n = new XMLHttpRequest();
  n.open("GET", `https://www.tiktok.com/oembed?url=${encodeURIComponent(s)}`, !0), n.onload = function() {
    if (n.status >= 200 && n.status < 300) {
      const r = JSON.parse(n.responseText);
      r.html && (r.html = r.html.replace(/<script[^>]*>.*<\/script>/gi, ""));
      const c = document.createElement("div"), l = Date.now();
      if (c.className = `video-${l} ${o}`, c.style.width = a, c.style.height = i, c.innerHTML = r.html, !document.querySelector('script[src="https://www.tiktok.com/embed.js"]')) {
        const d = document.createElement("script");
        d.src = "https://www.tiktok.com/embed.js", document.body.appendChild(d);
      }
      t ? t.appendChild(c) : document.body && document.body.appendChild(c);
    } else
      console.error("Failed to fetch TikTok oEmbed data: " + n.statusText);
  }, n.onerror = function() {
    console.error("An error occurred while embedding TikTok video.");
  }, n.send();
}, A = (e, t, o) => {
  const s = e.videoUrl, a = e.autoplay ? "autoplay=true" : "autoplay=false", i = a ? "muted=true" : "muted=false", n = e.width || 640, r = e.height || 360, c = document.createElement("iframe");
  c.setAttribute("src", `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(s)}&width=${n}&height=${r}&show_text=false&${a}&${i}`), c.setAttribute("width", n), c.setAttribute("height", r), c.setAttribute("frameborder", "0"), e.fullscreen && c.setAttribute("allowfullscreen", "true"), c.className = `video-${u} ${o} custom-facebook`, u++, t.appendChild(c);
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
  const s = e.autoplay ? 1 : 0, a = e.autoplay || e.muted ? 1 : 0, i = e.autoplay || e.loop ? 1 : 0, n = S(e.videoUrl), r = document.createElement("iframe");
  r.src = `https://www.youtube.com/embed/${n}?autoplay=${s}&mute=${a}&loop=${i ? 1 : 0}&controls=${e.controls ? 1 : 0}`, r.width = e.width || 640, r.height = e.height || 360, r.frameborder = "0", e.fullscreen && r.setAttribute("allow", "fullscreen"), r.className = o, t.appendChild(r);
}, R = (e) => {
  const t = e.cssname?.trim() || "";
  if (!t.match(/^[a-zA-Z_][\w-]*$/))
    throw console.error("Invalid class name:", t), new Error("Invalid class name");
  if (!document.querySelector(`#default-style-${t}`)) {
    const s = document.createElement("style");
    s.id = `default-style-${t}`, s.textContent = `
            .${t} {
              display: flex;
              justify-content: center;
              align-items: center;
              min-width: 256px;
              min-height: 144px;
              margin: auto;
            }
          `, document.head.appendChild(s);
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
  else if (e.videoUrl.includes("twitter.com"))
    T(e, o, t);
  else if (e.videoUrl.includes("vimeo.com"))
    V(e, o, t);
  else if (e.videoUrl.includes("dailymotion.com") || e.videoUrl.includes("dailymotion"))
    _(e, o, t);
  else if (e.videoUrl.includes("instagram.com") || e.videoUrl.includes("instagram"))
    C(e, o, t);
  else
    throw new Error("Invalid video URL");
};
const L = (e, t) => {
  const o = e.__vccOpts || e;
  for (const [s, a] of t)
    o[s] = a;
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
    }), f(() => [e.width, e.height], ([s, a]) => {
      o(s, a);
    }, { immediate: !0 });
    function o(s, a) {
      s && a ? t.value = `${a / s * 100}%` : t.value = "56.25%";
    }
    return {
      aspectRatio: t
    };
  }
}, M = (e) => (v("data-v-d26b150f"), e = e(), $(), e), q = /* @__PURE__ */ M(() => /* @__PURE__ */ E("div", { class: "video-content" }, null, -1)), j = [
  q
];
function z(e, t, o, s, a, i) {
  return w(), y("div", {
    class: b([o.cssname, "responsive-container"]),
    style: g({ "--aspect-ratio": s.aspectRatio, width: "auto", maxWidth: "100%" })
  }, j, 6);
}
const W = /* @__PURE__ */ L(B, [["render", z], ["__scopeId", "data-v-d26b150f"]]);
export {
  W as EmbediaVue
};

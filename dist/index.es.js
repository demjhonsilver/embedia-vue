import { ref as p, onMounted as w, watch as f, openBlock as y, createElementBlock as b, normalizeClass as g, normalizeStyle as $, pushScopeId as v, popScopeId as E, createElementVNode as I } from "vue";
let h = 1;
const k = (e, t, o, i) => {
  const n = e.videoUrl, a = Number(e.width) + 140, c = C(n);
  if (!c)
    throw new Error("Invalid Instagram video URL");
  let r = document.getElementById(t);
  r || (r = document.createElement("div"), r.id = t, document.body.appendChild(r));
  let s = document.querySelector(`.${o}`);
  s || (s = document.createElement("div"), s.className = `video-${i} ${o}`, r.appendChild(s));
  const l = document.createElement("blockquote");
  l.className = "instagram-media", l.setAttribute("data-instgrm-permalink", `https://www.instagram.com/p/${c}/`), l.setAttribute("data-instgrm-version", "13"), l.style.width = `${e.width}px`, l.style.height = `${a}px`, l.style.maxWidth = "380px", l.style.maxheight = "520px";
  const d = document.createElement("a");
  if (d.href = n, l.appendChild(d), s.appendChild(l), !document.getElementById("instagramEmbedScript")) {
    const m = document.createElement("script");
    m.async = !0, m.id = "instagramEmbedScript", m.src = "//www.instagram.com/embed.js", r.appendChild(m);
  }
}, C = (e) => {
  const t = /\/([a-zA-Z0-9_-]+)\/?$/, o = e.match(t);
  return o ? o[1] : null;
}, U = (e) => {
  const t = e.match(/\/(?:video|hub)\/([^_]+)/) || e.match(/(?:^|\/)([a-z0-9]+)(?:_[\w-]*)?$/i);
  if (t && t[1])
    return t[1];
  throw new Error("Invalid Dailymotion video URL");
}, x = (e, t, o) => {
  const i = e.videoUrl, n = U(i), a = e.autoplay ? "1" : "0", c = e.controls ? "1" : "0", r = e.fullscreen ? "1" : "0", s = document.createElement("iframe");
  s.src = `https://www.dailymotion.com/embed/video/${n}?autoplay=${a}&controls=${c}&fullscreen=${r}`, s.width = e.width || 640, s.height = e.height || 360, s.frameBorder = "0", s.allowFullscreen = !0, s.className = o, t.appendChild(s);
}, _ = (e) => {
  const t = e.match(/\/(\d+)/);
  return t && t[1] ? t[1] : (console.error("Invalid Vimeo video URL"), "");
}, T = (e, t, o) => {
  const i = e.width || 640, n = e.height || 360, a = e.controls, c = e.autoplay === "true", r = e.loop === "true", s = _(e.videoUrl), l = document.createElement("div");
  l.className = `video-${h} ${o}`, l.dataset.eWidth = i, l.dataset.eHeight = n, l.dataset.efullscreen = e.fullscreen, l.dataset.eVideoId = s, t.appendChild(l);
  const d = document.createElement("script");
  return d.src = "https://player.vimeo.com/api/player.js", d.async = !0, d.onload = () => {
    new window.Vimeo.Player(l, {
      id: s,
      width: i,
      height: n,
      controls: a,
      autoplay: c,
      muted: c,
      loop: r
      // Set loop based on boolean value
    }).ready().then(() => {
    });
  }, document.body.appendChild(d), () => {
    l && (l.innerHTML = ""), document.body.removeChild(d);
  };
}, V = (e, t, o) => {
  const i = (n) => {
    const a = /\/(?:i\/)?status\/(\d+)/, c = n.match(a);
    return c ? c[1] : null;
  };
  try {
    if (!(t instanceof Node)) {
      console.error("Container is not a valid DOM node.");
      return;
    }
    const n = e.videoUrl, a = i(n);
    if (!n || !a) {
      console.error("Invalid video clip URL or tweet ID.");
      return;
    }
    const c = document.createElement("blockquote");
    c.className = `twitter-tweet ${o}`, c.innerHTML = `
        <p lang="en" style="min-width: ${e.width}px; display: block;">
          <a href="${n}" style="display: inline-block; min-width: ${e.width}px;">
          </a>
        </p>
      `, t.appendChild(c);
    const r = document.createElement("script");
    r.src = "https://platform.twitter.com/widgets.js", r.charset = "utf-8", r.async = !0, r.addEventListener("load", () => {
      window.twttr.widgets.load();
    }), t.appendChild(r);
  } catch (n) {
    console.error("Error embedding Twitter content:", n);
  }
}, S = (e, t, o) => {
  const i = (n) => {
    n = n.replace("x.com", "twitter.com");
    const a = /\/(?:i\/)?status\/(\d+)/, c = n.match(a);
    return c ? c[1] : null;
  };
  try {
    if (!(t instanceof Node)) {
      console.error("Container is not a valid DOM node.");
      return;
    }
    const n = e.videoUrl, a = i(n);
    if (!n || !a) {
      console.error("Invalid video clip URL or tweet ID.");
      return;
    }
    const c = document.createElement("blockquote");
    c.className = `twitter-tweet ${o}`, c.innerHTML = `
        <p lang="en" style="min-width: ${e.width}px; display: block;">
          <a href="https://twitter.com/i/status/${a}" style="display: inline-block; min-width: ${e.width}px;">
          </a>
        </p>
      `, t.appendChild(c);
    const r = document.createElement("script");
    r.src = "https://platform.twitter.com/widgets.js", r.charset = "utf-8", r.async = !0, r.addEventListener("load", () => {
      window.twttr.widgets.load();
    }), t.appendChild(r);
  } catch (n) {
    console.error("Error embedding Twitter content:", n);
  }
}, u = /* @__PURE__ */ new Map(), N = (e, t, o) => {
  const i = e.videoUrl;
  if (u.has(i) || u.has(i))
    return;
  u.set(i, !0);
  const n = e.width || "100%", a = e.height || "100%", c = new XMLHttpRequest();
  c.open("GET", `https://www.tiktok.com/oembed?url=${encodeURIComponent(i)}`, !0), c.onload = function() {
    if (c.status >= 200 && c.status < 300) {
      const r = JSON.parse(c.responseText);
      r.html && (r.html = r.html.replace(/<script[^>]*>.*<\/script>/gi, ""));
      const s = document.createElement("div"), l = Date.now();
      if (s.className = `video-${l} ${o}`, s.style.width = n, s.style.height = a, s.innerHTML = r.html, !document.querySelector('script[src="https://www.tiktok.com/embed.js"]')) {
        const d = document.createElement("script");
        d.src = "https://www.tiktok.com/embed.js", document.body.appendChild(d);
      }
      t ? t.appendChild(s) : document.body && document.body.appendChild(s);
    } else
      console.error("Failed to fetch TikTok oEmbed data: " + c.statusText);
  }, c.onerror = function() {
    console.error("An error occurred while embedding TikTok video.");
  }, c.send();
}, L = (e, t, o) => {
  const i = e.videoUrl, n = e.autoplay ? "autoplay=true" : "autoplay=false", a = n ? "muted=true" : "muted=false", c = e.width || 640, r = e.height || 360, s = document.createElement("iframe");
  s.setAttribute("src", `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(i)}&width=${c}&height=${r}&show_text=false&${n}&${a}`), s.setAttribute("width", c), s.setAttribute("height", r), s.setAttribute("frameborder", "0"), e.fullscreen && s.setAttribute("allowfullscreen", "true"), s.className = `video-${h} ${o} custom-facebook`, h++, t.appendChild(s);
}, A = (e) => {
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
  const i = e.autoplay ? 1 : 0, n = e.autoplay || e.muted ? 1 : 0, a = e.autoplay || e.loop ? 1 : 0, c = A(e.videoUrl), r = document.createElement("iframe");
  r.src = `https://www.youtube.com/embed/${c}?autoplay=${i}&mute=${n}&loop=${a ? 1 : 0}&controls=${e.controls ? 1 : 0}`, r.width = e.width || 640, r.height = e.height || 360, r.frameborder = "0", r.style.border = "none", e.fullscreen && r.setAttribute("allow", "fullscreen"), r.className = o, t.appendChild(r);
}, R = (e) => {
  var i;
  const t = ((i = e.cssname) == null ? void 0 : i.trim()) || "";
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
    L(e, o, t);
  else if (e.videoUrl.includes("tiktok.com") || e.videoUrl.includes("tiktok"))
    N(e, o, t);
  else if (e.videoUrl.includes("twitter.com"))
    V(e, o, t);
  else if (e.videoUrl.includes("x.com"))
    S(e, o, t);
  else if (e.videoUrl.includes("vimeo.com"))
    T(e, o, t);
  else if (e.videoUrl.includes("dailymotion.com") || e.videoUrl.includes("dailymotion"))
    x(e, o, t);
  else if (e.videoUrl.includes("instagram.com") || e.videoUrl.includes("instagram"))
    k(e, o, t);
  else
    throw new Error("Invalid video URL");
};
const q = (e, t) => {
  const o = e.__vccOpts || e;
  for (const [i, n] of t)
    o[i] = n;
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
    }), f(() => [e.width, e.height], ([i, n]) => {
      o(i, n);
    }, { immediate: !0 });
    function o(i, n) {
      i && n ? t.value = `${n / i * 100}%` : t.value = "56.25%";
    }
    return {
      aspectRatio: t
    };
  }
}, B = (e) => (v("data-v-d26b150f"), e = e(), E(), e), H = /* @__PURE__ */ B(() => /* @__PURE__ */ I("div", { class: "video-content" }, null, -1)), j = [
  H
];
function W(e, t, o, i, n, a) {
  return y(), b("div", {
    class: g([o.cssname, "responsive-container"]),
    style: $({ "--aspect-ratio": i.aspectRatio, width: "auto", maxWidth: "100%" })
  }, j, 6);
}
const O = /* @__PURE__ */ q(D, [["render", W], ["__scopeId", "data-v-d26b150f"]]);
export {
  O as EmbediaVue
};

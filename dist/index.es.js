import { ref as b, onMounted as v, watch as E, openBlock as $, createElementBlock as x, normalizeClass as C, normalizeStyle as I, pushScopeId as k, popScopeId as U, createElementVNode as _ } from "vue";
let w = 1;
const T = (e, t, o, s) => {
  const n = e.videoUrl;
  let d, r;
  e.width == "", r = 370, e.height == "", d = 630;
  const c = V(n);
  if (!c)
    throw new Error("Invalid Instagram video URL");
  let i = document.getElementById(t);
  i || (i = document.createElement("div"), i.id = t, document.body.appendChild(i));
  let l = document.querySelector(`.${o}`);
  l || (l = document.createElement("div"), l.className = `video-${s} ${o}`, i.appendChild(l));
  const a = document.createElement("blockquote");
  a.className = "instagram-media", a.setAttribute("data-instgrm-permalink", `https://www.instagram.com/p/${c}/`), a.setAttribute("data-instgrm-version", "13"), a.style.width = `${r}px`, a.style.height = `${d}px`, a.style.maxWidth = "380px", a.style.maxheight = "630px";
  const m = document.createElement("a");
  if (m.href = n, a.appendChild(m), l.appendChild(a), !document.getElementById("instagramEmbedScript")) {
    const u = document.createElement("script");
    u.async = !0, u.id = "instagramEmbedScript", u.src = "//www.instagram.com/embed.js", i.appendChild(u);
  }
}, V = (e) => {
  const t = /\/([a-zA-Z0-9_-]+)\/?$/, o = e.match(t);
  return o ? o[1] : null;
}, S = (e) => {
  const t = e.match(/(?:video|hub)\/([^_]+)/) || e.match(/(?:^|\/)([a-z0-9]+)(?:_[\w-]*)?$/i);
  if (t && t[1])
    return t[1];
  throw new Error("Invalid Dailymotion video URL");
}, N = (e, t, o) => {
  const s = e.videoUrl, n = S(s), d = e.width || 640, r = e.height || 360;
  window.handleDailymotionResponse = (i) => {
    if (console.log("Dailymotion Response:", i), i.html) {
      const l = document.createElement("div");
      l.className = `${o} custom-dailymotion`, l.innerHTML = i.html;
      const a = l.querySelector("iframe");
      if (a) {
        a.style.width = `${d}px`, a.style.height = `${r}px`;
        const m = a.getAttribute("allow");
        m ? a.setAttribute("allow", m.replace("autoplay", "")) : a.setAttribute("allow", "fullscreen; picture-in-picture; muted");
      }
      t.appendChild(l);
    }
  };
  const c = document.createElement("script");
  c.src = `https://www.dailymotion.com/services/oembed?url=https://www.dailymotion.com/video/${n}&maxwidth=${d}&maxheight=${r}&format=json&callback=handleDailymotionResponse`, document.body.appendChild(c);
}, R = (e) => {
  const t = e.match(/\/(\d+)/);
  return t && t[1] ? t[1] : (console.error("Invalid Vimeo video URL"), "");
}, L = (e, t, o) => {
  const s = e.width || 640, n = e.height || 360, d = e.controls !== void 0 ? e.controls : !0, r = e.autoplay === !0, c = e.loop === "true", i = e.fullscreen === !0, l = R(e.videoUrl), a = document.createElement("div");
  a.className = `video-${l} ${o}`, a.dataset.eWidth = s, a.dataset.eHeight = n, a.dataset.efullscreen = i, a.dataset.eVideoId = l, t.appendChild(a);
  const m = document.createElement("script");
  return m.src = "https://player.vimeo.com/api/player.js", m.async = !0, m.onload = () => {
    new window.Vimeo.Player(a, {
      id: l,
      width: s,
      height: n,
      controls: d,
      // Show controls
      autoplay: r,
      // Autoplay based on the passed value (true/false)
      muted: r,
      // Mute if autoplay is true (to comply with browser restrictions)
      loop: c,
      // Loop based on the loop value
      fullscreen: i
    }).ready().then(() => {
      if (console.log("Vimeo player is ready"), i === !1) {
        const h = a.querySelector("iframe"), y = h.contentDocument || h.contentWindow.document, g = setInterval(() => {
          const f = y.querySelector(".vimeo-control-bar .fullscreen");
          f && (f.style.display = "none", clearInterval(g));
        }, 100);
      }
    }).catch((h) => {
      console.error("Error loading Vimeo player:", h);
    });
  }, document.body.appendChild(m), () => {
    a && (a.innerHTML = ""), m && m.parentNode && document.body.removeChild(m);
  };
}, q = (e, t, o) => {
  const s = (n) => {
    const d = /\/status\/(\d+)/, r = n.match(d);
    return r && r[1] ? r[1] : null;
  };
  try {
    const n = e.videoUrl, d = s(n), r = document.createElement("div");
    r.className = `video-${w} ${o}`, r.id = `tweet-${d}`;
    const c = document.createElement("script");
    c.src = "https://platform.twitter.com/widgets.js", c.charset = "utf-8", c.async = !0, c.addEventListener("load", () => {
      window.twttr.widgets.createTweet(d, r);
    }), t.appendChild(r), t.appendChild(c);
  } catch (n) {
    console.error("Error embedding Twitter content:", n);
  }
}, A = (e, t, o) => {
  const s = (n) => {
    n = n.replace("x.com", "twitter.com");
    const d = /\/(?:i\/)?status\/(\d+)/, r = n.match(d);
    return r ? r[1] : null;
  };
  try {
    if (!(t instanceof Node)) {
      console.error("Container is not a valid DOM node.");
      return;
    }
    const n = e.videoUrl, d = s(n), r = document.createElement("blockquote");
    r.className = `twitter-tweet ${o}`, r.innerHTML = `
        <p lang="en" style="min-width">
          <a href="https://twitter.com/i/status/${d}" style="display: inline-block; min-width: ${e.width}px;">
          </a>
        </p>
      `, t.appendChild(r);
    const c = document.createElement("script");
    c.src = "https://platform.x.com/widgets.js", c.charset = "utf-8", c.async = !0, c.addEventListener("load", () => {
      window.twttr.widgets.load();
    }), t.appendChild(c);
  } catch (n) {
    console.error("Error embedding Twitter content:", n);
  }
}, p = /* @__PURE__ */ new Map(), D = (e, t, o) => {
  const s = e.videoUrl;
  if (p.has(s) || p.has(s))
    return;
  p.set(s, !0);
  const n = e.width || "100%", d = e.height || "100%", r = new XMLHttpRequest();
  r.open("GET", `https://www.tiktok.com/oembed?url=${encodeURIComponent(s)}`, !0), r.onload = function() {
    if (r.status >= 200 && r.status < 300) {
      const c = JSON.parse(r.responseText);
      c.html && (c.html = c.html.replace(/<script[^>]*>.*<\/script>/gi, ""));
      const i = document.createElement("div"), l = Date.now();
      if (i.className = `video-${l} ${o}`, i.style.width = n, i.style.height = d, i.innerHTML = c.html, !document.querySelector('script[src="https://www.tiktok.com/embed.js"]')) {
        const a = document.createElement("script");
        a.src = "https://www.tiktok.com/embed.js", document.body.appendChild(a);
      }
      t ? t.appendChild(i) : document.body && document.body.appendChild(i);
    } else
      console.error("Failed to fetch TikTok oEmbed data: " + r.statusText);
  }, r.onerror = function() {
    console.error("An error occurred while embedding TikTok video.");
  }, r.send();
}, M = (e, t, o) => {
  const s = e.videoUrl, n = e.autoplay ?? !0, d = n, r = e.width || 640, c = e.height || 360, i = new URL("https://www.facebook.com/plugins/video.php");
  i.searchParams.set("href", s), i.searchParams.set("width", r), i.searchParams.set("height", c), i.searchParams.set("show_text", "false"), i.searchParams.set("autoplay", n ? "true" : "false"), i.searchParams.set("muted", d ? "1" : "0");
  const l = document.createElement("iframe");
  l.src = i.toString(), l.width = r, l.height = c, l.frameBorder = "0", l.allow = "autoplay; fullscreen", l.allowFullscreen = e.fullscreen !== !1, l.className = `video-${w} ${o} custom-facebook`, w++, t.appendChild(l);
}, B = (e) => {
  const t = e.match(/(?:shorts\/|v=)([a-zA-Z0-9_-]{11})/);
  if (t && t[1])
    return t[1];
  const o = e.match(/(\?v=|\/embed\/|\/watch\?v=|\/v\/|\/e\/|youtu.be\/)([^#&?]*).*/);
  if (o && o[2].length === 11)
    return o[2];
  throw new Error("Invalid YouTube video URL");
}, P = (e, t, o) => {
  if (!t) {
    console.error("Container element not found.");
    return;
  }
  const s = e.autoplay ? 1 : 0, n = e.autoplay || e.muted ? 1 : 0, d = e.autoplay || e.loop ? 1 : 0, r = B(e.videoUrl), c = document.createElement("iframe");
  c.src = `https://www.youtube.com/embed/${r}?autoplay=${s}&mute=${n}&loop=${d ? 1 : 0}&controls=${e.controls ? 1 : 0}`, c.width = e.width || 640, c.height = e.height || 360, c.frameborder = "0", c.style.border = "none", e.fullscreen && c.setAttribute("allow", "fullscreen"), c.className = o, t.appendChild(c);
}, j = (e) => {
  var s;
  const t = ((s = e.cssname) == null ? void 0 : s.trim()) || "";
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
    P(e, o, t);
  else if (e.videoUrl.includes("facebook.com") || e.videoUrl.includes("fb.com"))
    M(e, o, t);
  else if (e.videoUrl.includes("tiktok.com") || e.videoUrl.includes("tiktok"))
    D(e, o, t);
  else if (e.videoUrl.includes("twitter.com"))
    q(e, o, t);
  else if (e.videoUrl.includes("x.com"))
    A(e, o, t);
  else if (e.videoUrl.includes("vimeo.com"))
    L(e, o, t);
  else if (e.videoUrl.includes("dailymotion.com") || e.videoUrl.includes("dailymotion"))
    N(e, o, t);
  else if (e.videoUrl.includes("instagram.com") || e.videoUrl.includes("instagram"))
    T(e, o, t);
  else
    throw new Error("Invalid video URL");
};
const H = (e, t) => {
  const o = e.__vccOpts || e;
  for (const [s, n] of t)
    o[s] = n;
  return o;
}, W = {
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
    const t = b("56.25%");
    v(() => {
      j({
        videoUrl: e.clip,
        width: e.width,
        height: e.height,
        autoplay: e.autoplay,
        fullscreen: e.fullscreen,
        controls: e.controls,
        cssname: e.cssname
      }), o(e.width, e.height);
    }), E(() => [e.width, e.height], ([s, n]) => {
      o(s, n);
    }, { immediate: !0 });
    function o(s, n) {
      s && n ? t.value = `${n / s * 100}%` : t.value = "56.25%";
    }
    return {
      aspectRatio: t
    };
  }
}, z = (e) => (k("data-v-d26b150f"), e = e(), U(), e), F = /* @__PURE__ */ z(() => /* @__PURE__ */ _("div", { class: "video-content" }, null, -1)), O = [
  F
];
function Y(e, t, o, s, n, d) {
  return $(), x("div", {
    class: C([o.cssname, "responsive-container"]),
    style: I({ "--aspect-ratio": s.aspectRatio, width: "auto", maxWidth: "100%" })
  }, O, 6);
}
const X = /* @__PURE__ */ H(W, [["render", Y], ["__scopeId", "data-v-d26b150f"]]);
export {
  X as EmbediaVue
};

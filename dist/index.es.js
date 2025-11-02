import { ref as y, onMounted as b, watch as v, openBlock as g, createElementBlock as x, normalizeClass as $, normalizeStyle as C, pushScopeId as E, popScopeId as _, createElementVNode as k } from "vue";
let I = 1;
const T = (e) => {
  const t = e.match(/(?:video|hub)\/([^_]+)/) || e.match(/(?:^|\/)([a-z0-9]+)(?:_[\w-]*)?$/i);
  if (t && t[1])
    return t[1];
  throw new Error("Invalid Dailymotion video URL");
}, U = (e, t, o) => {
  const i = e.videoUrl, n = T(i), l = e.width || 640, r = e.height || 360;
  window.handleDailymotionResponse = (a) => {
    if (console.log("Dailymotion Response:", a), a.html) {
      const d = document.createElement("div");
      d.className = `${o} custom-dailymotion`, d.innerHTML = a.html;
      const s = d.querySelector("iframe");
      if (s) {
        s.style.width = `${l}px`, s.style.height = `${r}px`;
        const m = s.getAttribute("allow");
        m ? s.setAttribute("allow", m.replace("autoplay", "")) : s.setAttribute("allow", "fullscreen; picture-in-picture; muted");
      }
      t.appendChild(d);
    }
  };
  const c = document.createElement("script");
  c.src = `https://www.dailymotion.com/services/oembed?url=https://www.dailymotion.com/video/${n}&maxwidth=${l}&maxheight=${r}&format=json&callback=handleDailymotionResponse`, document.body.appendChild(c);
}, V = (e) => {
  const t = e.match(/\/(\d+)/);
  return t && t[1] ? t[1] : (console.error("Invalid Vimeo video URL"), "");
}, S = (e, t, o) => {
  const i = e.width || 640, n = e.height || 360, l = e.controls !== void 0 ? e.controls : !0, r = e.autoplay === !0, c = e.loop === "true", a = e.fullscreen === !0, d = V(e.videoUrl), s = document.createElement("div");
  s.className = `video-${d} ${o}`, s.dataset.eWidth = i, s.dataset.eHeight = n, s.dataset.efullscreen = a, s.dataset.eVideoId = d, t.appendChild(s);
  const m = document.createElement("script");
  return m.src = "https://player.vimeo.com/api/player.js", m.async = !0, m.onload = () => {
    new window.Vimeo.Player(s, {
      id: d,
      width: i,
      height: n,
      controls: l,
      // Show controls
      autoplay: r,
      // Autoplay based on the passed value (true/false)
      muted: r,
      // Mute if autoplay is true (to comply with browser restrictions)
      loop: c,
      // Loop based on the loop value
      fullscreen: a
    }).ready().then(() => {
      if (console.log("Vimeo player is ready"), a === !1) {
        const u = s.querySelector("iframe"), w = u.contentDocument || u.contentWindow.document, f = setInterval(() => {
          const p = w.querySelector(".vimeo-control-bar .fullscreen");
          p && (p.style.display = "none", clearInterval(f));
        }, 100);
      }
    }).catch((u) => {
      console.error("Error loading Vimeo player:", u);
    });
  }, document.body.appendChild(m), () => {
    s && (s.innerHTML = ""), m && m.parentNode && document.body.removeChild(m);
  };
}, M = (e, t, o) => {
  const i = (n) => {
    const l = /\/status\/(\d+)/, r = n.match(l);
    return r && r[1] ? r[1] : null;
  };
  try {
    const n = e.videoUrl, l = i(n), r = document.createElement("div");
    r.className = `video-${I} ${o}`, r.id = `tweet-${l}`;
    const c = document.createElement("script");
    c.src = "https://platform.twitter.com/widgets.js", c.charset = "utf-8", c.async = !0, c.addEventListener("load", () => {
      window.twttr.widgets.createTweet(l, r);
    }), t.appendChild(r), t.appendChild(c);
  } catch (n) {
    console.error("Error embedding Twitter content:", n);
  }
}, N = (e, t, o) => {
  const i = (n) => {
    n = n.replace("x.com", "twitter.com");
    const l = /\/(?:i\/)?status\/(\d+)/, r = n.match(l);
    return r ? r[1] : null;
  };
  try {
    if (!(t instanceof Node)) {
      console.error("Container is not a valid DOM node.");
      return;
    }
    const n = e.videoUrl, l = i(n), r = document.createElement("blockquote");
    r.className = `twitter-tweet ${o}`, r.innerHTML = `
        <p lang="en" style="min-width">
          <a href="https://twitter.com/i/status/${l}" style="display: inline-block; min-width: ${e.width}px;">
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
}, h = /* @__PURE__ */ new Map(), R = (e, t, o) => {
  const i = e.videoUrl;
  if (h.has(i) || h.has(i))
    return;
  h.set(i, !0);
  const n = e.width || "100%", l = e.height || "100%", r = new XMLHttpRequest();
  r.open("GET", `https://www.tiktok.com/oembed?url=${encodeURIComponent(i)}`, !0), r.onload = function() {
    if (r.status >= 200 && r.status < 300) {
      const c = JSON.parse(r.responseText);
      c.html && (c.html = c.html.replace(/<script[^>]*>.*<\/script>/gi, ""));
      const a = document.createElement("div"), d = Date.now();
      if (a.className = `video-${d} ${o}`, a.style.width = n, a.style.height = l, a.innerHTML = c.html, !document.querySelector('script[src="https://www.tiktok.com/embed.js"]')) {
        const s = document.createElement("script");
        s.src = "https://www.tiktok.com/embed.js", document.body.appendChild(s);
      }
      t ? t.appendChild(a) : document.body && document.body.appendChild(a);
    } else
      console.error("Failed to fetch TikTok oEmbed data: " + r.statusText);
  }, r.onerror = function() {
    console.error("An error occurred while embedding TikTok video.");
  }, r.send();
}, D = (e) => {
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
  const i = e.autoplay ? 1 : 0, n = e.autoplay || e.muted ? 1 : 0, l = e.autoplay || e.loop ? 1 : 0, r = D(e.videoUrl), c = document.createElement("iframe");
  c.src = `https://www.youtube.com/embed/${r}?autoplay=${i}&mute=${n}&loop=${l ? 1 : 0}&controls=${e.controls ? 1 : 0}`, c.width = e.width || 640, c.height = e.height || 360, c.frameborder = "0", c.style.border = "none", e.fullscreen && c.setAttribute("allow", "fullscreen"), c.className = o, t.appendChild(c);
}, q = (e) => {
  var i;
  const t = ((i = e.cssname) == null ? void 0 : i.trim()) || "";
  if (!t.match(/^[a-zA-Z_][\w-]*$/))
    throw console.error("Invalid class name:", t), new Error("Invalid class name");
  if (!document.querySelector(`#default-style-${t}`)) {
    const n = document.createElement("style");
    n.id = `default-style-${t}`, n.textContent = `
            .${t} {
              display: flex;
              max-width: 1920px !important;
              justify-content: center;
              align-items: center;
              min-width: 256px;
              min-height: 144px;
              margin: auto;
            }
              body { 
              display: block !important;
    }
          `, document.head.appendChild(n);
  }
  const o = document.querySelector(`.${t}`);
  if (!o)
    throw console.error("Container not found for class:", t), new Error("Container not found");
  for (; o.firstChild; )
    o.removeChild(o.firstChild);
  if (e.videoUrl.includes("youtube.com") || e.videoUrl.includes("youtu.be"))
    L(e, o, t);
  else if (e.videoUrl.includes("tiktok.com") || e.videoUrl.includes("tiktok"))
    R(e, o, t);
  else if (e.videoUrl.includes("twitter.com"))
    M(e, o, t);
  else if (e.videoUrl.includes("x.com"))
    N(e, o, t);
  else if (e.videoUrl.includes("vimeo.com"))
    S(e, o, t);
  else if (e.videoUrl.includes("dailymotion.com") || e.videoUrl.includes("dailymotion"))
    U(e, o, t);
  else
    throw new Error("Invalid video URL");
};
const A = (e, t) => {
  const o = e.__vccOpts || e;
  for (const [i, n] of t)
    o[i] = n;
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
      default: 1366
      // max default width
    },
    height: {
      type: [Number, String],
      default: 768
      // max default height
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
    const t = y("56.25%");
    b(() => {
      q({
        videoUrl: e.clip,
        width: e.width,
        height: e.height,
        autoplay: e.autoplay,
        fullscreen: e.fullscreen,
        controls: e.controls,
        cssname: e.cssname
      }), o(e.width, e.height);
    }), v(() => [e.width, e.height], ([i, n]) => {
      o(i, n);
    }, { immediate: !0 });
    function o(i, n) {
      i && n ? t.value = `${n / i * 100}%` : t.value = "56.25%";
    }
    return {
      aspectRatio: t
    };
  }
}, B = (e) => (E("data-v-1b3c3886"), e = e(), _(), e), H = /* @__PURE__ */ B(() => /* @__PURE__ */ k("div", { class: "video-content" }, null, -1)), W = [
  H
];
function z(e, t, o, i, n, l) {
  return g(), x("div", {
    class: $([o.cssname, "responsive-container"]),
    style: C({ "--aspect-ratio": i.aspectRatio, width: "auto", maxWidth: "100%" })
  }, W, 6);
}
const Y = /* @__PURE__ */ A(j, [["render", z], ["__scopeId", "data-v-1b3c3886"]]);
export {
  Y as EmbediaVue
};

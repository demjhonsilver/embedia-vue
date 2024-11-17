  /* # Embedia Vue core license
  
  Embedia Vue is released under the MIT license:
  
  MIT License
  
  Copyright (c) [2024] [Demjhon Silver]
  
  Permission is hereby granted, free of charge, to any person obtaining a copy
  of this software and associated documentation files Embedia Vue, to deal
  in the Software without restriction, including without limitation the rights
  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  copies of the Software, and to permit persons to whom the Software is
  furnished to do so, subject to the following conditions:
  
  The above copyright notice and this permission notice shall be included in all
  copies or substantial portions of the Software.
  
  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
  SOFTWARE. */

  
  
  let videoCount = 1; // Initialize videoCount

  const embedInstagram = (video, containerId, cssClassName, videoCount) => {
    const clipUrl = video.videoUrl;
    const hc = Number(video.width) + 140;
    // Extract the video ID from the URL
    const videoId = extractInstagramVideoId(clipUrl);
    if (!videoId) {
      throw new Error('Invalid Instagram video URL');
    }
  
    // Ensure the container element exists
    let embedContainer = document.getElementById(containerId);
    if (!embedContainer) {
      embedContainer = document.createElement('div');
      embedContainer.id = containerId;
      document.body.appendChild(embedContainer);
    }
  
    // Create or find the playerDiv for the Instagram video
    let playerDiv = document.querySelector(`.${cssClassName}`);
    if (!playerDiv) {
      playerDiv = document.createElement('div');
      playerDiv.className = `video-${videoCount} ${cssClassName}`;
      embedContainer.appendChild(playerDiv);
    }
  
    // Create the blockquote element for Instagram embed
    const blockquote = document.createElement('blockquote');
    blockquote.className = 'instagram-media';
    blockquote.setAttribute('data-instgrm-permalink', `https://www.instagram.com/p/${videoId}/`);
    blockquote.setAttribute('data-instgrm-version', '13');
    blockquote.style.width = `${video.width}px`;
    blockquote.style.height = `${hc}px`;
    blockquote.style.maxWidth = '380px';
    blockquote.style.maxheight = '520px';

    const anchor = document.createElement('a');
    anchor.href = clipUrl;
    blockquote.appendChild(anchor);
  
    // Append the blockquote to the playerDiv
    playerDiv.appendChild(blockquote);
  
    // Append the Instagram embed script if it doesn't exist
    if (!document.getElementById('instagramEmbedScript')) {
      const script = document.createElement('script');
      script.async = true;
      script.id = 'instagramEmbedScript';
      script.src = '//www.instagram.com/embed.js';
      embedContainer.appendChild(script);
    }
  };
  
  // Regular expression to extract Instagram video ID from URL
  const extractInstagramVideoId = (url) => {
    const regex = /\/([a-zA-Z0-9_-]+)\/?$/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };
  



    
    const extractDailymotionVideoId = (url) => {
      const videoIdMatch = url.match(/\/(?:video|hub)\/([^_]+)/) || url.match(/(?:^|\/)([a-z0-9]+)(?:_[\w-]*)?$/i);
      if (videoIdMatch && videoIdMatch[1]) {
        return videoIdMatch[1];
      }
      throw new Error("Invalid Dailymotion video URL");
    };
    
  
    const embedDailymotion = (video, container, cssname) => {
      const clip = video.clip;
      const videoId = extractDailymotionVideoId(clip);
      const autoplayValue = video.autoplay ? '1' : '0';
      const controlsValue = video.controls ? '1' : '0';
      const fullscreenValue = video.fullscreen ? '1' : '0';
  
      // Log iframe URL for debugging
      const iframe = document.createElement("iframe");
      iframe.src = `https://www.dailymotion.com/embed/video/${videoId}?autoplay=${autoplayValue}&controls=${controlsValue}&fullscreen=${fullscreenValue}`;
      iframe.width = video.width || 640;
      iframe.height = video.height || 360;
  
      iframe.allowFullscreen = video.fullscreen !== false; // Allow fullscreen unless explicitly disabled
    
      iframe.frameBorder = "0";
  
  
      iframe.className = cssname;
      container.appendChild(iframe);
  };
  
    
    
    
    
    

// Function to extract Vimeo video ID from a URL
const extractVimeoVideoId = (url) => {
  const videoIdMatch = url.match(/\/(\d+)/);
  if (videoIdMatch && videoIdMatch[1]) {
    return videoIdMatch[1];
  } else {
    console.error("Invalid Vimeo video URL");
    return "";
  }
};

// Function to embed Vimeo video
const embedVimeo = (video, container, cssname) => {
  const emWidth = video.width || 640;  // Default width if not provided
  const emHeight = video.height || 360; // Default height if not provided
  const controlsValue = video.controls !== undefined ? video.controls : true;  // Default to true if not provided
  const autoplayValue = video.autoplay === true; // Autoplay set to boolean true
  const loopValue = video.loop === "true"; // Convert loop to boolean
  const fullscreenValue = video.fullscreen === true;  // Fullscreen option, converted to boolean

  // Extract the Vimeo video ID from the URL
  const videoId = extractVimeoVideoId(video.clip);
  
  // Create a div to hold the Vimeo player
  const playerDiv = document.createElement("div");
  playerDiv.className = `video-${videoId} ${cssname}`;
  playerDiv.dataset.eWidth = emWidth;
  playerDiv.dataset.eHeight = emHeight;
  playerDiv.dataset.efullscreen = fullscreenValue; // Data attribute for fullscreen
  playerDiv.dataset.eVideoId = videoId;

  // Append the player container to the given container
  container.appendChild(playerDiv);

  // Load the Vimeo API script dynamically
  const script = document.createElement("script");
  script.src = "https://player.vimeo.com/api/player.js";
  script.async = true;

  script.onload = () => {
    // Initialize the Vimeo player after the script has loaded
    const vimeoPlayer = new window.Vimeo.Player(playerDiv, {
      id: videoId,
      width: emWidth,
      height: emHeight,
      controls: controlsValue,  // Show controls
      autoplay: autoplayValue,  // Autoplay based on the passed value (true/false)
      muted: autoplayValue,     // Mute if autoplay is true (to comply with browser restrictions)
      loop: loopValue,       // Loop based on the loop value
      fullscreen: fullscreenValue,      
    });

    // Ready callback
    vimeoPlayer.ready().then(() => {
      console.log('Vimeo player is ready');

      // If fullscreen is set to false, hide the fullscreen button from the controls
      if (fullscreenValue === false) {
        const iframe = playerDiv.querySelector("iframe");
        const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
        
        // Wait for the player to load before attempting to hide fullscreen button
        const interval = setInterval(() => {
          const fullscreenButton = iframeDocument.querySelector('.vimeo-control-bar .fullscreen');
          
          if (fullscreenButton) {
            fullscreenButton.style.display = 'none';  // Hide fullscreen button in controls
            clearInterval(interval);
          }
        }, 100);
      }
    }).catch((error) => {
      console.error('Error loading Vimeo player:', error);
    });
  };

  // Append the script to the body to load it
  document.body.appendChild(script);

  // Cleanup function to remove the player and script when no longer needed
  return () => {
    if (playerDiv) {
      playerDiv.innerHTML = "";
    }
    if (script && script.parentNode) {
      document.body.removeChild(script);
    }
  };
};
    
    





    
  const embedTwitter = (video, container, cssname) => {
    
    const extractTwitterTweetId = (url) => {
      const regex = /\/status\/(\d+)/;
      const match = url.match(regex);
  
      if (match && match[1]) {
        return match[1];
      } else {
        return null; // No match found
      }
    };
  
    try {
      const videoUrl = video.videoUrl;
      const tweetId = extractTwitterTweetId(videoUrl);
  
      // Create a div to hold the embedded tweet
      const tweetContainer = document.createElement("div");
  
      // Apply the cssname to the tweetContainer
      tweetContainer.className = `video-${videoCount} ${cssname}`;
  
      // Set the ID for the tweet container
      tweetContainer.id = `tweet-${tweetId}`;
  
      // Add the Twitter widget script to the page and wait for it to load
      const twitterWidgetScript = document.createElement("script");
      twitterWidgetScript.src = "https://platform.twitter.com/widgets.js";
      twitterWidgetScript.charset = "utf-8";
      twitterWidgetScript.async = true;
  
      // Attach a load event listener to the script
      twitterWidgetScript.addEventListener("load", () => {
        // The Twitter widget script has loaded, and the tweet is now embedded.
        // You can perform any additional actions here if needed.
        window.twttr.widgets.createTweet(tweetId, tweetContainer);
      });
  
      // Append the tweet container to the provided container
      container.appendChild(tweetContainer);
      container.appendChild(twitterWidgetScript);
  
    } catch (error) {
      console.error("Error embedding Twitter content:", error);
    }
  };
  
  

  const embedX = (video, container, cssname) => {
    const extractTwitterTweetId = (url) => {
      const regex = /\/status\/(\d+)/;
      const match = url.match(regex);
      return match ? match[1] : null; // Return tweet ID or null
    };
  
    try {
      const videoUrl = video.videoUrl;
      const tweetId = extractTwitterTweetId(videoUrl);
  
      if (!tweetId) {
        throw new Error("Invalid video URL"); // Throw error if tweet ID not found
      }
  
      const tweetContainer = document.createElement("div");
      tweetContainer.className = `video-${videoCount} ${cssname}`;
      tweetContainer.id = `tweet-${tweetId}`;
  
      const twitterWidgetScript = document.createElement("script");
      twitterWidgetScript.src = "https://platform.twitter.com/widgets.js";
      twitterWidgetScript.charset = "utf-8";
      twitterWidgetScript.async = true;
  
      twitterWidgetScript.addEventListener("load", () => {
        window.twttr.widgets.createTweet(tweetId, tweetContainer);
      });
  
      container.appendChild(tweetContainer);
      container.appendChild(twitterWidgetScript);
    } catch (error) {
      console.error("Error embedding Twitter content:", error);
    }
  };
  
  



  




    // Map to track embedded TikTok videos
    const embeddedTikTokVideos = new Map();
    
    const embedTiktok = (video, container, cssname) => {
      const videoUrl = video.videoUrl;
    
      // Check if the TikTok video URL has already been embedded
      if (embeddedTikTokVideos.has(videoUrl)) {
        // Video has already been embedded, no need to embed it again
        return;
      }
    
      // Check if the TikTok video URL has already been embedded
    
      if (embeddedTikTokVideos.has(videoUrl)) {
    
        // Video has already been embedded, no need to embed it again
    
        return;
    
      }
    
    
    
    
      // Mark the TikTok video URL as embedded
    
      embeddedTikTokVideos.set(videoUrl, true);
    
    
    
      const width = video.width || '100%'; // Default width if not provided
    
      const height = video.height || '100%'; // Default height if not provided
    
    
    
      const xhr = new XMLHttpRequest();
    
      xhr.open('GET', `https://www.tiktok.com/oembed?url=${encodeURIComponent(videoUrl)}`, true);
    
    
    
      xhr.onload = function () {
    
        if (xhr.status >= 200 && xhr.status < 300) {
    
          const data = JSON.parse(xhr.responseText);
    
    
    
          if (data.html) {
    
            data.html = data.html.replace(/<script[^>]*>.*<\/script>/gi, '');
    
          }
    
    
    
          const videoContainer = document.createElement('div');
    
          const videoCount = Date.now();
    
    
    
          // Apply the cssname to the videoContainer
    
          videoContainer.className = `video-${videoCount} ${cssname}`;
    
    
    
          // Set the width and height of the videoContainer
    
          videoContainer.style.width = width;
    
          videoContainer.style.height = height;
    
    
    
          videoContainer.innerHTML = data.html;
    
    
    
          // Check if the TikTok embed script is already loaded
    
          if (!document.querySelector('script[src="https://www.tiktok.com/embed.js"]')) {
    
            // Dynamically load the TikTok embed script
    
            const embedBinderTikTok = document.createElement('script');
    
            embedBinderTikTok.src = 'https://www.tiktok.com/embed.js';
    
            document.body.appendChild(embedBinderTikTok);
    
          }
    
    
    
          if (container) {
    
            // Append the videoContainer to the specified container (if provided)
    
            container.appendChild(videoContainer);
    
          } else if (document.body) {
    
            // Append the videoContainer to the body if no container is specified
    
            document.body.appendChild(videoContainer);
    
          }
    
        } else {
    
          console.error('Failed to fetch TikTok oEmbed data: ' + xhr.statusText);
    
        }
    
      };
    
    
    
      xhr.onerror = function () {
    
        console.error('An error occurred while embedding TikTok video.');
    
      };
    
    
    
      xhr.send();
    
    };
    
    
    
    
    
    
    
    const embedFacebook = (video, container, cssname) => {
      const clip = video.clip;
      const autoplayc = video.autoplay ?? true; // Default to true if not specified
      const muted = autoplayc; // Default to true if not specified
      const emWidth = video.width || 640;
      const emHeight = video.height || 360;
    
      // Construct the video URL with parameters
      const videoSrc = new URL('https://www.facebook.com/plugins/video.php');
      videoSrc.searchParams.set('href', clip);
      videoSrc.searchParams.set('width', emWidth);
      videoSrc.searchParams.set('height', emHeight);
      videoSrc.searchParams.set('show_text', 'false');
      videoSrc.searchParams.set('autoplay', autoplayc ? 'true' : 'false'); // Autoplay only if muted
      videoSrc.searchParams.set('muted', muted ? '1' : '0');
    
      // Create an iframe element for the Facebook video
      const iframe = document.createElement('iframe');
      iframe.src = videoSrc.toString();
      iframe.width = emWidth;
      iframe.height = emHeight;
      iframe.frameBorder = '0';
       // Allow autoplay and fullscreen permissions
      iframe.allow = 'autoplay; fullscreen'; // Permissions for autoplay and fullscreen
      iframe.allowFullscreen = video.fullscreen !== false; // Allow fullscreen unless explicitly disabled
    
      iframe.className = `video-${videoCount} ${cssname} custom-facebook`;
    
      videoCount++;
    
      // Append iframe to the container
      container.appendChild(iframe);
    };
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    // Function to extract YouTube video ID from a URL
    const extractYouTubeVideoId = (url) => {
      // Check if it's a YouTube Shorts URL
      const shortsMatch = url.match(/(?:shorts\/|v=)([a-zA-Z0-9_-]{11})/);
      if (shortsMatch && shortsMatch[1]) {
        return shortsMatch[1];
      }
    
      // Check if it's a regular YouTube video URL
      const videoIdMatch = url.match(/(\?v=|\/embed\/|\/watch\?v=|\/v\/|\/e\/|youtu.be\/)([^#&?]*).*/);
      if (videoIdMatch && videoIdMatch[2].length === 11) {
        return videoIdMatch[2];
      }
    
      throw new Error("Invalid YouTube video URL");
    };
    
    
    const embedYouTube = (video, container, cssname) => {
      if (!container) {
        console.error("Container element not found.");
        return;
      }
    
      const autoplayValue = video.autoplay ? 1 : 0;
      const muteValue = video.autoplay ? 1 : video.muted ? 1 : 0;
      const loopValue = video.autoplay ? 1 : video.loop ? 1 : 0;
    
      const videoId = extractYouTubeVideoId(video.videoUrl);
    
      // Create an iframe element for the YouTube player
      const iframe = document.createElement("iframe");
      iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=${autoplayValue}&mute=${muteValue}&loop=${loopValue ? 1 : 0}&controls=${video.controls ? 1 : 0}`;
    
      iframe.width = video.width || 640;
      iframe.height = video.height || 360;
      iframe.frameborder = "0";
      iframe.style.border = "none"; 
      
    
    
      if (video.fullscreen) {
        iframe.setAttribute("allow", "fullscreen");
      }
    
    
    
      // Apply the cssname to the iframe element
      iframe.className = cssname;
    
      // Append the iframe to the provided container
      container.appendChild(iframe);
    };
    
  
  
      // Export functions and types
   export { embedYouTube, embedFacebook, embedTiktok, embedTwitter, embedX, embedVimeo, embedDailymotion, embedInstagram };
  
  
    /* # Embedia Vue core license
    
    Embedia Vue is released under the MIT license:
    
    MIT License
    
    Copyright (c) [2024] [Demjhon Silver]
    
    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files Embedia Vue, to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:
    
    The above copyright notice and this permission notice shall be included in all
    copies or substantial portions of the Software.
    
    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    SOFTWARE. */
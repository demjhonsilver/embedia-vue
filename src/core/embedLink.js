  /* # Embedia Vue core license
  
MIT License

Copyright (c) 2024 Demjhon Silver

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE. */

  
  
  let videoCount = 1; // Initialize videoCount

// Function to extract the Dailymotion video ID from the URL
const extractDailymotionVideoId = (url) => {
  const videoIdMatch = url.match(/(?:video|hub)\/([^_]+)/) || url.match(/(?:^|\/)([a-z0-9]+)(?:_[\w-]*)?$/i);
  if (videoIdMatch && videoIdMatch[1]) {
    return videoIdMatch[1];
  }
  throw new Error("Invalid Dailymotion video URL");
};

// Function to embed the Dailymotion video with autoplay disabled
const embedDailymotion = (video, container, cssname) => {
  const videoUrl = video.videoUrl;  // Ensure this is a valid Dailymotion URL
  const videoId = extractDailymotionVideoId(videoUrl); // Extract video ID
  const maxwidth = video.width || 640;  // Default width if not provided
  const maxheight = video.height || 360;  // Default height if not provided

  // Function to handle the oEmbed response from Dailymotion
  window.handleDailymotionResponse = (data) => {
    console.log("Dailymotion Response:", data);
    if (data.html) {
      // Create a container for the video
      const videoContainer = document.createElement("div");
      videoContainer.className = `${cssname} custom-dailymotion`;
      videoContainer.innerHTML = data.html;

      const videoElement = videoContainer.querySelector('iframe');
      if (videoElement) {
        // Apply width and height to iframe
        videoElement.style.width = `${maxwidth}px`;
        videoElement.style.height = `${maxheight}px`;

        // Manually modify the 'allow' attribute to remove autoplay
        const allowAttr = videoElement.getAttribute('allow');
        
        // Remove autoplay from the 'allow' attribute
        if (allowAttr) {
          videoElement.setAttribute('allow', allowAttr.replace('autoplay', ''));
        } else {
          // If 'allow' is not defined, we set the value without autoplay
          videoElement.setAttribute('allow', 'fullscreen; picture-in-picture; muted');
        }
      }

      // Append the video container with the iframe to the provided container
      container.appendChild(videoContainer);
    }
  };

  // Make the oEmbed API request (without autoplay)
  const script = document.createElement("script");
  script.src = `https://www.dailymotion.com/services/oembed?url=https://www.dailymotion.com/video/${videoId}&maxwidth=${maxwidth}&maxheight=${maxheight}&format=json&callback=handleDailymotionResponse`;

  // Append the script to the body to trigger the oEmbed request
  document.body.appendChild(script);
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
  const videoId = extractVimeoVideoId(video.videoUrl);
  
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
      url = url.replace("x.com", "twitter.com");
      const regex = /\/(?:i\/)?status\/(\d+)/;
      const match = url.match(regex);
      return match ? match[1] : null;
    };
  
    try {
      if (!(container instanceof Node)) {
        console.error("Container is not a valid DOM node.");
        return;
      }
  
      const clip = video.videoUrl;
      const tweetId = extractTwitterTweetId(clip);
      const tweetContainer = document.createElement("blockquote");
      tweetContainer.className = `twitter-tweet ${cssname}`;
      // Construct the <a> tag with the correct URL
      tweetContainer.innerHTML = `
        <p lang="en" style="min-width">
          <a href="https://twitter.com/i/status/${tweetId}" style="display: inline-block; min-width: ${video.width}px;">
          </a>
        </p>
      `;
  
      container.appendChild(tweetContainer);
  
      const twitterWidgetScript = document.createElement("script");
      twitterWidgetScript.src = "https://platform.x.com/widgets.js";
      twitterWidgetScript.charset = "utf-8";
      twitterWidgetScript.async = true;
  
      twitterWidgetScript.addEventListener("load", () => {
        window.twttr.widgets.load();
      });
  
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
   export { embedYouTube, embedTiktok, embedTwitter, embedX, embedVimeo, embedDailymotion };
  
  
    /* # Embedia Vue core license
    
    Embedia Vue is released under the MIT license:
    
MIT License

Copyright (c) 2024 Demjhon Silver

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE. */
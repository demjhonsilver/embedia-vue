import { embedYouTube, embedTiktok, embedTwitter, embedX, embedVimeo, embedDailymotion } from './embedLink';

const embed = (video) => {

    const cssname = video.cssname?.trim() || "";
  
    // Validate class name
    if (!cssname.match(/^[a-zA-Z_][\w-]*$/)) {
      console.error("Invalid class name:", cssname);
      throw new Error("Invalid class name");
    }
  
    // Create default CSS if not already present
    if (!document.querySelector(`#default-style-${cssname}`)) {
      const style = document.createElement('style');
      style.id = `default-style-${cssname}`;
      style.textContent = `
            .${cssname} {
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
          `;
      document.head.appendChild(style);
    }
  
    const container = document.querySelector(`.${cssname}`);
  
    if (!container) {
      console.error("Container not found for class:", cssname);
      throw new Error("Container not found");
    }
  
    // Clear the container before embedding a new video
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
  
    if (video.videoUrl.includes("youtube.com") || video.videoUrl.includes("youtu.be")) {
      embedYouTube(video, container, cssname);
    } else if (video.videoUrl.includes("tiktok.com") || video.videoUrl.includes("tiktok")) {
      embedTiktok(video, container, cssname);
    } else if (video.videoUrl.includes("twitter.com")) {
      embedTwitter(video, container, cssname);
    } else if (video.videoUrl.includes("x.com")) {
      embedX(video, container, cssname);
    } else if (video.videoUrl.includes("vimeo.com")) {
      embedVimeo(video, container, cssname);
    } else if (video.videoUrl.includes("dailymotion.com") || video.videoUrl.includes("dailymotion")) {
      embedDailymotion(video, container, cssname);
    } else {
      throw new Error("Invalid video URL");
    }
  };
  

  export default embed;



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
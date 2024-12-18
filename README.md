<p align="center">
<img src="https://raw.githubusercontent.com/demjhonsilver/embedia-vue/main/img/logo.png" alt="Logo" width="70" height="70"/>
</p>

<div align="center">

# Embedia Vue 

[![npm version](https://img.shields.io/npm/v/embedia-vue.svg?logo=npm&style=flat-square&label=Latest&color=blue)](https://www.npmjs.com/package/embedia-vue)
![Build Status](https://img.shields.io/badge/Build-Passing-brightgreen?style=flat-square)
![Package Size](https://img.shields.io/bundlephobia/minzip/embedia-vue?style=flat-square&color=yellow)
![Downloads](https://img.shields.io/npm/dt/embedia-vue.svg?style=flat-square&label=Downloads&color=orange)
[![License](https://img.shields.io/npm/l/embedia-vue.svg?style=flat-square&label=License&color=green)](https://github.com/demjhonsilver/embedia-vue/blob/main/LICENSE.md)






</div>




---------------------

## Table of Contents

- [Description](#description)
- [Release Notes](#release-notes)
- [Features](#features)
- [Installation](#installation)
- [Embed Video](#embed-video)
- [Paradigm](#paradigm)
- [Vue](#vue)
- [Responsiveness](#responsiveness)
- [License](#license)
- [Author](#author)

## Description

Embedia Vue is an embed package for Vue which can embed from platforms like Facebook, Instagram, TikTok, YouTube/Shorts, Twitter/X, Vimeo and Dailymotion.


Framework | Supported versions
------ | -------- | 
![Vue.js](https://img.shields.io/badge/vuejs-%2335495e.svg?style=for-the-badge&logo=vuedotjs&logoColor=%234FC08D)  | 3 & above


-----

## Release-notes


Major Changes:

 v1.0.0
 - This library package offers a minimal syntax.
 - Lightweight size 

Minor Changes:

 v1.2.0
 - The embedded video for X and Instagram will be minimal.
 - The embedded video for Vimeo has fixed the auto loop issue.


 v1.1.0
 - The embedded video for supports X.com.

Patch Changes:


 v1.2.5
 - Fixed the issue with embedding Vimeo videos regarding autoplay.




-------


## Features

- Easy to set-up and responsive.
- Supports embedding one or more videos from platforms including Facebook, Instagram, TikTok, YouTube, YouTube Shorts, X, Dailymotion, and Vimeo.

___________


[Click here: Demo](https://demjhonsilver.github.io/embedia-vue-docs)

-------------
## Installation

To install the Embedia Vue, you can use the following npm command:

```bash
npm install embedia-vue
```


--------

## Embed-video
Attributes | ![Facebook](https://img.shields.io/badge/Facebook-%231877F2.svg?style=for-the-badge&logo=Facebook&logoColor=white) | ![Instagram](https://img.shields.io/badge/Instagram-%23E4405F.svg?style=for-the-badge&logo=Instagram&logoColor=white) | ![TikTok](https://img.shields.io/badge/TikTok-%23000000.svg?style=for-the-badge&logo=TikTok&logoColor=white)  | ![X](https://img.shields.io/badge/X-%23000000.svg?style=for-the-badge&logo=X&logoColor=white) |
------ | -------- | ----------|---------- |------------
Required? `width` | yes |  |   | 
Required? `height` | yes |  |  | 
Required? `fullscreen` |  optional |  |   |  
Required? `controls` |  |  |  |  
Required? `autoplay` |   |  |  |   
Required? `cssname` |  optional  | optional | optional |  optional
Required? `clip` |  yes | yes | yes | yes
---------

-------------------


Attributes | ![YouTube](https://img.shields.io/badge/YouTube-%23FF0000.svg?style=for-the-badge&logo=YouTube&logoColor=white) | ![Vimeo](https://a11ybadges.com/badge?logo=vimeo) | ![Dailymotion](https://a11ybadges.com/badge?logo=dailymotion) |
------ | -------- | ----------|---------- | 
Required? `width` |  yes | yes | yes
Required? `height` |  yes | yes | yes
Required? `fullscreen` | optional | optional | 
Required? `controls` |  optional | optional | 
Required? `autoplay` | optional | optional |optional
Required? `cssname` | optional | optional | optional
Required? `clip` |  yes | yes | yes
---------


## Width

You can copy and paste the following HD dimensions below:
---------------

---------------

Value | Width and Height 
------- | ------------ 
854x480 | width: 854, height: 480
640x360 | width: 640, height: 360
426x240 | width: 426, height: 240
256x144 | width: 256, height: 144

------------
------------
## Paradigm

```js
  <EmbediaVue
    clip=""
    width=""
    height=""
    :autoplay="false"
    :fullscreen="false"
    :controls="true"
    cssname="rename-me-now"
  />
```

You can use any importing syntax script format:

```js
<script setup>
import { EmbediaVue } from 'embedia-vue';
</script>
```

or

```js
<script>
import { EmbediaVue } from 'embedia-vue';

export default {
  components: {
    EmbediaVue
  }
};
</script>
```
For global usage (main.js)

```js
import { createApp } from 'vue';
import './style.css'; 
import App from './App.vue';
import router from './router';
import { EmbediaVue } from 'embedia-vue'; // Import global


createApp(App)
  .component('EmbediaVue', EmbediaVue) 
  .use(router) 
  .mount('#app');

```

If you choose global, you can use the code below:

```js
<template>
  <EmbediaVue
    clip=""
    width=""
    height=""
  />
</template>
<style scoped>
</style>
```


-----------------------------------------------


______________________________________________


## Vue
```js
<template>
  <EmbediaVue
    clip="https://www.youtube.com/watch?v=oEXFMGK7IC0"
    width="640"
    height="360"
    cssname="embed-clip"
  />
</template>

<script setup>
import { EmbediaVue } from 'embedia-vue';
</script>

<style scoped>
.embed-clip {
  border: 2px solid green;
}
</style>
```

## Responsiveness

______

In your built-in default style.css  ( body only )

-------
Change the display value from flex to block.

```css

body {
  margin: 0;
  display: block; // this code makes responsive
  place-items: center;
  min-width: 320px;
  min-height: 100vh;
}
```


## License

MIT

- This library package is FREE. ❤️
----------------------------------------------------
## Author

Demjhon Silver

<template>
  <div :class="[cssname, 'responsive-container']" :style="{ '--aspect-ratio': aspectRatio, width: 'auto', maxWidth: '100%' }">
    <div class="video-content"></div>
  </div>
</template>

<script>
import { onMounted, ref, watch } from 'vue';
import embed from '../../core/embediaVue';

export default {
  name: 'EmbediaVue',
  props: {
    clip: {
      type: String,
      required: true
    },
    width: {
      type: [Number, String],
      default: 1366 // max default width
    },
    height: {
      type: [Number, String],
      default: 768 // max default height
    },
    autoplay: {
      type: Boolean,
      default: false
    },
    fullscreen: {
      type: Boolean,
      default: false
    },
    controls: {
      type: Boolean,
      default: true
    },
    cssname: {
      type: String,
      default: 'default-video-class'
    }
  },
  setup(props) {
    const aspectRatio = ref('56.25%'); // Default aspect ratio for 16:9

    onMounted(() => {
      embed({
        videoUrl: props.clip,
        width: props.width,
        height: props.height,
        autoplay: props.autoplay,
        fullscreen: props.fullscreen,
        controls: props.controls,
        cssname: props.cssname
      });

      // Update aspect ratio when component mounts
      updateAspectRatio(props.width, props.height);
    });

    // Watch for changes to width and height props to update aspect ratio
    watch(() => [props.width, props.height], ([width, height]) => {
      updateAspectRatio(width, height);
    }, { immediate: true });

    function updateAspectRatio(width, height) {
      if (width && height) {
        aspectRatio.value = `${(height / width) * 100}%`;
      } else {
        aspectRatio.value = '56.25%'; // Default to 16:9 aspect ratio
      }
    }

    return {
      aspectRatio
    };
  }
};
</script>

<style scoped>
/* Flex container for responsive resizing */
.responsive-container {
  position: relative;
  width: 100%;
  max-width: 100%; /* Ensure the container is responsive */
  padding-bottom: var(--aspect-ratio, 56.25%); /* Maintain aspect ratio using padding-bottom */
  overflow: hidden;
}

/* Video content to fill the container */
.video-content {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>

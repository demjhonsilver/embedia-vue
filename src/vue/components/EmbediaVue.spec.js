import { mount } from '@vue/test-utils'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import EmbediaVue from './EmbediaVue.vue'

//  Mock the embedia core to prevent actual DOM manipulation
vi.mock('../../core/embediaVue', () => ({
  default: vi.fn(() => {})
}))

describe('EmbediaVue', () => {
  beforeEach(() => {
    // Reset DOM and mock before every test
    document.body.innerHTML = ''
    vi.clearAllMocks()
  })

  it('renders without crashing', () => {
    const wrapper = mount(EmbediaVue, {
      props: {
        clip: 'https://www.youtube.com/watch?v=oEXFMGK7IC0',
        cssname: 'embed-clip'
      }
    })

    expect(wrapper.exists()).toBe(true)
    expect(wrapper.find('.responsive-container').exists()).toBe(true)
  })

  it('applies custom CSS class', () => {
    const wrapper = mount(EmbediaVue, {
      props: {
        clip: 'https://vimeo.com/12345678',
        cssname: 'custom-class'
      }
    })

    const container = wrapper.find('.custom-class')
    expect(container.exists()).toBe(true)
    expect(container.classes()).toContain('responsive-container')
  })

  it('updates aspect ratio correctly for custom width and height', async () => {
    const wrapper = mount(EmbediaVue, {
      props: {
        clip: 'https://www.youtube.com/watch?v=oEXFMGK7IC0',
        width: 1280,
        height: 720
      }
    })

    expect(wrapper.vm.aspectRatio).toBe('56.25%') // (720 / 1280) * 100
  })

  it('renders supported platforms without crashing', () => {
    const urls = [
      'https://www.youtube.com/watch?v=oEXFMGK7IC0',
      'https://www.tiktok.com/@user/video/12345',
      'https://twitter.com/user/status/12345',
      'https://x.com/user/status/12345',
      'https://vimeo.com/12345678',
      'https://www.dailymotion.com/video/x7xyz'
    ]

    urls.forEach(url => {
      const wrapper = mount(EmbediaVue, { props: { clip: url } })
      expect(wrapper.exists()).toBe(true)
    })
  })
})

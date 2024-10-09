import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "G1",
  description: "G1 Blog",
  lang: 'ko-KR',
  head: [
    ['meta', {
        name: 'theme-color',
        content: '#3eaf7c'
    }],
    ['meta', {
        name: 'apple-mobile-web-app-capable',
        content: 'yes'
    }],
    ['meta', {
        name: 'apple-mobile-web-app-status-bar-style',
        content: 'black'
    }],
    ['meta', {
        name: 'google-adsense-account',
        content: 'ca-pub-8044968030532296'
    }],
    ['script', {
      async: '',
      src: "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8044968030532296",
      crossorigin: "anonymous"
    }],
    ['script', {
      async: '',
      src: "https://www.googletagmanager.com/gtag/js?id=G-G7R3ZWQ8CQ"
    }],
    ['script', {}, "window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'G-G7R3ZWQ8CQ');"]
  ],
  themeConfig: {
    nav: [
      { text: 'Blog', link: '/' }
    ],

    sidebar: {
      '/': [
        {
            text: '기록',
            items: [
              { text: "Boot 업그레이드 후 시간 데이터 누락 이슈", link: "/blog/time-data-eliminated-when-upgrade-boot" },
              { text: "CPU Bound와 I/O Bound", link: "/blog/cpu-bound-tasks-io-bound-tasks" },
            ]
        },
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/kworkbee' },
      { icon: 'linkedin', link: 'https://www.linkedin.com/in/g1-tommy-jeon/' },
    ],

    footer: {
      message: 'G1, A Junior Platform Engineer, Aim for "Generalizing Specialist"',
      copyright: 'Copyright © 2024 G1'
    },

    search: {
      provider: 'local'
    }
  },
  lastUpdated: true
})

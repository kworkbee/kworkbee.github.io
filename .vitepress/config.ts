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
  ],
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Blog', link: '/blog/' }
    ],

    sidebar: {
      '/blog': [
        {
            text: 'Backend',
            items: [
                { text: 'Spring',
                  items: [
                      { text: 'Security Architecture / Code Analysis', link: '/blog/backend/spring/spring-security-architecture-code-analysis' },
                      { text: 'R2DBC ConnectionFactory', link: '/blog/backend/spring/r2dbc-connectionfactory' },
                      { text: 'Gradle Docker Compose Plugin', link: '/blog/backend/spring/gradle-docker-compose-plugin' },
                      { text: 'Spring Custom Annotation', link: '/blog/backend/spring/spring-custom-annotation' },
                      { text: 'Gradle Dependency Configurations', link: '/blog/backend/spring/gradle-dependency-configurations' },
                  ] },
            ]
        },
        {
            text: 'DevOps',
            items: [
                {
                    text: 'Multi-Architecture Supported Docker Builds',
                    link: '/blog/devops/multi-architecture-supported-docker-builds'
                }
            ]
        },
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/kworkbee' },
      { icon: 'linkedin', link: 'https://www.linkedin.com/in/g1-tommy-jeon/' },
    ],

    footer: {
      message: 'G1, A Junior Platform Engineer, Aims for "Generalizing Specialist"',
      copyright: 'Copyright © 2023 G1'
    }
  },
  lastUpdated: true
})

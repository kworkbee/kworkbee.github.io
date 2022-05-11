const { googleAnalyticsPlugin } = require("@vuepress/plugin-google-analytics");
const { defaultTheme } = require("@vuepress/theme-default");

const { children } = require('./articles');

module.exports = {
    title: 'G1',
    description: 'Blog',
    base: '/',
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
            name: 'og:image',
            //   content: 'https://h4dvprmht2.execute-api.ap-northeast-2.amazonaws.com/automated-og-image?text=Today%20I%20Learned'
        }],
    ],
    plugins: [
        googleAnalyticsPlugin({
            id: 'G-9J9RPKB6PG',
        })
    ],
    theme: defaultTheme({
        repo: 'kworkbee/kworkbee.github.io',
        editLinks: false,
        docsDir: 'docs',
        editLinkText: 'Edit this article',
        lastUpdated: false,
        navbar: [
            {
                text: 'TIL',
                link: 'https://about.g1tommy.me/TIL'
            },
            {
                text: 'WIR',
                link: 'https://about.g1tommy.me/WIR'
            },
            {
                text: 'Profile',
                link: 'https://about.g1tommy.me/resume'
            },
            {
                text: 'Diary',
                link: 'https://about.g1tommy.me/diary'
            },
        ],
        sidebar: [
            {
                text: 'Articles',
                link: '/',
                children,
            }
        ],
    })
}

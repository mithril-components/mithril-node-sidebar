'use strict'

const m = require('mithril');
const render = require('mithril-node-render');

const component = require('./sidebar');

const menus = [
        {
            "label": "Keyword tools",
            "icon": "wpic wpic-keyword-tools",
            "href": "//keyword-staging.wpic-tools.com",
            "submenu": [
                {
                    "label": "Search",
                    "icon": "glyphicon glyphicon-search",
                    "href": "//keyword-staging.wpic-tools.com/search"
                },
                {
                    "label": "History",
                    "icon": "glyphicon glyphicon-th-list",
                    "href": "//keyword-staging.wpic-tools.com/histories"
                }
            ]
        },
        {
            "label": "Squirrel",
            "icon": "wpic wpic-squirrel",
            "submenu": [
                {
                    "label": "Squirrel search",
                    "icon": "wpic wpic-squirrel",
                    "href": "//squirrel-search.wpic-tools.com/"
                },
                {
                    "label": "Squirrel store",
                    "icon": "wpic wpic-squirrel",
                    "href": "//squirrel-store.wpic-tools.com/"
                },
                {
                    "label": "Squirrel blog",
                    "icon": "wpic wpic-squirrel",
                    "href": "//squirrel-blog.wpic-tools.com/"
                }
            ]
        },
        {
            "label": "Web monitor",
            "icon": "wpic wpic-web-monitor",
            "href": "//monitor-staging.wpic-tools.com"
        },
        {
            "label": "Discripto",
            "icon": "wpic wpic-discripto",
            "href": "//discripto-staging.wpic-tools.com"
        },
        {
            "label": "Image center",
            "icon": "wpic wpic-discripto",
            "href": "//image-staging.wpic-tools.com"
        },
        {
            "label": "VPS manager",
            "icon": "wpic wpic-vps-manager",
            "href": "//vps-staging.wpic-tools.com"
        },
        {
            "label": "Keyword search",
            "icon": "wpic wpic-vps-manager",
            "href": "//vps-staging.wpic-tools.com"
        }
    ];

const model = {
    "title": "WPIC Dashboard",
    "logo": "wpic wpic-logo",
    "menus": menus
};

const innerComponent = {
    controller: () => {
        return {
            data: '1'
        }
    },
    view: () => {
        return m('p','inner')
    }
};

const options = {
    active: '//keyword-staging.wpic-tools.com',
    model: model
    /* Use online version now */
    // model: 'https://dashboard-staging.wpic-tools.com/sidebar.json'
};


component.controller(options).then(ctrl => {
// console.log('here');
    const view = component.view(ctrl);
    const innerHtml = render(view);
    console.log(innerHtml);
})
.catch(err => {
    console.trace(err);
});

'use strict'

const m = require('mithril');
const render = require('mithril-node-render');

const component = require('./sidebar');

const menus = [
    {
        label: 'Menu 1',
        status: '10',
        icon: 'glyphicon glyphicon-list-alt',
        href: '/some/url',
        submenu: [
            {
                label: 'Menu 1',
                icon: 'glyphicon glyphicon-road',
                href: '/some/url/of/a/page',
                submenu: [
                    {
                        label: 'Menu 1-1',
                        icon: 'glyphicon glyphicon-road',
                        href: '/some/url/of/a/page'
                    }
                ]
            }
        ]
    },
    {
        label: 'Menu 2',
        icon: 'glyphicon glyphicon-inbox',
        href: 'Some other url',
        submenu: []
    }
];

const model = {
    title: 'Web site title',
    logo: 'icon-class-name',
    inner: {
        controller: () => {
            return {
                data: '1'
            }
        },
        view: () => {
            return m('p','inner')
        }
    },
    //menus: menus
    menus: 'https://dashboard-staging.wpic-tools.com/sidebar.json' /* Use online version now */
};

component.controller(model).then(ctrl => {
// console.log('here');
    const view = component.view(ctrl);
    const innerHtml = render(view);
    console.log(innerHtml);
})
.catch(err => {
    console.trace(err);
});

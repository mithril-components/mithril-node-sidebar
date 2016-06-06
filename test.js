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
                        href: '/some/url/of/a/page/2'
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
    logo: 'glyphicon glyphicon-list-alt',
    menus: menus
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
    inner: innerComponent,
    active: 'https://monitor-staging.wpic-tools.com',
    //model: model
    /* Use online version now */
    model: 'https://dashboard-staging.wpic-tools.com/sidebar.json'
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

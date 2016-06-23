'use strict'

const render = require('mithril-node-render')
const menu   = require('../menu/menu');
const menulist   = require('./menulist');

const model = [
    {
        label: 'Menu 1',
        status: '10',
        icon: 'glyphicon glyphicon-list-alt',
        href: '/some/url',
        submenu: [
            {
                label: 'Menu 1',
                icon: 'glyphicon glyphicon-road',
                href: '/some/url/of/a/page'
            }
        ]
    },
    {
        label: 'Menu 2',
        icon: 'glyphicon glyphicon-inbox',
        href: 'Some other url',
        submenu: []
    }
]
const ctrl = menulist.controller(model);
const view = menulist.view(ctrl);
const innerHtml = render(view);

console.log(innerHtml);

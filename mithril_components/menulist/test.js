'use strict'

const render = require('mithril-node-render')
const menu   = require('../menu/menu');
const menulist   = require('./menulist');

const model = [
    {
        label: 'Menu 1',
        status: '10',
        icon: 'menu1-icon-class',
        href: '/some/url',
        submenu: [
            {
                label: 'Menu 1',
                icon: 'menu1-icon-class',
                href: '/some/url/of/a/page'
            }
        ]
    },
    {
        label: 'Menu 2',
        icon: 'menu2-icon-class',
        href: 'Some other url',
        submenu: []
    }
]
const ctrl = menulist.controller(model);
const view = menulist.view(ctrl);
const innerHtml = render(view);

console.log(innerHtml);

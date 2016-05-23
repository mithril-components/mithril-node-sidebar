'use strict'

const render = require('mithril-node-render')
const menu   = require('./menu');

const model = {
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
};

const ctrl = menu.controller(model);
const view = menu.view(ctrl);

const innerHtml = render(view);
console.log(innerHtml);

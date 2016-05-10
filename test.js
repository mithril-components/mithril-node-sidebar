'use strict'

const component = require('./sidebar');

const model = {
    title: 'Web site title',
    logo: 'icon-class-name',
    menus: [
        {
            label: 'Menu 1',
            status: '10',
            icon: 'menu1-icon-class',
            href: '/some/url'
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
            href: 'Some other url'
        }
    ]
}

const ctrl = component.controller(data);
const view = component.view(ctrl);
const innerHtml = render(view);
console.log(innerHtml);

'use strict'

const m = require('mithril');
const render = require('mithril-node-render');

const component = require('./sidebar');

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
    menus: [
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
}


component.controller(model).then(ctrl => {
// console.log('here');
    const view = component.view(ctrl);
    const innerHtml = render(view);
    console.log(innerHtml);
})
.catch(err => {
    console.trace(err);
});

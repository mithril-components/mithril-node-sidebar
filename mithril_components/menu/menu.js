'use strict'

const m = require('mithril');

const controller = (data) => {
    return data;
}

const view = (ctrl) => {
    if(ctrl.submenu.length > 0){
        return m('li',
            m('a', {"class":ctrl.status, href:ctrl.href}, ctrl.label, m(`span.#{ctrl.icon}`)),
            m('ul.submenus.nav.nav.navbar-inverse.nav-stacked', ctrl.submenu.map(s => {
                return m('li',
                    m('a', {href: s.href}, s.label)
                )
            }))
        )
    }else{
        return m('li',
             m('a', {class:ctrl.icon}, ctrl.label)
        )
    }
}

module.exports = {
    controller: controller,
    view: view
}
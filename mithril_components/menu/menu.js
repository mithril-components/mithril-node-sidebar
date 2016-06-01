'use strict'

const m = require('mithril');

const controller = (data) => {
    return data;
}

const view = (ctrl) => {
    if(ctrl.submenu.length > 0){
        return m('li', (ctrl.active) ? {"class": "active"} : null,
            m('a', {href:ctrl.href}, m('span', {'class':ctrl.icon}), ctrl.label),
            m('ul.submenus.nav.nav.navbar-inverse.nav-stacked', ctrl.submenu.map(s => {
                return m('li', (s.active) ? {"class": "active"} : null,
                    m('a', {href:s.href}, m('span', {'class': s.icon}), s.label)
                )
            }))
        )
    }else{
        return m('li', (ctrl.active) ? {"class": "active"} : null,
            m('a', {"class":ctrl.status, href:ctrl.href}, m('span', {'class':ctrl.icon}), ctrl.label)
        )
    }
}

module.exports = {
    controller: controller,
    view: view
}

'use strict'

const m = require('mithril');

const controller = (data) => {
    data.submenuCtrls = !data.submenu ? [] : data.submenu.map(s => {
        return controller(s);
    })
    return data;
}

const view = (ctrl) => {
    return m('li',
        m('a', {"class":ctrl.status, href:ctrl.href}, m('span', {'class':ctrl.icon}), ctrl.label),
        m('ul.submenus.nav.nav.navbar-inverse.nav-stacked', ctrl.submenuCtrls.map(s => {
            return m('li',
                view(s)
            );
        }))
    );
}

module.exports = {
    controller: controller,
    view: view
}

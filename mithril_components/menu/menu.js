'use strict'

const m = require('mithril');

const controller = (data) => {
    data.submenuCtrls = !data.submenu ? [] : data.submenu.map(s => {
        s.active = data.active;
        return controller(s);
    });
    const activeChild = data.submenuCtrls.length == 0 ? false : data.submenuCtrls.reduce((previousValue, currentValue) => {
        return previousValue.active || currentValue.active;
    });
    //const selfActive = data.active && data.href && (data.active.split(/[#?]/)[0] == data.href.split(/[#?]/)[0]);
    const selfActive = data.active && data.href && (data.active.indexOf(data.href) === 0);
    data.active = activeChild || selfActive;
    data.mainActive = selfActive && !activeChild;

    return data;
}

const view = (ctrl) => {
    return m('li', (ctrl.active) ?  (ctrl.mainActive ? {"class": "active mainActive"} : {"class" : "active"}) : null,
        [
            m('a', {href:ctrl.href}, m('span', {'class':ctrl.icon}), ctrl.label, m('span', {'class': 'badge'}, ctrl.status)),
            ' ',
            m('ul.submenus.nav.nav.navbar-inverse.nav-stacked', ctrl.submenuCtrls.map(s => {
                return m('li', (s.active) ?  (s.mainActive ? {"class": "active mainActive"} : {"class" : "active"}) : null,
                    view(s)
                );
            }))
        ]
    );
}

module.exports = {
    controller: controller,
    view: view
}

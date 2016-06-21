'use strict'

const m = require('mithril');

const controller = (list) => {
    return list;
}

const view = (ctrl) => {
    return m('div.col-md-4.menuicon.text-center',
        m('a', {'href': ctrl.href},
            m('span', {'class':ctrl.icon}),
            m('div.title', ctrl.label)
        )
    );
    
}

module.exports = {
    controller: controller,
    view: view
}
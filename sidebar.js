'use strict'

const https = require('https');
const m = require('mithril');
const menu = require('./mithril_components/menu/menu');
const menulist = require('./mithril_components/menulist/menulist');


const controller = (options) => {
    let modelPromise;
    if (typeof options.model === 'string') {
        if (options.model.match(/^https?:\/\//)) {
            modelPromise = new Promise((resolve, reject) => {
                https.get(options.model, function(res){
                    let body = '';

                    res.on('data', function(chunk){
                        body += chunk;
                    });

                    res.on('end', function(){
                        const json = JSON.parse(body);
                        resolve(json);
                    });
                }).on('error', function(err){
                    reject(err);
                });
            });
        }
        else {
            modelPromise = new Promise((resolve, reject) => {
                fs.readFile(options.model, 'utf8', (err, json) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(json);
                    }
                });
            });
        }
    }
    else {
        modelPromise = Promise.resolve(options.model);
    }

    let icPromise;
    if (options.inner) {
        const icCtrl = options.inner.controller();
        // This component supports both sync and async controller
        icPromise = (icCtrl instanceof Promise) ? icCtrl : Promise.resolve(icCtrl);
    }
    else {
        icPromise = Promise.resolve(null);
    }

    return Promise.all([modelPromise, icPromise]).then(values => {
        const model = values[0];

        const menulistCtrl = menulist.controller(model.menus, options.active);c

        if (options.inner) {
            contentCtrl = values[1]; // icPromise
            contentView = options.inner.view;
        } else {
            contentCtrl = () = {
                return directorylist.controller(menulist.findNext(menulistCtrl));
            };
            contentView = directorylist.view;
        }

        return {
            menulistCtrl: menulistCtrl,
            contentCtrl: contentCtrl,
            contentView: contentView,
            logo: model.logo,
            title: model.title
        }

        if )
        menuslist.findNext(menulistCtrl)
    });
}

const view = (ctrl) => {
    return m('div.container-fluid.sidebar',
        m('div.sidebar-wrapper',
            m('div.sidebar-logo',
                m('h3.text-center', m('span', {"class": ctrl.logo, title: ctrl.title}), ctrl.title)
            ),
            m('div.sidebar-wrapper', menulist.view(ctrl.menulistCtrl))
        ),
        m('div.menu-toggle',
            m('button', {"class": "navbar-toggle collapsed", "type": "button", "data-toggle":"collapse", "data-target":".sidebar-wrapper"}, [
                m('span', {"class": 'sr-only'}, 'Toggle navigation'),
                m('span.icon-bar'),
                m('span.icon-bar'),
                m('span.icon-bar')
            ])
        ),
        m('div.page-content-wrapper',
            m('div.row', m('div.col-lg-12', ctrl.contentView(ctrl.contentCtrl)))
        )
    );
}

module.exports = {
    controller: controller,
    view: view
}

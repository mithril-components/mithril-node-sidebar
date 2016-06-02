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
        modelPromise = Promise.resolve(options);
    }

    const icCtrl = options.inner.controller();
    // This component supports both sync and async controller
    const icPromise = (icCtrl instanceof Promise) ? contentCtrl : Promise.resolve(icCtrl);

    return Promise.all([modelPromise, icPromise]).then(values => {
        const resolvedOptions = values[0];
        return {
            menulistCtrl: menulist.controller(resolvedOptions.menus, options.active),
            contentCtrl: values[1], // icPromise
            contentView: options.inner.view,
            logo: options.model.logo,
            title: options.model.title
        }
    });
}

const view = (ctrl) => {
    return m('div.container-fluid.sidebar',
        m('div.sidebar-wrapper',
            m('div.sidebar-logo',
                m('h2.text-center', m('span', {"class": ctrl.logo, title: ctrl.title}), ctrl.title)
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
        ),
        m('script', `$(document).ready(function(){
        $(".menu-toggle button").click(function(e) {
          // console.log(1);
          e.preventDefault();
          $(".sidebar-wrapper").first().toggleClass("toggled");
        });
    });`)
    );
}

module.exports = {
    controller: controller,
    view: view
}

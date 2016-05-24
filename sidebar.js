'use strict'

const m = require('mithril');
const menu = require('./mithril_components/menu/menu');
const menulist = require('./mithril_components/menulist/menulist');


const controller = (options) => {
    let modelPromise;
    if (typeof options.model === 'string') {
        if (model.match(/^https?:\/\//)) {
            modelPromise = new Promise((resolve, reject) => {
                http.get(options.model, function(res){
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
        modelPromise = Promise.resolve(options.menus);
    }

    const icCtrl = options.inner.controller();
    // This component supports both sync and async controller
    const icPromise = (icCtrl instanceof Promise) ? contentCtrl : Promise.resolve(icCtrl);

    return Promise.all([modelPromise, icPromise]).then(values => {
        const menus = values[0];
        return {
            menulistCtrl: menulist.controller(menus),
            contentCtrl: values[1], // icPromise
            contentView: options.inner.view
        }
    });
}

const view = (ctrl) => {
    // TODO: Implement
// <div class="container" id="wrapper">
//     <div id="sidebar-wrapper">
//       <div class="sidebar-brand">
//         <a href="#"><img src="img/wpic-logo-white.png" alt="Web Presense In China"></a>
//       </div>
//       <div id="sidebar-wrapper">%SIDEBAR%</div>
//     </div>
//     <!-- /#sidebar-wrapper -->
//     <div id="menu-toggle">
//       <button class="navbar-toggle collapsed" type="button">
//         <span class="sr-only">Toggle navigation</span>
//         <span class="icon-bar"></span>
//         <span class="icon-bar"></span>
//         <span class="icon-bar"></span>
//       </button>
//     </div>
//     <!-- Page Content -->
//     <div id="page-content-wrapper">
//       <div class="row">
//         <div class="col-lg-12">
//           %CONTENT%
//         </div>
//       </div>
//     </div>
//   </div>
    return m('div.container.sidebar',
        m('div.sidebar-wrapper',
            m('div.sidebar-logo',
                m('a', {href: '#'},
                    m('span', {class: ctrl.logo, alt: ctrl.title})
                )
            ),
            m('div.sidebar-wrapper', m('ul.sidebar-nav', menulist.view(ctrl.menulistCtrl)))
        ),
        m('div.menu-toggle',
            m('button', {class: 'navbar-toggle collapsed', type: 'button'}, [
                m('span', {class: 'sr-only'}, 'Toggle navigation'),
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

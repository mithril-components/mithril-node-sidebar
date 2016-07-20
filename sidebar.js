'use strict'

const https = require('https');
const m = require('mithril');
const menu = require('./mithril_components/menu/menu');
const menulist = require('./mithril_components/menulist/menulist');
const directorylist = require('./mithril_components/directorylist/directorylist')


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

        const menulistCtrl = menulist.controller(model.menus, options.active);
        // console.log(menulistCtrl);
        // console.log(menulist.findNext(menulistCtrl))

        let contentCtrl, contentView;
        if (options.inner) {
            contentCtrl = values[1]; // icPromise
            contentView = options.inner.view;
        } else {
            const next = menulist.findNext(menulistCtrl);
            contentCtrl = next ? directorylist.controller(next) : null;
            contentView = directorylist.view;
        }

        return {
            menulistCtrl: menulistCtrl,
            contentCtrl: contentCtrl,
            contentView: contentView,
            logo: model.logo,
            title: model.title
        }

        // if )
    });
}

const view = (ctrl) => {
    return m('div.container-fluid.sidebar',
        m('div.sidebar-wrapper',
            m('div.sidebar-logo',
                m('h3.text-center', m('span', {"class": ctrl.logo, title: ctrl.title}), ctrl.title)
            ),
            m('div.sidebar-wrapper-menu', menulist.view(ctrl.menulistCtrl))
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
            m('div.row', m('div.col-lg-12', ctrl.contentCtrl ? ctrl.contentView(ctrl.contentCtrl) : ''))
        ),
        m('script', {src:'https://code.jquery.com/jquery-3.1.0.min.js'}),
        m('script',m.trust(`
            var MouseWheelHandler = function(e) {
                e.preventDefault();
                e = window.event || e;
                var direction = '';
                if (e.wheelDelta) {  //判断浏览器IE，谷歌滑轮事件               
                    if (e.wheelDelta > 0) { //当滑轮向上滚动时  
                        console.log("up");
                        direction = 'up';
                    }  
                    if (e.wheelDelta < 0) { //当滑轮向下滚动时  
                        console.log("down");
                        direction = 'down';
                    }  
                } else if (e.detail) {  //Firefox滑轮事件  
                    if (e.detail> 0) { //当滑轮向上滚动时
                        console.log("up");
                        direction = 'up';
                    }  
                    if (e.detail< 0) { //当滑轮向下滚动时  
                        console.log("down");
                        direction = 'down';
                    }  
                }  
                var move = $('.sidebar-wrapper-menu').attr('data-moved') ? parseInt($('.sidebar-wrapper-menu').attr('data-moved')) : 0;

                moveMax = $('.sidebar-wrapper-menu').height() - $(window).height();
                if(Math.abs(move)<moveMax && direction == 'down'){
                    move +=  -5;
                }else if(move<0 && direction == 'up'){
                    move += 5;
                }

                if(move!= 0){
                    $('.sidebar-logo').fadeOut();
                }else{
                    $('.sidebar-logo').fadeIn();
                }
                
                $('.sidebar-wrapper-menu').css({'transform':'translateY('+ move +'px)', 'transition':'transform 1s ease-out'}).attr('data-moved',move);
            }
            /*
            refer to fullpage.js
            github: https://github.com/alvarotrigo/fullPage.js
            */
            var addMouseWheelHandler = function() {
              document.addEventListener("mousewheel", MouseWheelHandler, false); 
              //IE9, Chrome, Safari, Oper
            }
            addMouseWheelHandler();
            window.onload = function(){
                $('.sidebar-wrapper').scroll(function(e){
                    console.log('1');
                });
            }
            
        `))
    );
}

module.exports = {
    controller: controller,
    view: view
}

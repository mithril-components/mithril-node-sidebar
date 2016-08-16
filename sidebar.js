'use strict'

const http = require('http');
const m = require('mithril');
const menu = require('./mithril_components/menu/menu');
const menulist = require('./mithril_components/menulist/menulist');
const directorylist = require('./mithril_components/directorylist/directorylist')

const direction = process.env.dir;// ltr or rtl;

const controller = (options) => {
    let modelPromise;
    if (typeof options.model === 'string') {
        if (options.model.match(/^https?:\/\//)) {
            modelPromise = new Promise((resolve, reject) => {
                http.get(options.model, function(res){
                    let body = '';

                    res.on('data', function(chunk){
                        body += chunk;
                    });

                    res.on('end', function(){
                        try {
                            const json = JSON.parse(body);
                            resolve(json);
                        }
                        catch(e) {
                            resolve({title:'',logo:'',menus:[]})
                        }
                        
                    });
                }).on('error', function(err){
                    // reject(err);
                    resolve({title:'',logo:'',menus:[]})
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

    });
}

const view = (ctrl) => {
    return m((direction == 'ltr') ? 'div.container-fluid.mc-sidebar' : 'div.container-fluid.mc-sidebar.mc-sidebar-rtl',
        m('div.mc-sidebar-wrapper.hidden-print',
            m('div.mc-sidebar-logo',
                m('h3.text-center', m('span', {"class": ctrl.logo, title: ctrl.title}), ctrl.title)
            ),
            m('div.mc-sidebar-wrapper-menu', menulist.view(ctrl.menulistCtrl))
        ),
        m('div.menu-toggle',
            m('button', {"class": "navbar-toggle collapsed", "type": "button", "data-toggle":"collapse", "data-target":".mc-sidebar-wrapper"}, [
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
                // e.preventDefault();
                e = window.event || e;
                var direction = '';
                if (e.wheelDelta) {  //IE,chrome mouse wheel               
                    if (e.wheelDelta > 0) { //mouse wheel up
                        // console.log("up");
                        direction = 'up';
                    }  
                    if (e.wheelDelta < 0) { //mouse wheel down
                        // console.log("down");
                        direction = 'down';
                    }  
                } else if (e.detail) {  //Firefox mouse wheel 
                    if (e.detail > 0) { //mouse wheel up
                        // console.log("up");
                        direction = 'up';
                    }  
                    if (e.detail < 0) { //mouse wheel down  
                        // console.log("down");
                        direction = 'down';
                    }  
                }  
                
                menuScroll(direction);
            }

            var menuScroll = function(direction){
                if($(".mc-sidebar-wrapper").width() < 250){
                    return false;
                }
                var move = $('.mc-sidebar-wrapper-menu').attr('data-moved') ? parseInt($('.mc-sidebar-wrapper-menu').attr('data-moved')) : 0;
                moveMax = $('.mc-sidebar-wrapper-menu').height() - $(window).height();

                if(Math.abs(move) < moveMax && direction == 'down'){
                    move +=  -5;
                }else if(move < 0 && direction == 'up'){
                    move += 5;
                }
                
                if(move != 0){
                    $('.mc-sidebar-logo').fadeOut();
                }else{
                    $('.mc-sidebar-logo').fadeIn();
                }
                
                $('.mc-sidebar-wrapper-menu').css({'transform':'translateY('+ move +'px)', 'transition':'transform 0s ease-out'}).attr('data-moved',move);
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
            var startY = 0;
            // touchMove
            var touchMoveFunc = function(evt) {
                try
                {  
                    evt.preventDefault();   
                    var touch = evt.touches[0]; //get the first point  
                    // var x = Number(touch.pageX); 
                    var y = Number(touch.pageY);
                    var direction = '';
                    //scroll direction  
                    if (y - startY > 0) {  
                        // scroll dir = down;
                        // alert(y);
                        direction = 'down';
                    }
                    if (y - startY < 0) {
                        // scroll dir = up;
                        // alert(y);
                        direction = 'up';
                    }
                    startY = y;
                    menuScroll(direction);
                }  
                catch (e) {
                    alert('touchMoveFunc：' + e.message);  
                }  
            }
            var isTouchDevice = function() {  
                try {  
                    document.createEvent("TouchEvent");  
                    console.log("TouchEvent is supported！");  
                    bindEvent();
                }  
                catch (e) {  
                    console.log("TouchEvent isn't supported！" + e.message);  
                }  
            }
            //绑定事件  
            var bindEvent = function() {  
                document.addEventListener('touchmove', touchMoveFunc, false);
            }

            window.onload = function(){
                $(window).scroll(function(e){
                    console.log($(this)[0].scrollHeight);
                });
                isTouchDevice();
            }
        `))
    );
}

module.exports = {
    controller: controller,
    view: view
}

'use strict'

const m = require('mithril');

const submenu = (menu) =>{
  return m('ul.submenus',[
    menu.submenus.map(function(item){
      // console.log(menu.submenus.length);
      return m('li',m('a',{href:item.href},item.title));
    })
  ])
}
const controller = (data) => { // {title}
  return data;
}

const view = (ctrl) => {
  // return m('p', t.translate('Name') + ': ' + ctrl.title);
  console.log(ctrl);
  return m('div.maincontent',m('ul.list',[
    ctrl.items.map(function(item){
      console.log(item.title);
      return m('li',
        m(
          'a',
          {href:item.href},
          m(
            'span',
            {class:'glyphicon glyphicon-'+item.icon}
          ),
          m(
            'span',
            {class:'txt'},
            t.translate(item.title)
          )
        )
      );
    })
  ]))
}

module.exports = {
  controller: controller,
  view: view
}
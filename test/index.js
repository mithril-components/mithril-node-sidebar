'use strict'

const fs     = require('fs');
const render = require('mithril-node-render')
const sidebar   = require('../mithril_modules/sidebar');
const content   = require('../mithril_modules/content');

const less = require('less');
const lessfile = fs.readFileSync('less/main.less','UTF-8');

less.render(lessfile, function (e, output) {
  // console.log(output.css);
    fs.writeFileSync('public/main.css', output.css, 'UTF-8');
});

const ctrlcontent = content.controller({
  title:'Discrito',
  items:[{
    title:'discripto-html5',
    icon:'user',
    href:'#html5'
  },{
    title:'discripto-har',
    icon:'envelope',
    href:'#har'
  },{
    title:'discripto-script',
    icon:'cog',
    href:'script'
  }]
});

const ctrlsidebar = sidebar.controller({
    name: "wpic",
    menulist:[{
        "title":"Discripto",
        "subs":[
            {"title":"discripto-html5","href":"#html5"},
            {"title":"discripto-har","href":"#har"},
            {"title":"discripto-script","href":"#script"}
        ]
    },
    {
        "title":"Discripto2",
        "subs":[]
    }]
});

const viewsidebar = sidebar.view(ctrlsidebar);
const sidebarHtml = render(viewsidebar);
const viewcontent = content.view(ctrlcontent);
const contentHtml = render(viewcontent);

const base = fs.readFileSync('public/base.htm', 'UTF-8');

// console.log(innerHtml);
fs.writeFileSync('public/index.html', (base.replace('%SIDEBAR%', sidebarHtml)).replace('%CONTENT%', contentHtml), 'UTF-8');





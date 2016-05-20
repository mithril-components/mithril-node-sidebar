'use strict'

const fs     = require('fs');
const render = require('mithril-node-render')
const content   = require('../mithril_modules/content');

const less = require('less');
const lessfile = fs.readFileSync('less/main.less','UTF-8');

less.render(lessfile, function (e, output) {
  // console.log(output.css);
    fs.writeFileSync('public/main.css', output.css, 'UTF-8');
});

const ctrl = content.controller({
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

const view = content.view(ctrl);

const innerHtml = render(view);

const base = fs.readFileSync('public/base.htm', 'UTF-8');
console.log(innerHtml);
fs.writeFileSync('public/content.html', base.replace('%CONTENT%', innerHtml), 'UTF-8');

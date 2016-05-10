node-mithril-sidebar
==================================
Slider component for Mitrhil-NodeJS.

Usage
-----
    
    const sidebar = require('mithril-node-sidebar');
    const options = {
        inner : /* inner component object */,
        active: /* active href URI */,
        model: {   /* instead of model object, you can put string path of remote json (http) or json file */
            title: 'Web site title',
            logo: 'icon-class-name',
            menus: [
                {
                    label: 'Menu 1',
                    status: '10',
                    icon: 'menu1-icon-class',
                    href: '/some/url'
                    submenu: [
                        {
                            label: 'Menu 1',
                            icon: 'menu1-icon-class',
                            href: '/some/url/of/a/page'
                        },
                        ...    
                    ]
                },
                {
                    label: 'Menu 2',
                    icon: 'menu2-icon-class',
                    href: 'Some other url'
                }
                ...
            ]
        }
    };

    const ctrl = sidebar.controller(options);
    const view = sidebar.view(ctrl);

Options
-------

* title: Title of the website.
* logo: CSS class name for logo.
* menus: List of menus.
  * label: Label for the menu.
  * status: Status box text.
  * icon: CSS class name for menu icon.
  * href: Link for the menu.
  * submenu: List of sub menus.
    * label: Label of the submenu
    * icon: CSS class name for the icon.
    * href: Link for the submenu.

Test
----
Setup [mithril-component-tools](https://github.com/mithril-components/mitthril-components-tools) first. Then:

    npm install
    mct test piechart.js en

/*!
 * Vue.js v2.6.2
 * (c) 2014-2019 Evan You
 * Released under the MIT License.
 */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
            typeof define === 'function' && define.amd ? define(factory) :
            (global = global || self, global.TabBar = factory());
}(this, function () {
    'use strict';


//    var config = {
//        el: "Tab",
//        tabs: [
//            {
//                content: {
//                    el: "one",
//                    css: {
//                        classList: [],
//                        focus: "",
//                        blur: ""
//                    }
//                },
//                name: "a1",
//                display: "Tab 1",
//                focus: true,
//                css: {
//                    classList: [],
//                    focus: "",
//                    blur: ""
//                }
//            },
//            {
//                content: {
//                    el: "two",
//                    css: {
//                        classList: [],
//                        focus: ""
//                    }
//                },
//                name: "a2",
//                display: "Tab 2",
//                css: {
//                    classList: [],
//                    focus: ""
//                }
//            },
//            {
//                content: {
//                    el: "three",
//                    css: {
//                        classList: [],
//                        focus: ""
//                    }
//                },
//                name: "a3",
//                display: "Tab 3",
//                css: {
//                    classList: [],
//                    focus: ""
//                }
//            }
//
//        ],
//        css: {
//            classList: [],
//            tabClassList: [],
//            tabContentClassList: [],
//            blurTab: "",
//            blurTabContent: "",
//            focusTab: "",
//            focusTabContent: ""
//        }
//    };


    function query(el) {
        if (isString(el)) {
            var selected = document.getElementById(el) || document.querySelector(el);
            if (!selected) {
                return document.createElement('div');
            }
            return selected;
        } else {
            return el;
        }
    }

    function isString(val) {
        return typeof val === 'string';
    }

//Objects ignored
    function getArray(obj) {
        if (!obj) {
            return [];
        }
        if (Array.isArray(obj)) {
            return obj;
        }
        if (isString(obj)) {
            return [obj];
        }
        return [];
    }

    function makeTabbarEl(config) {
        config.el = query(config.el);
        var css = config.css;
        css && addClassList(config.el, css.classList);
        config.el.classList.add("tabbar");
        return config.el;
    }


    function makeTabEl(config, i) {
        var tab = config.tabs[i];
        tab.el = query(tab.el) || tabEl(tab.name);
        var tabCSS = tab.css;
        var configCSS = config.css;
        addClassList(tab.el, tabCSS.classList || configCSS.tabClassList);
        var textNode = document.createTextNode(tab.name || "");
        var blurCSS = tabCSS.blur || configCSS.blurTab;
        blurCSS && tab.el.classList.add(blurCSS);
        tab.el.appendChild(textNode);
        config.el.appendChild(tab.el);
        return tab.el;
    }

    function makeTabContentEl(config, i) {
        var tab = config.tabs[i];
        tab.content.el = query(tab.content.el);
        var contentCSS = tab.content.css;
        var configCSS = config.css;
        addClassList(tab.content.el, contentCSS.classList || configCSS.tabContentClassList);
        var blurCSS = contentCSS.blur || configCSS.blurTabContent;
        blurCSS && tab.content.el.classList.add(blurCSS);
        tab.content.el.classList.add("tabbar__tab-content--blur");
    }

    function addClassList(el, classList) {
        el.classList.add.apply(el.classList, getArray(classList));
    }

    function tabEl() {
        var el = div();
        el.classList.add("tabbar__tab");
        return el;
    }

    function div() {
        return document.createElement("div");
    }

    function deactivate(config, i) {
        var tab = config.tabs[i];
        var tabCSS = tab.css;
        var configCSS = config.css;
        var contentCSS = tab.content.css;
        var blurCSS = tabCSS.blur || configCSS.blurTab;
        var focusCSS = tabCSS.focus || configCSS.focusTab || "tabbar__tab--focus";
        focusCSS && tab.el.classList.remove(focusCSS);
        blurCSS && tab.el.classList.add(blurCSS);


        focusCSS = contentCSS.focus || configCSS.focusTabContent;
        blurCSS = contentCSS.blur || configCSS.blurTabContent;
        blurCSS && tab.content.el.classList.add(blurCSS);
        focusCSS && tab.content.el.classList.remove(focusCSS);
        tab.content.el.classList.add("tabbar__tab-content--blur");
    }

    function activate(config, i) {
        var tab = config.tabs[i];
        var tabCSS = tab.css;
        var configCSS = config.css;
        var contentCSS = tab.content.css;
        var blurCSS = tabCSS.blur || configCSS.blurTab;
        var focusCSS = tabCSS.focus || configCSS.focusTab || "tabbar__tab--focus";
        focusCSS && tab.el.classList.add(focusCSS);
        blurCSS && tab.el.classList.remove(blurCSS);


        focusCSS = contentCSS.focus || configCSS.focusTabContent;
        blurCSS = contentCSS.blur || configCSS.blurTabContent;
        blurCSS && tab.content.el.classList.remove(blurCSS);
        focusCSS && tab.content.el.classList.add(focusCSS);
        tab.content.el.classList.remove("tabbar__tab-content--blur");
    }

    var TabBar = function (c) {
        var active = -1;
        var el;
        var config;

        var render = function () {
            var tabs = config.tabs;
            for (var i = 0; i < tabs.length; i++) {
                var tab = tabs[i];
                var tabEl = makeTabEl(config, i);
                makeTabContentEl(config, i);
                if (active === -1 && tab.focus) {
                    active = i;
                    activate(config, i);
                }
                (function (idx) {
                    tabEl.addEventListener("click", function () {
                        blur();
                        focus(idx);
                    });
                })(i);
            }
        };

        var blur = function () {
            deactivate(config, active);
        };

        var focus = function (idx) {
            active = idx;
            activate(config, idx);
        };

        var init = function () {
            config = c;
            el = makeTabbarEl(config);
            render();
        };

        init();


        return {
            config: config
        };


    };

    return TabBar;

}));

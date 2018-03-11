// ==UserScript==
// @name         fanfiction.addon
// @namespace    https://github.com/ShadowOfKing/JSScripts/
// @version      1.0
// @description  Добавляет выделение текста в фанфиках
// @author       Wilat Collany
// @include      https://fanfiction.net/*
// @include      https://www.fanfiction.net/*
// @grant        none
// @updateURL    https://raw.githubusercontent.com/ShadowOfKing/JSScripts/master/fanfiction/addon.js
// @downloadURL  https://raw.githubusercontent.com/ShadowOfKing/JSScripts/master/fanfiction/addon.js
// ==/UserScript==

(function() {
    'use strict';
    setTimeout(function() {
        var styleEl = document.createElement('style');
        document.head.appendChild(styleEl);
        $(styleEl).text("* {user-select: text!important;}");
    }, 500);
})();

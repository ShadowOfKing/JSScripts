// ==UserScript==
// @name         fanfiction.addon
// @namespace    https://github.com/ShadowOfKing/JSScripts/
// @version      1.2
// @description  Добавляет выделение текста в фанфиках, а также изменяет гамму сайта.
// @author       Wilat Collany
// @include      https://fanfiction.net/*
// @include      https://www.fanfiction.net/*
// @grant        none
// @updateURL    https://raw.githubusercontent.com/ShadowOfKing/JSScripts/master/fanfiction/addon.js
// @downloadURL  https://raw.githubusercontent.com/ShadowOfKing/JSScripts/master/fanfiction/addon.js
// ==/UserScript==

var params = {
    userSelect: true,
    colorParams: {
        enable: true,
        indentBGColor: "#0a607d",
        indentColor: "white",
        bodyHiddenOverflowX: true,
        normaliseIndent: true,
        bgLayerColor: "rgba(231, 232, 171, 0.46)",
        bgLayerTwoColor: "transparent",
        bgLayerThreeColor: "rgba(132, 243, 255, 0.36)",
        bgMiniElementColor: "#c2ead7",
        tableHeadColor: "#d0f1b9",
    }
};

function enableUserSelect() {
    var styleEl = document.createElement('style');
    document.head.appendChild(styleEl);
    $(styleEl).text(" * {user-select: text!important;}");
}

function changeColors() {
    var styleEl = document.createElement('style');
    document.head.appendChild(styleEl);
    var css = "";
    var par = params.colorParams;
    if (par.bgLayerColor) {
      css += "#content_parent {background-color: " + par.bgLayerColor + ";}";
    }
    if (par.bgLayerTwoColor) {
      css += "#content_wrapper {background-color: " + par.bgLayerTwoColor + "!important;}";
    }
    if (par.bgLayerThreeColor) {
        css += "#content_wrapper_inner {background-color: " + par.bgLayerThreeColor + "!important;}";
    }
    if (par.bgMiniElementColor) {
        css += ".zmenu, .lc, .lc-left, .lc-right {background-color: " + par.bgMiniElementColor + "!important;}";
    }
    css += ".lc, .lc-left, .lc-right {padding: 5px 10px;border-radius: 31px;border: 1px solid #cdcdcd!important;}";
    if (par.tableHeadColor) {
        css += ".tcat {background-color: " + par.tableHeadColor + "!important;}";
    }
    if (par.indentBGColor) {
        css += "#content_wrapper_inner {border-color: " + par.indentBGColor + "!important;}";
        css += "#content_wrapper_inner {border-left-width: 40px; border-right-width: 40px; padding: 10px 5px 0 5px!important;}";
        css += "#content_wrapper_inner #p_footer {margin-left: -5px;}";
        css += "#p_footer {background-color: " + par.indentBGColor + "!important;}";
        css += "#top {background-color: " + par.indentBGColor + "!important;}";
        css += ".zmenu {width: calc(100% - 80px)!important;border-left: 40px solid " +  par.indentBGColor + "!important;border-right: 40px solid " +  par.indentBGColor + "!important;border-bottom: 0.5px solid " +  par.indentBGColor + "!important;}";
    }
    if (par.indentColor) {
        css += "#p_footer, #p_footer *{color: " + par.indentColor + "!important;}";
    }
    if (par.bodyHiddenOverflowX == true) {
        css += "body {overflow-x: hidden;}";
    }
    if (par.normaliseIndent == true) {
        css += "#content_wrapper{width: 100%; padding-left: 0px!important;padding-right: 0px!important;}";
        css += "#p_footer {width: 100%!important; max-width: none!important; padding: 1em 40px!important; color: white;}";
    }
    $(styleEl).text(css);
}

(function() {
    'use strict';
    if (params.userSelect == true) {
        enableUserSelect();
    }
    if (params.colorParams.enable == true) {
        changeColors();
    }
})();

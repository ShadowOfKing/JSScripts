// ==UserScript==
// @name         BlockFicBookSlash
// @namespace    https://github.com/ShadowOfKing/JSScripts/
// @version      1.0
// @description  Скрывает на сайте фанфики, у которых в жанре стоит слэш.
// @author       Wilat Collany
// @match        https://ficbook.net/*
// @grant        none
// @updateURL    https://github.com/ShadowOfKing/JSScripts/blob/master/ficbook/blockSlash/ficbook.blockSlash.js
// @downloadURL  https://github.com/ShadowOfKing/JSScripts/blob/master/ficbook/blockSlash/ficbook.blockSlash.js
// ==/UserScript==

var blocks = {
    "slash": {
        "constraints":
        [
            {
                "selector": ".icon-slash",
                "parent": "article, .festival-thumb"
            },
            {
                "selector": ".direction-slash",
                "parent": "#main"
            }
        ],
        "message": "Тут был слэш",
        "block": true,
    },
    "femslash": {
        "constraints":
        [
            {
                "selector": ".icon-femslash",
                "parent": "article, .festival-thumb"
            },
            {
                "selector": ".direction-efmslash",
                "parent": "#main"
            }
        ],
        "message": "Тут был фемслэш",
        "block": true,
    },
};


function blockElement(el) {
    var message = el.message;
    for (var i = 0; i < el.constraints.length; i++) {
        var con = el.constraints[i];
        var $selector = $(con.selector);
        $selector.each(function() {
            var $parent = $(this).parents(con.parent).first();
            $parent.wrap("<div></div>");
            $parent = $parent.parent();
            $parent.html("<div class='BlockContent'>" + message + "</div>");
            $parent.children().click(function(e) {
                $(this).addClass('closed');
                $(this).fadeOut('medium');
            });
        });
    }
}

function addStyles() {
    var styleEl = document.createElement('style');
    document.head.appendChild(styleEl);
    var styleSheet = styleEl.sheet;
    styleSheet.insertRule(".BlockContent {text-align: center;font-size: 1.5em;background-color: rgba(146, 32, 32, 0.46);color: black;padding: 5px 0px;margin-bottom: 15px;border: 1px solid red;cursor: pointer; transition: 0.3s linear all;}", styleSheet.cssRules.length);
    styleSheet.insertRule(".BlockContent:hover:not(.closed) {background-color: rgba(146, 32, 32, 0.76);}", styleSheet.cssRules.length);
    styleSheet.insertRule(".BlockContent.closed {cursor: default;}", styleSheet.cssRules.length);
}

(function() {
    'use strict';
    addStyles();
    for (var i in blocks) {
        var el = blocks[i];
        if (blocks[i].block == true) {
            blockElement(el);
        }
    }
})();

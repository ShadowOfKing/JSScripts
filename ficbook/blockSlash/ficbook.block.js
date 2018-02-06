// ==UserScript==
// @name         ficbook.block
// @namespace    https://github.com/ShadowOfKing/JSScripts/
// @version      1.1
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
                "selector": ".direction-femslash",
                "parent": "#main"
            }
        ],
        "message": "Тут был фемслэш",
        "block": true,
    },
    "ads": {
        "constraints":
        [
            {
                "selector": "yatag",
                "parent": "div"
            },
        ],
        "message": "Тут была реклама",
        "block": true,
        "delay": 500,
        "repeats": 3,
        "step": 1000,
        "css": {
            "background-color": "#4d2917",
            "color": "#f6ecda",
        }
    },
    "genres": {
        "constraints":
        [
            {
                "selector": ".disliked-parameter-link",
                "parent": "#main, article"
            },
        ],
        "message": "Тут был нелюбимый жанр",
        "block": true,
        "css": {
            "background-color": "#2c1a14",
            "color": "#dd3131",
        }
    },
};


function blockElement(el) {
    var message = el.message;
    var delay = el.delay == null ? 1 : el.delay;
    var count = el.repeats == null ? 1 : el.repeats;
    var step = el.step == null ? delay : el.step;
    for (var iter = 0; iter < count; iter++) {
        setTimeout(function() {
            for (var i = 0; i < el.constraints.length; i++) {
                var con = el.constraints[i];
                var $selector = $(con.selector);
                $selector.each(function() {
                    var $parent = $(this).parents(con.parent).first();
                    $parent.wrap("<div></div>");
                    $parent = $parent.parent();
                    var css = "";
                    if (el.css != null) {
                        css = 'style="';
                        for (var j in el.css) {
                            css += j + ': ' + el.css[j] + ';';
                        }
                        css += '"';
                    }
                    $parent.html("<div class='BlockContent'" + css + ">" + message + "</div>");
                    $parent.children().click(function(e) {
                        $(this).addClass('closed');
                        $(this).fadeOut('medium');
                    });
                });
            }
        }, delay);
        delay += step;
    }
}

function addStyles() {
    var styleEl = document.createElement('style');
    document.head.appendChild(styleEl);
    var styleSheet = styleEl.sheet;
    styleSheet.insertRule(".BlockContent {text-align: center;font-size: 1.5em;background-color: rgb(146, 32, 32); opacity: 0.46; color: black;padding: 5px 0px;margin-bottom: 15px;border: 1px solid red;cursor: pointer; transition: 0.3s linear all;}", styleSheet.cssRules.length);
    styleSheet.insertRule(".BlockContent:hover:not(.closed) { opacity: 0.76;}", styleSheet.cssRules.length);
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

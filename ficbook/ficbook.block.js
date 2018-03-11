// ==UserScript==
// @name         ficbook.block
// @namespace    https://github.com/ShadowOfKing/JSScripts/
// @version      1.5
// @description  Скрывает на сайте элементы, которые чем-то не угодили. Например фанфики, со слэшем, фэмслэшем, с нелюбимыми жанрами... Или рекламу.
// @author       Wilat Collany
// @match        https://ficbook.net/*
// @grant        none
// @updateURL    https://raw.githubusercontent.com/ShadowOfKing/JSScripts/master/ficbook/ficbook.block.js
// @downloadURL  https://raw.githubusercontent.com/ShadowOfKing/JSScripts/master/ficbook/ficbook.block.js
// @exclude      https://ficbook.net/collections/*
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
                "parent": "main, #main"
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
                "parent": "main, #main"
            }
        ],
        "message": "Тут был фемслэш",
        "block": true,
    },
    "ads": {
        "constraints":
        [
            {
                "selector": "yatag, .rkl-banner > a",
                "parent": "div, main, #main"
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
        },
        "saveContent": true,
    },
    "genres": {
        "constraints":
        [
            {
                "selector": "article .disliked-parameter-link",
                "parent": "main, #main, article"
            },
        ],
        "message": "Тут был нелюбимый жанр",
        "block": true,
        "css": {
            "background-color": "#2c1a14",
            "color": "#dd3131",
        },
        "saveContent": true,
    },
    "authors": {
        "constraints": [
            {
                "selector": "article.block .description ul li a",
                "parent": "article.block",
                "text": [
                    "volhve",
                    "ЗуРир",
                    "Ошибка гендерного Развития",
                    "sanika_263",
                    "Alatar"
                ]
            }
        ],
        "message": "Здесь был нелюбимый автор",
        "block": true,
        "css": {
            "background-color": "black",
            "color": "white;"
        },
        "saveContent": true
    }
};


function blockElement(el) {
    var message = el.message;
    var delay = el.delay == null ? 1 : el.delay;
    var count = el.repeats == null ? 1 : el.repeats;
    var step = el.step == null ? delay : el.step;
    var saveContent = el.saveContent;
    for (var iter = 0; iter < count; iter++) {
        setTimeout(function() {
            for (var i = 0; i < el.constraints.length; i++) {
                var con = el.constraints[i];
                var $selector = $(con.selector);
                var count = con.text ? con.text.length : 1;
                $selector.each(function() {
                    if ($(this).parents('.blockedContent').length > 0) {
                        return;
                    }
                    for (var ii = 0; ii < count; ii++) {
                        var text = con.text && con.text.length > 0 ? con.text[ii].trim().toLowerCase() : "";
                        if (text == "" || text == $(this).text().trim().toLowerCase()) {
                            console.log("<<" + ii + " " + text + " ! " + $(this).text() + ">>");
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
                            if (saveContent) {
                                $parent.html("<div style='display: none;' class='blockedContent'>" + $parent.html() + "</div>");
                                $parent.append('<div class="openBlockedContent">Показать скрытый контент</div>');
                                $parent.css('position', 'relative');
                                $parent.children('.openBlockedContent').click(function(e) {
                                    $(this).hide();
                                    var $el = $(this).parent().slideUp(500);
                                    setTimeout(function() {
                                        $el.children('.BlockContent').hide();
                                        $el.children('.blockedContent').show();
                                        $el.slideDown(500);
                                    }, 500);
                                });
                            } else {
                                $parent.html("<span></span>");
                            }
                            $parent.children().last().before("<div class='BlockContent'" + css + ">" + message + "</div>");
                            $parent.children('.BlockContent').click(function(e) {
                                $(this).addClass('closed');
                                $(this).parent().slideUp(500);
                            });
                        }
                    }
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
    styleSheet.insertRule(".openBlockedContent {transition: 0.5s ease-in-out all; position: absolute;color: #fafafa;right: 5px;bottom: 5px;background-color: #121517;padding: 5px;border-radius: 15px;border: 1px solid red; opacity: 0.7; cursor: pointer;}", styleSheet.cssRules.length);
    styleSheet.insertRule(".openBlockedContent:hover {opacity: 1.7; background-color: #fafafa; color: #121517;}", styleSheet.cssRules.length);
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

// ==UserScript==
// @name         ficbook.removeUrlRedirect
// @namespace    https://github.com/ShadowOfKing/JSScripts/
// @version      1.0.1
// @description  Удаляет переадресацию на страницу "Вы уверены, что хотите перейти по ссылки?"
// @author       Wilat Collany
// @include      https://ficbook.net/*
// @include      https://www.ficbook.net/*
// @grant        none
// @updateURL    https://raw.githubusercontent.com/ShadowOfKing/JSScripts/master/ficbook/removeUrlRedirect.js
// @downloadURL  https://raw.githubusercontent.com/ShadowOfKing/JSScripts/master/ficbook/removeUrlRedirect.js
// ==/UserScript==

// Устанавливаем интервал запуска алгоритма поиска и замены ссылок - нужно для работы с подружающимися комментариями
const linksCheckInterval = 10;

const siteUrl = 'https://ficbook.net'
const relativePageUrl = '/away?'
const fullPageUrl = `${siteUrl}${relativePageUrl}`
const replacedLinkClassName = 'WilatCssSriptsFicbookRemoveUrlRedirect'
const relText = 'nofollow'
;

(() => {
  'use strict'
  setInterval(() =>
    Array
      .from(document.getElementsByTagName('a'))
      .filter(a => {
        const href = a.href || ''
        return !a.classList.contains(replacedLinkClassName)
          && (href.startsWith(fullPageUrl) || href.startsWith(relativePageUrl))
          && (a.text || '').trim().startsWith('http')
      }).forEach(a => {
        a.href = a.text.trim()
        a.target = '_blank'
        a.classList.add(replacedLinkClassName)
        if (a.rel.trim().toLowerCase() == relText) {
            a.removeAttribute('rel')
        }
      }), linksCheckInterval);
})()

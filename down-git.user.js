// ==UserScript==
// @name         DownGit
// @namespace    http://mogeko.me
// @version      0.0.1
// @description  Create GitHub Resource Download Link.
// @author       mogeko
// @match        https://github.com/*/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=github.com
// @run-at       document-idle
// @grant        none
// ==/UserScript==

/**
 * <div role="row">
 *  <div><svg class={{icon}}/></div>,
 *  <div><span><a>{{name}}</a></span></div>,
 *  <div><span><a>{{message}}</a></span></div>,
 *  <div><span>{time}</span></div>,
 * </div>
 */

const svg_icon = `<svg class="octicon octicon-download hx_color-icon-directory" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M7.47 10.78a.75.75 0 001.06 0l3.75-3.75a.75.75 0 00-1.06-1.06L8.75 8.44V1.75a.75.75 0 00-1.5 0v6.69L4.78 5.97a.75.75 0 00-1.06 1.06l3.75 3.75zM3.75 13a.75.75 0 000 1.5h8.5a.75.75 0 000-1.5h-8.5z"/></svg>`;

const downloader = (local_url) =>
  `https://minhaskamal.github.io/DownGit/#/home?url=${local_url}`;

const getButton = (file_title, url) => {
  const div = document.createElement("div");
  div.className = "mr-3 flex-shrink-0";
  const a = document.createElement("a");
  a.href = downloader(url);
  a.title = `Download ${file_title}.zip`;
  a.innerHTML = svg_icon;
  div.appendChild(a);
  return div;
};

(function () {
  "use strict";

  const context = document.querySelectorAll("div.Box-row");
  context.forEach((node) => {
    const url = node.querySelector("a");
    const last_child = node.querySelector("div.text-right");
    if (url.querySelector("span")) return;
    const button = getButton(url.innerHTML, url.href);
    node.insertBefore(button, last_child);
  });
})();

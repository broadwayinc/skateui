'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-feba09e5.js');

/*
 Stencil Client Patch Esm v2.16.1 | MIT Licensed | https://stenciljs.com
 */
const patchEsm = () => {
    return index.promiseResolve();
};

const defineCustomElements = (win, options) => {
  if (typeof window === 'undefined') return Promise.resolve();
  return patchEsm().then(() => {
  return index.bootstrapLazy([["sui-button_6.cjs",[[1,"sui-button",null,[[0,"click","clickEventHandler"],[0,"keyup","keyEventHandler"]]],[1,"sui-flextext",{"minSize":[1026,"min-size"],"maxSize":[1026,"max-size"]}],[1,"sui-input",{"value":[520]}],[1,"sui-nav",{"autoHide":[2,"auto-hide"]}],[1,"sui-overlay",{"position":[1],"transitionTime":[1,"transition-time"],"close":[64],"open":[64]}],[1,"sui-select",{"leftPadding":[32],"rightPadding":[32],"topPadding":[32],"value":[32]}]]]], options);
  });
};

exports.defineCustomElements = defineCustomElements;

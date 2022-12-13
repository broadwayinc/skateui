'use strict';

const index = require('./index-26ebdd1c.js');

/*
 Stencil Client Patch Browser v2.16.1 | MIT Licensed | https://stenciljs.com
 */
const patchBrowser = () => {
    const importMeta = (typeof document === 'undefined' ? new (require('u' + 'rl').URL)('file:' + __filename).href : (document.currentScript && document.currentScript.src || new URL('skateui.cjs.js', document.baseURI).href));
    const opts = {};
    if (importMeta !== '') {
        opts.resourcesUrl = new URL('.', importMeta).href;
    }
    return index.promiseResolve(opts);
};

patchBrowser().then(options => {
  return index.bootstrapLazy([["sui-button_6.cjs",[[1,"sui-button",null,[[0,"click","clickEventHandler"],[0,"keyup","keyEventHandler"]]],[1,"sui-flextext",{"minSize":[1026,"min-size"],"maxSize":[1026,"max-size"]}],[1,"sui-input",{"value":[8],"el":[16]}],[1,"sui-nav",{"autoHide":[2,"auto-hide"]}],[1,"sui-overlay",{"position":[1],"transitionTime":[1,"transition-time"],"close":[64],"open":[64]}],[1,"sui-select",{"leftPadding":[32],"rightPadding":[32],"topPadding":[32],"value":[32]}]]]], options);
});

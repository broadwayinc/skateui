import { p as promiseResolve, b as bootstrapLazy } from './index-169abe3a.js';

/*
 Stencil Client Patch Browser v2.16.1 | MIT Licensed | https://stenciljs.com
 */
const patchBrowser = () => {
    const importMeta = import.meta.url;
    const opts = {};
    if (importMeta !== '') {
        opts.resourcesUrl = new URL('.', importMeta).href;
    }
    return promiseResolve(opts);
};

patchBrowser().then(options => {
  return bootstrapLazy([["sui-button_6",[[1,"sui-button",null,[[0,"click","clickEventHandler"],[0,"keyup","keyEventHandler"]]],[1,"sui-flextext",{"minSize":[1026,"min-size"],"maxSize":[1026,"max-size"]}],[1,"sui-input",{"value":[8],"el":[16]}],[1,"sui-nav",{"autoHide":[2,"auto-hide"]}],[1,"sui-overlay",{"position":[1],"transitionTime":[1,"transition-time"],"close":[64],"open":[64]}],[1,"sui-select",{"leftPadding":[32],"rightPadding":[32],"topPadding":[32],"value":[32]}]]]], options);
});

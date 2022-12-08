import { r as registerInstance, h, e as Host, g as getElement } from './index-82f09f33.js';
import { d as dummyHandler } from './utils-7bb2cdb2.js';

const suiButtonCss = ":host{-webkit-tap-highlight-color:rgba(0, 0, 0, 0);background:#293FE6;display:inline-block;color:#ffffff;border-radius:5px;vertical-align:baseline;font-size:inherit;padding:0.6em 1.2em;font-weight:bold;font-family:system-ui, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Oxygen, Ubuntu, Cantarell, \"Open Sans\", \"Helvetica Neue\", sans-serif;box-sizing:border-box;cursor:pointer;user-select:none;-webkit-user-select:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;text-align:center;box-shadow:inset 1px 1px 2px rgba(255, 255, 255, 0.5), inset -1px -1px 2px rgba(0, 0, 0, 0.25), inset 0 0 0 1px rgba(0, 0, 0, 0.25);line-height:1.2}:host slot{display:flex;align-items:center;height:100%;justify-content:center}:host(:not([disabled]):hover){box-shadow:inset 1px 1px 2px rgba(255, 255, 255, 0.65), inset -1px -1px 2px rgba(0, 0, 0, 0.25), inset 0 0 0px 1px rgba(0, 0, 0, 0.25), inset 0 0 1em 1em rgba(191, 191, 191, 0.16)}:host(:hover[disabled]){cursor:default}:host([disabled]){box-shadow:inset -1px -1px 2px rgba(255, 255, 255, 0.65), inset 1px 1px 2px rgba(0, 0, 0, 0.25), inset 0 0 0px 1px rgba(0, 0, 0, 0.25);filter:grayscale(1) contrast(0.25) invert(1) brightness(1.3)}:host([hidden]){display:none !important}:host(:not([disabled]):active){box-shadow:inset 0 0 0px 1px rgba(128, 128, 128, 0.25), inset 0 1px 3px rgba(0, 0, 0, 0.75), inset -1px -1px 1px rgba(255, 255, 255, 0.25)}";

const SuiButton = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.isFormButton = (() => {
      return this.host.closest('form');
    })();
    this.dummyElement = (() => {
      // element only needs to be created once, hence creating on class init
      if (!this.host.hasAttribute('disabled')) {
        this.host.setAttribute('tabindex', '0');
      }
      const button = Object.assign(document.createElement('button'), { hidden: true });
      if (!this.isFormButton) {
        this.host.append(button);
      }
      return button;
    })();
  }
  clickEventHandler() {
    if (this.host.attributes.getNamedItem('disabled')) {
      // does not trigger dummy when disabled
      return;
    }
    if (this.isFormButton) {
      this.host.parentElement.insertBefore(this.dummyElement, this.host);
      this.dummyElement.click();
      this.dummyElement.remove();
    }
    else {
      // this.dummyElement.click();
    }
  }
  keyEventHandler(e) {
    if (e.key === 'Enter') {
      // trigger click on enter
      this.clickEventHandler();
    }
  }
  componentDidLoad() {
    dummyHandler.bind(this)({ computedStyle: window.getComputedStyle(this.host) });
  }
  disconnectedCallback() {
    // save memory by disconnecting mutation watch
    if (this.observer) {
      this.observer.disconnect();
    }
  }
  render() {
    return (h(Host, null, h("slot", null)));
  }
  get host() { return getElement(this); }
};
SuiButton.style = suiButtonCss;

export { SuiButton as sui_button };

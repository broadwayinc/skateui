import { Component, h, Element, Listen, Host } from '@stencil/core';
import { dummyHandler } from '../../utils/utils';
export class SuiButton {
  constructor() {
    this.isFormButton = (() => {
      return this.host.closest('form');
    })();
    this.el = (() => {
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
      this.host.parentElement.insertBefore(this.el, this.host);
      this.el.click();
      this.el.remove();
    }
    else {
      // this.el.click();
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
    return (h(Host, null,
      h("slot", null)));
  }
  static get is() { return "sui-button"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() { return {
    "$": ["sui-button.scss"]
  }; }
  static get styleUrls() { return {
    "$": ["sui-button.css"]
  }; }
  static get elementRef() { return "host"; }
  static get listeners() { return [{
      "name": "click",
      "method": "clickEventHandler",
      "target": undefined,
      "capture": false,
      "passive": false
    }, {
      "name": "keyup",
      "method": "keyEventHandler",
      "target": undefined,
      "capture": false,
      "passive": false
    }]; }
}

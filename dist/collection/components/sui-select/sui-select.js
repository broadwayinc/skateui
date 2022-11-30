import { Component, Host, h, Element, State } from '@stencil/core';
import { dummyHandler } from '../../utils/utils';
export class SuiSelect {
  constructor() {
    this.leftPadding = '0px';
    this.rightPadding = '0px';
    this.topPadding = '0px';
    this.isMultiple = (() => {
      return this.host.hasAttribute('multiple');
    })();
    this.dummyElement = (() => {
      var _a;
      const select_pre = this.host.getElementsByTagName('select');
      if (select_pre.length) {
        if (select_pre.length !== 1) {
          throw new Error('<sui-select> does not allow multiple <select> elements.');
        }
        return select_pre[0];
      }
      const select = document.createElement('select');
      if (this.host.children.length) {
        let len = this.host.children.length;
        while (len--) {
          select.prepend(this.host.children[len]);
        }
      }
      this.value = ((_a = select.getElementsByTagName('option')[select.selectedIndex || 0]) === null || _a === void 0 ? void 0 : _a.textContent) || select.value || '';
      select.addEventListener('change', () => {
        var _a;
        this.value = ((_a = select.getElementsByTagName('option')[select.selectedIndex || 0]) === null || _a === void 0 ? void 0 : _a.textContent) || select.value || '';
      });
      for (const [key, value] of Object.entries({
        // set important styles
        // these value should not be editable
        background: 'transparent',
        'box-sizing': 'border-box',
        border: 'none',
        display: 'block',
        'font-size': 'inherit',
        'line-height': '1.2',
        '-webkit-appearance': 'none',
        '-moz-appearance': 'none',
        'appearance': 'none',
        'cursor': this.isMultiple ? 'default' : 'pointer'
      })) {
        select.style.setProperty(key, value, 'important');
      }
      if (!this.isMultiple) {
        select.style.setProperty('opacity', '0');
      }
      this.host.append(select);
      return select;
    })();
  }
  componentWillLoad() {
    dummyHandler.bind(this)({
      computedStyle: window.getComputedStyle(this.host),
      copyStyle: (hostCss) => {
        this.dummyElement.style.setProperty('border-radius', hostCss['border-radius'], 'important');
        // make text input fill the host
        let needAdjustment = false;
        let padding = [
          hostCss['padding-top'],
          hostCss['padding-right'],
          hostCss['padding-bottom'],
          hostCss['padding-left']
        ].map(p => {
          let val = Number(p.replace('px', ''));
          if (val && !needAdjustment) {
            needAdjustment = true;
          }
          return val;
        });
        if (!needAdjustment) {
          this.dummyElement.style.setProperty('margin', '0', 'important');
          return;
        }
        if (padding[0] || padding[2]) {
          this.topPadding = `${padding[0]}px`;
          this.dummyElement.style.setProperty('height', `calc(100% + ${padding[0]}px + ${padding[2]}px)`, 'important');
        }
        else if (!this.isMultiple) {
          this.dummyElement.style.setProperty('height', hostCss['height'], 'important');
        }
        if (padding[1] || padding[3]) {
          this.leftPadding = `${padding[3]}px`;
          this.rightPadding = `${padding[1]}px`;
          this.dummyElement.style.setProperty('width', `calc(100% + ${this.leftPadding} + ${this.rightPadding})`, 'important');
        }
        this.dummyElement.style.setProperty('padding', hostCss['padding'], 'important');
        this.dummyElement.style.setProperty('margin', padding.map(p => {
          return p ? `-${p}px` : '0px';
        }).join(' '), 'important');
      },
      appendIdToSlotElement: true,
      excludeAttribute: this.isMultiple ? [] : ['size'] // size attribute should not work for multiple select
    });
  }
  render() {
    return (h(Host, null,
      h("div", null,
        h("span", { "data-selected": this.value, style: { display: this.isMultiple ? 'none' : 'flex', width: `calc(100% - ${this.isMultiple ? 0 : 0.75}em)` } }),
        h("svg", { style: { display: this.isMultiple ? 'none' : 'block' }, fill: "currentColor", viewBox: "0 -100 700 700", xmlns: "http://www.w3.org/2000/svg" },
          h("path", { d: "m81.957 144.91 252.97 305.17c4.7695 5.293 10.496 7.9336 17.16 7.9336 6.1875 0 11.676-2.6445 16.438-7.9453l250.12-305.17c6.1875-8.4844 7.3984-17.746 3.5742-27.82-3.8008-10.051-10.703-15.094-20.727-15.094l-202.93 0.003906h-300.16c-9.5352 0-16.438 5.0391-20.727 15.094-3.8008 10.078-2.3672 19.355 4.2852 27.828z" })),
        h("slot", null))));
  }
  static get is() { return "sui-select"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() { return {
    "$": ["sui-select.scss"]
  }; }
  static get styleUrls() { return {
    "$": ["sui-select.css"]
  }; }
  static get states() { return {
    "leftPadding": {},
    "rightPadding": {},
    "topPadding": {},
    "value": {}
  }; }
  static get elementRef() { return "host"; }
}

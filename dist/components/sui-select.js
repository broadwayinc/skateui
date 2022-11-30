import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';
import { d as dummyHandler } from './utils.js';

const suiSelectCss = ":host([multiple]){padding:0.66em;box-shadow:-1px -1px 2px -1px rgba(0, 0, 0, 0.5), 1px 1px 1px rgba(255, 255, 255, 0.33), inset 0 0 0 1px rgba(0, 0, 0, 0.25);overflow:hidden}:host{user-select:none;-webkit-user-select:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;vertical-align:bottom;display:inline-block;width:12em;line-height:1.2;font-size:inherit;padding:0.6em 0.66em;border-radius:4px;box-sizing:border-box;font-family:system-ui, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Oxygen, Ubuntu, Cantarell, \"Open Sans\", \"Helvetica Neue\", sans-serif;box-shadow:inset 1px 1px 2px rgba(255, 255, 255, 0.5), inset -1px -1px 2px rgba(0, 0, 0, 0.25), inset 0 0 0 1px rgba(0, 0, 0, 0.25);background-color:transparent;color:inherit}:host div{position:relative;display:flex;align-items:center}:host slot option{color:black;background-color:white}:host svg{user-select:none;pointer-events:none;width:0.75em;color:inherit;position:absolute;right:0;opacity:0.88;display:block;line-height:1em}:host span{user-select:none;pointer-events:none;width:100%;position:absolute;align-items:center}:host span::after{content:attr(data-selected);display:inline-block;vertical-align:baseline;width:100%;line-height:normal;flex:1 1 auto;text-overflow:ellipsis;overflow:hidden;white-space:nowrap}:host([disabled]){box-shadow:none;background-color:rgba(128, 128, 128, 0.5);filter:grayscale(1)}";

const SuiSelect$1 = /*@__PURE__*/ proxyCustomElement(class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
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
    return (h(Host, null, h("div", null, h("span", { "data-selected": this.value, style: { display: this.isMultiple ? 'none' : 'flex', width: `calc(100% - ${this.isMultiple ? 0 : 0.75}em)` } }), h("svg", { style: { display: this.isMultiple ? 'none' : 'block' }, fill: "currentColor", viewBox: "0 -100 700 700", xmlns: "http://www.w3.org/2000/svg" }, h("path", { d: "m81.957 144.91 252.97 305.17c4.7695 5.293 10.496 7.9336 17.16 7.9336 6.1875 0 11.676-2.6445 16.438-7.9453l250.12-305.17c6.1875-8.4844 7.3984-17.746 3.5742-27.82-3.8008-10.051-10.703-15.094-20.727-15.094l-202.93 0.003906h-300.16c-9.5352 0-16.438 5.0391-20.727 15.094-3.8008 10.078-2.3672 19.355 4.2852 27.828z" })), h("slot", null))));
  }
  get host() { return this; }
  static get style() { return suiSelectCss; }
}, [1, "sui-select", {
    "leftPadding": [32],
    "rightPadding": [32],
    "topPadding": [32],
    "value": [32]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["sui-select"];
  components.forEach(tagName => { switch (tagName) {
    case "sui-select":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, SuiSelect$1);
      }
      break;
  } });
}

const SuiSelect = SuiSelect$1;
const defineCustomElement = defineCustomElement$1;

export { SuiSelect, defineCustomElement };

import { Component, Host, h, Element, Prop, Watch } from '@stencil/core'; //Method, 
import { dummyHandler, randomString, cloneEvents } from '../../utils/utils';
export class SuiInput {
  constructor() {
    this.availableTypes = [
      // checker
      'checkbox',
      'radio',
      // text
      'text',
      'password',
      'email',
      'number',
      'search',
      'tel',
      'url',
      // buttons
      'reset',
      'submit'
    ];
    this.slotName = randomString();
    this.isChecker = false;
    this.isButton = false;
    this.el = (() => {
      var _a, _b;
      // add input element manually because shadow dom input is not recognized by forms
      let inputType = this.host.getAttribute('type'); // always use getAttribute() for proper casing
      // let value = this.host.getAttribute('value');
      let value = this.value;
      if (!inputType || !this.availableTypes.includes(inputType)) {
        this.host.setAttribute('type', 'text');
        inputType = 'text';
      }
      this.isButton = inputType === 'reset' || inputType === 'submit';
      this.isChecker = inputType === 'checkbox' || inputType === 'radio';
      const previousInput = (_a = this.host.getElementsByTagName('input')) === null || _a === void 0 ? void 0 : _a[0];
      if (previousInput && previousInput.hasAttribute('slot')) {
        // if element already exists, return
        // element can already exist when working on hot reloads
        // setup new slot name
        previousInput.setAttribute('slot', this.slotName);
        // button input use additional span to display text
        const previousSpan = (_b = this.host.getElementsByTagName('span')) === null || _b === void 0 ? void 0 : _b[0];
        if (previousSpan) {
          if (previousSpan && previousSpan.hasAttribute('slot') && previousSpan.getAttribute('slot') === 'value' && this.isButton) {
            previousSpan.innerHTML = value || (inputType === 'submit' ? 'Submit' : 'Reset');
          }
          else {
            previousSpan.remove();
          }
        }
        return previousInput;
      }
      // create new element
      const input = document.createElement('input');
      if (value) {
        input.setAttribute('value', value);
      }
      // if (this.value) {
      //   input.setAttribute('value', this.value);
      // }
      // setup new slot name
      // slot name is to prevent users adding custom elements
      input.setAttribute('slot', this.slotName);
      if (!this.availableTypes.includes(inputType)) {
        // type not available (yet)
        this.host.prepend(input);
        return input;
      }
      // add eventlistener manually if type is checkbox | radio | reset | submit
      const clicker = () => {
        if (this.host.attributes.getNamedItem('disabled')) {
          // does not trigger dummy when disabled
          return;
        }
        this.el.click();
      };
      if (this.isButton) {
        // hidden
        input.setAttribute('hidden', '');
        // tab index is on host
        if (!this.host.hasAttribute('disabled')) {
          this.host.setAttribute('tabindex', '0');
        }
        this.host.addEventListener('keyup', (e) => {
          if (e.key === 'Enter') {
            // checkbox, radio should be able to trigger click on enter key
            clicker();
          }
        });
        this.host.addEventListener('click', clicker);
        // add button text
        let span = document.createElement('span');
        // span.innerHTML = this.value || (inputType === 'submit' ? 'Submit' : 'Reset');
        span.innerHTML = value || (inputType === 'submit' ? 'Submit' : 'Reset');
        span.setAttribute('slot', 'value');
        this.host.prepend(span);
      }
      else if (this.isChecker) {
        // hidden
        input.setAttribute('hidden', '');
        // tab index is on host
        if (!this.host.hasAttribute('disabled')) {
          this.host.setAttribute('tabindex', '0');
        }
        // add eventlistener manually if type is checkbox | radio
        const clicker = () => {
          if (this.host.attributes.getNamedItem('disabled')) {
            // does not trigger dummy when disabled
            return;
          }
          this.el.click();
        };
        this.host.addEventListener('keyup', (e) => {
          if (e.key === 'Enter') {
            // checkbox, radio should be able to trigger click on enter key
            clicker();
          }
        }, true);
        this.host.addEventListener('click', clicker);
        input.addEventListener('change', () => {
          // keep track of checked, update dom
          if (inputType === 'checkbox') {
            if (input.checked) {
              this.host.setAttribute('checked', '');
            }
            else {
              this.host.removeAttribute('checked');
            }
          }
          if (inputType === 'radio') {
            // triggers only on checked, since radio button can't uncheck from user input
            let radios = document.getElementsByName(input.name);
            for (let i = 0; i < radios.length; i++) {
              if ((radios[i] instanceof HTMLInputElement) &&
                radios[i].getAttribute('type') === 'radio' &&
                radios[i] !== input) {
                radios[i].parentElement.removeAttribute('checked'); // remove checked attribute from it's host
              }
            }
            this.host.setAttribute('checked', '');
          }
        });
      }
      else {
        // tab index is on input element
        for (const [key, value] of Object.entries({
          // set important styles
          // these value should not be editable
          'box-sizing': 'border-box',
          display: 'block',
          'font-size': 'inherit',
          'line-height': '1.2'
        })) {
          input.style.setProperty(key, value, 'important');
        }
        // for (const [key, value] of Object.entries({
        //   'background-color': 'transparent',
        //   color: 'inherit',
        //   border: 'none',
        // })) {
        //   input.style.setProperty(key, value);
        // }
      }
      this.host.prepend(input);
      return input;
    })();
  }
  valueHandler(n, o) {
    if (n !== o) {
      this.el.value = n;
    }
  }
  componentDidLoad() {
    dummyHandler.bind(this)({
      computedStyle: window.getComputedStyle(this.host),
      excludeStyle: ['border', 'margin', 'padding', 'max', 'min'],
      copyStyle: this.isChecker ? null : !this.isButton ? (hostCss) => {
        this.el.style.setProperty('border-radius', hostCss['border-radius'], 'important');
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
          this.el.style.setProperty('margin', '0', 'important');
          return;
        }
        if (padding[1] || padding[3]) {
          this.el.style.setProperty('width', `calc(100% + ${padding[1]}px + ${padding[3]}px)`, 'important');
        }
        this.el.style.setProperty('padding', hostCss['padding'], 'important');
        this.el.style.setProperty('margin', padding.map(p => {
          return p ? `-${p}px` : '0px';
        }).join(' '), 'important');
      } : null,
      // attCallback: (attName, val) => {
      //   console.log({attName,val})
      // },
      excludeAttribute: ['value'],
      appendIdToSlotElement: true
    });
    // stop event propagation from input element,
    // emit events from host
    cloneEvents.bind(this)(this.el);
    // dispatch load event when finished loading
    this.el.dispatchEvent(new Event('load'));
  }
  disconnectedCallback() {
    // save memory by disconnecting mutation watch
    this.observer.disconnect();
    // remove dummy element
    this.el.remove();
  }
  render() {
    return (h(Host, null,
      h("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "currentColor", viewBox: "-2 -4 28 28" },
        h("path", { d: "M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z" })),
      h("slot", { name: this.slotName }),
      h("slot", { name: 'value' })));
  }
  static get is() { return "sui-input"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() { return {
    "$": ["sui-input.scss"]
  }; }
  static get styleUrls() { return {
    "$": ["sui-input.css"]
  }; }
  static get properties() { return {
    "value": {
      "type": "any",
      "mutable": false,
      "complexType": {
        "original": "any",
        "resolved": "any",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": ""
      },
      "attribute": "value",
      "reflect": false
    },
    "el": {
      "type": "unknown",
      "mutable": false,
      "complexType": {
        "original": "HTMLInputElement",
        "resolved": "HTMLInputElement",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": ""
      },
      "defaultValue": "(() => {\n    // add input element manually because shadow dom input is not recognized by forms\n    let inputType = this.host.getAttribute('type'); // always use getAttribute() for proper casing\n    // let value = this.host.getAttribute('value');\n    let value = this.value;\n    if (!inputType || !this.availableTypes.includes(inputType)) {\n      this.host.setAttribute('type', 'text');\n      inputType = 'text';\n    }\n\n    this.isButton = inputType === 'reset' || inputType === 'submit';\n    this.isChecker = inputType === 'checkbox' || inputType === 'radio';\n\n    const previousInput = this.host.getElementsByTagName('input')?.[0];\n    if (previousInput && previousInput.hasAttribute('slot')) {\n      // if element already exists, return\n      // element can already exist when working on hot reloads\n\n      // setup new slot name\n      previousInput.setAttribute('slot', this.slotName);\n\n      // button input use additional span to display text\n      const previousSpan = this.host.getElementsByTagName('span')?.[0];\n      if (previousSpan) {\n        if (previousSpan && previousSpan.hasAttribute('slot') && previousSpan.getAttribute('slot') === 'value' && this.isButton) {\n          previousSpan.innerHTML = value || (inputType === 'submit' ? 'Submit' : 'Reset');\n        }\n        else {\n          previousSpan.remove();\n        }\n      }\n      return previousInput;\n    }\n\n    // create new element\n    const input = document.createElement('input');\n    if (value) {\n      input.setAttribute('value', value);\n    }\n    // if (this.value) {\n    //   input.setAttribute('value', this.value);\n    // }\n\n    // setup new slot name\n    // slot name is to prevent users adding custom elements\n    input.setAttribute('slot', this.slotName);\n\n    if (!this.availableTypes.includes(inputType)) {\n      // type not available (yet)\n      this.host.prepend(input);\n      return input;\n    }\n\n    // add eventlistener manually if type is checkbox | radio | reset | submit\n    const clicker = () => {\n      if (this.host.attributes.getNamedItem('disabled')) {\n        // does not trigger dummy when disabled\n        return;\n      }\n      this.el.click();\n    };\n\n    if (this.isButton) {\n      // hidden\n      input.setAttribute('hidden', '');\n\n      // tab index is on host\n      if (!this.host.hasAttribute('disabled')) {\n        this.host.setAttribute('tabindex', '0');\n      }\n\n      this.host.addEventListener('keyup', (e) => {\n        if (e.key === 'Enter') {\n          // checkbox, radio should be able to trigger click on enter key\n          clicker();\n        }\n      });\n      this.host.addEventListener('click', clicker);\n\n      // add button text\n      let span = document.createElement('span');\n      // span.innerHTML = this.value || (inputType === 'submit' ? 'Submit' : 'Reset');\n      span.innerHTML = value || (inputType === 'submit' ? 'Submit' : 'Reset');\n      span.setAttribute('slot', 'value');\n      this.host.prepend(span);\n    }\n\n    else if (this.isChecker) {\n      // hidden\n      input.setAttribute('hidden', '');\n\n      // tab index is on host\n      if (!this.host.hasAttribute('disabled')) {\n        this.host.setAttribute('tabindex', '0');\n      }\n\n      // add eventlistener manually if type is checkbox | radio\n      const clicker = () => {\n        if (this.host.attributes.getNamedItem('disabled')) {\n          // does not trigger dummy when disabled\n          return;\n        }\n        this.el.click();\n      };\n\n      this.host.addEventListener('keyup', (e) => {\n        if (e.key === 'Enter') {\n          // checkbox, radio should be able to trigger click on enter key\n          clicker();\n        }\n      }, true);\n\n      this.host.addEventListener('click', clicker);\n\n      input.addEventListener('change', () => {\n        // keep track of checked, update dom\n        if (inputType === 'checkbox') {\n          if (input.checked) {\n            this.host.setAttribute('checked', '');\n          }\n          else {\n            this.host.removeAttribute('checked');\n          }\n        }\n\n        if (inputType === 'radio') {\n          // triggers only on checked, since radio button can't uncheck from user input\n          let radios = document.getElementsByName(input.name);\n          for (let i = 0; i < radios.length; i++) {\n            if (\n              (radios[i] instanceof HTMLInputElement) &&\n              radios[i].getAttribute('type') === 'radio' &&\n              radios[i] !== input\n            ) {\n              radios[i].parentElement.removeAttribute('checked'); // remove checked attribute from it's host\n            }\n          }\n          this.host.setAttribute('checked', '');\n        }\n      });\n    }\n\n    else {\n      // tab index is on input element\n\n      for (const [key, value] of Object.entries({\n        // set important styles\n        // these value should not be editable\n        'box-sizing': 'border-box',\n        display: 'block',\n        'font-size': 'inherit',\n        'line-height': '1.2'\n      })) {\n        input.style.setProperty(key, value, 'important');\n      }\n      // for (const [key, value] of Object.entries({\n      //   'background-color': 'transparent',\n      //   color: 'inherit',\n      //   border: 'none',\n      // })) {\n      //   input.style.setProperty(key, value);\n      // }\n    }\n\n    this.host.prepend(input);\n    return input;\n  })()"
    }
  }; }
  static get elementRef() { return "host"; }
  static get watchers() { return [{
      "propName": "value",
      "methodName": "valueHandler"
    }]; }
}

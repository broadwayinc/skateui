import { r as registerInstance, h, e as Host, g as getElement } from './index-82f09f33.js';
import { r as randomString, d as dummyHandler, c as cloneEvents } from './utils-7bb2cdb2.js';

const suiInputCss = ":host{user-select:none;-webkit-user-select:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;vertical-align:bottom}:host slot{display:block}:host svg{display:none}::slotted([slot]){color:inherit;background-color:transparent;border:none}:host([type=text]),:host([type=password]),:host([type=email]),:host([type=number]),:host([type=search]),:host([type=tel]),:host([type=url]){display:inline-block;width:12em;font-size:inherit;padding:0.6em 0.66em;border-radius:4px;box-sizing:border-box;box-shadow:-1px -1px 2px -1px rgba(0, 0, 0, 0.5), 1px 1px 1px rgba(255, 255, 255, 0.33), inset 0 0 0 1px rgba(0, 0, 0, 0.25);background-color:inherit;color:inherit}:host([disabled]){box-shadow:none;background-color:rgba(128, 128, 128, 0.5);filter:grayscale(1)}:host([type=checkbox]){min-height:unset;width:1em;height:1em;font-size:1em;padding:0;box-shadow:none;background-color:transparent;color:#293FE6;border:2px solid currentColor;border-radius:2px;box-sizing:border-box;text-align:center;overflow:hidden;display:inline-block}:host([type=checkbox][checked]) svg{user-select:none;pointer-events:none;width:100%;display:block;color:inherit}:host([type=radio]){min-height:unset;width:1em;height:1em;font-size:1em;padding:0;box-shadow:none;background-color:transparent;color:#293FE6;box-sizing:border-box;border:2px solid currentColor;border-radius:100%;display:inline-block}:host([type=radio])::after{content:\"\";user-select:none;pointer-events:none;display:block;position:relative;width:calc(100% - 4px);height:calc(100% - 4px);margin:2px;border-radius:inherit;box-shadow:none;background-color:transparent}:host([type=radio][checked])::after{box-shadow:inset 0.5px 0.5px 0px rgba(255, 255, 255, 0.5), inset -0.5px -0.5px 0px rgba(0, 0, 0, 0.25), inset 0 0 0px 0.5px rgba(0, 0, 0, 0.25);background-color:currentColor}:host(:not([disabled]):active[type=radio])::after{box-shadow:inset 0 0 0px 0.5px rgba(128, 128, 128, 0.25), inset 0.15px 0.5px 0px rgba(0, 0, 0, 0.8), inset -0.5px -0.5px 0px rgba(255, 255, 255, 0.25);background-color:currentColor}:host([type=reset]),:host([type=submit]){-webkit-tap-highlight-color:rgba(0, 0, 0, 0);background:#293FE6;display:inline-table;color:#ffffff;border-radius:5px;vertical-align:baseline;font-size:inherit;padding:0.6em 1.2em;font-weight:bold;font-family:system-ui, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Oxygen, Ubuntu, Cantarell, \"Open Sans\", \"Helvetica Neue\", sans-serif;box-sizing:border-box;cursor:pointer;user-select:none;text-align:center;box-shadow:inset 1px 1px 2px rgba(255, 255, 255, 0.5), inset -1px -1px 2px rgba(0, 0, 0, 0.25), inset 0 0 0 1px rgba(0, 0, 0, 0.25);line-height:1.2}:host([type=reset]) slot,:host([type=submit]) slot{display:flex;align-items:center;height:100%;justify-content:center;vertical-align:middle}:host([type=reset]:not([disabled]):hover),:host([type=submit]:not([disabled]):hover){box-shadow:inset 1px 1px 2px rgba(255, 255, 255, 0.65), inset -1px -1px 2px rgba(0, 0, 0, 0.25), inset 0 0 0 1px rgba(0, 0, 0, 0.25), inset 0 0 1em 1em rgba(191, 191, 191, 0.16)}:host([type=reset]:hover[disabled]),:host([type=submit]:hover[disabled]){cursor:default}:host([type=reset][disabled]),:host([type=submit][disabled]){box-shadow:inset -1px -1px 2px rgba(255, 255, 255, 0.65), inset 1px 1px 2px rgba(0, 0, 0, 0.25), inset 0 0 0 1px rgba(0, 0, 0, 0.25);filter:grayscale(1) contrast(0.25) invert(1) brightness(1.3)}:host([type=reset][hidden]),:host([type=submit][hidden]){display:none !important}:host([type=reset]:not([disabled]):active),:host([type=submit]:not([disabled]):active){box-shadow:inset 0 0 0 1px rgba(128, 128, 128, 0.25), inset 0 1px 3px rgba(0, 0, 0, 0.8), inset -1px -1px 1px rgba(255, 255, 255, 0.25)}";

const SuiInput = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
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
    this.dummyElement = (() => {
      var _a, _b;
      // add input element manually because shadow dom input is not recognized by forms
      let inputType = this.host.getAttribute('type'); // always use getAttribute() for proper casing
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
            previousSpan.innerHTML = this.host.getAttribute('value') || (inputType === 'submit' ? 'Submit' : 'Reset');
          }
          else {
            previousSpan.remove();
          }
        }
        return previousInput;
      }
      // create new element
      const input = document.createElement('input');
      if (this.value) {
        input.setAttribute('value', this.value);
      }
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
        this.dummyElement.click();
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
        span.innerHTML = this.host.getAttribute('value') || (inputType === 'submit' ? 'Submit' : 'Reset');
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
          this.dummyElement.click();
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
  componentDidLoad() {
    dummyHandler.bind(this)({
      computedStyle: window.getComputedStyle(this.host),
      excludeStyle: ['border', 'margin', 'padding', 'max', 'min'],
      copyStyle: this.isChecker ? null : !this.isButton ? (hostCss) => {
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
        if (padding[1] || padding[3]) {
          this.dummyElement.style.setProperty('width', `calc(100% + ${padding[1]}px + ${padding[3]}px)`, 'important');
        }
        this.dummyElement.style.setProperty('padding', hostCss['padding'], 'important');
        this.dummyElement.style.setProperty('margin', padding.map(p => {
          return p ? `-${p}px` : '0px';
        }).join(' '), 'important');
      } : null,
      attCallback: (attName, val) => {
        if (attName === 'value' && this.dummyElement.value !== val) {
          this.dummyElement.value = val;
        }
      },
      appendIdToSlotElement: true
    });
    // stop event propagation from input element,
    // emit events from host
    cloneEvents.bind(this)(this.dummyElement);
  }
  disconnectedCallback() {
    // save memory by disconnecting mutation watch
    this.observer.disconnect();
    // remove dummy element
    this.dummyElement.remove();
  }
  render() {
    return (h(Host, null, h("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "currentColor", viewBox: "-2 -4 28 28" }, h("path", { d: "M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z" })), h("slot", { name: this.slotName }), h("slot", { name: 'value' })));
  }
  get host() { return getElement(this); }
};
SuiInput.style = suiInputCss;

export { SuiInput as sui_input };

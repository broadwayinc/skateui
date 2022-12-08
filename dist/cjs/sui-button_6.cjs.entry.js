'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-077882ad.js');

function cloneEvents(el) {
  const eventList = [
    'abort',
    'animationend',
    'animationiteration',
    'animationstart',
    'auxclick',
    'beforecopy',
    'beforecut',
    'beforeinput',
    'beforematch',
    'beforepaste',
    'beforexrselect',
    'blur',
    'cancel',
    'canplay',
    'canplaythrough',
    'change',
    'click',
    'close',
    'contextlost',
    'contextmenu',
    'contextrestored',
    'copy',
    'cuechange',
    'cut',
    'dblclick',
    'drag',
    'dragend',
    'dragenter',
    'dragleave',
    'dragover',
    'dragstart',
    'drop',
    'durationchange',
    'emptied',
    'ended',
    'error',
    'focus',
    'formdata',
    'fullscreenchange',
    'fullscreenerror',
    'gotpointercapture',
    'input',
    'invalid',
    'keydown',
    'keypress',
    'keyup',
    'load',
    'loadeddata',
    'loadedmetadata',
    'loadstart',
    'lostpointercapture',
    'mousedown',
    'mouseenter',
    'mouseleave',
    'mousemove',
    'mouseout',
    'mouseover',
    'mouseup',
    'mousewheel',
    'paste',
    'pause',
    'play',
    'playing',
    'pointercancel',
    'pointerdown',
    'pointerenter',
    'pointerleave',
    'pointermove',
    'pointerout',
    'pointerover',
    'pointerrawupdate',
    'pointerup',
    'progress',
    'ratechange',
    'reset',
    'resize',
    'scroll',
    'search',
    'securitypolicyviolation',
    'seeked',
    'seeking',
    'select',
    'selectionchange',
    'selectstart',
    'slotchange',
    'stalled',
    'submit',
    'suspend',
    'timeupdate',
    'toggle',
    'transitioncancel',
    'transitionend',
    'transitionrun',
    'transitionstart',
    'volumechange',
    'waiting',
    'webkitanimationend',
    'webkitanimationiteration',
    'webkitanimationstart',
    'webkitfullscreenchange',
    'webkitfullscreenerror',
    'webkittransitionend',
    'wheel'
  ];
  for (let name of eventList) {
    el.addEventListener(name, ev => {
      if (!ev.bubbles) {
        // re dispatch unbubbled events
        ev.stopPropagation();
        // let new_ev = new ev.constructor(ev.type, ev);
        let new_ev = new Event(ev.type, {
          bubbles: true
        });
        el.dispatchEvent(new_ev);
      }
    });
  }
}
function getElementAttributes(nodeMap) {
  if (nodeMap) {
    const length = nodeMap.length;
    return Object.keys(nodeMap).reduce((props, current) => {
      try {
        const numCurrent = parseInt(current);
        if (numCurrent <= length) {
          const property = nodeMap[current];
          return Object.assign(Object.assign({}, props), { [property.name]: property.value });
        }
      }
      catch (err) { }
    }, {});
  }
  return {};
}
function randomString(length = 5) {
  // set random slot name to prevent users adding elements to the slot
  let result = '';
  let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
function dummyHandler(options) {
  const { excludeStyle = [], computedStyle = null, excludeAttribute = [], trackNodes = false, log = false, copyStyle = null, appendIdToSlotElement = false } = options;
  const hostStyle = computedStyle || getComputedStyle(this.host);
  excludeStyle.push(...['display', 'position', 'width', 'height', 'min-width', 'min-height', 'max-width', 'max-height', 'font']);
  const setDummyAttribute = (attName, val) => {
    const copyStyleBypass = [];
    if (attName === 'style') {
      let styleProps = val.split(';');
      for (let s of styleProps) {
        if (!s) {
          continue;
        }
        let keyVal = s.split(':');
        let val = keyVal[1].split('!');
        if (!excludeStyle.includes(keyVal[0]) && (() => {
          // exclude related styles ex) border-xxxx
          for (let e of excludeStyle) {
            if (e.includes(keyVal[0] + '-')) {
              return false;
            }
          }
          return true;
        })() && CSS.supports(keyVal[0], val[0])) {
          this.dummyElement.style.setProperty(keyVal[0], val[0], val[1] || null);
          if (Array.isArray(copyStyle) && copyStyle.includes(keyVal[0])) {
            // add to style copy bypass list
            copyStyleBypass.push(keyVal[0]);
          }
        }
      }
    }
    else if (attName !== 'hidden' && attName !== 'class' && attName !== 'id' && !excludeAttribute.includes(attName)) {
      // skip 'hidden' | 'class' | 'id' | excluded list
      this.dummyElement.setAttribute(attName, val);
      // attribute update callback
      if (typeof options.attCallback === 'function') {
        options.attCallback(attName, val);
      }
    }
    if (copyStyle) {
      if (typeof copyStyle === 'function') {
        copyStyle(hostStyle);
      }
      else {
        // copy css styles
        for (let s of copyStyle) {
          if (!copyStyleBypass.includes(s)) {
            if (!excludeStyle.includes(s) && (() => {
              // exclude related styles ex) border-xxxx
              for (let e of excludeStyle) {
                if (e.includes(s + '-')) {
                  return false;
                }
              }
              return true;
            })() && CSS.supports(s, hostStyle[s])) {
              this.dummyElement.style.setProperty(s, hostStyle[s]);
            }
          }
        }
      }
    }
  };
  const hostAttributes = getElementAttributes(this.host.attributes);
  for (let attName in hostAttributes) {
    if (attName.substring(0, 2) !== 'on') {
      setDummyAttribute(attName, hostAttributes[attName]);
    }
    if (attName === 'id' && appendIdToSlotElement) {
      this.dummyElement.setAttribute(attName, hostAttributes[attName]);
      this.host.removeAttribute(attName);
    }
    if (attName === 'autofocus') {
      // auto focus
      this.host.focus();
    }
  }
  this.observer = new MutationObserver((mutations) => {
    let logger = (l) => {
      if (!log) {
        return;
      }
      if (typeof log === 'boolean') {
        return console.log(l);
      }
      if (typeof log === 'function') {
        return log(l);
      }
    };
    for (let m of mutations) {
      let attributeName = m.attributeName;
      if (!attributeName && trackNodes) {
        if (typeof trackNodes === 'function') {
          logger({ attributeName, mutationRecord: m });
          trackNodes(m);
        }
        continue;
      }
      let newValue = m.target.getAttribute(attributeName);
      let oldValue = m.oldValue;
      if (newValue === oldValue) {
        // skip same values
        continue;
      }
      logger({ attributeName, newValue, oldValue });
      // ! do not change the order of execution below !
      if (newValue === null) {
        // attribute is removed
        this.dummyElement.removeAttribute(attributeName);
        continue;
      }
      setDummyAttribute(attributeName, newValue);
    }
  });
  this.observer.observe(this.host, {
    attributes: true,
    attributeOldValue: true,
    childList: !!trackNodes
  });
  return hostStyle;
}

const suiButtonCss = ":host{-webkit-tap-highlight-color:rgba(0, 0, 0, 0);background:#293FE6;display:inline-block;color:#ffffff;border-radius:5px;vertical-align:baseline;font-size:inherit;padding:0.6em 1.2em;font-weight:bold;font-family:system-ui, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Oxygen, Ubuntu, Cantarell, \"Open Sans\", \"Helvetica Neue\", sans-serif;box-sizing:border-box;cursor:pointer;user-select:none;-webkit-user-select:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;text-align:center;box-shadow:inset 1px 1px 2px rgba(255, 255, 255, 0.5), inset -1px -1px 2px rgba(0, 0, 0, 0.25), inset 0 0 0 1px rgba(0, 0, 0, 0.25);line-height:1.2}:host slot{display:flex;align-items:center;height:100%;justify-content:center}:host(:not([disabled]):hover){box-shadow:inset 1px 1px 2px rgba(255, 255, 255, 0.65), inset -1px -1px 2px rgba(0, 0, 0, 0.25), inset 0 0 0px 1px rgba(0, 0, 0, 0.25), inset 0 0 1em 1em rgba(191, 191, 191, 0.16)}:host(:hover[disabled]){cursor:default}:host([disabled]){box-shadow:inset -1px -1px 2px rgba(255, 255, 255, 0.65), inset 1px 1px 2px rgba(0, 0, 0, 0.25), inset 0 0 0px 1px rgba(0, 0, 0, 0.25);filter:grayscale(1) contrast(0.25) invert(1) brightness(1.3)}:host([hidden]){display:none !important}:host(:not([disabled]):active){box-shadow:inset 0 0 0px 1px rgba(128, 128, 128, 0.25), inset 0 1px 3px rgba(0, 0, 0, 0.75), inset -1px -1px 1px rgba(255, 255, 255, 0.25)}";

const SuiButton = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
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
    return (index.h(index.Host, null, index.h("slot", null)));
  }
  get host() { return index.getElement(this); }
};
SuiButton.style = suiButtonCss;

const suiFlextextCss = ":host{display:block;cursor:default;font-size:var(--auto-size);line-height:1}";

const SuiFlextext = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.minSize = 0;
    this.maxSize = 72;
    this.fontSize = null;
    this.adjustSize = (function () {
      const lineHeightRatio = Number(this.computedStyle.lineHeight.replace('px', '')) / this.fontSize;
      if (!this.value) {
        this.fontSize = this.maxSize;
      }
      else {
        const scaleDown = () => {
          let height = parseFloat(this.computedStyle.height);
          let howmanylines = height / (this.fontSize * lineHeightRatio);
          if (howmanylines > 1 && this.fontSize > this.minSize) {
            let minus = this.fontSize - 1;
            this.fontSize = minus > this.minSize ? minus : this.minSize;
            this.host.style.setProperty('--auto-size', `${this.fontSize}px`);
            if (this.fontSize === this.minSize) {
              return;
            }
            scaleDown();
          }
        };
        const scaleUp = () => {
          let height = parseFloat(this.computedStyle.height);
          let howmanylines = height / (this.fontSize * lineHeightRatio);
          if (howmanylines <= 1 && this.fontSize < this.maxSize) {
            let plus = this.fontSize + 1;
            this.fontSize = plus < this.maxSize ? plus : this.maxSize;
            this.host.style.setProperty('--auto-size', `${this.fontSize}px`);
            if (this.fontSize === this.maxSize) {
              return;
            }
            scaleUp();
          }
        };
        scaleUp();
        scaleDown();
      }
    }).bind(this);
  }
  componentWillLoad() {
    this.maxSize = this.maxSize && typeof this.maxSize !== 'number' ? Number(this.maxSize) : this.maxSize;
    this.minSize = this.minSize && typeof this.minSize !== 'number' ? Number(this.minSize) : this.minSize;
    if (isNaN(this.maxSize)) {
      this.maxSize = 72;
    }
    if (isNaN(this.minSize)) {
      this.minSize = 0;
    }
  }
  componentDidLoad() {
    this.value = this.host.textContent;
    this.computedStyle = window.getComputedStyle(this.host);
    this.fontSize = Number(this.computedStyle.fontSize.replace('px', ''));
    if (this.minSize === 0) {
      this.minSize = this.fontSize;
    }
    if (this.minSize > this.maxSize) {
      this.maxSize = this.minSize;
    }
    this.adjustSize();
    window.addEventListener("resize", this.adjustSize);
  }
  disconnectedCallback() {
    window.removeEventListener('resize', this.adjustSize);
  }
  render() {
    return (index.h(index.Host, null, index.h("slot", null)));
  }
  get host() { return index.getElement(this); }
};
SuiFlextext.style = suiFlextextCss;

const suiInputCss = ":host{user-select:none;-webkit-user-select:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;vertical-align:bottom}:host slot{display:block}:host svg{display:none}::slotted([slot]){color:inherit;background-color:transparent;border:none}:host([type=text]),:host([type=password]),:host([type=email]),:host([type=number]),:host([type=search]),:host([type=tel]),:host([type=url]){display:inline-block;width:12em;font-size:inherit;padding:0.6em 0.66em;border-radius:4px;box-sizing:border-box;box-shadow:-1px -1px 2px -1px rgba(0, 0, 0, 0.5), 1px 1px 1px rgba(255, 255, 255, 0.33), inset 0 0 0 1px rgba(0, 0, 0, 0.25);background-color:inherit;color:inherit}:host([disabled]){box-shadow:none;background-color:rgba(128, 128, 128, 0.5);filter:grayscale(1)}:host([type=checkbox]){min-height:unset;width:1em;height:1em;font-size:1em;padding:0;box-shadow:none;background-color:transparent;color:#293FE6;border:2px solid currentColor;border-radius:2px;box-sizing:border-box;text-align:center;overflow:hidden;display:inline-block}:host([type=checkbox][checked]) svg{user-select:none;pointer-events:none;width:100%;display:block;color:inherit}:host([type=radio]){min-height:unset;width:1em;height:1em;font-size:1em;padding:0;box-shadow:none;background-color:transparent;color:#293FE6;box-sizing:border-box;border:2px solid currentColor;border-radius:100%;display:inline-block}:host([type=radio])::after{content:\"\";user-select:none;pointer-events:none;display:block;position:relative;width:calc(100% - 4px);height:calc(100% - 4px);margin:2px;border-radius:inherit;box-shadow:none;background-color:transparent}:host([type=radio][checked])::after{box-shadow:inset 0.5px 0.5px 0px rgba(255, 255, 255, 0.5), inset -0.5px -0.5px 0px rgba(0, 0, 0, 0.25), inset 0 0 0px 0.5px rgba(0, 0, 0, 0.25);background-color:currentColor}:host(:not([disabled]):active[type=radio])::after{box-shadow:inset 0 0 0px 0.5px rgba(128, 128, 128, 0.25), inset 0.15px 0.5px 0px rgba(0, 0, 0, 0.8), inset -0.5px -0.5px 0px rgba(255, 255, 255, 0.25);background-color:currentColor}:host([type=reset]),:host([type=submit]){-webkit-tap-highlight-color:rgba(0, 0, 0, 0);background:#293FE6;display:inline-table;color:#ffffff;border-radius:5px;vertical-align:baseline;font-size:inherit;padding:0.6em 1.2em;font-weight:bold;font-family:system-ui, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Oxygen, Ubuntu, Cantarell, \"Open Sans\", \"Helvetica Neue\", sans-serif;box-sizing:border-box;cursor:pointer;user-select:none;text-align:center;box-shadow:inset 1px 1px 2px rgba(255, 255, 255, 0.5), inset -1px -1px 2px rgba(0, 0, 0, 0.25), inset 0 0 0 1px rgba(0, 0, 0, 0.25);line-height:1.2}:host([type=reset]) slot,:host([type=submit]) slot{display:flex;align-items:center;height:100%;justify-content:center;vertical-align:middle}:host([type=reset]:not([disabled]):hover),:host([type=submit]:not([disabled]):hover){box-shadow:inset 1px 1px 2px rgba(255, 255, 255, 0.65), inset -1px -1px 2px rgba(0, 0, 0, 0.25), inset 0 0 0 1px rgba(0, 0, 0, 0.25), inset 0 0 1em 1em rgba(191, 191, 191, 0.16)}:host([type=reset]:hover[disabled]),:host([type=submit]:hover[disabled]){cursor:default}:host([type=reset][disabled]),:host([type=submit][disabled]){box-shadow:inset -1px -1px 2px rgba(255, 255, 255, 0.65), inset 1px 1px 2px rgba(0, 0, 0, 0.25), inset 0 0 0 1px rgba(0, 0, 0, 0.25);filter:grayscale(1) contrast(0.25) invert(1) brightness(1.3)}:host([type=reset][hidden]),:host([type=submit][hidden]){display:none !important}:host([type=reset]:not([disabled]):active),:host([type=submit]:not([disabled]):active){box-shadow:inset 0 0 0 1px rgba(128, 128, 128, 0.25), inset 0 1px 3px rgba(0, 0, 0, 0.8), inset -1px -1px 1px rgba(255, 255, 255, 0.25)}";

const SuiInput = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
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
    return (index.h(index.Host, null, index.h("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "currentColor", viewBox: "-2 -4 28 28" }, index.h("path", { d: "M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z" })), index.h("slot", { name: this.slotName }), index.h("slot", { name: 'value' })));
  }
  get host() { return index.getElement(this); }
};
SuiInput.style = suiInputCss;

const suiNavCss = ":host{display:block;width:100%;padding:8px;transform:translateY(var(--nav-top));position:var(--nav-position);top:0;z-index:1}";

const SuiNav = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.scrollOffset = 0;
    this.topOffset = 0;
    this.offsetProp = 'pageYOffset';
    // ! should be variable with bind !
    // this way we can remove the event when component is destroyed
    this.calcNavbarPosition = (function () {
      window.requestAnimationFrame(() => {
        const navHeight = parseInt(this.navCss.height);
        const scrollOffset = this.parent[this.offsetProp] < 0 ? 0 : this.parent[this.offsetProp]; // on mobile, offsetProp can be negative
        const offsetDifference = (this.scrollOffset - scrollOffset) / this.autoHide;
        const topOffset = (() => {
          let topOffset = this.topOffset + offsetDifference;
          if (topOffset < -navHeight) {
            // if offset is beyond navHeight
            return -navHeight;
          }
          if (topOffset > 0) {
            // offset is positive
            return 0;
          }
          return topOffset; // return int range
        })();
        this.scrollOffset = scrollOffset; // update scroll offset
        this.topOffset = topOffset;
        this.host.style.setProperty('--nav-top', `${topOffset}px`); // apply css variable
      });
    }).bind(this);
  }
  componentWillLoad() {
    if (this.autoHide === undefined) {
      // no given attribute
      return;
    }
    if (!this.autoHide) {
      // attribute exists but empty value. set to default.
      this.autoHide = 3;
    }
    if (this.autoHide) {
      if (typeof this.autoHide === 'string') {
        // html attributes are string
        try {
          this.autoHide = JSON.parse(this.autoHide);
        }
        catch (err) {
          this.autoHide = 0;
        }
      }
      if (typeof this.autoHide === 'boolean') {
        // if 'true' | 'false' is given.
        this.autoHide = this.autoHide ? 3 : 0;
      }
      else if (typeof this.autoHide === 'number') {
        if (this.autoHide < 0) {
          // if value is less than 0
          this.autoHide = 0;
        }
      }
      else {
        // other types are not allowed
        this.autoHide = 0;
      }
    }
  }
  disconnectedCallback() {
    // remove windows event
    if (this.offsetProp === 'pageYOffset') {
      document.removeEventListener('scroll', this.calcNavbarPosition);
    }
    else {
      this.parent.removeEventListener('scroll', this.calcNavbarPosition);
    }
  }
  componentDidLoad() {
    this.navCss = window.getComputedStyle(this.host);
    this.host.style.setProperty('--nav-position', 'sticky'); // apply css variable
    if (this.autoHide) {
      let seekScrollableParent = (el) => {
        if (el) {
          if (el.scrollHeight > el.clientHeight && 'hidden' !== window.getComputedStyle(el).overflowY) {
            return el;
          }
          else {
            return seekScrollableParent(el.parentElement);
          }
        }
        else {
          return el;
        }
      };
      let scrollableParent = seekScrollableParent(this.host.parentElement);
      if (scrollableParent && scrollableParent.tagName.toLowerCase() !== 'html') {
        this.offsetProp = 'scrollTop';
        this.parent = scrollableParent;
        this.parent.addEventListener('scroll', this.calcNavbarPosition, { passive: true });
      }
      else {
        this.parent = window;
        document.addEventListener('scroll', this.calcNavbarPosition, { passive: true });
      }
    }
  }
  render() {
    return (index.h(index.Host, null, index.h("slot", null)));
  }
  get host() { return index.getElement(this); }
};
SuiNav.style = suiNavCss;

const suiOverlayCss = ":host{display:none !important}";

const SuiOverlay = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.position = 'center';
    this.transitionTime = '0.25s';
    this.overlayId = null;
  }
  componentWillLoad() {
    const allowed_positions = [
      'center',
      'right',
      'left',
      'right',
      'bottom'
    ];
    if (!allowed_positions.includes(this.position)) {
      this.position = 'center';
    }
  }
  createScreen() {
    const css = {
      base: {
        'z-index': '9999',
        display: 'flex',
        position: 'fixed',
        'flex-direction': 'column',
        top: '0',
        right: '0',
        bottom: '0',
        left: '0',
        'background-color': 'transparent',
        'overflow': 'hidden',
        'transition': `background-color ${this.transitionTime} ease-out`
      },
      center: {
        'justify-content': 'center'
      },
      top: {
        'justify-content': 'flex-start'
      },
      bottom: {
        'justify-content': 'flex-end'
      },
      right: {
        'justify-content': 'center',
        'align-items': 'flex-end'
      },
      left: {
        'justify-content': 'center',
        'align-items': 'flex-start'
      }
    };
    const screen = document.createElement('div');
    for (let k in css.base) {
      // append base css
      screen.style.setProperty(k, css.base[k]);
    }
    if (!css[this.position]) {
      this.position = 'center';
    }
    for (let k in css[this.position]) {
      // append positioning css
      screen.style.setProperty(k, css[this.position][k]);
    }
    screen.onclick = () => {
      // onclick event is triggered when overlay is clicked
      this.host.click();
    };
    if (typeof this.host.onclick === 'function') {
      // prevents background scroll
      document.body.style.top = `-${window.scrollY}px`;
      document.body.style.position = 'fixed';
    }
    else {
      // allow background clicking if there is no event listener
      screen.style.setProperty('pointer-events', 'none');
    }
    // generate overlay id
    this.overlayId = randomString();
    screen.id = this.overlayId;
    return screen;
  }
  async close() {
    if (!this.overlayId) {
      // no overlay to close
      return;
    }
    // prevent user get thrown back to top
    if (document.body.style.position === 'fixed' && typeof this.host.onclick === 'function') {
      let scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      window.scrollTo(0, parseInt(scrollY || '0') * -1);
    }
    const screen = document.getElementById(this.overlayId);
    const el = screen.firstChild;
    let revert = {
      bottom: {
        'bottom': 'calc(var(--overlay-height) * -1)'
      },
      top: {
        'bottom': 'var(--overlay-height)'
      },
      right: {
        'left': 'var(--overlay-width)'
      },
      left: {
        'left': 'calc(var(--overlay-width) * -1)'
      },
      center: {
        'opacity': '0'
      }
    };
    for (let k in revert[this.position]) {
      el.style.setProperty(k, revert[this.position][k]);
    }
    screen.style.setProperty('background-color', 'transparent');
    let wait = 0;
    if (this.transitionTime.includes('ms')) {
      wait = Number(this.transitionTime.split(',')[0].replace('ms', ''));
    }
    else if (this.transitionTime.includes('s')) {
      wait = parseFloat(this.transitionTime.split(',')[0].replace('s', '')) * 1000;
    }
    let removeEl = () => {
      if (el.children.length) {
        let len = el.children.length;
        while (len--) {
          this.host.prepend(el.children[len]);
        }
      }
    };
    if (wait) {
      setTimeout(() => {
        removeEl();
        screen.remove();
      }, wait);
    }
    else {
      // close popup
      removeEl();
      screen.remove();
    }
    this.overlayId = null;
  }
  open() {
    return new Promise(res => {
      if (this.overlayId) {
        // overlay is already up
        return;
      }
      // create overlay
      const screen = this.createScreen();
      const el = document.createElement('div');
      if (this.host.children.length) {
        let len = this.host.children.length;
        while (len--) {
          el.prepend(this.host.children[len]);
        }
      }
      el.addEventListener('click', e => {
        e.stopPropagation();
      });
      const css = {
        base: {
          'overflow-y': 'auto',
          'overflow-x': 'hidden',
          'opacity': '0',
          'display': 'block',
          'position': 'relative',
          'max-height': '100vh',
          'pointer-events': 'auto'
        },
        bottom: {
          'border-bottom-left-radius': '0',
          'border-bottom-right-radius': '0',
          'bottom': 'calc(var(--overlay-height) * -1)',
          'margin': '0 auto',
          'transition': `bottom ${this.transitionTime} ease-out`
        },
        top: {
          'border-top-left-radius': '0',
          'border-top-right-radius': '0',
          'bottom': 'var(--overlay-height)',
          'margin': '0 auto',
          'transition': `bottom ${this.transitionTime} ease-out`
        },
        right: {
          'border-top-right-radius': '0',
          'border-bottom-right-radius': '0',
          'left': 'var(--overlay-width)',
          'margin': '0',
          'transition': `left ${this.transitionTime} ease-out`
        },
        left: {
          'border-top-left-radius': '0',
          'border-bottom-left-radius': '0',
          'left': 'calc(var(--overlay-width) * -1)',
          'margin': '0',
          'transition': `left ${this.transitionTime} ease-out`
        },
        center: {
          'margin': 'auto',
          'transition': `opacity ${this.transitionTime}`
        }
      };
      for (let k in css.base) {
        el.style.setProperty(k, css.base[k]);
      }
      for (let k in css[this.position]) {
        el.style.setProperty(k, css[this.position][k]);
      }
      screen.append(el);
      document.body.append(screen);
      el.style.setProperty('--overlay-width', window.getComputedStyle(el).width);
      el.style.setProperty('--overlay-height', window.getComputedStyle(el).height);
      el.style.setProperty('opacity', '1');
      window.requestAnimationFrame(() => {
        const matchByPosition = {
          'center': 'center',
          'bottom': 'up',
          'top': 'down',
          'right': 'left',
          'left': 'right'
        };
        let popDirection = matchByPosition[this.position];
        screen.style.setProperty('background-color', this.host.style.getPropertyValue('background-color'));
        screen.style.setProperty('color', this.host.style.getPropertyValue('color'));
        if (popDirection === 'up' || popDirection === 'down') {
          el.style.setProperty('bottom', '0');
        }
        else if (popDirection === 'left' || popDirection === 'right') {
          el.style.setProperty('left', '0');
        }
        res(null);
      });
    });
  }
  render() {
    return (index.h(index.Host, { hidden: true, style: { display: this.overlayId ? null : 'none' } }, index.h("slot", null)));
  }
  get host() { return index.getElement(this); }
};
SuiOverlay.style = suiOverlayCss;

const suiSelectCss = ":host([multiple]){padding:0.66em;box-shadow:-1px -1px 2px -1px rgba(0, 0, 0, 0.5), 1px 1px 1px rgba(255, 255, 255, 0.33), inset 0 0 0 1px rgba(0, 0, 0, 0.25);overflow:hidden}:host{user-select:none;-webkit-user-select:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;vertical-align:bottom;display:inline-block;width:12em;line-height:1.2;font-size:inherit;padding:0.6em 0.66em;border-radius:4px;box-sizing:border-box;font-family:system-ui, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Oxygen, Ubuntu, Cantarell, \"Open Sans\", \"Helvetica Neue\", sans-serif;box-shadow:inset 1px 1px 2px rgba(255, 255, 255, 0.5), inset -1px -1px 2px rgba(0, 0, 0, 0.25), inset 0 0 0 1px rgba(0, 0, 0, 0.25);background-color:transparent;color:inherit}:host div{position:relative;display:flex;align-items:center}:host slot option{color:black;background-color:white}:host svg{user-select:none;pointer-events:none;width:0.75em;color:inherit;position:absolute;right:0;opacity:0.88;display:block;line-height:1em}:host span{user-select:none;pointer-events:none;width:100%;position:absolute;align-items:center}:host span::after{content:attr(data-selected);display:inline-block;vertical-align:baseline;width:100%;line-height:normal;flex:1 1 auto;text-overflow:ellipsis;overflow:hidden;white-space:nowrap}:host([disabled]){box-shadow:none;background-color:rgba(128, 128, 128, 0.5);filter:grayscale(1)}";

const SuiSelect = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
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
    return (index.h(index.Host, null, index.h("div", null, index.h("span", { "data-selected": this.value, style: { display: this.isMultiple ? 'none' : 'flex', width: `calc(100% - ${this.isMultiple ? 0 : 0.75}em)` } }), index.h("svg", { style: { display: this.isMultiple ? 'none' : 'block' }, fill: "currentColor", viewBox: "0 -100 700 700", xmlns: "http://www.w3.org/2000/svg" }, index.h("path", { d: "m81.957 144.91 252.97 305.17c4.7695 5.293 10.496 7.9336 17.16 7.9336 6.1875 0 11.676-2.6445 16.438-7.9453l250.12-305.17c6.1875-8.4844 7.3984-17.746 3.5742-27.82-3.8008-10.051-10.703-15.094-20.727-15.094l-202.93 0.003906h-300.16c-9.5352 0-16.438 5.0391-20.727 15.094-3.8008 10.078-2.3672 19.355 4.2852 27.828z" })), index.h("slot", null))));
  }
  get host() { return index.getElement(this); }
};
SuiSelect.style = suiSelectCss;

exports.sui_button = SuiButton;
exports.sui_flextext = SuiFlextext;
exports.sui_input = SuiInput;
exports.sui_nav = SuiNav;
exports.sui_overlay = SuiOverlay;
exports.sui_select = SuiSelect;

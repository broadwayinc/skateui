import { Component, Host, h, Element, Prop, Method } from '@stencil/core';
import { randomString } from '../../utils/utils';
export class SuiOverlay {
  constructor() {
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
    return (h(Host, { hidden: true },
      h("slot", null)));
  }
  static get is() { return "sui-overlay"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() { return {
    "$": ["sui-overlay.scss"]
  }; }
  static get styleUrls() { return {
    "$": ["sui-overlay.css"]
  }; }
  static get properties() { return {
    "position": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "string",
        "resolved": "string",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": ""
      },
      "attribute": "position",
      "reflect": false,
      "defaultValue": "'center'"
    },
    "transitionTime": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "string",
        "resolved": "string",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": ""
      },
      "attribute": "transition-time",
      "reflect": false,
      "defaultValue": "'0.25s'"
    }
  }; }
  static get methods() { return {
    "close": {
      "complexType": {
        "signature": "() => Promise<void>",
        "parameters": [],
        "references": {
          "Promise": {
            "location": "global"
          },
          "HTMLElement": {
            "location": "global"
          }
        },
        "return": "Promise<void>"
      },
      "docs": {
        "text": "",
        "tags": []
      }
    },
    "open": {
      "complexType": {
        "signature": "() => Promise<unknown>",
        "parameters": [],
        "references": {
          "Promise": {
            "location": "global"
          }
        },
        "return": "Promise<unknown>"
      },
      "docs": {
        "text": "",
        "tags": []
      }
    }
  }; }
  static get elementRef() { return "host"; }
}

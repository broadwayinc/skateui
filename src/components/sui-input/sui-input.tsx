import { Component, Host, h, Element, Prop } from '@stencil/core';
import { dummyHandler, randomString, cloneEvents } from '../../utils/utils';
@Component({
  tag: 'sui-input',
  styleUrl: 'sui-input.scss',
  shadow: true
})
export class SuiInput {
  @Element() host: HTMLElement;
  @Prop({ reflect: true }) value: any;
  availableTypes: string[] = [
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

  observer: MutationObserver;
  slotName: string = randomString();
  isChecker = false;
  isButton = false;

  dummyElement = (() => {
    // add input element manually because shadow dom input is not recognized by forms
    let inputType = this.host.getAttribute('type'); // always use getAttribute() for proper casing
    if (!inputType || !this.availableTypes.includes(inputType)) {
      this.host.setAttribute('type', 'text');
      inputType = 'text';
    }

    this.isButton = inputType === 'reset' || inputType === 'submit';
    this.isChecker = inputType === 'checkbox' || inputType === 'radio';

    const previousInput = this.host.getElementsByTagName('input')?.[0];
    if (previousInput && previousInput.hasAttribute('slot')) {
      // if element already exists, return
      // element can already exist when working on hot reloads

      // setup new slot name
      previousInput.setAttribute('slot', this.slotName);

      // button input use additional span to display text
      const previousSpan = this.host.getElementsByTagName('span')?.[0];
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
            if (
              (radios[i] instanceof HTMLInputElement) &&
              radios[i].getAttribute('type') === 'radio' &&
              radios[i] !== input
            ) {
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
        background: 'transparent',
        'box-sizing': 'border-box',
        border: 'none',
        display: 'block',
        'font-size': 'inherit',
        color: 'inherit',
        'line-height': '1.2'
      })) {
        input.style.setProperty(key, value, 'important');
      }
    }

    this.host.prepend(input);
    return input;
  })();

  componentDidLoad() {
    dummyHandler.bind(this)({
      computedStyle: window.getComputedStyle(this.host),
      excludeStyle: ['border', 'margin', 'padding', 'max', 'min'],
      copyStyle: this.isChecker ? null : !this.isButton ? (hostCss: CSSStyleDeclaration) => {
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
        this.dummyElement.style.setProperty('margin',
          padding.map(p => {
            return p ? `-${p}px` : '0px';
          }).join(' '), 'important');
      } : null,

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
    return (
      <Host>
        {/* fine tuned viewBox svg. find out how to make svg. */}
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="-2 -4 28 28"><path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z" /></svg>
        <slot name={this.slotName}></slot>
        {/* display value eg) button input */}
        <slot name='value'></slot>
      </Host>
    );
  }
}

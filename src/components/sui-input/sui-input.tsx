import { Component, Host, h, Element, Prop, Watch } from '@stencil/core'; //Method, 
import { dummyHandler, randomString, cloneEvents } from '../../utils/utils';
@Component({
  tag: 'sui-input',
  styleUrl: 'sui-input.scss',
  shadow: true,
})
export class SuiInput {
  @Element() host: HTMLElement;
  @Prop({ mutable: true }) value: any;
  @Watch('value')
  valueHandler(n: string, o: string) {
    if (n !== o && this.el) {
      this.el.value = n.toString();
    }
  }
  @Prop({ mutable: true }) checked: any;
  @Watch('checked')
  checkedHandler(n: any, o: any) {
    if (n !== o && this.el) {
      this.el.checked = n || typeof n === 'string';
    }

    if (this.el.checked) {
      this.host.setAttribute('data-checked', '');
      this.host.setAttribute('checked', '');
    }
    else {
      this.host.removeAttribute('data-checked');
      this.host.removeAttribute('checked');
    }
  }

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
  closestLabel = null;
  @Prop()
  el = (() => {
    // add input element manually because shadow dom input is not recognized by forms
    let inputType = this.host.getAttribute('type'); // always use getAttribute() for proper casing

    let value = this.value !== null && this.value !== undefined ? this.value.toString() : null;
    if (!inputType || !this.availableTypes.includes(inputType)) {
      this.host.setAttribute('type', 'text');
      inputType = 'text';
    }

    this.isButton = inputType === 'reset' || inputType === 'submit';
    this.isChecker = inputType === 'checkbox' || inputType === 'radio';

    // if class has reusable previous element
    const previousInput = this.host.getElementsByTagName('input')?.[0];
    if (previousInput && previousInput.hasAttribute('slot')) {
      // if element already exists, return
      // element can already exist when working on hot reloads

      // setup new slot name
      previousInput.setAttribute('slot', this.slotName);

      // button input use additional span to display text
      const previousSpan = this.host.getElementsByTagName('span')?.[0];
      if (previousSpan) {
        if (previousSpan.hasAttribute('slot') && previousSpan.getAttribute('slot') === 'value' && this.isButton) {
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

    // setup new slot name
    // slot name is to prevent users adding custom elements
    input.setAttribute('slot', this.slotName);

    if (!this.availableTypes.includes(inputType)) {
      // type not available (yet)
      this.host.prepend(input);
      return input;
    }

    // add eventlistener manually if type is checkbox | radio | reset | submit
    if (this.isButton) {
      // hidden
      input.setAttribute('hidden', '');

      // tab index is on host
      if (!this.host.hasAttribute('disabled')) {
        this.host.setAttribute('tabindex', '0');
      }

      this.host.addEventListener('click', e => {
        e.stopPropagation();
        input.click();
      });

      // add button text
      let span = document.createElement('span');
      span.innerHTML = value || (inputType === 'submit' ? 'Submit' : 'Reset');
      span.setAttribute('slot', 'value');
      this.host.prepend(span);
    }

    else if (this.isChecker) {
      // hidden
      input.setAttribute('hidden', '');

      if (this.checked || typeof this.checked === 'string') {
        input.setAttribute('checked', '');
      }

      if (input.checked) {
        this.host.setAttribute('data-checked', '');
        this.host.setAttribute('checked', '');
      }

      // tab index is on host
      if (!this.host.hasAttribute('disabled')) {
        this.host.setAttribute('tabindex', '0');
      }

      this.host.addEventListener('click', e => {
        if (this.closestLabel && e.isTrusted) {
          e.stopPropagation();
        }
        else {
          input.click();
        }
      });

      input.addEventListener('change', () => {
        // keep track of checked, update dom
        if (inputType === 'checkbox') {
          if (input.checked) {
            this.host.setAttribute('data-checked', '');
          }
          else {
            this.host.removeAttribute('data-checked');
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
              radios[i].parentElement.removeAttribute('data-checked'); // remove checked attribute from it's host
            }
          }
          this.host.setAttribute('data-checked', '');
        }
      });
    }

    else {
      // tab index is on input element
      for (const [key, value] of Object.entries({
        // set important styles
        // these value should not be editable
        'box-sizing': 'border-box',
        'display': 'block',
        'font-size': 'inherit',
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

        this.el.style.setProperty('width', `calc(100% + ${padding[1]}px + ${padding[3]}px)`, 'important');

        if (!needAdjustment) {
          this.el.style.setProperty('padding', '0', 'important');
          this.el.style.setProperty('margin', '0', 'important');
          return;
        }

        this.el.style.setProperty('padding', hostCss['padding'], 'important');
        this.el.style.setProperty('margin',
          padding.map(p => {
            return p ? `-${p}px` : '0px';
          }).join(' '), 'important');
      } : null,
      excludeAttribute: ['value', 'data-checked'],
      appendIdToSlotElement: true
    });


    this.closestLabel = this.el.closest('label');
    // stop event propagation from input element,
    // emit events from host

    cloneEvents(this.el);
    // dispatch mounted event when finished loading
    this.el.dispatchEvent(new CustomEvent('mounted'));
  }

  disconnectedCallback() {
    // save memory by disconnecting mutation watch
    if (this.observer) {
      this.observer.disconnect();
    }
    // remove dummy element
    this.el.remove();
  }

  render() {
    return (
      <Host>
        <svg version="1.1" x="0px" y="0px" viewBox="0 0 24 24" fill="currentColor">
          <polygon points="9.32,19.57 2.22,12.48 4.91,9.79 9.32,14.2 19.09,4.43 21.78,7.11     " />
        </svg>
        <slot name={this.slotName}></slot>
        {/* display value eg) button input */}
        <slot name='value'></slot>
      </Host>
    );
  }
}

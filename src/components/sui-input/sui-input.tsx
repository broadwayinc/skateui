import { Component, Host, h, Element, Listen } from '@stencil/core';
import { dummyHandler, randomString } from '../../utils/utils';
@Component({
  tag: 'sui-input',
  styleUrl: 'sui-input.scss',
  shadow: true
})
export class SuiInput {
  @Element() host: HTMLElement;
  @Listen('click', { capture: false }) // capture should be false to stop propagation
  clickEventHandler() {
    if (this.host.attributes.getNamedItem('disabled')) {
      // does not trigger dummy when disabled
      return;
    }
    if (this.isChecker) {
      this.dummyElement.click();
    }
    else {
      // padded area should trigger on input
      this.dummyElement.focus();
    }
  }
  @Listen('keyup', { capture: true })
  keyEventHandler(e) {
    if (e.key === 'Enter' && this.isChecker) {
      // checkbox, radio should be able to trigger click on enter key
      this.clickEventHandler();
    }
  }
  observer: MutationObserver;
  slotName: string = randomString();
  isChecker = false;
  dummyElement = (() => {
    // add input element manually because shadow dom input is not recognized by forms

    const previousInput = this.host.getElementsByTagName('input')?.[0];
    if (previousInput && previousInput.hasAttribute('slot')) {
      // if element already exists, return
      // element can already exist when working on hot reloads

      // setup new slot name
      previousInput.setAttribute('slot', this.slotName);
      return previousInput;
    }

    const input = document.createElement('input');

    // setup new slot name
    // slot name is to prevent users adding custom elements
    input.setAttribute('slot', this.slotName);

    // stop propagation
    input.addEventListener('click', e => e.stopPropagation());
    let importants: Record<string, any> = {
      // set important styles
      // these value should not be editable
      background: 'transparent',
      'box-sizing': 'border-box',
      border: 'none',
      outline: 'none',
      margin: '0',
      height: '100%',
      width: '100%',
      'min-width': '100%',
      display: 'inline-block',
      'font-size': 'inherit',
      color: 'inherit',
      'line-height': '1',
      padding: '0'
    };

    let inputType = this.host.getAttribute('type'); // always use getAttribute() for lower casing

    if (inputType === 'checkbox' || inputType === 'radio') {
      this.isChecker = true;
      input.setAttribute('hidden', '');
      importants = {
        display: 'none'
      };
      this.host.setAttribute('tabindex', '0');
    }
    else {
      input.setAttribute('tabindex', '0');
    }
    for (const [key, value] of Object.entries(importants)) {
      input.style.setProperty(key, value, 'important');
    }

    input.addEventListener('change', () => {
      if (inputType === 'checkbox') {
        if (input.checked) {
          this.host.setAttribute('checked', 'true');
        }
        else {
          this.host.removeAttribute('checked');
        }
      }

      if (inputType === 'radio') {
        // triggers only on checked
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
        this.host.setAttribute('checked', 'true');
      }

    });
    this.host.prepend(input);
    return input;
  })();

  componentDidLoad() {
    dummyHandler.bind(this)({
      tabFocus: true,
      copyStyle: this.isChecker ? null : ['min-height']
    });
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
      </Host>
    );
  }
}

import { Component, h, Element, Listen, Host } from '@stencil/core';
import { getElementAttributes } from '../../utils/utils';

@Component({
  tag: 'sui-button',
  styleUrl: 'sui-button.scss',
  shadow: true
})
export class SuiButton {
  // element only needs to be created once
  dummyButton = Object.assign(document.createElement('button'), { hidden: true });

  @Element() host: HTMLElement;
  @Listen('click', { capture: true })
  clickEventHandler() {
    if (this.host.attributes.getNamedItem('disabled')) {
      return;
    }

    this.host.parentElement.insertBefore(this.dummyButton, this.host);
    this.dummyButton.click();
    this.dummyButton.remove();
  }

  updateAttributes(triggerAutoFocus = false) {
    let properties = getElementAttributes(this.host.attributes);
    let propList = Object.keys(properties);

    let setDummy = (propName) => {
      // skip 'hidden'
      if (propName === 'hidden') {
        return;
      }
      this.dummyButton.setAttribute(propName, properties[propName]);
      if (triggerAutoFocus && propName === 'autofocus') {
        this.host.focus();
      }
    };

    for (let i = 0; i < this.dummyButton.attributes.length; i++) {
      // skip 'hidden'
      if (this.dummyButton.attributes[i].name === 'hidden') {
        continue;
      }

      // replace dummyButton attributes
      this.dummyButton.removeAttribute(this.dummyButton.attributes[i].name);
      if (propList.length) {
        setDummy(propList.pop());
      }
    }

    if (propList.length) {
      // ... if there is more attribute to set
      let len = propList.length;
      while (len--) {
        setDummy(propList.pop());
      }
    }
  }

  componentDidUpdate() {
    // triggers on attribute change. does not trigger on load.
    this.updateAttributes();
  }

  componentDidLoad() {
    // make host focusable
    this.host.setAttribute('tabindex', '0');
    let forOutlineColor = getComputedStyle(this.host).backgroundColor;
    if(forOutlineColor === 'rgba(0, 0, 0, 0)') {
      forOutlineColor = getComputedStyle(this.host).color;
    }

    // save outline color
    this.host.style.setProperty('--sui-focus-outline-color', forOutlineColor);

    // triggers on load
    this.updateAttributes(true);
  }

  render() {
    return (
      <Host>
        <div>
          <slot></slot>
        </div>
      </Host>
    );
  }
}
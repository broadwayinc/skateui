import { Component, h, Element, Listen, Host } from '@stencil/core';
import { dummyHandler } from '../../utils/utils';

@Component({
  tag: 'sui-button',
  styleUrl: 'sui-button.scss',
  shadow: true
})
export class SuiButton {
  observer: MutationObserver;

  @Element() host: HTMLElement;
  isFormButton = (() => {
    return this.host.closest('form');
  })();

  el = (() => {
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

  @Listen('click')
  clickEventHandler() {
    if (this.host.attributes.getNamedItem('disabled')) {
      // does not trigger dummy when disabled
      return;
    }
    if (this.isFormButton) {
      this.host.parentElement.insertBefore(this.el, this.host);
      this.el.click();
      this.el.remove();
    } else {
      // this.el.click();
    }
  }
  @Listen('keyup')
  keyEventHandler(e) {
    if (e.key === 'Enter') {
      // trigger click on enter
      this.clickEventHandler();
    }
  }

  componentDidLoad() {
    dummyHandler.bind(this)({ computedStyle: window.getComputedStyle(this.host) });

    // dispatch mounted event when finished loading
    this.el.dispatchEvent(new CustomEvent('mounted'));
  }

  disconnectedCallback() {
    // save memory by disconnecting mutation watch
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}
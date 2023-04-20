import { Component, h, Element, Host, Listen, Prop } from '@stencil/core';
import { dummyHandler } from '../../utils/utils';

@Component({
  tag: 'sui-button',
  styleUrl: 'sui-button.css',
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
    const button = Object.assign(document.createElement('button'), { hidden: true });
    return button;
  })();

  @Prop() disabled: boolean;

  @Listen('click')
  clickEventHandler() {
    if (this.disabled) {
      return;
    }

    if (this.isFormButton) {
      this.host.parentElement.insertBefore(this.el, this.host);
      this.el.click();
      this.el.remove();
    }
  }

  @Listen('keypress')
  keyEventHandler(e: KeyboardEvent) {
    if (this.disabled) {
      return;
    }

    let key = e.key.toLowerCase();
    if (key === 'enter' || key === ' ') {
      // trigger click on enter
      e.preventDefault();
      this.host.parentElement.insertBefore(this.el, this.host);
      this.el.click();
      this.el.remove();
    }
  }

  componentDidLoad() {
    dummyHandler.bind(this)({
      excludeAttribute: ['tabindex', 'aria-role']
    });

    this.host.dispatchEvent(new CustomEvent('mounted'));
  }

  disconnectedCallback() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  render() {
    return (
      <Host tabindex={this.disabled ? null : '0'} aria-role='button' disabled={this.disabled}>
        <slot></slot>
      </Host>
    );
  }
}
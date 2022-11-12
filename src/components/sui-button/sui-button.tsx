import { Component, h, Element, Listen, Host } from '@stencil/core';
import { dummyHandler } from '../../utils/utils';

@Component({
  tag: 'sui-button',
  styleUrl: 'sui-button.scss',
  shadow: true
})
export class SuiButton {
  // element only needs to be created once
  dummyElement = Object.assign(document.createElement('button'), { hidden: true });
  observer: MutationObserver;

  @Element() host: HTMLElement;
  @Listen('click', { capture: true })
  clickEventHandler() {
    if (this.host.attributes.getNamedItem('disabled')) {
      // does not trigger dummy when disabled
      return;
    }

    this.host.parentElement.insertBefore(this.dummyElement, this.host);
    this.dummyElement.click();
    this.dummyElement.remove();
  }
  @Listen('keyup', { capture: true })
  keyEventHandler(e) {
    if(e.key === 'Enter') {
      // trigger click on enter
      this.clickEventHandler();
    }
  }
  componentDidLoad() {
    dummyHandler.bind(this)({ tabFocus: true });
  }

  disconnectedCallback() {
    // save memory by disconnecting mutation watch
    this.observer.disconnect();
  }

  render() {
    return (
      <Host tabindex="0">
        <slot></slot>
      </Host>
    );
  }
}
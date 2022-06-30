import { Component, h, Element, Listen, Host } from '@stencil/core';
import { getElementAttributes } from '../../utils/utils';

@Component({
  tag: 'sui-button',
  styleUrl: 'sui-button.scss',
  shadow: true
})
export class SuiButton {
  @Element() host: HTMLElement;

  @Listen('click', {
    capture: true
  })
  clickEventHandler() {
    let dummyButton = document.createElement('button');
    dummyButton.hidden = true;

    let properties = getElementAttributes(this.host.attributes)
    for (let k in properties) {
      dummyButton.setAttribute(k, properties[k]);
    }

    this.host.parentElement.insertBefore(dummyButton, this.host);
    dummyButton.click();
    dummyButton.remove();
  }

  render() {
    return (
      <Host role="button">
        <div>
          <slot></slot>
        </div>
      </Host>
    );
  }
}
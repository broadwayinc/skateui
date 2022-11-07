import { Component, h, Element, Listen, Host, Prop } from '@stencil/core';
import { getElementAttributes } from '../../utils/utils';

@Component({
  tag: 'sui-button',
  styleUrl: 'sui-button.scss',
  shadow: true
})
export class SuiButton {
  @Element() host: HTMLElement;
  @Prop() loading: Boolean;

  @Listen('click', {
    capture: true
  })
  clickEventHandler() {
    if(!this.loading && !this.host.attributes.getNamedItem('disabled')) {
      let dummyButton = document.createElement('button');
      dummyButton.hidden = true;

      let properties = getElementAttributes(this.host.attributes)
      properties['type'] = properties['type'] || 'button';
      
      for (let k in properties) {
        dummyButton.setAttribute(k, properties[k]);
      }

      this.host.parentElement.insertBefore(dummyButton, this.host);
      dummyButton.click();
      dummyButton.remove();
    }
  }

  componentDidUpdate() {
    if(this.loading) {
      this.host.setAttribute('loading', '');
      this.host.setAttribute('disabled', '');
    } else {
      this.host.removeAttribute('loading');
      this.host.removeAttribute('disabled');
    }
  }

  render() {
    if(this.loading) {
      this.host.setAttribute('loading', '');
      this.host.setAttribute('disabled', '');
    }
    return (
      <Host role="button">
        <div>
          <slot></slot>
        </div>
      </Host>
    );
  }
}
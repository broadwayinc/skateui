import { Component, Host, h, Element, Listen } from '@stencil/core';
import { getElementAttributes } from '../../utils/utils';

@Component({
  tag: 'sui-input',
  styleUrl: 'sui-input.css',
  shadow: true,
})
export class SuiInput {

  @Element() host: HTMLElement;
  input: HTMLInputElement;

  @Listen('click')
  click() {
    this.input.focus();
  }


  renderInput(host) {
    this.input = document.createElement('input');
    this.input.style.background = 'transparent';
    this.input.style.width = '100%';
    this.input.style.boxSizing = 'border-box';
    this.input.style.border = 'none';
    this.input.style.color = 'inherit';
    this.input.style.font = 'inherit';
    this.input.style.fontSize = '1em';

    this.input.addEventListener('focus', () => {
      this.input.style.outline = 'none';
    })

    let properties = getElementAttributes(this.host.attributes)
    for (let k in properties) {
      if(k !== 'style') {
        this.input.setAttribute(k, properties[k]);
      }
    }

    host.appendChild(this.input);
  }

  render() {
    const { host } = this;

    this.renderInput(host);

    return (
      <Host tabindex="0">
        <slot></slot>
      </Host>
    );
  }

}

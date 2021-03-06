import { Component, Host, h, Element, Listen, Prop } from '@stencil/core';
import { getElementAttributes } from '../../utils/utils';

@Component({
  tag: 'sui-input',
  styleUrl: 'sui-input.scss',
  shadow: true,
})
export class SuiInput {

  @Element() host: HTMLElement;
  @Prop({reflect: true, mutable: true}) checked: any;
  input: HTMLInputElement;

  @Listen('click')
  click() {
    if(this.input.type === 'checkbox' || this.input.type === 'radio') {
      this.input.click();
      this.checked = this.input.checked;
    }
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
    });

    let properties = getElementAttributes(this.host.attributes)
    for (let k in properties) {
      if(k !== 'style') {
        this.input.setAttribute(k, properties[k]);
      }
    }

    if(this.input.type === 'checkbox' || this.input.type === 'radio') {
      this.input.style.display = 'none';
    } else {
      this.input.style.appearance = 'none';
    }

    host.appendChild(this.input);
  }

  render() {
    const { host } = this;
    if(!this.input) this.renderInput(host);

    return (
      <Host tabindex="0">
        <div class="options-parent">
          <div class="options-inner"></div>
        </div>
        <slot></slot>
      </Host>
    );
  }

}

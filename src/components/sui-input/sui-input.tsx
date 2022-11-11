import { Component, Host, h, Element } from '@stencil/core';

@Component({
  tag: 'sui-input',
  styleUrl: 'sui-input.scss',
  shadow: true,
})

export class SuiInput {
  @Element() host: HTMLElement;
  dummyElement = (() => {
    const input = document.createElement('input');
    this.host.appendChild(input);
    return input;
  })();

  render() {
    return (
      <Host tabindex="0">
        <div></div>
        <slot></slot>
      </Host>
    );
  }
}

import { Component, h, Element, Listen, Host, Prop } from '@stencil/core';
import { getElementAttributes } from '../../utils/utils';

@Component({
  tag: 'sui-button',
  styleUrl: 'sui-button.scss',
  scoped: true,
})
export class SuiButton {
  @Element() host: HTMLElement;
  @Prop() disabled: any;
  button: HTMLButtonElement;
  properties: Record<string, any>;

  @Listen('click', {
    capture: true
  })
  clickEventHandler(event: Event) {
    if (event.target === this.host) {
      event.stopPropagation();
      this.button.dispatchEvent(new PointerEvent(event.type, event));
    }
  }
  componentWillRender() {
    this.host.tabIndex = 0;
  }
  componentDidRender() {
    if (this.host.autofocus) this.host.focus();

    this.properties = getElementAttributes(this.host.attributes);
    for (let k in this.properties) {
      let exclude = ['class', 'id', 'onclick'];
      if (!exclude.includes(k)) {
        this.button.setAttribute(k , this.properties[k]);
      }
    }
  }

  componentDidUpdate() {
    this.properties = getElementAttributes(this.host.attributes);
  }

  render() {
    return (
      <Host >
        <button ref={(el) => this.button = el} tabindex="-1">
          <slot></slot>
        </button>
      </Host>
    );
  }
}
import { Component, Host, h, Element, Prop, Method } from '@stencil/core';

@Component({
  tag: 'sui-popup',
  styleUrl: 'sui-popup.css',
  scoped: true
})
export class SuiPopup {
  @Element() host: HTMLElement;
  @Prop({reflect: true}) show: boolean = false;

  @Method()
  async open() {
    this.show = true;
  }

  @Method()
  async close(e: Event) {
    console.log(e.target);
    e.stopPropagation();
    this.show = false;
  }

  render() {
    return (
      <Host>
        <div class="popup-wrapper">
          <slot></slot>
        </div>
      </Host>
    );
  }

}

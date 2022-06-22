import { Component, Host, h, Element, Prop, Method, State, Listen } from '@stencil/core';

@Component({
  tag: 'sui-popup',
  styleUrl: 'sui-popup.css',
  scoped: true
})
export class SuiPopup {
  @Element() host: HTMLElement;
  @Prop({reflect: true}) show: boolean = false;
  @State() eventQueue: string = null;

  @Listen('click')
  click(e) {
    if(this.eventQueue === 'close' && e.target === this.host) this.show = false;
  }

  @Method()
  async open() {
    this.show = true;
  }

  @Method()
  async close() {
    this.eventQueue = 'close';
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

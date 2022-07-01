import { Component, Host, h, Element, Prop, Method } from '@stencil/core';

@Component({
  tag: 'sui-overlay',
  styleUrl: 'sui-overlay.css',
  scoped: true,
})
export class SuiOverlay {
  @Element() host: HTMLElement;
  @Prop({ reflect: true }) show: boolean = false;

  @Method()
  async open() {
    this.show = true;
  }

  @Method()
  async close() {
    this.show = false;
  }

  render() {
    return (
      <Host style={{position: 'fixed', overflow: 'hidden'}}></Host>
    );
  }


}

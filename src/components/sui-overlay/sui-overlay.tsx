import { Component, Host, h, Element, Prop, State, Listen, Method } from '@stencil/core';

@Component({
  tag: 'sui-overlay',
  styleUrl: 'sui-overlay.css',
  scoped: true,
})
export class SuiOverlay {
  @Element() host: HTMLElement;
  @Prop({ reflect: true }) show: boolean = false;
  @Prop({reflect: true}) from: string = 'left';
  @State() eventQueue: string = null;
  wrapper: HTMLElement;
  overlay: HTMLElement;

  @Listen('click')
  click(e) {
    if (this.eventQueue === 'close' && (e.target === this.wrapper || e.target === this.overlay)) this.show = false;
  }

  @Method()
  async open() {
    this.show = true;
  }

  @Method()
  async close() {
    this.eventQueue = 'close';
  }

  componentDidRender() {
    this.wrapper.children[0].classList.add(this.from, 'sc-sui-overlay');
  }

  render() {
    return (
      <Host>
        <div ref={el => this.overlay = el} class="sui-overlay-overlay">
          <div ref={el => this.wrapper = el} class="sui-overlay-wrapper">
            <slot></slot>
          </div>
        </div>
      </Host>
    );
  }


}

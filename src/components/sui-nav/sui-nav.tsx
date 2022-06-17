import { Component, Element, Host, h, Listen, State, Prop } from '@stencil/core';

@Component({
  tag: 'sui-nav',
  styleUrl: 'sui-nav.css',
  scoped: true,
})
export class SuiNav {
  @Element() host: HTMLElement;
  @State() oldPosition = 0;
  @State() newPosition= 0;
  @Prop({reflect: true, attribute: 'hide'}) isHidden = false;
  @Prop() disableHiding: boolean;
  @Prop({reflect: true}) sticky: boolean;
  
  @Listen('scroll', {target: 'window'})
  scroll() {
    if(!this.disableHiding) {
      this.newPosition = this.getYPosition();
      if(this.newPosition !== this.oldPosition) {
        this.isHidden = this.newPosition > this.oldPosition ? true : false;
      }
      this.oldPosition = this.getYPosition();
    }
  }

  getYPosition() {
    return Math.floor(window.scrollY);
  }

  componentWillLoad() {
    this.oldPosition = this.getYPosition();
    this.newPosition = this.getYPosition();
  }

  render() {
    return (
      <Host>
        <nav>
          <slot></slot>
        </nav>
      </Host>
    );
  }
}

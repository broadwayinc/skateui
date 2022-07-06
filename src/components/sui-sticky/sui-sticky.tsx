import { Component, Element, Host, h, Listen, State } from '@stencil/core';

@Component({
  tag: 'sui-sticky',
  styleUrl: 'sui-sticky.css',
  scoped: true,
})
export class SuiSticky {
  @Element() host: HTMLElement;
  @State() sticky: HTMLElement;
  @State() isSticky = true;
  @State() oldPosition = 0;
  @State() newPosition = 0;
  @State() positionY = 0;

  @Listen('scroll', { target: 'window' })
  scroll() {
    if (this.sticky && this.isSticky) {
      this.setPosition();
      this.newPosition = this.getYPosition();
      if (this.newPosition > this.oldPosition) {
        this.setTransform('down');
      } else {
        this.setTransform('up');
      }
      this.oldPosition = this.getYPosition();
    }
  }

  getYPosition() {
    return Math.floor(window.scrollY);
  }

  setTransform(direction: string) {
    let { newPosition, oldPosition } = this;
    if (direction === 'down' && this.positionY > this.sticky.clientHeight * -1) {
      window.requestAnimationFrame(() => {
        this.positionY -= (newPosition - oldPosition) * 0.6;
      });
      if (this.positionY < this.sticky.clientHeight * -1) {
        this.positionY = this.sticky.clientHeight * -1;
      }
    } else if (direction === 'up') {
      window.requestAnimationFrame(() => {
        this.positionY += (oldPosition - newPosition) * 0.6;
      });
    }
    if (this.positionY > 0) this.positionY = 0;
  }

  setPosition() {
    if (this.host.getBoundingClientRect().y <= 0) {
      this.isSticky = true;
    } else {
      this.isSticky = false;
    }
  }

  componentDidRender() {
    this.oldPosition = this.getYPosition();
    this.newPosition = this.getYPosition();
    this.setPosition();
  }

  render() {
    return (
      <Host>
        <div class="sticky" ref={(el) => this.sticky = el} style={{ position: this.isSticky ? 'sticky' : 'relative', transform: `translateY(${this.positionY}px)` }}>
          <slot></slot>
        </div>
      </Host>
    );
  }

}

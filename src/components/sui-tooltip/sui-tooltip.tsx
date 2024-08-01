import { Component, Element, Host, h, Listen, State } from '@stencil/core';

@Component({
  tag: 'sui-tooltip',
  styleUrl: 'sui-tooltip.css',
  shadow: true
})
export class SuiTooltip {
  @Element() host: HTMLElement;

  @State()
  classNames = '';
  @State()
  tipBackgroundColor = 'transparent';

  @Listen('mouseenter')
  setPosition(e: MouseEvent) {
    let y = window.innerHeight / 2;
    let x = window.innerWidth / 2;
    let isBottom = e.clientY < y;
    let isLeft = e.clientX > x;

    this.classNames = '';

    if (isBottom) {
      this.classNames += ' bottom';
    }
    else {
      this.classNames += ' top';
    }

    if (isLeft) {
      this.classNames += ' left';
    }
    else {
      this.classNames += ' right';
    }

    let tip = this.host.querySelectorAll('[slot="tip"]');
    this.tipBackgroundColor = window.getComputedStyle(tip[0]).getPropertyValue('background-color');
  }
  render() {
    return (
      <Host>
        <div class={'sui-tooltip' + this.classNames}>
          <div class='sui-tool'>
            <slot name='tool' />
            <div class='sui-tip' style={{ '--tip-background-color': this.tipBackgroundColor }}>
              <slot name='tip' />
            </div>
            <div class={'tip-arrow' + this.classNames} style={{ '--tip-background-color': this.tipBackgroundColor }}></div>
          </div>
        </div>
      </Host>
    );
  }
}

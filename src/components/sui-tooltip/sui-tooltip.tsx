import { Component, Host, h, Listen, State } from '@stencil/core';

@Component({
  tag: 'sui-tooltip',
  styleUrl: 'sui-tooltip.css',
  shadow: true
})
export class SuiTooltip {
  maxWidth = '100vw';

  @State()
  classNames = 'sui-tooltip';
  @State()
  tipBackgroundColor = 'transparent';

  @Listen('mouseenter')
  setPosition(e) {
    let y = window.innerHeight / 2;
    let x = window.innerWidth / 2;
    let isBottom = e.clientY < y;
    let isLeft = e.clientX > x;

    this.classNames = 'sui-tooltip';

    if (isBottom) {
      this.classNames += ' bottom';
    };

    if (isLeft) {
      this.classNames += ' left';
      this.maxWidth = `${e.clientX}px`;
    }
    else {
      this.maxWidth = `${window.innerWidth - e.clientX}px`;
    }

    let tip = e.target.querySelectorAll('[slot="tip"]');
    if (isBottom) {
      this.tipBackgroundColor = window.getComputedStyle(tip[0]).getPropertyValue('background-color');
    }
    else {
      this.tipBackgroundColor = window.getComputedStyle(tip[tip.length - 1]).getPropertyValue('background-color');
    }
  }
  render() {
    return (
      <Host>
        <div class={this.classNames}>
          <div class='sui-tool'>
            <slot name='tool' />
          </div>
          <div class='sui-tip' style={{ '--tip-max-width': this.maxWidth, '--tip-background-color': this.tipBackgroundColor }}>
            <slot name='tip' />
          </div>
        </div>
      </Host>
    );
  }
}

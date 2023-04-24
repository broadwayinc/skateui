import { Component, Host, h, Prop, Element } from '@stencil/core';

@Component({
  tag: 'sui-flextext',
  styleUrl: 'sui-flextext.css',
  shadow: true,
})
export class SuiFlextext {
  @Element() host: HTMLElement;
  @Prop({ mutable: true }) minSize = 0;
  @Prop({ mutable: true }) maxSize = 72;
  fontSize: number = null;

  computedStyle: CSSStyleDeclaration;

  componentWillLoad() {
    this.maxSize = this.maxSize && typeof this.maxSize !== 'number' ? Number(this.maxSize) : this.maxSize;
    this.minSize = this.minSize && typeof this.minSize !== 'number' ? Number(this.minSize) : this.minSize;

    if (isNaN(this.maxSize)) {
      this.maxSize = 72;
    }
    if (isNaN(this.minSize)) {
      this.minSize = 0;
    }

    this.computedStyle = window.getComputedStyle(this.host);
    this.fontSize = Number(this.computedStyle.fontSize.replace('px', ''));

    if (this.minSize === 0) {
      this.minSize = this.fontSize;
    }

    if (this.minSize > this.maxSize) {
      this.maxSize = this.minSize;
    }
  }

  adjustSize = () => {
    const lineHeightRatio = Number(this.computedStyle.lineHeight.replace('px', '')) / this.fontSize;

    if (!this.host.textContent) {
      this.fontSize = this.maxSize;
    }

    else {
      const scaleDown = () => {
        let height = parseFloat(this.computedStyle.height);
        let howmanylines = Math.round(height / (this.fontSize * lineHeightRatio));

        if (howmanylines > 1 && this.fontSize > this.minSize) {
          let minus = this.fontSize - 1;
          this.fontSize = minus > this.minSize ? minus : this.minSize;

          this.host.style.setProperty('--auto-size', `${this.fontSize}px`);

          if (this.fontSize === this.minSize) {
            return;
          }
          scaleDown();
        }
      };

      const scaleUp = () => {
        let height = parseFloat(this.computedStyle.height);
        let howmanylines = Math.round(height / (this.fontSize * lineHeightRatio));

        if (howmanylines <= 1 && this.fontSize < this.maxSize) {
          let plus = this.fontSize + 1;
          this.fontSize = plus < this.maxSize ? plus : this.maxSize;

          this.host.style.setProperty('--auto-size', `${this.fontSize}px`);

          if (this.fontSize === this.maxSize) {
            return;
          }
          scaleUp();
        }
      };

      scaleUp();
      scaleDown();
    }
  };

  componentDidLoad() {
    this.adjustSize();
    window.addEventListener("resize", this.adjustSize.bind(this));
  }

  disconnectedCallback() {
    window.removeEventListener('resize', this.adjustSize.bind(this));
  }

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}

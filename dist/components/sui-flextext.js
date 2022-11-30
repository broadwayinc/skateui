import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';

const suiFlextextCss = ":host{display:block;cursor:default;font-size:var(--auto-size);line-height:1}";

const SuiFlextext$1 = /*@__PURE__*/ proxyCustomElement(class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
    this.minSize = 0;
    this.maxSize = 72;
    this.fontSize = null;
    this.adjustSize = (function () {
      const lineHeightRatio = Number(this.computedStyle.lineHeight.replace('px', '')) / this.fontSize;
      if (!this.value) {
        this.fontSize = this.maxSize;
      }
      else {
        const scaleDown = () => {
          let height = parseFloat(this.computedStyle.height);
          let howmanylines = height / (this.fontSize * lineHeightRatio);
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
          let howmanylines = height / (this.fontSize * lineHeightRatio);
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
    }).bind(this);
  }
  componentWillLoad() {
    this.maxSize = this.maxSize && typeof this.maxSize !== 'number' ? Number(this.maxSize) : this.maxSize;
    this.minSize = this.minSize && typeof this.minSize !== 'number' ? Number(this.minSize) : this.minSize;
    if (isNaN(this.maxSize)) {
      this.maxSize = 72;
    }
    if (isNaN(this.minSize)) {
      this.minSize = 0;
    }
  }
  componentDidLoad() {
    this.value = this.host.textContent;
    this.computedStyle = window.getComputedStyle(this.host);
    this.fontSize = Number(this.computedStyle.fontSize.replace('px', ''));
    if (this.minSize === 0) {
      this.minSize = this.fontSize;
    }
    if (this.minSize > this.maxSize) {
      this.maxSize = this.minSize;
    }
    this.adjustSize();
    window.addEventListener("resize", this.adjustSize);
  }
  disconnectedCallback() {
    window.removeEventListener('resize', this.adjustSize);
  }
  render() {
    return (h(Host, null, h("slot", null)));
  }
  get host() { return this; }
  static get style() { return suiFlextextCss; }
}, [1, "sui-flextext", {
    "minSize": [1026, "min-size"],
    "maxSize": [1026, "max-size"]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["sui-flextext"];
  components.forEach(tagName => { switch (tagName) {
    case "sui-flextext":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, SuiFlextext$1);
      }
      break;
  } });
}

const SuiFlextext = SuiFlextext$1;
const defineCustomElement = defineCustomElement$1;

export { SuiFlextext, defineCustomElement };

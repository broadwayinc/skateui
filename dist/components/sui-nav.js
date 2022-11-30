import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';

const suiNavCss = ":host{display:block;width:100%;padding:8px;transform:translateY(var(--nav-top));position:var(--nav-position);top:0;z-index:1}";

const SuiNav$1 = /*@__PURE__*/ proxyCustomElement(class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
    this.scrollOffset = 0;
    this.topOffset = 0;
    this.offsetProp = 'pageYOffset';
    // ! should be variable with bind !
    // this way we can remove the event when component is destroyed
    this.calcNavbarPosition = (function () {
      window.requestAnimationFrame(() => {
        const navHeight = parseInt(this.navCss.height);
        const scrollOffset = this.parent[this.offsetProp] < 0 ? 0 : this.parent[this.offsetProp]; // on mobile, offsetProp can be negative
        const offsetDifference = (this.scrollOffset - scrollOffset) / this.autoHide;
        const topOffset = (() => {
          let topOffset = this.topOffset + offsetDifference;
          if (topOffset < -navHeight) {
            // if offset is beyond navHeight
            return -navHeight;
          }
          if (topOffset > 0) {
            // offset is positive
            return 0;
          }
          return topOffset; // return int range
        })();
        this.scrollOffset = scrollOffset; // update scroll offset
        this.topOffset = topOffset;
        this.host.style.setProperty('--nav-top', `${topOffset}px`); // apply css variable
      });
    }).bind(this);
  }
  componentWillLoad() {
    if (this.autoHide === undefined) {
      // no given attribute
      return;
    }
    if (!this.autoHide) {
      // attribute exists but empty value. set to default.
      this.autoHide = 3;
    }
    if (this.autoHide) {
      if (typeof this.autoHide === 'string') {
        // html attributes are string
        try {
          this.autoHide = JSON.parse(this.autoHide);
        }
        catch (err) {
          this.autoHide = 0;
        }
      }
      if (typeof this.autoHide === 'boolean') {
        // if 'true' | 'false' is given.
        this.autoHide = this.autoHide ? 3 : 0;
      }
      else if (typeof this.autoHide === 'number') {
        if (this.autoHide < 0) {
          // if value is less than 0
          this.autoHide = 0;
        }
      }
      else {
        // other types are not allowed
        this.autoHide = 0;
      }
    }
  }
  disconnectedCallback() {
    // remove windows event
    if (this.offsetProp === 'pageYOffset') {
      document.removeEventListener('scroll', this.calcNavbarPosition);
    }
    else {
      this.parent.removeEventListener('scroll', this.calcNavbarPosition);
    }
  }
  componentDidLoad() {
    this.navCss = window.getComputedStyle(this.host);
    this.host.style.setProperty('--nav-position', 'sticky'); // apply css variable
    if (this.autoHide) {
      let seekScrollableParent = (el) => {
        if (el) {
          if (el.scrollHeight > el.clientHeight && 'hidden' !== window.getComputedStyle(el).overflowY) {
            return el;
          }
          else {
            return seekScrollableParent(el.parentElement);
          }
        }
        else {
          return el;
        }
      };
      let scrollableParent = seekScrollableParent(this.host.parentElement);
      if (scrollableParent && scrollableParent.tagName.toLowerCase() !== 'html') {
        this.offsetProp = 'scrollTop';
        this.parent = scrollableParent;
        this.parent.addEventListener('scroll', this.calcNavbarPosition, { passive: true });
      }
      else {
        this.parent = window;
        document.addEventListener('scroll', this.calcNavbarPosition, { passive: true });
      }
    }
  }
  render() {
    return (h(Host, null, h("slot", null)));
  }
  get host() { return this; }
  static get style() { return suiNavCss; }
}, [1, "sui-nav", {
    "autoHide": [2, "auto-hide"]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["sui-nav"];
  components.forEach(tagName => { switch (tagName) {
    case "sui-nav":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, SuiNav$1);
      }
      break;
  } });
}

const SuiNav = SuiNav$1;
const defineCustomElement = defineCustomElement$1;

export { SuiNav, defineCustomElement };

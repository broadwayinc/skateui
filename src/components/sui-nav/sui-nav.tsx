import { Component, Host, h, Element, Prop } from '@stencil/core';

@Component({
  tag: 'sui-nav',
  styleUrl: 'sui-nav.scss',
  shadow: true,
})
export class SuiNav {
  @Element() host: HTMLElement;
  @Prop() autoHide: number;
  navCss: CSSStyleDeclaration;
  parent: HTMLElement | Window;
  scrollOffset = 0;
  topOffset = 0;
  offsetProp = 'pageYOffset';
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
        } catch (err) {
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
        this.parent.addEventListener(
          'scroll',
          this.calcNavbarPosition,
          { passive: true }
        );
      } else {
        this.parent = window;
        document.addEventListener(
          'scroll',
          this.calcNavbarPosition,
          { passive: true }
        );
      }

    }
  }

  // ! should be variable with bind !
  // this way we can remove the event when component is destroyed
  calcNavbarPosition = (function () {
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

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}

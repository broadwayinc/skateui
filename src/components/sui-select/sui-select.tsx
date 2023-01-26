import { Component, Host, h, Element, State, Prop, Watch } from '@stencil/core';
import { dummyHandler, cloneEvents } from '../../utils/utils';

@Component({
  tag: 'sui-select',
  styleUrl: 'sui-select.scss',
  shadow: true,
})
export class SuiSelect {
  @Element() host: HTMLElement;
  observer: MutationObserver;
  @State() leftPadding: string = '0px';
  @State() rightPadding: string = '0px';
  @State() topPadding: string = '0px';
  @State() valueDisplay: string;
  @Prop() value: any;
  @Watch('value')
  valueHandler(n: string, o: string) {
    if (n !== o && this.el) {
      this.el.value = n.toString();
      this.valueDisplay = this.el.getElementsByTagName('option')[this.el.selectedIndex || 0]?.textContent || this.el.value || '';
    }
  }

  isMultiple: boolean = (() => {
    return this.host.hasAttribute('multiple');
  })();

  @Prop()
  el = (() => {
    const select = document.createElement('select');

    if (this.host.children.length) {
      let len = this.host.children.length;
      while (len--) {
        select.prepend(this.host.children[len]);
      }
    }

    if (this.value) {
      select.value = this.value.toString();
    }

    this.valueDisplay = select.getElementsByTagName('option')[select.selectedIndex || 0]?.textContent || select.value || '';
    select.addEventListener('change', () => {
      if (select.value !== this.value) {
        this.value = select.value || '';
      }
    });

    for (const [key, value] of Object.entries({
      // set important styles
      // these value should not be editable
      background: 'transparent',
      'box-sizing': 'border-box',
      border: 'none',
      display: 'block',
      'font-size': 'inherit',
      'line-height': '1.2',
      '-webkit-appearance': 'none',
      '-moz-appearance': 'none',
      'appearance': 'none',
      'cursor': this.isMultiple ? 'default' : 'pointer'
    })) {
      select.style.setProperty(key, value, 'important');
    }

    if (!this.isMultiple) {
      // select.style.setProperty('color', 'rgba(0 0 0 / 0%)');
    }

    this.host.append(select);
    return select;
  })();

  componentDidLoad() {
    dummyHandler.bind(this)({
      computedStyle: window.getComputedStyle(this.host),
      copyStyle: (hostCss: CSSStyleDeclaration) => {
        this.el.style.setProperty('border-radius', hostCss['border-radius'], 'important');

        // make text input fill the host
        let needAdjustment = false;
        let padding = [
          hostCss['padding-top'],
          hostCss['padding-right'],
          hostCss['padding-bottom'],
          hostCss['padding-left']
        ].map(p => {
          let val = Number(p.replace('px', ''));
          if (val && !needAdjustment) {
            needAdjustment = true;
          }
          return val;
        });

        if (!this.isMultiple) {
          this.el.style.setProperty('opacity', '0', 'important');
        }

        if (!needAdjustment) {
          this.el.style.setProperty('margin', '0', 'important');
          return;
        }

        if (padding[0] || padding[2]) {
          this.topPadding = `${padding[0]}px`;
          this.el.style.setProperty('height', `calc(100% + ${padding[0]}px + ${padding[2]}px)`, 'important');
        }

        else if (!this.isMultiple) {
          this.el.style.setProperty('height', hostCss['height'], 'important');
        }

        if (padding[1] || padding[3]) {
          this.leftPadding = `${padding[3]}px`;
          this.rightPadding = `${padding[1]}px`;
          this.el.style.setProperty('width', `calc(100% + ${this.leftPadding} + ${this.rightPadding})`, 'important');
        }

        this.el.style.setProperty('padding', hostCss['padding'], 'important');
        this.el.style.setProperty('margin',
          padding.map(p => {
            return p ? `-${p}px` : '0px';
          }).join(' '), 'important');
      },
      appendIdToSlotElement: true,
      excludeAttribute: this.isMultiple ? ['value'] : ['size', 'value'] // size attribute should not work for multiple select
    });
    cloneEvents(this.el);

    // dispatch mounted event when finished loading
    this.el.dispatchEvent(new CustomEvent('mounted'));
  }

  disconnectedCallback() {
    // save memory by disconnecting mutation watch
    if (this.observer) {
      this.observer.disconnect();
    }
    // remove dummy element
    this.el.remove();
  }
  render() {
    return (
      <Host>
        <div>
          <svg style={{ display: this.isMultiple ? 'none' : 'block' }} fill="currentColor" viewBox="0 -100 700 700" xmlns="http://www.w3.org/2000/svg">
            <path d="m81.957 144.91 252.97 305.17c4.7695 5.293 10.496 7.9336 17.16 7.9336 6.1875 0 11.676-2.6445 16.438-7.9453l250.12-305.17c6.1875-8.4844 7.3984-17.746 3.5742-27.82-3.8008-10.051-10.703-15.094-20.727-15.094l-202.93 0.003906h-300.16c-9.5352 0-16.438 5.0391-20.727 15.094-3.8008 10.078-2.3672 19.355 4.2852 27.828z" />
          </svg>
          <slot></slot>
          <span data-selected={this.valueDisplay} style={{ display: this.isMultiple ? 'none' : 'flex', width: `calc(100% - ${this.isMultiple ? 0 : 0.75}em)` }}></span>
        </div>
      </Host>
    );
  }
}

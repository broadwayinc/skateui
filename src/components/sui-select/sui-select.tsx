import { Component, Host, h, Element, State, Prop, Watch, Method } from '@stencil/core';
import { dummyHandler } from '../../utils/utils';

@Component({
  tag: 'sui-select',
  styleUrl: 'sui-select.css',
  shadow: true,
})
export class SuiSelect {
  @Element() host: HTMLElement;
  observer: MutationObserver;

  @State() displayedValue: string;
  @Prop({ mutable: true }) value: string;
  @Watch('value')
  valueHandler(n: string, o: string) {
    if (n !== o && this.el) {
      if (!n) {
        this.el.value = n === undefined ? '' : JSON.stringify(n);
      }
      else {
        this.el.value = n.toString();
      }
      let currOpt = this.el.getElementsByTagName('option')[this.el.selectedIndex || 0];
      this.displayedValue = currOpt?.textContent || currOpt?.value || '';
    }
  }
  @Prop() disabled: boolean;
  @Prop() required: boolean;
  @Prop() multiple: boolean;
  @Method()
  async setValueDefault() {
    this.value = this.valueDefault;
  }

  valueDefault = null;
  initEl = (select = this.el) => {
    if (this.host.children.length) {
      let len = this.host.children.length;
      let got = false;
      while (len--) {
        if (got && len === 1) {
          // skipped select element & has only 1 left(...which is the select element)
          break;
        }

        if (!select.isSameNode(this.host.children[len])) {
          select.prepend(this.host.children[len]);
        }
        else {
          // skip select element
          got = true;
        }
      }
    }
    let currOpt;
    if (this.value) {
      // set select value
      select.value = this.value;
      currOpt = select.getElementsByTagName('option')[select.selectedIndex || 0]; // get current selected option
    }
    else {
      // set select default value
      currOpt = select.getElementsByTagName('option')[select.selectedIndex || 0]; // get current selected option
      this.value = currOpt.value;
    }
    this.valueDefault = this.value;
    this.displayedValue = currOpt?.textContent || currOpt.value || ''; // set value display
  };
  @Prop()
  el = (() => {
    const select = document.createElement('select');
    select.setAttribute('tabindex', '0');
    this.initEl(select);
    select.addEventListener('change', () => {
      if (select.value !== this.value) {
        this.value = select.value || '';
      }
    });

    for (const [key, value] of Object.entries({
      // set important styles
      // these value should not be editable
      'background': 'transparent',
      'box-sizing': 'border-box',
      'border': 'none',
      'display': 'block',
      'font-size': 'inherit',
      'line-height': 'inherit',
      '-webkit-appearance': 'none',
      '-moz-appearance': 'none',
      'appearance': 'none',
      'cursor': this.multiple ? 'default' : 'pointer'
    })) {
      select.style.setProperty(key, value, 'important');
    }

    return select;
  })();

  componentDidRender() {
    if (this.el && this.el.parentElement === null) {
      this.host.prepend(this.el);
    }
  }

  componentDidLoad() {
    dummyHandler.bind(this)({
      mirrorStyle: (hostCss: CSSStyleDeclaration) => {
        this.el.style.setProperty('border-radius', hostCss['border-radius'], 'important');

        if (!this.multiple) {
          this.el.style.setProperty('opacity', '0', 'important');
        }

        let padding = [
          hostCss['padding-top'],
          hostCss['padding-right'],
          hostCss['padding-bottom'],
          hostCss['padding-left']
        ];

        // make text input fill the host
        if (hostCss['box-sizing'] === 'border-box') {
          this.el.style.setProperty('width', `calc(100% + ${padding[1]} + ${padding[3]})`, 'important');
          this.el.style.setProperty('height', `calc(${hostCss['height']} - ${hostCss['border-top-width']} - ${hostCss['border-bottom-width']})`);
        }

        else {
          this.el.style.setProperty('width', '100%');
          this.el.style.setProperty('height', hostCss['height']);
        }

        this.el.style.setProperty('padding', hostCss['padding'], 'important');
        this.el.style.setProperty('margin',
          padding.map(p => {
            return `-${p}`;
          }).join(' '), 'important');

      },
      excludeAttribute: ['aria-role', 'tabindex', 'value']
    });

    // dispatch mounted event when finished loading
    this.host.dispatchEvent(new CustomEvent('mounted'));
  }

  render() {
    return (
      <Host aria-role='select' disabled={this.disabled} required={this.required} value={this.valueDefault}>
        <div>
          <svg style={{ display: this.multiple ? 'none' : 'block' }} fill="currentColor" viewBox="0 -100 700 700" xmlns="http://www.w3.org/2000/svg">
            <path d="m81.957 144.91 252.97 305.17c4.7695 5.293 10.496 7.9336 17.16 7.9336 6.1875 0 11.676-2.6445 16.438-7.9453l250.12-305.17c6.1875-8.4844 7.3984-17.746 3.5742-27.82-3.8008-10.051-10.703-15.094-20.727-15.094l-202.93 0.003906h-300.16c-9.5352 0-16.438 5.0391-20.727 15.094-3.8008 10.078-2.3672 19.355 4.2852 27.828z" />
          </svg>
          <slot onSlotchange={() => { this.initEl(); this.componentDidRender(); }}></slot>
          <span data-selected={this.displayedValue} style={{ display: this.multiple ? 'none' : 'flex', width: `calc(100% - ${this.multiple ? 0 : 0.75}em)` }}></span>
        </div>
      </Host>
    );
  }
}

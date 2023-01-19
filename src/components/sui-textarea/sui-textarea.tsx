import { Component, Host, h, Prop, Element, Watch } from '@stencil/core';
import { dummyHandler, randomString, cloneEvents } from '../../utils/utils';

@Component({
  tag: 'sui-textarea',
  styleUrl: 'sui-textarea.scss',
  shadow: true,
})
export class SuiTextarea {
  @Element() host: HTMLElement;
  @Prop() value: any;
  @Watch('value')
  valueHandler(n: string, o: string) {
    if (n !== o && this.el) {
      this.el.value = n.toString();
    }
  }

  slotName: string = randomString();

  @Prop()
  el = (() => {
    let value = this.value;

    const previousInput = this.host.getElementsByTagName('textarea')?.[0];
    if (previousInput && previousInput.hasAttribute('slot')) {
      // if element already exists, return
      // element can already exist when working on hot reloads

      // setup new slot name
      previousInput.setAttribute('slot', this.slotName);
      return previousInput;
    }

    // create new element
    const textarea = document.createElement('textarea');
    if (value) {
      textarea.value = value.toString();
    }
    // textarea.setAttribute('rows', '1');
    textarea.setAttribute('slot', this.slotName);

    textarea.addEventListener('input', e => {
      this.value = (e.target as HTMLTextAreaElement).value;
    });

    this.host.prepend(textarea);
    return textarea;
  })();

  componentDidLoad() {
    dummyHandler.bind(this)({
      computedStyle: window.getComputedStyle(this.host),
      excludeStyle: ['border', 'margin', 'padding', 'max', 'min'],
      copyStyle: (hostCss: CSSStyleDeclaration) => {

        for (let key of [
          'font-size',
          'line-height',
          'font-family',
          'font-weight'
        ]) {
          this.el.style.setProperty(key, hostCss.getPropertyValue(key), 'important');
        }

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

        this.el.style.setProperty('width', `calc(100% + ${padding[1]}px + ${padding[3]}px)`, 'important');

        if (!needAdjustment) {
          this.el.style.setProperty('padding', '0', 'important');
          this.el.style.setProperty('margin', '0', 'important');
          return;
        }

        this.el.style.setProperty('padding', hostCss['padding'], 'important');
        this.el.style.setProperty('margin',
          padding.map(p => {
            return p ? `-${p}px` : '0px';
          }).join(' '), 'important');
      },
      // attCallback: (attName, val) => {
      //   console.log({attName,val})
      // },
      excludeAttribute: ['value'],
      appendIdToSlotElement: true
    });

    // stop event propagation from input element,
    // emit events from host
    cloneEvents.bind(this)(this.el);

    // dispatch mounted event when finished loading
    this.el.dispatchEvent(new CustomEvent('mounted'));
  }

  render() {
    return (
      <Host>
        <div data-value={this.value}>
          <slot name={this.slotName}></slot>
        </div>
      </Host>
    );
  }
}

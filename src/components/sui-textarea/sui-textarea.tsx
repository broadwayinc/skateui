import { Component, Host, h, Prop, Element, Watch } from '@stencil/core';
import { dummyHandler, randomString, cloneEvents } from '../../utils/utils';

@Component({
  tag: 'sui-textarea',
  styleUrl: 'sui-textarea.scss',
  shadow: true
})
export class SuiTextarea {
  @Element() host: HTMLElement;
  @Prop({ mutable: true }) value: any = '';
  @Watch('value')
  valueHandler(n: string, o: string) {
    if (n !== o && this.el && this.el.value !== n) {
      this.el.value = (n || '').toString();
    }
  }

  slotName: string = randomString();

  @Prop()
  el = (() => {
    let value = (this.value || '').toString();

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
      textarea.value = value;
    }

    textarea.setAttribute('slot', this.slotName);
    textarea.addEventListener('input', e => {
      this.value = (e.target as HTMLTextAreaElement).value;
    });

    for (let key of [
      'font-size',
      'line-height',
      'font-family',
      'font-weight',
      'white-space',
      'word-break'
    ]) {
      textarea.style.setProperty(key, 'inherit', 'important');
    }

    this.host.prepend(textarea);
    return textarea;
  })();

  componentWillLoad() {
    let nestedValue = this.host.childNodes;
    if (!this.value) {
      for (let idx = 0; idx < nestedValue.length; idx++) {
        let el = nestedValue[idx] as HTMLElement;
        if (el.nodeType === Node.TEXT_NODE) {
          this.value += el.textContent;
        }
      }
    }

    dummyHandler.bind(this)({
      computedStyle: window.getComputedStyle(this.host),
      excludeAttribute: ['value', 'rows', 'cols'],
      appendIdToSlotElement: true
    });

    cloneEvents.bind(this)(this.el);

    // dispatch mounted event when finished loading
    this.el.dispatchEvent(new CustomEvent('mounted'));
  }

  render() {
    return (
      <Host>
        <div class='shell'>
          <slot name={this.slotName}>
          </slot>
          <div class='text-value' text-value={this.value}>
            <div>
              <slot></slot>
            </div>
          </div>
        </div>
      </Host>
    );
  }
}

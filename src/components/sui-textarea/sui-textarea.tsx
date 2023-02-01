import { State, Component, Host, h, Prop, Element, Watch } from '@stencil/core';
import { dummyHandler, randomString, cloneEvents } from '../../utils/utils';

@Component({
  tag: 'sui-textarea',
  styleUrl: 'sui-textarea.scss',
  shadow: true
})
export class SuiTextarea {
  observer: MutationObserver;
  @Element() host: HTMLElement;
  @Prop({ mutable: true }) value: string = '';
  @Watch('value')
  valueHandler(n: string, o: string) {
    if (typeof n !== 'string') {
      return;
    }

    if (n !== o && this.el) {
      let val = n !== null && n !== undefined ? n : '';
      this.el.value = val;
      this.reflect = val;
    }
  }

  slotName: string = randomString();

  @State()
  reflect: string = '';

  @Prop()
  el = (() => {
    let value = this.value !== null && this.value !== undefined ? this.value.toString() : '';
    this.reflect = value;

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
      this.reflect = this.value;
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
    let value = this.value !== null && this.value !== undefined ? this.value.toString() : '';
    if (!value) {
      let nestedValue = this.host.childNodes;
      for (let idx = 0; idx < nestedValue.length; idx++) {
        let el = nestedValue[idx] as HTMLElement;
        if (el.nodeType === Node.TEXT_NODE) {
          this.value += el.textContent;
        }
      }
    }

    this.reflect = this.value;

    dummyHandler.bind(this)({
      computedStyle: window.getComputedStyle(this.host),
      excludeAttribute: ['value', 'rows', 'cols'],
      appendIdToSlotElement: true
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
        <div class='shell'>
          <slot name={this.slotName}>
          </slot>
          <div class='text-value' text-value={this.reflect + ' '}>
            <div>
              <slot></slot>
            </div>
          </div>
        </div>
      </Host>
    );
  }
}

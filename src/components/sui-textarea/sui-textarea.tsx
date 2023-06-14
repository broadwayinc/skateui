import { State, Component, Host, h, Prop, Element, Watch } from '@stencil/core';
import { dummyHandler, randomString } from '../../utils/utils';

@Component({
  tag: 'sui-textarea',
  styleUrl: 'sui-textarea.css',
  shadow: true
})
export class SuiTextarea {
  observer: MutationObserver;
  @Element() host: HTMLElement;
  @Prop({ mutable: true }) value: string = '';
  @Prop() disabled: boolean;
  @Watch('value')
  valueHandler(n: string, o: string) {
    if (n !== o && this.el) {
      let val = n === null && n === undefined ? '' : n.toString();
      this.el.value = val;
      this.textValue = val;
    }
  }

  slotName: string = randomString();

  @State()
  textValue: string = '';

  @Prop()
  el = (() => {
    let value = this.value ? this.value.toString() : '';

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

    textarea.style.setProperty('height', '100%', 'important');
    textarea.style.setProperty('box-sizing', 'content-box', 'important');
    this.host.prepend(textarea);
    return textarea;
  })();

  componentDidRender() {
    if (this.el && this.el.parentElement === null) {
      this.host.prepend(this.el);
    }
  }

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

    this.textValue = this.value;

    dummyHandler.bind(this)({
      excludeAttribute: ['value', 'rows', 'cols'],
      moveIdToSlotElement: true,
      excludeStyle: ['border', 'margin', 'padding', 'max', 'min', 'width', 'height'],
      mirrorStyle: (hostCss: CSSStyleDeclaration) => {
        this.el.style.setProperty('border-radius', hostCss['border-radius'], 'important');
        this.el.style.setProperty('min-height', hostCss['min-height'], 'important');
        // make text input fill the host

        let padding = [
          hostCss['padding-top'],
          hostCss['padding-right'],
          hostCss['padding-bottom'],
          hostCss['padding-left']
        ];

        this.el.style.setProperty('padding', hostCss['padding'], 'important');
        this.el.style.setProperty('margin',
          padding.map(p => {
            return `-${p}`;
          }).join(' '), 'important');
      }
    });

    // dispatch mounted event when finished loading
    this.host.dispatchEvent(new CustomEvent('mounted'));
  }

  render() {
    return (
      <Host disabled={this.disabled}>
        <div class='shell'>
          <slot name={this.slotName} onSlotchange={() => this.componentDidRender()}>
          </slot>
          <div class='text-value' text-value={this.textValue + ' '}>
            <div>
              <slot></slot>
            </div>
          </div>
        </div>
      </Host>
    );
  }
}

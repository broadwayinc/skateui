import { Component, Host, h, Element, Prop, Watch, Listen } from '@stencil/core'; //Method, 
import { dummyHandler, randomString } from '../../utils/utils';
@Component({
  tag: 'sui-input',
  styleUrl: 'sui-input.css',
  shadow: true,
})
export class SuiInput {
  observer: MutationObserver;
  @Element() host: HTMLElement;
  @Prop() value: any;
  @Prop() disabled: boolean = false;
  @Prop({ mutable: true }) checked: boolean | null = false;
  @Prop() required: boolean = false;
  @Prop() type: string = 'text';
  @Watch('type')
  typeHandler(n: any) {
    if (n === 'reset' || n === 'submit') this.inputType = 'button';
    else if (n === 'checkbox' || n === 'radio') this.inputType = 'checker';
    else this.inputType = 'input';
  }

  availableTypes: string[] = [
    // checker
    'checkbox',
    'radio',
    // text
    'text',
    'password',
    'email',
    'number',
    'search',
    'tel',
    'url',
    // buttons
    'reset',
    'submit'
  ];

  slotName: string = randomString();
  inputType: 'button' | 'checker' | 'input' = 'input';

  @Prop()
  checkedDefault = this.checked;

  dispatchClick = () => {
    this.el.dispatchEvent(new MouseEvent('click', { bubbles: false }));
  };

  hasLabelParent = (() => {
    // prevents doubble event caused by label click
    return this.host.closest('label');
  })();

  @Listen('click')
  clickEventHandler(e: Event) {
    if (this.disabled) {
      return;
    }

    if (!(e.target instanceof HTMLInputElement)) {
      if (this.inputType === 'button') {
        this.host.parentElement.insertBefore(this.el, this.host);
        this.el.click();
        this.el.remove();
      }
      else if (this.inputType === 'checker' && !this.hasLabelParent) {
        this.dispatchClick();
      }
    }
  }

  @Listen('keypress')
  keyEventHandler(e: KeyboardEvent) {
    if (this.disabled) {
      return;
    }

    if (this.inputType === 'input') {
      return;
    }
    if (!(e.target instanceof HTMLInputElement)) {
      let key = e.key.toLowerCase();
      if (key === 'enter' || key === ' ') {
        e.preventDefault();
        if (this.inputType === 'button') {
          this.host.parentElement.insertBefore(this.el, this.host);
          this.el.click();
          this.el.remove();
        }
        else if (this.inputType === 'checker') {
          this.dispatchClick();
        }
      }
    }
  }

  @Prop()
  el = (() => {
    // add input element manually because shadow dom input is not recognized by forms
    if (this.type === 'reset' || this.type === 'submit') this.inputType = 'button';
    else if (this.type === 'checkbox' || this.type === 'radio') this.inputType = 'checker';
    else this.inputType = 'input';

    // create new element
    const input = document.createElement('input');

    // setup new slot name
    // slot name is to prevent users adding custom elements
    input.setAttribute('slot', this.slotName);

    // if (this.type && !this.availableTypes.includes(this.type)) {
    //   // type customization is not available (yet)
    //   this.host.prepend(input);
    //   return input;
    // }
    
    if (this.inputType === 'button') {
      // hidden
      input.setAttribute('hidden', '');
      if (this.type === 'reset') {
        input.addEventListener('click', () => {
          // manual reset for checked type inputs
          let form = this.host.closest('form');
          let radios = form.querySelectorAll('sui-input[type="radio"]');
          radios.forEach((el: any) => {
            el.checked = el.checkedDefault;
          });
          let checkbox = form.querySelectorAll('sui-input[type="checkbox"]');
          checkbox.forEach((el: any) => {
            el.checked = el.checkedDefault;
          });
        });
      }
      return input;
    }

    else if (this.inputType === 'checker') {
      // hidden
      input.setAttribute('hidden', '');
      input.addEventListener('change', e => {
        this.checked = (e.target as HTMLInputElement).checked;
        // keep track of checked, update dom
        if (this.type === 'radio') {
          // triggers only on checked, since radio button can't uncheck from user input
          let radios = document.getElementsByName((e.target as HTMLInputElement).name);
          for (let i = 0; i < radios.length; i++) {
            if (
              (radios[i] instanceof HTMLInputElement) &&
              radios[i].getAttribute('type') === 'radio' &&
              !radios[i].isSameNode(input)
            ) {
              // radios[i].parentElement.removeAttribute('checked');
              (radios[i].parentElement as any).checked = false;
            }
          }
        }
      });
    }

    return input;
  })();

  componentDidRender() {
    if (this.el && this.el.parentElement === null && this.inputType !== 'button') {
      this.host.prepend(this.el);
    }
  }

  dummyHandle;
  componentDidLoad() {
    this.dummyHandle = dummyHandler.bind(this)({
      // bounceEvents: this.inputType === 'checker' ? ['blur', 'change', 'focus', 'invalid', 'input'] : null,
      excludeStyle: ['border', 'margin', 'padding', 'max', 'min', 'width', 'height'],
      mirrorStyle: this.inputType === 'input' ? (hostCss: CSSStyleDeclaration) => {
        this.el.style.setProperty('border-radius', hostCss['border-radius'], 'important');

        for (const [key, value] of Object.entries({
          // set important styles
          // these value should not be editable
          'box-sizing': 'border-box',
          'display': 'block',
          'font-size': 'inherit',
          'line-height': 'inherit'
        })) {
          this.el.style.setProperty(key, value, 'important');
        }

        // make text input fill the host

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

      } : null,
      excludeAttribute: ['tabindex', 'aria-role'],
      moveIdToSlotElement: this.inputType !== 'button'
    });

    this.host.dispatchEvent(new CustomEvent('mounted'));
  }

  // disconnectedCallback() {
  //   if (this.observer) {
  //     this.observer.disconnect();
  //   }
  // }

  render() {
    return (
      <Host tabindex={this.inputType === 'input' ? null : this.disabled ? null : '0'} aria-role='input' disabled={this.disabled} required={this.required} value={this.value} type={this.type && this.availableTypes.includes(this.type) ? this.type : 'text'} checked={this.checked}>
        <svg version="1.1" x="0px" y="0px" viewBox="0 0 24 24" fill="currentColor">
          <polygon points="9.32,19.57 2.22,12.48 4.91,9.79 9.32,14.2 19.09,4.43 21.78,7.11     " />
        </svg>
        <slot name={this.slotName} onSlotchange={() => { this.componentDidRender(); /* this.dummyHandle.init(); */ }}></slot>
        <span button-text={this.inputType === 'button' ? true : null}>
          {this.inputType === 'button' ? this.value || (this.type === 'submit' ? 'Submit' : 'Reset') : ''}
        </span>
      </Host>
    );
  }
}

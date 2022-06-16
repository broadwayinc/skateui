import { Component, h, Element, State, Listen, Prop, Host } from '@stencil/core';
import { getElementAttributes } from '../../utils/utils';

@Component({
  tag: 'sui-button',
  styleUrl: 'sui-button.scss',
  shadow: true,
})
export class SuiButton {
  @Element() host: HTMLElement;
  @State() form: HTMLFormElement = null;
  @State() button = document.createElement('button');
  @State() properties: Record<string,any>;
  @State() focus: boolean = false;

  @Prop({reflect: true}) disabled: any = null;

  componentWillRender() {
    this.host.tabIndex = 0;
  }

  @Listen('click')
  click(e) {
    if(this.disabled !== null) {
      e.stopImmediatePropagation();
    } else {
      if(this.form) {
        if(this.properties.type === 'reset') {
          this.form.reset();
        } else {
          let formAttrs = {
            formaction: 'action', 
            formenctype: 'encoding', 
            formmethod: 'method', 
            formtarget: 'target',
            formnovalidate: 'noValidate'
          }
          for (const attr in formAttrs) {
            if(this.properties[attr]) {
              this.form[formAttrs[attr]] = this.properties[attr];
            }
          }

          this.form.submit();
        }
      }
    }
  }

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }

  componentDidLoad() {
    this.properties = getElementAttributes(this.host.attributes);
    this.disabled = 'disabled' in this.properties ? true : null;
    if(this.properties.role) {
      this.host.setAttribute("role", this.properties.role);
    } else {
      this.host.setAttribute("role", 'button');
    }
    if(this.properties.form) {
      let form = document.getElementById(this.properties.form);
      if(form instanceof HTMLFormElement) {
        this.form = form;
      }
    } else {
      this.form = this.host.closest('form');
    }

    if('autofocus' in this.properties && this.disabled === null) {
      this.host.focus();
    }
  }
}
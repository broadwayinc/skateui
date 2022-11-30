export declare class SuiNav {
  host: HTMLElement;
  autoHide: number;
  navCss: CSSStyleDeclaration;
  parent: HTMLElement | Window;
  scrollOffset: number;
  topOffset: number;
  offsetProp: string;
  componentWillLoad(): void;
  disconnectedCallback(): void;
  componentDidLoad(): void;
  calcNavbarPosition: any;
  render(): any;
}

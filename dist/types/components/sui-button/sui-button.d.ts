export declare class SuiButton {
  observer: MutationObserver;
  host: HTMLElement;
  isFormButton: HTMLFormElement;
  el: HTMLButtonElement & {
    hidden: boolean;
  };
  clickEventHandler(): void;
  keyEventHandler(e: any): void;
  componentDidLoad(): void;
  disconnectedCallback(): void;
  render(): any;
}

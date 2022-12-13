export declare class SuiInput {
  value: any;
  host: HTMLElement;
  valueHandler(n: string, o: string): void;
  availableTypes: string[];
  observer: MutationObserver;
  slotName: string;
  isChecker: boolean;
  isButton: boolean;
  el: HTMLInputElement;
  componentDidLoad(): void;
  disconnectedCallback(): void;
  render(): any;
}

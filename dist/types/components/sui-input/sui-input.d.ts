export declare class SuiInput {
  host: HTMLElement;
  value: any;
  availableTypes: string[];
  observer: MutationObserver;
  slotName: string;
  isChecker: boolean;
  isButton: boolean;
  dummyElement: HTMLInputElement;
  componentDidLoad(): void;
  disconnectedCallback(): void;
  render(): any;
}

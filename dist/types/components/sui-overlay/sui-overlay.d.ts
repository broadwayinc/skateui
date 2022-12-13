export declare class SuiOverlay {
  host: HTMLElement;
  position: string;
  transitionTime: string;
  overlayId: any;
  componentWillLoad(): void;
  createScreen(): HTMLDivElement;
  close(): Promise<void>;
  open(): Promise<unknown>;
  disconnectedCallback(): void;
  render(): any;
}

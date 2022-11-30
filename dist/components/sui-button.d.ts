import type { Components, JSX } from "../types/components";

interface SuiButton extends Components.SuiButton, HTMLElement {}
export const SuiButton: {
  prototype: SuiButton;
  new (): SuiButton;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;

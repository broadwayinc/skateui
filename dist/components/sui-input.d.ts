import type { Components, JSX } from "../types/components";

interface SuiInput extends Components.SuiInput, HTMLElement {}
export const SuiInput: {
  prototype: SuiInput;
  new (): SuiInput;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;

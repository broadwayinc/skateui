import type { Components, JSX } from "../types/components";

interface SuiSelect extends Components.SuiSelect, HTMLElement {}
export const SuiSelect: {
  prototype: SuiSelect;
  new (): SuiSelect;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;

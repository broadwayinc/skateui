import type { Components, JSX } from "../types/components";

interface SuiFlextext extends Components.SuiFlextext, HTMLElement {}
export const SuiFlextext: {
  prototype: SuiFlextext;
  new (): SuiFlextext;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;

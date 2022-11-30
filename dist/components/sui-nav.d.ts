import type { Components, JSX } from "../types/components";

interface SuiNav extends Components.SuiNav, HTMLElement {}
export const SuiNav: {
  prototype: SuiNav;
  new (): SuiNav;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;

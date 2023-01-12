/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
export namespace Components {
    interface SuiButton {
    }
    interface SuiFlextext {
        "maxSize": number;
        "minSize": number;
    }
    interface SuiInput {
        "el": HTMLInputElement;
        "value": any;
    }
    interface SuiNav {
        "autoHide": number;
    }
    interface SuiOverlay {
        "close": (cb?: () => any) => Promise<void>;
        "open": (cb?: () => any) => Promise<unknown>;
        "position": string;
        "transitionTime": string;
    }
    interface SuiSelect {
        "el": HTMLSelectElement;
        "value": any;
    }
    interface SuiTooltip {
    }
}
declare global {
    interface HTMLSuiButtonElement extends Components.SuiButton, HTMLStencilElement {
    }
    var HTMLSuiButtonElement: {
        prototype: HTMLSuiButtonElement;
        new (): HTMLSuiButtonElement;
    };
    interface HTMLSuiFlextextElement extends Components.SuiFlextext, HTMLStencilElement {
    }
    var HTMLSuiFlextextElement: {
        prototype: HTMLSuiFlextextElement;
        new (): HTMLSuiFlextextElement;
    };
    interface HTMLSuiInputElement extends Components.SuiInput, HTMLStencilElement {
    }
    var HTMLSuiInputElement: {
        prototype: HTMLSuiInputElement;
        new (): HTMLSuiInputElement;
    };
    interface HTMLSuiNavElement extends Components.SuiNav, HTMLStencilElement {
    }
    var HTMLSuiNavElement: {
        prototype: HTMLSuiNavElement;
        new (): HTMLSuiNavElement;
    };
    interface HTMLSuiOverlayElement extends Components.SuiOverlay, HTMLStencilElement {
    }
    var HTMLSuiOverlayElement: {
        prototype: HTMLSuiOverlayElement;
        new (): HTMLSuiOverlayElement;
    };
    interface HTMLSuiSelectElement extends Components.SuiSelect, HTMLStencilElement {
    }
    var HTMLSuiSelectElement: {
        prototype: HTMLSuiSelectElement;
        new (): HTMLSuiSelectElement;
    };
    interface HTMLSuiTooltipElement extends Components.SuiTooltip, HTMLStencilElement {
    }
    var HTMLSuiTooltipElement: {
        prototype: HTMLSuiTooltipElement;
        new (): HTMLSuiTooltipElement;
    };
    interface HTMLElementTagNameMap {
        "sui-button": HTMLSuiButtonElement;
        "sui-flextext": HTMLSuiFlextextElement;
        "sui-input": HTMLSuiInputElement;
        "sui-nav": HTMLSuiNavElement;
        "sui-overlay": HTMLSuiOverlayElement;
        "sui-select": HTMLSuiSelectElement;
        "sui-tooltip": HTMLSuiTooltipElement;
    }
}
declare namespace LocalJSX {
    interface SuiButton {
    }
    interface SuiFlextext {
        "maxSize"?: number;
        "minSize"?: number;
    }
    interface SuiInput {
        "el"?: HTMLInputElement;
        "value"?: any;
    }
    interface SuiNav {
        "autoHide"?: number;
    }
    interface SuiOverlay {
        "position"?: string;
        "transitionTime"?: string;
    }
    interface SuiSelect {
        "el"?: HTMLSelectElement;
        "value"?: any;
    }
    interface SuiTooltip {
    }
    interface IntrinsicElements {
        "sui-button": SuiButton;
        "sui-flextext": SuiFlextext;
        "sui-input": SuiInput;
        "sui-nav": SuiNav;
        "sui-overlay": SuiOverlay;
        "sui-select": SuiSelect;
        "sui-tooltip": SuiTooltip;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "sui-button": LocalJSX.SuiButton & JSXBase.HTMLAttributes<HTMLSuiButtonElement>;
            "sui-flextext": LocalJSX.SuiFlextext & JSXBase.HTMLAttributes<HTMLSuiFlextextElement>;
            "sui-input": LocalJSX.SuiInput & JSXBase.HTMLAttributes<HTMLSuiInputElement>;
            "sui-nav": LocalJSX.SuiNav & JSXBase.HTMLAttributes<HTMLSuiNavElement>;
            "sui-overlay": LocalJSX.SuiOverlay & JSXBase.HTMLAttributes<HTMLSuiOverlayElement>;
            "sui-select": LocalJSX.SuiSelect & JSXBase.HTMLAttributes<HTMLSuiSelectElement>;
            "sui-tooltip": LocalJSX.SuiTooltip & JSXBase.HTMLAttributes<HTMLSuiTooltipElement>;
        }
    }
}

export declare function cloneEvents(el: any): void;
export declare function format(first: string, middle: string, last: string): string;
export declare function getElementAttributes(nodeMap: NamedNodeMap): {};
export declare function randomString(length?: number): string;
export declare function dummyHandler(options: {
  computedStyle?: CSSStyleDeclaration;
  appendIdToSlotElement?: boolean;
  excludeAttribute: string[];
  copyStyle?: string[] | ((css: CSSStyleDeclaration) => any);
  excludeStyle?: string[];
  trackNodes?: boolean | ((n: MutationRecord) => any);
  log?: boolean | ((l: {
    attributeName: string;
    newValue?: string;
    oldValue?: string;
    mutationRecord?: MutationRecord;
  }) => any);
}): CSSStyleDeclaration;

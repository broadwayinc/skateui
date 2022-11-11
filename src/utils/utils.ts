export function format(first: string, middle: string, last: string): string {
  return (first || '') + (middle ? ` ${middle}` : '') + (last ? ` ${last}` : '');
}

export function getElementAttributes(nodeMap: NamedNodeMap) {
  if (nodeMap) {
    const length = nodeMap.length;
    return Object.keys(nodeMap).reduce((props, current) => {
      try {
        const numCurrent = parseInt(current);
        if (numCurrent <= length) {
          const property = nodeMap[current];
          return {
            ...props,
            [property.name]: property.value,
          };
        }
      } catch (err) { }
    }, {});
  }
  return {};
}

export function dummyHandler(trackNodes?: boolean | ((n: MutationRecord) => any)) {
  const setFocusOutline = (() => {
    const f = () => {
      // make host focusable
      let forOutlineColor = getComputedStyle(this.host).backgroundColor;
      if (forOutlineColor === 'rgba(0, 0, 0, 0)') {
        forOutlineColor = getComputedStyle(this.host).color;
      }

      // save outline color
      this.host.style.setProperty('--sui-focus-outline-color', forOutlineColor);
    };

    // executes on init, return function to be reusable
    f();
    return f;
  })();

  const setDummyAttribute = (attName: string, val: string) => {
    if (attName !== 'hidden') {
      // skip 'hidden'
      this.dummyElement.setAttribute(attName, val);
    }
  };

  const hostAttributes = getElementAttributes(this.host.attributes);

  for (let attName in hostAttributes) {
    setDummyAttribute(attName, hostAttributes[attName]);
    if (attName === 'autofocus') {
      // auto focus
      this.host.focus();
    }
  }

  this.observer = new MutationObserver((mutations) => {
    for (let m of mutations) {

      let attributeName = m.attributeName;
      if(!attributeName && trackNodes) {
        if(typeof trackNodes === 'function') {
          trackNodes(m);
        }
        continue;
      }

      let newValue = (m.target as HTMLElement).getAttribute(attributeName);
      let oldValue = m.oldValue;
      
      if (newValue === oldValue) {
        // skip same values
        continue;
      }

      // ! do not change the order of execution below !

      setFocusOutline();
      if (newValue === null) {
        // attribute is removed
        this.dummyElement.removeAttribute(attributeName);
        continue;
      }

      setDummyAttribute(attributeName, newValue);
    }
  });

  this.observer.observe(this.host, {
    attributes: true,
    attributeOldValue: true,
    childList: !!trackNodes
  });

}
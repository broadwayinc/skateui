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

export function randomString(length = 5) {
  // set random slot name to prevent users adding elements to the slot
  let result = '';
  let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export function dummyHandler(options: {
  computedStyle?: CSSStyleDeclaration;
  appendIdToSlotElement?: boolean;
  excludeAttribute: string[];
  copyStyle?: string[] | ((css: CSSStyleDeclaration) => any);
  excludeStyle?: string[];
  trackNodes?: boolean | ((n: MutationRecord) => any);
  log?: boolean | ((l: { attributeName: string; newValue?: string; oldValue?: string; mutationRecord?: MutationRecord; }) => any);
}): CSSStyleDeclaration {
  const { excludeStyle = [], computedStyle = null, excludeAttribute = [], trackNodes = null, log = false, copyStyle = null, appendIdToSlotElement = false } = options;
  const hostStyle = computedStyle || getComputedStyle(this.host);

  const setDummyAttribute = (attName: string, val: string) => {
    const copyStyleBypass = [];

    if (attName === 'style') {
      let styleProps = val.split(';');
      for (let s of styleProps) {
        if (!s) {
          continue;
        }
        let keyVal = s.split(':');
        let val = keyVal[1].split('!');
        if (!excludeStyle.includes(keyVal[0]) && CSS.supports(keyVal[0], val[0])) {
          this.dummyElement.style.setProperty(keyVal[0], val[0], val[1] || null);

          if (Array.isArray(copyStyle) && copyStyle.includes(keyVal[0])) {
            // add to style copy bypass list
            copyStyleBypass.push(keyVal[0]);
          }
        }
      }
    }

    else if (attName !== 'hidden' && attName !== 'class' && attName !== 'id' && !(excludeAttribute || []).includes(attName)) {
      // skip 'hidden' | 'class' | 'id' | excluded list
      this.dummyElement.setAttribute(attName, val);
    }

    if (copyStyle) {
      if (typeof copyStyle === 'function') {
        copyStyle(hostStyle);
      }

      else {
        // copy css styles
        for (let s of copyStyle) {
          if (!copyStyleBypass.includes(s)) {
            if (CSS.supports(s, hostStyle[s])) {
              this.dummyElement.style.setProperty(s, hostStyle[s]);
            }
          }
        }
      }
    }
  };

  const hostAttributes = getElementAttributes(this.host.attributes);

  for (let attName in hostAttributes) {
    setDummyAttribute(attName, hostAttributes[attName]);

    if (attName === 'id' && appendIdToSlotElement) {
      this.dummyElement.setAttribute(attName, hostAttributes[attName]);
      this.host.removeAttribute(attName);
    }

    if (attName === 'autofocus') {
      // auto focus
      this.host.focus();
    }
  }

  this.observer = new MutationObserver((mutations) => {
    let logger = (l) => {
      if (!log) {
        return;
      }

      if (typeof log === 'boolean') {
        return console.log(l);
      }

      if (typeof log === 'function') {
        return log(l);
      }
    };

    for (let m of mutations) {
      let attributeName = m.attributeName;
      if (!attributeName && trackNodes) {
        if (typeof trackNodes === 'function') {
          logger({ attributeName, mutationRecord: m });
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
      logger({ attributeName, newValue, oldValue });
      // ! do not change the order of execution below !

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

  return hostStyle;
}
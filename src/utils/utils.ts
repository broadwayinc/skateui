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
          }
        }
      } catch (err) { }
    }, {});
  }
  return {};
}
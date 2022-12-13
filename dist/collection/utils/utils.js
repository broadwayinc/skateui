export function cloneEvents(el) {
  const eventList = [
    'abort',
    'animationend',
    'animationiteration',
    'animationstart',
    'auxclick',
    'beforecopy',
    'beforecut',
    'beforeinput',
    'beforematch',
    'beforepaste',
    'beforexrselect',
    'blur',
    'cancel',
    'canplay',
    'canplaythrough',
    'change',
    'click',
    'close',
    'contextlost',
    'contextmenu',
    'contextrestored',
    'copy',
    'cuechange',
    'cut',
    'dblclick',
    'drag',
    'dragend',
    'dragenter',
    'dragleave',
    'dragover',
    'dragstart',
    'drop',
    'durationchange',
    'emptied',
    'ended',
    'error',
    'focus',
    'formdata',
    'fullscreenchange',
    'fullscreenerror',
    'gotpointercapture',
    'input',
    'invalid',
    'keydown',
    'keypress',
    'keyup',
    'load',
    'loadeddata',
    'loadedmetadata',
    'loadstart',
    'lostpointercapture',
    'mousedown',
    'mouseenter',
    'mouseleave',
    'mousemove',
    'mouseout',
    'mouseover',
    'mouseup',
    'mousewheel',
    'paste',
    'pause',
    'play',
    'playing',
    'pointercancel',
    'pointerdown',
    'pointerenter',
    'pointerleave',
    'pointermove',
    'pointerout',
    'pointerover',
    'pointerrawupdate',
    'pointerup',
    'progress',
    'ratechange',
    'reset',
    'resize',
    'scroll',
    'search',
    'securitypolicyviolation',
    'seeked',
    'seeking',
    'select',
    'selectionchange',
    'selectstart',
    'slotchange',
    'stalled',
    'submit',
    'suspend',
    'timeupdate',
    'toggle',
    'transitioncancel',
    'transitionend',
    'transitionrun',
    'transitionstart',
    'volumechange',
    'waiting',
    'webkitanimationend',
    'webkitanimationiteration',
    'webkitanimationstart',
    'webkitfullscreenchange',
    'webkitfullscreenerror',
    'webkittransitionend',
    'wheel'
  ];
  for (let name of eventList) {
    el.addEventListener(name, ev => {
      if (!ev.bubbles) {
        // re dispatch unbubbled events
        ev.stopPropagation();
        // let new_ev = new ev.constructor(ev.type, ev);
        let new_ev = new Event(ev.type, {
          bubbles: true
        });
        el.dispatchEvent(new_ev);
      }
    });
  }
}
export function format(first, middle, last) {
  return (first || '') + (middle ? ` ${middle}` : '') + (last ? ` ${last}` : '');
}
export function getElementAttributes(nodeMap) {
  if (nodeMap) {
    const length = nodeMap.length;
    return Object.keys(nodeMap).reduce((props, current) => {
      try {
        const numCurrent = parseInt(current);
        if (numCurrent <= length) {
          const property = nodeMap[current];
          return Object.assign(Object.assign({}, props), { [property.name]: property.value });
        }
      }
      catch (err) { }
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
export function dummyHandler(options) {
  const { excludeStyle = [], computedStyle = null, excludeAttribute = [], trackNodes = false, log = false, copyStyle = null, appendIdToSlotElement = false } = options;
  const hostStyle = computedStyle || getComputedStyle(this.host);
  excludeStyle.push(...['display', 'position', 'width', 'height', 'min-width', 'min-height', 'max-width', 'max-height', 'font']);
  const setDummyAttribute = (attName, val) => {
    const copyStyleBypass = [];
    if (attName === 'style') {
      let styleProps = val.split(';');
      for (let s of styleProps) {
        if (!s) {
          continue;
        }
        let keyVal = s.split(':');
        let val = keyVal[1].split('!');
        if (!excludeStyle.includes(keyVal[0]) && (() => {
          // exclude related styles ex) border-xxxx
          for (let e of excludeStyle) {
            if (e.includes(keyVal[0] + '-')) {
              return false;
            }
          }
          return true;
        })() && CSS.supports(keyVal[0], val[0])) {
          this.el.style.setProperty(keyVal[0], val[0], val[1] || null);
          if (Array.isArray(copyStyle) && copyStyle.includes(keyVal[0])) {
            // add to style copy bypass list
            copyStyleBypass.push(keyVal[0]);
          }
        }
      }
    }
    else if (attName !== 'hidden' && attName !== 'class' && attName !== 'id' && !excludeAttribute.includes(attName)) {
      // skip 'hidden' | 'class' | 'id' | excluded list
      this.el.setAttribute(attName, val);
      // attribute update callback
      if (typeof options.attCallback === 'function') {
        options.attCallback(attName, val);
      }
    }
    if (copyStyle) {
      if (typeof copyStyle === 'function') {
        copyStyle(hostStyle);
      }
      else {
        // copy css styles
        for (let s of copyStyle) {
          if (!copyStyleBypass.includes(s)) {
            if (!excludeStyle.includes(s) && (() => {
              // exclude related styles ex) border-xxxx
              for (let e of excludeStyle) {
                if (e.includes(s + '-')) {
                  return false;
                }
              }
              return true;
            })() && CSS.supports(s, hostStyle[s])) {
              this.el.style.setProperty(s, hostStyle[s]);
            }
          }
        }
      }
    }
  };
  const hostAttributes = getElementAttributes(this.host.attributes);
  for (let attName in hostAttributes) {
    if (attName.substring(0, 2) !== 'on') {
      setDummyAttribute(attName, hostAttributes[attName]);
    }
    if (attName === 'id' && appendIdToSlotElement) {
      this.el.setAttribute(attName, hostAttributes[attName]);
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
      let newValue = m.target.getAttribute(attributeName);
      let oldValue = m.oldValue;
      if (newValue === oldValue) {
        // skip same values
        continue;
      }
      logger({ attributeName, newValue, oldValue });
      // ! do not change the order of execution below !
      if (newValue === null) {
        // attribute is removed
        this.el.removeAttribute(attributeName);
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

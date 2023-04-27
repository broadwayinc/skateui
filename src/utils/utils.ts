export const eventList = [
  // 'abort'
  // ,
  // 'animationend'
  // ,
  // 'animationiteration'
  // ,
  // 'animationstart'
  // ,
  // 'auxclick'
  // ,
  'beforecopy'
  ,
  'beforecut'
  ,
  'beforeinput'
  ,
  // 'beforematch'
  // ,
  'beforepaste'
  ,
  // 'beforexrselect'
  // ,
  'blur'
  ,
  // 'cancel'
  // ,
  // 'canplay'
  // ,
  // 'canplaythrough'
  // ,
  'change'
  ,
  'click'
  ,
  // 'close'
  // ,
  'contextlost'
  ,
  'contextmenu'
  ,
  'contextrestored'
  ,
  'copy'
  ,
  // 'cuechange'
  // ,
  'cut'
  ,
  'dblclick'
  ,
  'drag'
  ,
  'dragend'
  ,
  'dragenter'
  ,
  'dragleave'
  ,
  'dragover'
  ,
  'dragstart'
  ,
  'drop'
  ,
  // 'durationchange'
  // ,
  // 'emptied'
  // ,
  // 'ended'
  // ,
  // 'error'
  // ,
  'focus'
  ,
  // 'formdata'
  // ,
  // 'fullscreenchange'
  // ,
  // 'fullscreenerror'
  // ,
  // 'gotpointercapture'
  // ,
  'input'
  ,
  'invalid'
  ,
  'keydown'
  ,
  'keypress'
  ,
  'keyup'
  ,
  // 'load'
  // ,
  // 'loadeddata'
  // ,
  // 'loadedmetadata'
  // ,
  // 'loadstart'
  // ,
  // 'lostpointercapture'
  // ,
  'mousedown'
  ,
  // 'mouseenter'
  // ,
  // 'mouseleave'
  // ,
  'mousemove'
  ,
  'mouseout'
  ,
  'mouseover'
  ,
  'mouseup'
  ,
  'mousewheel'
  ,
  'paste'
  ,
  // 'pause'
  // ,
  // 'play'
  // ,
  // 'playing'
  // ,
  // 'pointercancel'
  // ,
  // 'pointerdown'
  // ,
  // 'pointerenter'
  // ,
  // 'pointerleave'
  // ,
  // 'pointermove'
  // ,
  // 'pointerout'
  // ,
  // 'pointerover'
  // ,
  // 'pointerrawupdate'
  // ,
  // 'pointerup'
  // ,
  // 'progress'
  // ,
  // 'ratechange'
  // ,
  'reset'
  ,
  // 'resize'
  // ,
  // 'scroll'
  // ,
  'search'
  ,
  // 'securitypolicyviolation'
  // ,
  // 'seeked'
  // ,
  // 'seeking'
  // ,
  'select'
  ,
  // 'selectionchange'
  // ,
  // 'selectstart'
  // ,
  // 'slotchange'
  // ,
  // 'stalled'
  // ,
  'submit'
  ,
  // 'suspend'
  // ,
  // 'timeupdate'
  // ,
  // 'toggle'
  // ,
  // 'transitioncancel'
  // ,
  // 'transitionend'
  // ,
  // 'transitionrun'
  // ,
  // 'transitionstart'
  // ,
  // 'volumechange'
  // ,
  // 'waiting'
  // ,
  // 'webkitanimationend'
  // ,
  // 'webkitanimationiteration'
  // ,
  // 'webkitanimationstart'
  // ,
  // 'webkitfullscreenchange'
  // ,
  // 'webkitfullscreenerror'
  // ,
  // 'webkittransitionend'
  // ,
  'wheel'
];

export function cloneEvents(
  el: HTMLElement,
  options?: {
    dispatchTo: HTMLElement,
    bypass?: string[],
    eventCallback?: { type: string; callback: (e: any) => any; };
  }) {
  // clone events to another element

  // callback
  let { dispatchTo, eventCallback = null, bypass = [] } = options || {};

  let cb = (ev: Event) => {
    let new_ev = new Event(ev.type);
    if (eventCallback && eventCallback.type === ev.type && typeof eventCallback.callback === 'function') {
      eventCallback.callback(new_ev);
    }
    dispatchTo.dispatchEvent(new_ev);
  };

  for (let name of eventList) {
    if (!bypass.includes(name)) {
      el.addEventListener(name, cb, { passive: name.includes('scroll') || name.includes('wheel') });
    }
  }
}

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

/**
 * 
 * Dummy handler copies all attribute to the hidden element.
 * It is useful when dealing with input elements in forms.
 */
export function dummyHandler(options: any | {
  moveIdToSlotElement?: boolean;
  excludeAttribute?: string[];
  mirrorStyle?: string[] | ((css: CSSStyleDeclaration) => any); // true mirrors all styles, use callback for fine tuning.
  excludeStyle?: string[]; // excludes certain styles on mirrorStyle = true(mirror all) and on style attributes.
  trackNodes?: boolean | ((n: MutationRecord) => any);
  log?: boolean | ((l: { attributeName: string; newValue?: string; oldValue?: string; mutationRecord?: MutationRecord; }) => any);
  mirrorEvents: boolean | string[] | Record<string, (e: Event) => any> | ((e: Event) => any);
  excludeEvents: string[];
  bounceEvents: boolean | string[] | Record<string, (e: Event) => any> | ((e: Event) => any);
} = {}): { init: (fullInit: boolean) => void; } {

  const {
    excludeStyle = [],
    excludeAttribute = [],
    trackNodes = false,
    log = false,
    mirrorStyle = null,
    moveIdToSlotElement = false,
    excludeEvents = [],
    bounceEvents = false,
    mirrorEvents = false
  } = options || {};

  excludeStyle.push(...['display', 'position', 'width', 'height', 'min-width', 'min-height', 'max-width', 'max-height', 'font', 'box-sizing']);

  const initEvents = () => {
    if (mirrorEvents) {
      // dispatch the host event to hidden this.el
      let iter = (Array.isArray(mirrorEvents) && mirrorEvents.length ? mirrorEvents : eventList);
      for (let name of iter) {
        let cb;
        if (typeof mirrorEvents === 'object' && Object.keys(mirrorEvents).length && !Array.isArray(mirrorEvents) && mirrorEvents.hasOwnProperty(name) && typeof mirrorEvents[name] === 'function') {
          cb = mirrorEvents[name];
        }
        if (!excludeEvents.includes(name)) {
          cb = cb || typeof mirrorEvents === 'function' ? mirrorEvents : (e: Event) => {
            this.el.dispatchEvent(new Event(e.type, {
              bubbles: false
            }));
          };
          this.host.addEventListener(name, cb, { passive: name.includes('scroll') || name.includes('wheel') });
        }
      }
    }

    if (bounceEvents) {
      // dispatch the host event to hidden this.el
      let iter = (Array.isArray(bounceEvents) && bounceEvents.length ? bounceEvents : eventList);

      for (let name of iter) {
        let cb;
        if (typeof bounceEvents === 'object' && Object.keys(bounceEvents).length && !Array.isArray(bounceEvents) && bounceEvents.hasOwnProperty(name) && typeof bounceEvents[name] === 'function') {
          cb = bounceEvents[name];
        }
        cb = cb || typeof bounceEvents === 'function' ? bounceEvents : (e: Event) => {
          if (!e.bubbles) {
            this.host.dispatchEvent(new Event(e.type, {
              bubbles: true
            }));
          }
        };
        this.el.addEventListener(name, cb);
      }
    }
  };

  const setDummyAttribute = (attName: string, val: string) => {
    if (attName !== 'hidden' && attName !== 'class' && attName !== 'id' && attName !== 'style' && !excludeAttribute.includes(attName)) {
      // skip settings 'hidden' | 'class' | 'id' | excluded attribute list
      this.el.setAttribute(attName, val);
    }

    if (mirrorStyle) {
      const mirrorStyleBypass = [];
      // mirror styling
      if (attName === 'style' && mirrorStyle === true) {
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

            if (Array.isArray(mirrorStyle) && mirrorStyle.includes(keyVal[0])) {
              // add to style copy bypass list
              mirrorStyleBypass.push(keyVal[0]);
            }
          }
        }
      }

      let hostStyle = getComputedStyle(this.host);
      if (typeof mirrorStyle === 'function') {
        // callback
        return mirrorStyle(hostStyle);
      }

      // copy css styles
      for (let s of mirrorStyle) {
        if (!mirrorStyleBypass.includes(s)) {
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
  };

  const observe = () => {
    this.observer = new MutationObserver((mutations) => {
      let logger = (l: any) => {
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
  };

  const init = (fullInit: boolean = false) => {
    if (fullInit) {
      initEvents();
    }

    // attribute setup on load
    const hostAttributes = getElementAttributes(this.host.attributes);

    for (let attName in hostAttributes) {
      if (attName.substring(0, 2) !== 'on') {
        // skip onevent attributes
        setDummyAttribute(attName, hostAttributes[attName]);
      }

      if (attName === 'id' && moveIdToSlotElement) {
        // move id attribute to this.el if allowed
        this.el.setAttribute(attName, hostAttributes[attName]);
        this.host.removeAttribute(attName);
      }

      if (attName === 'autofocus') {
        // auto focus on load
        this.host.focus();
      }
    }

    if (fullInit) {
      observe();
    }
  };

  init(true);
  return { init };
}
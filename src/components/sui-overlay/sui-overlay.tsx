import { Component, Host, h, Element, Prop, Method } from '@stencil/core';
import { randomString } from '../../utils/utils';

@Component({
  tag: 'sui-overlay',
  styleUrl: 'sui-overlay.scss',
  shadow: true
})
export class SuiOverlay {
  @Element() host: HTMLElement;
  @Prop() overlayColor: string = 'transparent';
  @Prop() contentPosition: string = 'center';
  @Prop() transitionTime: string = '0.5s';

  overlayId = null;
  createScreen() {
    const css = {
      base: {
        'z-index': '9999',
        display: 'flex',
        position: 'fixed',
        'flex-direction': 'column',
        top: '0',
        right: '0',
        bottom: '0',
        left: '0',
        'background-color': 'transparent',
        'overflow': 'hidden',
        'transition': `background-color ${this.transitionTime}`
      },
      center: {
        'justify-content': 'center'
      },
      top: {
        'justify-content': 'flex-start'
      },
      bottom: {
        'justify-content': 'flex-end'
      },
      right: {
        'justify-content': 'center',
        'align-items': 'flex-end'
      },
      left: {
        'justify-content': 'center',
        'align-items': 'flex-start'
      }
    };

    const screen = document.createElement('div');

    for (let k in css.base) {
      // append base css
      screen.style.setProperty(k, css.base[k]);
    }

    if (!css[this.contentPosition]) {
      this.contentPosition = 'center';
    }

    for (let k in css[this.contentPosition]) {
      // append positioning css
      screen.style.setProperty(k, css[this.contentPosition][k]);
    }

    screen.onclick = () => {
      // onclick event is triggered when overlay is clicked
      this.host.click();
    };

    if (this.host.hasAttribute('prevent-background-scroll')) {
      let val = this.host.getAttribute('prevent-background-scroll');
      try {
        val = JSON.parse(val);
      } catch (err) { }

      if (typeof val === 'string' || typeof val !== 'string' && val) {
        // prevents background scroll
        document.body.style.top = `-${window.scrollY}px`;
        document.body.style.position = 'fixed';
      }
    }

    // generate overlay id
    this.overlayId = randomString();
    screen.id = this.overlayId;

    return screen;
  }
  @Method()
  async close() {
    if (!this.overlayId) {
      // no overlay to close
      return;
    }

    // prevent user get thrown back to top
    if (document.body.style.position === 'fixed' && this.host.hasAttribute('prevent-background-scroll')) {
      let scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      window.scrollTo(0, parseInt(scrollY || '0') * -1);
    }

    const screen = document.getElementById(this.overlayId);
    const el = (screen.firstChild as HTMLElement);


    let revert = {
      bottom: {
        'bottom': ' -100%'
      },

      top: {
        'bottom': '100%'
      },

      right: {
        'left': '100%'
      },

      left: {
        'left': '-100%'
      }
    };

    for (let k in revert[this.contentPosition]) {
      el.style.setProperty(k, revert[this.contentPosition][k]);
    }

    screen.style.setProperty('background-color', 'transparent');

    let wait = 0;
    if (this.transitionTime.includes('ms')) {
      wait = Number(this.transitionTime.split(',')[0].replace('ms', ''));
    }
    else if (this.transitionTime.includes('s')) {
      wait = parseFloat(this.transitionTime.split(',')[0].replace('s', '')) * 1000;
    }

    let removeEl = () => {
      if (el.children.length) {
        let len = el.children.length;
        while (len--) {
          this.host.prepend(el.children[len]);
        }
      }
    };

    if (wait) {
      setTimeout(() => {
        removeEl();
        screen.remove();
      }, wait);
    }
    else {
      // close popup
      removeEl();
      screen.remove();
    }

    this.overlayId = null;
  }
  @Method()
  open() {
    return new Promise(res => {
      if (this.overlayId) {
        // overlay is already up
        return;
      }

      // create overlay
      const screen = this.createScreen();


      const el = document.createElement('div');
      if (this.host.children.length) {
        let len = this.host.children.length;
        while (len--) {
          el.prepend(this.host.children[len]);
        }
      }

      el.addEventListener('click', e => {
        e.stopPropagation();
      });

      const css = {
        base: {
          'overflow-y': 'auto',
          'overflow-x': 'hidden',
          'display': 'block',
          'position': 'relative',
          'max-height': '100%',
          'transition': `bottom ${this.transitionTime}, left ${this.transitionTime}`
        },

        bottom: {
          'border-bottom-left-radius': '0',
          'border-bottom-right-radius': '0',
          'bottom': ' -100%',
          'margin': '0 auto'
        },

        top: {
          'border-top-left-radius': '0',
          'border-top-right-radius': '0',
          'bottom': '100%',
          'margin': '0 auto'
        },

        right: {
          'border-top-right-radius': '0',
          'border-bottom-right-radius': '0',
          'left': '100%',
          'margin': '0'
        },

        left: {
          'border-top-left-radius': '0',
          'border-bottom-left-radius': '0',
          'left': '-100%',
          'margin': '0'
        },

        center: {
          'margin': 'auto'
        }
      };

      for (let k in css.base) {
        el.style.setProperty(k, css.base[k]);
      }

      for (let k in css[this.contentPosition]) {
        el.style.setProperty(k, css[this.contentPosition][k]);
      }

      screen.append(el);
      document.body.append(screen);

      window.requestAnimationFrame(() => {
        const matchByPosition = {
          'center': 'center',
          'bottom': 'up',
          'top': 'down',
          'right': 'left',
          'left': 'right'
        };
        let popDirection = matchByPosition[this.contentPosition];
        screen.style.setProperty('background-color', this.overlayColor);
        if (popDirection === 'up' || popDirection === 'down') {
          el.style.setProperty('bottom', '0');
        }
        else if (popDirection === 'left' || popDirection === 'right') {
          el.style.setProperty('left', '0');
        }
        res(null);
      });
    });
  }
  render() {
    return (
      <Host hidden>
        <slot></slot>
      </Host>
    );
  }
}

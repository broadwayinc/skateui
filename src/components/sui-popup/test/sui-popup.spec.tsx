import { newSpecPage } from '@stencil/core/testing';
import { SuiPopup } from '../sui-popup';

describe('sui-popup', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [SuiPopup],
      html: `<sui-popup></sui-popup>`,
    });
    expect(page.root).toEqualHtml(`
      <sui-popup>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </sui-popup>
    `);
  });
});

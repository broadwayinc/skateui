import { newSpecPage } from '@stencil/core/testing';
import { SuiOverlay } from '../sui-overlay';

describe('sui-overlay', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [SuiOverlay],
      html: `<sui-overlay></sui-overlay>`,
    });
    expect(page.root).toEqualHtml(`
      <sui-overlay>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </sui-overlay>
    `);
  });
});

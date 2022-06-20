import { newSpecPage } from '@stencil/core/testing';
import { SuiSticky } from '../sui-sticky';

describe('sui-sticky', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [SuiSticky],
      html: `<sui-sticky></sui-sticky>`,
    });
    expect(page.root).toEqualHtml(`
      <sui-sticky>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </sui-sticky>
    `);
  });
});

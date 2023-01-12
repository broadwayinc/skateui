import { newSpecPage } from '@stencil/core/testing';
import { SuiTooltip } from '../sui-tooltip';

describe('sui-tooltip', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [SuiTooltip],
      html: `<sui-tooltip></sui-tooltip>`,
    });
    expect(page.root).toEqualHtml(`
      <sui-tooltip>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </sui-tooltip>
    `);
  });
});

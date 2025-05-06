import { newSpecPage } from '@stencil/core/testing';
import { SuiButton } from '../sui-button';

describe('sui-button', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [SuiButton],
      html: `<sui-button></sui-button>`,
    });
    expect(page.root).toEqualHtml(`
      <sui-button>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </sui-button>
    `);
  });
});

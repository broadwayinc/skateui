import { newSpecPage } from '@stencil/core/testing';
import { SuiNav } from '../sui-nav';

describe('sui-nav', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [SuiNav],
      html: `<sui-nav></sui-nav>`,
    });
    expect(page.root).toEqualHtml(`
      <sui-nav>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </sui-nav>
    `);
  });
});

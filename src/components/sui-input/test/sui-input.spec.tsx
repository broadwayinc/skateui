import { newSpecPage } from '@stencil/core/testing';
import { SuiInput } from '../sui-input';

describe('sui-input', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [SuiInput],
      html: `<sui-input></sui-input>`,
    });
    expect(page.root).toEqualHtml(`
      <sui-input>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </sui-input>
    `);
  });
});

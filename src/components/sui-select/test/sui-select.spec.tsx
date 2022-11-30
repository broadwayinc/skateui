import { newSpecPage } from '@stencil/core/testing';
import { SuiSelect } from '../sui-select';

describe('sui-select', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [SuiSelect],
      html: `<sui-select></sui-select>`,
    });
    expect(page.root).toEqualHtml(`
      <sui-select>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </sui-select>
    `);
  });
});

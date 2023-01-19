import { newSpecPage } from '@stencil/core/testing';
import { SuiTextarea } from '../sui-textarea';

describe('sui-textarea', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [SuiTextarea],
      html: `<sui-textarea></sui-textarea>`,
    });
    expect(page.root).toEqualHtml(`
      <sui-textarea>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </sui-textarea>
    `);
  });
});

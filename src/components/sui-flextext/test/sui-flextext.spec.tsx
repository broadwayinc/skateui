import { newSpecPage } from '@stencil/core/testing';
import { SuiFlextext } from '../sui-flextext';

describe('sui-flextext', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [SuiFlextext],
      html: `<sui-flextext></sui-flextext>`,
    });
    expect(page.root).toEqualHtml(`
      <sui-flextext>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </sui-flextext>
    `);
  });
});

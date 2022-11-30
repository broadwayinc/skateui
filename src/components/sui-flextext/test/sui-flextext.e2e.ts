import { newE2EPage } from '@stencil/core/testing';

describe('sui-flextext', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<sui-flextext></sui-flextext>');

    const element = await page.find('sui-flextext');
    expect(element).toHaveClass('hydrated');
  });
});

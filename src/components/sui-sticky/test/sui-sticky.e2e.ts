import { newE2EPage } from '@stencil/core/testing';

describe('sui-sticky', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<sui-sticky></sui-sticky>');

    const element = await page.find('sui-sticky');
    expect(element).toHaveClass('hydrated');
  });
});

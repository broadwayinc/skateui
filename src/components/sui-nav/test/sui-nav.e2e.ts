import { newE2EPage } from '@stencil/core/testing';

describe('sui-nav', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<sui-nav></sui-nav>');

    const element = await page.find('sui-nav');
    expect(element).toHaveClass('hydrated');
  });
});

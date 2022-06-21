import { newE2EPage } from '@stencil/core/testing';

describe('sui-popup', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<sui-popup></sui-popup>');

    const element = await page.find('sui-popup');
    expect(element).toHaveClass('hydrated');
  });
});

import { newE2EPage } from '@stencil/core/testing';

describe('sui-tooltip', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<sui-tooltip></sui-tooltip>');

    const element = await page.find('sui-tooltip');
    expect(element).toHaveClass('hydrated');
  });
});

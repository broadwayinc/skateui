import { newE2EPage } from '@stencil/core/testing';

describe('sui-overlay', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<sui-overlay></sui-overlay>');

    const element = await page.find('sui-overlay');
    expect(element).toHaveClass('hydrated');
  });
});

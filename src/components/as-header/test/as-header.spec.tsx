import { newSpecPage } from '@stencil/core/testing';
import { AsHeader } from '../as-header';

describe('as-header', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [AsHeader],
      html: `<as-header></as-header>`,
    });
    expect(page.root).toEqualHtml(`
      <as-header>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </as-header>
    `);
  });
});

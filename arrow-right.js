import { getCSS } from './getCSS.js';

customElements.define(
  'arrow-right',
  class extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
    }

    async connectedCallback() {
      const styleUrl = this.getAttribute('styleUrl')?.split(/\s*,\s*/g) ?? [];
      this.shadowRoot.adoptedStyleSheets = await getCSS(
        './arrow.css',
        ...styleUrl
      );
      // To avoid the FOUC, content should be injected after style adoption.
      // When it may happens:
      // - Content it injected inside the constructor
      // - Content is injected before stylesheet adoption
      this.shadowRoot.innerHTML = getSVG();
    }
  }
);

function getSVG() {
  return `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
<path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
</svg>`;
}

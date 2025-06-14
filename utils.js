/**
 * Get CSS from one or more URLs.
 * @param urls {string[]} One or more stylesheet URLs
 * @returns {Promise<CSSStyleSheet[]>} A fulfilled promise of loaded stylesheet(s)
 */
export async function getCSS(...urls) {
  if (!urls.length) return [];

  return Promise.allSettled(
    urls.map((url) =>
      import(url, { with: { type: 'css' } }).then((m) => m.default)
    )
  ).then((result) =>
    result
      .filter((p) => {
        if (p.status === 'fulfilled') return true;
        console.error(p.reason);
        return false;
      })
      .map((p) => p.value)
  );
}

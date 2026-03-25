function loadFragment(placeholderId, url) {
  const container = document.getElementById(placeholderId);
  if (!container) {
    return Promise.resolve();
  }

  return fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Failed to load fragment: ${url}`);
      }
      return response.text();
    })
    .then(html => {
      container.innerHTML = html;
    });
}

document.addEventListener('DOMContentLoaded', () => {
  Promise.all([
    loadFragment('header-placeholder', 'partials/header.html'),
    loadFragment('footer-placeholder', 'partials/footer.html'),
    loadFragment('sitemap-placeholder', 'partials/sitemap.html'),
  ])
    .then(() => {
      // i18n must be (re-)initialized after fragments are injected
      // so data-i18n nodes inside header/footer/sitemap get translated.
      if (typeof initI18n === 'function') {
        initI18n();
      } else if (typeof translate === 'function') {
        translate();
      }
    })
    .catch(error => {
      console.error(error);
    });
});


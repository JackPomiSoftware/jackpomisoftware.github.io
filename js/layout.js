function loadFragment(placeholderId, url, callback) {
  const container = document.getElementById(placeholderId);
  if (!container) {
    return;
  }

  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Failed to load fragment: ${url}`);
      }
      return response.text();
    })
    .then(html => {
      container.innerHTML = html;
      if (typeof callback === 'function') {
        callback();
      }
    })
    .catch(error => {
      console.error(error);
    });
}

document.addEventListener('DOMContentLoaded', () => {
  // Header: after it is loaded, re-run i18n so the language
  // switcher and header texts are properly wired and translated.
  loadFragment('header-placeholder', 'partials/header.html', () => {
    if (typeof initI18n === 'function') {
      initI18n();
    } else if (typeof translate === 'function') {
      translate();
    }
  });

  // Footer: just inject; its content uses data-i18n keys that
  // will be picked up by the next translate() call.
  loadFragment('footer-placeholder', 'partials/footer.html');
});


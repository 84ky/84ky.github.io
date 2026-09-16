// TEMA — il tema scuro resta il predefinito; la scelta segue l'utente tra le pagine.
(() => {
  const storageKey = 'michele-lorusso-theme';
  let theme = 'dark';

  try {
    const savedTheme = localStorage.getItem(storageKey);
    if (savedTheme === 'light' || savedTheme === 'dark') theme = savedTheme;
  } catch {
    // Il sito rimane utilizzabile anche quando il browser non espone lo storage.
  }

  document.documentElement.dataset.theme = theme;

  document.addEventListener('DOMContentLoaded', () => {
    const control = document.createElement('label');
    control.className = 'theme-switcher';
    control.innerHTML = `
      <span>Tema</span>
      <select aria-label="Scegli il tema">
        <option value="dark">Scuro</option>
        <option value="light">Bianco</option>
      </select>
    `;

    const select = control.querySelector('select');
    select.value = theme;
    select.addEventListener('change', () => {
      theme = select.value;
      document.documentElement.dataset.theme = theme;
      try {
        localStorage.setItem(storageKey, theme);
      } catch {
        // La selezione è comunque applicata alla pagina corrente.
      }
    });

    document.body.append(control);
  });
})();

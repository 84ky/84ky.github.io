// Applicato prima del CSS per evitare un lampo del tema predefinito.
(() => {
  let theme = 'dark';
  try {
    const saved = localStorage.getItem('portfolio-theme');
    if (['dark', 'light', 'nes'].includes(saved)) theme = saved;
  } catch {
    /* Il sito funziona anche senza accesso allo storage. */
  }
  document.documentElement.dataset.theme = theme;
})();

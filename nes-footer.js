// ============================================================================
// SCENA SOPRA IL FOOTER — visibile soltanto con il tema Super Mario / NES
// ============================================================================
// Ogni carattere rappresenta un pixel. Il punto è trasparente.
// Modifica le matrici per cambiare i personaggi, la palette per cambiarne i colori.
(() => {
  const palette = {
    R: '#e43b20', // Cappello e maglia
    B: '#704018', // Capelli e scarpe
    S: '#ffc384', // Pelle
    U: '#2563d8', // Salopette
    Y: '#ffdb70', // Bottoni
    K: '#241708', // Contorni e occhi
    W: '#fff8e7', // Occhi del Goomba
    G: '#b96927', // Fungo
  };

  const marioHead = [
    '.....RRRRR......',
    '....RRRRRRRRR...',
    '....BBBSSKS.....',
    '...BSBSSSKSSS...',
    '...BSBBSSSKSSS..',
    '....BSSSSKKKK...',
    '.....SSSSSS.....',
    '....RRURR.......',
    '...RRRURRURRR...',
    '..RRRRUUUURRR...',
    '..SSRUYUUYURSS..',
    '..SSSUUUUUUSSS..',
  ];

  const marioFrames = [
    [
      ...marioHead,
      '....UUUUUUUU....',
      '...UUU....UUU...',
      '..BBB......BBB..',
      '.BBBB......BBBB.',
    ],
    [
      ...marioHead,
      '....UUUUUUUU....',
      '......UUUU......',
      '.....BBBUB......',
      '.....BBBBBB.....',
    ],
  ];

  const goombaHead = [
    '......GGGG......',
    '.....GGGGGG.....',
    '....GGGGGGGG....',
    '...GGGGGGGGGG...',
    '..GGKKGGGGKKGG..',
    '.GGGGWKGGKWGGGG.',
    '.GGGGWKGGKWGGGG.',
    'GGGGGWWGGWWGGGGG',
    'GGGGGGGGGGGGGGGG',
    '.GGGGGKKKKGGGGG.',
    '..GGSSSSSSSSGG..',
    '....SSSSSSSS....',
    '...KKKSSSSKKK...',
  ];

  const goombaFrames = [
    [...goombaHead, '..KKKKK..KKKK...', '.KKKKKK..KKKK...', '................'],
    [...goombaHead, '...KKKK..KKKKK..', '...KKKK..KKKKKK.', '................'],
  ];

  // La scena precede il footer: il bordo dei mattoni è il pavimento.
  const footer = document.querySelector('footer');
  if (!footer) return;

  const scene = document.createElement('div');
  scene.className = 'nes-scene';
  const canvas = document.createElement('canvas');
  canvas.setAttribute('aria-hidden', 'true');
  const pauseButton = document.createElement('button');
  pauseButton.type = 'button';
  pauseButton.className = 'nes-scene-toggle';
  pauseButton.textContent = 'PAUSA ANIMAZIONE';
  pauseButton.setAttribute('aria-pressed', 'false');
  scene.append(canvas, pauseButton);
  footer.before(scene);

  const context = canvas.getContext('2d');
  if (!context) return;

  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  let paused = reducedMotion.matches;
  let visible = false;
  let frameId = null;
  let lastTime = null;
  let elapsed = 0;
  let width = 0;
  const height = 150;
  const pixelSize = 3;

  function drawSprite(rows, x, y, facingLeft = false) {
    context.save();
    context.translate(Math.round(x), Math.round(y));
    if (facingLeft) {
      context.translate(16 * pixelSize, 0);
      context.scale(-1, 1);
    }
    rows.forEach((row, rowIndex) => {
      [...row].forEach((color, columnIndex) => {
        if (!palette[color]) return;
        context.fillStyle = palette[color];
        context.fillRect(
          columnIndex * pixelSize,
          rowIndex * pixelSize,
          pixelSize,
          pixelSize,
        );
      });
    });
    context.restore();
  }

  function draw() {
    if (!width) return;
    context.clearRect(0, 0, width, height);
    const ground = height;
    const travel = Math.max(0, width - 80);
    // Un giro completo dura 12 secondi: andata, inversione e ritorno.
    const cycle = (elapsed / 6000) % 2;
    const headingLeft = cycle >= 1;
    const marioX = 16 + (headingLeft ? 2 - cycle : cycle) * travel;
    const goombaX =
      width / 2 - 24 + Math.sin(elapsed / 1800) * Math.min(65, width * 0.12);
    // Il salto segue la distanza dal Goomba, per scavalcarlo in entrambe le direzioni.
    const distance = Math.abs(marioX - goombaX);
    const jump = distance < 95 ? Math.sin(((1 - distance / 95) * Math.PI) / 2) * 68 : 0;
    const step = Math.floor(elapsed / 130) % 2;

    drawSprite(goombaFrames[step], goombaX, ground - 45);
    drawSprite(marioFrames[step], marioX, ground - 48 - jump, headingLeft);
  }

  function tick(time) {
    if (lastTime !== null) elapsed += Math.min(time - lastTime, 50);
    lastTime = time;
    draw();
    frameId = requestAnimationFrame(tick);
  }

  function updatePlayback() {
    if (frameId !== null) cancelAnimationFrame(frameId);
    frameId = null;
    lastTime = null;
    pauseButton.textContent = paused ? 'AVVIA ANIMAZIONE' : 'PAUSA ANIMAZIONE';
    pauseButton.setAttribute('aria-pressed', String(paused));
    draw();
    if (
      document.documentElement.dataset.theme === 'nes' &&
      visible &&
      !paused &&
      !document.hidden
    ) {
      frameId = requestAnimationFrame(tick);
    }
  }

  // Adatta il disegno anche agli schermi Retina senza sfocare i pixel.
  new ResizeObserver(() => {
    width = scene.clientWidth;
    const ratio = window.devicePixelRatio || 1;
    canvas.width = Math.round(width * ratio);
    canvas.height = Math.round(height * ratio);
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    context.imageSmoothingEnabled = false;
    draw();
  }).observe(scene);

  // Nessuna animazione in background o quando il footer è fuori dallo schermo.
  new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    updatePlayback();
  }).observe(scene);
  new MutationObserver(updatePlayback).observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-theme'],
  });
  document.addEventListener('visibilitychange', updatePlayback);
  reducedMotion.addEventListener('change', () => {
    paused = reducedMotion.matches;
    updatePlayback();
  });
  pauseButton.addEventListener('click', () => {
    paused = !paused;
    updatePlayback();
  });
  updatePlayback();
})();

export default function decorate(block) {
  // Gather children: expect picture/img first, then content
  const rows = [...block.children];

  // First row may be an image/picture
  let imageEl = null;
  let contentRows = rows;

  const firstPicture = rows[0]?.querySelector('picture, img');
  if (firstPicture && rows[0].children.length === 1) {
    imageEl = rows[0];
    contentRows = rows.slice(1);
  }

  block.innerHTML = '';

  // Image layer
  if (imageEl) {
    const imgWrap = document.createElement('div');
    imgWrap.className = 'hero-image';
    imgWrap.append(imageEl.querySelector('picture') || imageEl.querySelector('img'));
    block.append(imgWrap);

    const overlay = document.createElement('div');
    overlay.className = 'hero-overlay';
    block.append(overlay);
  }

  // Content layer
  const content = document.createElement('div');
  content.className = 'hero-content';

  const actions = document.createElement('div');
  actions.className = 'hero-actions';
  let hasActions = false;

  contentRows.forEach((row) => {
    [...row.children].forEach((cell) => {
      // Buttons go into actions div
      const buttons = cell.querySelectorAll('a.button, .button');
      if (buttons.length) {
        buttons.forEach((btn) => actions.append(btn));
        hasActions = true;
      } else {
        // Move non-button content directly
        [...cell.childNodes].forEach((node) => content.append(node));
      }
    });
  });

  if (hasActions) content.append(actions);

  block.append(content);
}

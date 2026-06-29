export default function decorate(block) {
  const rows = [...block.children];
  block.innerHTML = '';

  const content = document.createElement('div');
  content.className = 'cta-banner-content';

  const actions = document.createElement('div');
  actions.className = 'cta-banner-actions';
  let hasActions = false;

  rows.forEach((row) => {
    [...row.children].forEach((cell) => {
      const buttons = [...cell.querySelectorAll('a')].filter((a) => !a.closest('h2, h3, h4'));
      if (buttons.length) {
        buttons.forEach((btn) => {
          if (!btn.classList.contains('button')) btn.classList.add('button', 'primary');
          actions.append(btn);
        });
        hasActions = true;
      } else {
        [...cell.childNodes].forEach((n) => content.append(n));
      }
    });
  });

  block.append(content);
  if (hasActions) block.append(actions);
}

const ICONS = { info: 'ℹ️', warning: '⚠️', important: '🚨' };

export default function decorate(block) {
  const rows = [...block.children];
  block.innerHTML = '';

  const variant = [...block.classList].find((c) => ['warning', 'important'].includes(c)) || 'info';

  const icon = document.createElement('div');
  icon.className = 'callout-icon';
  icon.textContent = ICONS[variant];

  const content = document.createElement('div');
  content.className = 'callout-content';
  rows.forEach((row) => content.append(...row.childNodes));

  block.append(icon, content);
}

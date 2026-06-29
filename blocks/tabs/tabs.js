export default function decorate(block) {
  const rows = [...block.children];
  block.innerHTML = '';

  const nav = document.createElement('div');
  nav.className = 'tabs-nav';
  nav.setAttribute('role', 'tablist');

  const panels = [];

  rows.forEach((row, i) => {
    const cells = [...row.children];
    const label = cells[0]?.textContent.trim() || `Tab ${i + 1}`;
    const content = cells[1];

    const tabId = `tab-${i}`;
    const panelId = `panel-${i}`;

    const btn = document.createElement('button');
    btn.textContent = label;
    btn.setAttribute('role', 'tab');
    btn.setAttribute('aria-selected', i === 0 ? 'true' : 'false');
    btn.setAttribute('aria-controls', panelId);
    btn.id = tabId;

    const panel = document.createElement('div');
    panel.className = `tabs-panel${i === 0 ? ' active' : ''}`;
    panel.id = panelId;
    panel.setAttribute('role', 'tabpanel');
    panel.setAttribute('aria-labelledby', tabId);
    if (content) panel.append(...content.childNodes);

    btn.addEventListener('click', () => {
      nav.querySelectorAll('button').forEach((b) => b.setAttribute('aria-selected', 'false'));
      panels.forEach((p) => p.classList.remove('active'));
      btn.setAttribute('aria-selected', 'true');
      panel.classList.add('active');
    });

    nav.append(btn);
    panels.push(panel);
  });

  block.append(nav, ...panels);
}

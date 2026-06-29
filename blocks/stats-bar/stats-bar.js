export default function decorate(block) {
  const rows = [...block.children];
  block.innerHTML = '';

  const inner = document.createElement('div');
  inner.className = 'stats-bar-inner';

  rows.forEach((row) => {
    const cells = [...row.children];
    const item = document.createElement('div');
    item.className = 'stats-bar-item';

    if (cells[0]) {
      const value = document.createElement('div');
      value.className = 'stats-bar-value';
      value.textContent = cells[0].textContent.trim();
      item.append(value);
    }

    if (cells[1]) {
      const label = document.createElement('div');
      label.className = 'stats-bar-label';
      label.textContent = cells[1].textContent.trim();
      item.append(label);
    }

    if (cells[2]) {
      const ctx = document.createElement('div');
      ctx.className = 'stats-bar-context';
      ctx.textContent = cells[2].textContent.trim();
      item.append(ctx);
    }

    inner.append(item);
  });

  block.append(inner);
}

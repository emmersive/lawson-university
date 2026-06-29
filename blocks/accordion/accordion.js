export default function decorate(block) {
  const rows = [...block.children];
  block.innerHTML = '';

  rows.forEach((row, i) => {
    const cells = [...row.children];
    const question = cells[0]?.textContent.trim() || `Item ${i + 1}`;
    const answer = cells[1];

    const item = document.createElement('div');
    item.className = 'accordion-item';

    const id = `accordion-${i}`;

    const trigger = document.createElement('button');
    trigger.className = 'accordion-trigger';
    trigger.setAttribute('aria-expanded', 'false');
    trigger.setAttribute('aria-controls', id);
    trigger.innerHTML = `<span>${question}</span><span class="accordion-icon" aria-hidden="true"></span>`;

    const content = document.createElement('div');
    content.className = 'accordion-content';
    content.id = id;
    content.setAttribute('role', 'region');
    content.style.height = '0';

    const inner = document.createElement('div');
    inner.className = 'accordion-content-inner';
    if (answer) inner.append(...answer.childNodes);
    content.append(inner);

    trigger.addEventListener('click', () => {
      const expanded = trigger.getAttribute('aria-expanded') === 'true';
      trigger.setAttribute('aria-expanded', String(!expanded));
      content.style.height = expanded ? '0' : `${inner.scrollHeight}px`;
    });

    item.append(trigger, content);
    block.append(item);
  });
}

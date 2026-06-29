export default function decorate(block) {
  const rows = [...block.children];
  block.innerHTML = '';

  rows.forEach((row) => {
    const cells = [...row.children];
    const item = document.createElement('div');
    item.className = 'testimonial-item';

    // Quote text
    const quote = document.createElement('p');
    quote.className = 'testimonial-quote';
    quote.textContent = cells[0]?.textContent.trim() || '';

    // Author section
    const author = document.createElement('div');
    author.className = 'testimonial-author';

    const picture = cells[1]?.querySelector('picture');
    if (picture) {
      const avatarWrap = document.createElement('div');
      avatarWrap.className = 'testimonial-avatar';
      avatarWrap.append(picture);
      author.append(avatarWrap);
    }

    const meta = document.createElement('div');
    const nameLine = cells[2]?.textContent.trim() || '';
    const roleLine = cells[3]?.textContent.trim() || '';
    meta.innerHTML = `
      <div class="testimonial-name">${nameLine}</div>
      <div class="testimonial-role">${roleLine}</div>`;
    author.append(meta);

    item.append(quote, author);
    block.append(item);
  });
}

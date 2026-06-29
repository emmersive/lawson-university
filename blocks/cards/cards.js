export default function decorate(block) {
  const rows = [...block.children];
  block.innerHTML = '';

  rows.forEach((row) => {
    const card = document.createElement('div');
    card.className = 'cards-card';

    const cells = [...row.children];

    cells.forEach((cell, i) => {
      const picture = cell.querySelector('picture');
      if (i === 0 && picture) {
        // First cell with image = card image
        const imgWrap = document.createElement('div');
        imgWrap.className = 'cards-card-image';
        imgWrap.append(picture);
        card.append(imgWrap);
      } else {
        // Content cell
        const body = document.createElement('div');
        body.className = 'cards-card-body';
        body.append(...cell.childNodes);

        // Style buttons
        body.querySelectorAll('a').forEach((a) => {
          if (!a.closest('h1, h2, h3, h4')) {
            a.classList.add('button', 'secondary');
          }
        });

        card.append(body);
      }
    });

    block.append(card);
  });
}

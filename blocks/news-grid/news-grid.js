export default function decorate(block) {
  const rows = [...block.children];
  block.innerHTML = '';

  rows.forEach((row) => {
    const cells = [...row.children];
    const article = document.createElement('article');
    article.className = 'news-article';

    const picture = cells[0]?.querySelector('picture');
    if (picture) {
      const imgWrap = document.createElement('div');
      imgWrap.className = 'news-article-image';
      imgWrap.append(picture);
      article.append(imgWrap);
    }

    const body = document.createElement('div');
    body.className = 'news-article-body';

    // Meta: category + date from second cell
    const metaCell = picture ? cells[1] : cells[0];
    const contentCell = picture ? cells[2] : cells[1];

    if (metaCell) {
      const metaEl = document.createElement('div');
      metaEl.className = 'news-article-meta';
      const parts = metaCell.textContent.split('|').map((s) => s.trim());
      if (parts[0]) {
        const cat = document.createElement('span');
        cat.className = 'news-article-category';
        cat.textContent = parts[0];
        metaEl.append(cat);
      }
      if (parts[1]) {
        const date = document.createElement('span');
        date.className = 'news-article-date';
        date.textContent = parts[1];
        metaEl.append(date);
      }
      body.append(metaEl);
    }

    if (contentCell) {
      body.append(...contentCell.childNodes);
    }

    article.append(body);
    block.append(article);
  });
}

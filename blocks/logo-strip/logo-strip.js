export default function decorate(block) {
  const rows = [...block.children];
  block.innerHTML = '';

  // First row may be a label
  let startIdx = 0;
  const firstText = rows[0]?.textContent.trim();
  if (firstText && !rows[0]?.querySelector('picture, img')) {
    const label = document.createElement('p');
    label.className = 'logo-strip-label';
    label.textContent = firstText;
    block.append(label);
    startIdx = 1;
  }

  const track = document.createElement('div');
  track.className = 'logo-strip-track';

  rows.slice(startIdx).forEach((row) => {
    const item = document.createElement('div');
    item.className = 'logo-strip-item';
    const picture = row.querySelector('picture');
    const img = row.querySelector('img');
    const link = row.querySelector('a');
    if (picture) item.append(picture);
    else if (img) item.append(img);
    if (link && item.children.length) {
      link.innerHTML = '';
      link.append(...item.children);
      item.append(link);
    }
    track.append(item);
  });

  block.append(track);
}

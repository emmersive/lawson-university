export default function decorate(block) {
  const rows = [...block.children];
  // Each row becomes a columns container; each cell is a column
  rows.forEach((row) => {
    row.classList.add('columns-row');
    [...row.children].forEach((col) => col.classList.add('columns-col'));
  });
}

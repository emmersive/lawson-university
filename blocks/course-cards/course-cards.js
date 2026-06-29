const FILTERS = ['All', 'Undergraduate', 'Postgraduate', 'Online', 'Research'];

export default function decorate(block) {
  const rows = [...block.children];
  const courseData = rows.map((row) => {
    const cells = [...row.children];
    return {
      level: cells[0]?.textContent.trim() || '',
      title: cells[1]?.textContent.trim() || '',
      faculty: cells[2]?.textContent.trim() || '',
      duration: cells[3]?.textContent.trim() || '',
      intake: cells[4]?.textContent.trim() || '',
      description: cells[5]?.textContent.trim() || '',
      href: cells[6]?.querySelector('a')?.href || '#',
    };
  });

  block.innerHTML = '';

  // Filter bar
  const filterBar = document.createElement('div');
  filterBar.className = 'course-cards-filter';
  FILTERS.forEach((f) => {
    const btn = document.createElement('button');
    btn.textContent = f;
    if (f === 'All') btn.classList.add('active');
    btn.addEventListener('click', () => {
      filterBar.querySelectorAll('button').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      grid.querySelectorAll('.course-card').forEach((card) => {
        const match = f === 'All' || card.dataset.level === f.toLowerCase();
        card.style.display = match ? '' : 'none';
      });
    });
    filterBar.append(btn);
  });

  const grid = document.createElement('div');
  grid.className = 'course-cards-grid';

  courseData.forEach((course) => {
    if (!course.title) return;
    const card = document.createElement('div');
    card.className = 'course-card';
    card.dataset.level = course.level.toLowerCase();

    card.innerHTML = `
      <div class="course-card-top">
        <span class="course-card-level ${course.level.toLowerCase()}">${course.level}</span>
        <h3>${course.title}</h3>
        <p class="course-card-faculty">${course.faculty}</p>
      </div>
      <div class="course-card-body">
        <div class="course-card-meta">
          <div class="course-card-meta-item">
            <span class="course-card-meta-label">Duration</span>
            <span class="course-card-meta-value">${course.duration}</span>
          </div>
          <div class="course-card-meta-item">
            <span class="course-card-meta-label">Next Intake</span>
            <span class="course-card-meta-value">${course.intake}</span>
          </div>
        </div>
        <p class="course-card-desc">${course.description}</p>
        <a class="course-card-link" href="${course.href}">Learn more</a>
      </div>`;

    grid.append(card);
  });

  block.append(filterBar, grid);
}

const FOOTER_LINKS = {
  Study: [
    { label: 'Undergraduate', href: '/study/undergraduate' },
    { label: 'Postgraduate', href: '/study/postgraduate' },
    { label: 'Online Study', href: '/study/online' },
    { label: 'Scholarships', href: '/study/scholarships' },
    { label: 'How to Apply', href: '/apply' },
    { label: 'Key Dates', href: '/study/key-dates' },
  ],
  Research: [
    { label: 'Research Areas', href: '/research/areas' },
    { label: 'Research Centres', href: '/research/centres' },
    { label: 'Graduate Research', href: '/research/graduate' },
    { label: 'Industry Partnerships', href: '/research/partnerships' },
    { label: 'Publications', href: '/research/publications' },
  ],
  'About & Contact': [
    { label: 'Our Story', href: '/about/our-story' },
    { label: 'Leadership', href: '/about/leadership' },
    { label: 'Campus Map', href: '/about/campus-map' },
    { label: 'Contact Us', href: '/contact' },
    { label: 'Media Enquiries', href: '/about/media' },
    { label: 'Careers at Lawson', href: '/about/careers' },
  ],
};

export default async function decorate(block) {
  block.innerHTML = '';

  // Main footer grid
  const main = document.createElement('div');
  main.className = 'footer-main';

  // Brand column
  const brand = document.createElement('div');
  brand.className = 'footer-brand';
  brand.innerHTML = `
    <div class="logo-mark">L</div>
    <p class="footer-name">Lawson University</p>
    <p>Shaping futures through world-class education, research, and community engagement since 1965.</p>
    <p class="footer-address">
      1 University Drive, Clayton VIC 3800<br>
      Australia (fictitious)<br>
      +61 3 9000 0000
    </p>
    <div class="footer-social">
      <a href="#" aria-label="LinkedIn">in</a>
      <a href="#" aria-label="Facebook">f</a>
      <a href="#" aria-label="Instagram">ig</a>
      <a href="#" aria-label="YouTube">yt</a>
      <a href="#" aria-label="Twitter/X">x</a>
    </div>`;

  main.append(brand);

  // Link columns
  Object.entries(FOOTER_LINKS).forEach(([heading, links]) => {
    const col = document.createElement('div');
    col.className = 'footer-links';
    col.innerHTML = `
      <h4>${heading}</h4>
      <ul>
        ${links.map((l) => `<li><a href="${l.href}">${l.label}</a></li>`).join('')}
      </ul>`;
    main.append(col);
  });

  // Acknowledgement of Country
  const ack = document.createElement('div');
  ack.className = 'footer-acknowledgement';
  ack.innerHTML = `Lawson University acknowledges the Traditional Custodians of the land on which our campuses stand, and we pay our respects to their Elders past, present and emerging.`;

  // Bottom bar
  const bottom = document.createElement('div');
  bottom.className = 'footer-bottom';
  bottom.innerHTML = `
    <p>© ${new Date().getFullYear()} Lawson University. All rights reserved. ABN 00 000 000 000</p>
    <nav class="footer-legal" aria-label="Legal">
      <a href="/legal/privacy">Privacy Policy</a>
      <a href="/legal/terms">Terms of Use</a>
      <a href="/legal/accessibility">Accessibility</a>
      <a href="/legal/copyright">Copyright</a>
    </nav>`;

  block.append(main, ack, bottom);
}

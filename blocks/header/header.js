import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

const NAV_ITEMS = [
  {
    label: 'Study',
    href: '/study',
    children: [
      { label: 'Undergraduate', href: '/study/undergraduate' },
      { label: 'Postgraduate', href: '/study/postgraduate' },
      { label: 'Online', href: '/study/online' },
      { label: 'Scholarships', href: '/study/scholarships' },
      { label: 'How to Apply', href: '/apply' },
    ],
  },
  {
    label: 'Research',
    href: '/research',
    children: [
      { label: 'Research Areas', href: '/research/areas' },
      { label: 'Research Centres', href: '/research/centres' },
      { label: 'Graduate Research', href: '/research/graduate' },
      { label: 'Industry Partnerships', href: '/research/partnerships' },
    ],
  },
  {
    label: 'Campus Life',
    href: '/campus-life',
    children: [
      { label: 'Student Support', href: '/campus-life/support' },
      { label: 'Accommodation', href: '/campus-life/accommodation' },
      { label: 'Sport & Fitness', href: '/campus-life/sport' },
      { label: 'Clubs & Societies', href: '/campus-life/clubs' },
    ],
  },
  {
    label: 'About',
    href: '/about',
    children: [
      { label: 'Our Story', href: '/about/our-story' },
      { label: 'Leadership', href: '/about/leadership' },
      { label: 'Rankings', href: '/about/rankings' },
      { label: 'Sustainability', href: '/about/sustainability' },
    ],
  },
  { label: 'News & Events', href: '/news' },
  { label: 'International', href: '/international' },
];

function buildLogo() {
  const logoEl = document.createElement('div');
  logoEl.className = 'header-logo';
  logoEl.innerHTML = `
    <a href="/" aria-label="Lawson University Home">
      <div class="logo-mark">L</div>
      <div class="logo-text">
        <span class="logo-name">Lawson University</span>
        <span class="logo-tagline">Shape Your Future</span>
      </div>
    </a>`;
  return logoEl;
}

function buildDesktopNav() {
  const nav = document.createElement('ul');
  nav.className = 'header-nav';
  nav.setAttribute('role', 'menubar');

  NAV_ITEMS.forEach((item) => {
    const li = document.createElement('li');
    li.setAttribute('role', 'none');
    li.innerHTML = `<a href="${item.href}" role="menuitem">${item.label}</a>`;

    if (item.children) {
      const dropdown = document.createElement('ul');
      dropdown.className = 'dropdown-menu';
      dropdown.setAttribute('role', 'menu');
      item.children.forEach((child) => {
        const childLi = document.createElement('li');
        childLi.setAttribute('role', 'none');
        childLi.innerHTML = `<a href="${child.href}" role="menuitem">${child.label}</a>`;
        dropdown.append(childLi);
      });
      li.append(dropdown);
    }

    nav.append(li);
  });

  return nav;
}

function buildMobileNav(toggleBtn) {
  const mobileNav = document.createElement('div');
  mobileNav.className = 'header-mobile-nav';
  mobileNav.setAttribute('aria-hidden', 'true');

  const ul = document.createElement('ul');
  NAV_ITEMS.forEach((item) => {
    const li = document.createElement('li');
    let html = `<a href="${item.href}">${item.label}</a>`;
    if (item.children) {
      html += `<ul class="sub-nav">${item.children.map((c) => `<li><a href="${c.href}">${c.label}</a></li>`).join('')}</ul>`;
    }
    li.innerHTML = html;
    ul.append(li);
  });

  const cta = document.createElement('div');
  cta.className = 'header-mobile-cta';
  cta.innerHTML = '<a href="/apply">Apply Now</a>';

  mobileNav.append(ul, cta);

  toggleBtn.addEventListener('click', () => {
    const open = toggleBtn.classList.toggle('open');
    mobileNav.classList.toggle('open', open);
    mobileNav.setAttribute('aria-hidden', String(!open));
    document.body.style.overflow = open ? 'hidden' : '';
  });

  return mobileNav;
}

export default async function decorate(block) {
  block.innerHTML = '';

  const inner = document.createElement('div');
  inner.className = 'header-inner';

  const logo = buildLogo();

  const desktopNav = buildDesktopNav();

  const cta = document.createElement('div');
  cta.className = 'header-cta';
  cta.innerHTML = '<a href="/apply">Apply Now</a>';

  const toggleBtn = document.createElement('button');
  toggleBtn.className = 'header-menu-toggle';
  toggleBtn.setAttribute('aria-label', 'Toggle navigation menu');
  toggleBtn.innerHTML = '<span></span><span></span><span></span>';

  const mobileNav = buildMobileNav(toggleBtn);

  inner.append(logo, desktopNav, cta, toggleBtn);
  block.append(inner, mobileNav);

  // Mark current page nav item
  const currentPath = window.location.pathname;
  block.querySelectorAll('.header-nav a').forEach((a) => {
    if (a.getAttribute('href') === currentPath) {
      a.closest('li')?.classList.add('active');
    }
  });
}

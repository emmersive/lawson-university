import {
  buildBlock,
  loadHeader,
  loadFooter,
  decorateButtons,
  decorateIcons,
  decorateSections,
  decorateBlocks,
  decorateTemplateAndTheme,
  waitForFirstImage,
  loadSection,
  loadSections,
  loadCSS,
  sampleRUM,
  loadScript,
} from './aem.js';

/**
 * Builds hero block automatically from first section if not already defined.
 */
function buildHeroBlock(main) {
  const h1 = main.querySelector('h1');
  const picture = main.querySelector('picture');
  if (h1 && picture && h1.closest('.section') === picture.closest('.section')) {
    const section = h1.closest('.section');
    const elems = [...section.children];
    if (!section.querySelector('.hero')) {
      const block = buildBlock('hero', { elems });
      section.prepend(block);
    }
  }
}

/**
 * Decorates the main element.
 */
function decorateMain(main) {
  decorateButtons(main);
  decorateIcons(main);
  buildHeroBlock(main);
  decorateSections(main);
  decorateBlocks(main);
}

/**
 * Loads everything needed to display the page content,
 * in the right order.
 */
async function loadPage() {
  await decorateTemplateAndTheme();
  const main = document.querySelector('main');
  if (main) {
    decorateMain(main);
    document.body.classList.add('appear');
    await loadSection(main.querySelector('.section'), waitForFirstImage);
  }

  sampleRUM('cwv');

  await Promise.all([
    loadHeader(document.querySelector('header')),
    loadFooter(document.querySelector('footer')),
  ]);

  if (main) {
    await loadSections(main);
  }

  await loadCSS(`${window.hlx.codeBasePath}/styles/lazy-styles.css`);
  loadDelayed();
}

function loadDelayed() {
  // eslint-disable-next-line import/no-cycle
  window.setTimeout(() => import('./delayed.js'), 3000);
}

loadPage();

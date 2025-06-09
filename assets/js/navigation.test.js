const { JSDOM } = require('jsdom');

describe('navigation menu', () => {
  let dom;
  let toggleBtn;
  let nav;

  beforeEach(() => {
    dom = new JSDOM(`<!DOCTYPE html>
      <button id="hamburger-nav-btn" aria-expanded="false"><span id="hamburger-label"></span></button>
      <span id="hamburger-nav-open-close"></span>
      <div id="nav-overlay" hidden></div>
      <nav id="main-nav"><a href="#">Link</a></nav>
    `, { runScripts: 'dangerously' });

    global.window = dom.window;
    global.document = dom.window.document;
    global.Node = dom.window.Node;

    jest.resetModules();
    require('./navigation');

    toggleBtn = document.getElementById('hamburger-nav-btn');
    nav = document.getElementById('main-nav');
  });

  afterEach(() => {
    delete global.window;
    delete global.document;
    delete global.Node;
  });

  test('clicking hamburger toggles nav open', () => {
    expect(nav.classList.contains('nav--open')).toBe(false);
    toggleBtn.dispatchEvent(new dom.window.Event('click'));
    expect(nav.classList.contains('nav--open')).toBe(true);
  });

  test('pressing Escape closes nav', () => {
    // open first
    toggleBtn.dispatchEvent(new dom.window.Event('click'));
    expect(nav.classList.contains('nav--open')).toBe(true);
    dom.window.document.dispatchEvent(new dom.window.KeyboardEvent('keydown', { key: 'Escape' }));
    expect(nav.classList.contains('nav--open')).toBe(false);
  });
});

/* Shared site chrome as custom elements — single source of truth for nav + footer.
   Usage:  <site-nav active="process"></site-nav>   <site-footer></site-footer>
   active ∈ home | about | process | clients | catalog */

const NAV_LINKS = [
  ['home', 'index.html', 'Home'],
  ['about', 'about.html', 'About Us'],
  ['process', 'process.html', 'Process'],
  ['clients', 'clients.html', 'Clients'],
  ['catalog', 'catalog.html', 'Catalog'],
];

class SiteNav extends HTMLElement {
  connectedCallback() {
    const active = this.getAttribute('active') || '';
    const overlay = this.getAttribute('variant') === 'overlay';
    const logoSrc = overlay ? 'assets/logo-white.svg' : 'assets/logo.svg';
    const links = NAV_LINKS.map(([id, href, label]) =>
      `<a href="${href}"${id === active ? ' aria-current="page"' : ''}>${label}</a>`
    ).join('\n        ');

    this.innerHTML = `
    <header class="nav${overlay ? ' nav--overlay' : ''}">
      <div class="container nav__inner">
        <a href="index.html" aria-label="Prospera Textil home">
          <img class="nav__logo" src="${logoSrc}" alt="Prospera Textil" />
        </a>
        <nav class="nav__links" id="navLinks">
        ${links}
        </nav>
        <a href="#footer" class="btn btn--dark nav__cta">Contact</a>
        <button class="nav__toggle" id="navToggle" aria-label="Toggle menu" aria-expanded="false">
          <span></span><span></span><span></span>
        </button>
      </div>
    </header>`;

    const toggle = this.querySelector('#navToggle');
    const linksEl = this.querySelector('#navLinks');
    toggle.addEventListener('click', () => {
      const open = linksEl.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
    });
    linksEl.querySelectorAll('a').forEach(a =>
      a.addEventListener('click', () => linksEl.classList.remove('is-open'))
    );
  }
}
customElements.define('site-nav', SiteNav);

class SiteFooter extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
    <footer class="footer" id="footer">
      <div class="container">
        <div class="footer__top">
          <div class="footer__logo-wrap">
            <img class="footer__logo" src="assets/footer-logo.svg" alt="Prospera Textil" />
          </div>

          <div class="footer__col">
            <h4>Contact</h4>
            <ul>
              <li>509 NW 72nd St, Miami, FL 33150</li>
              <li><a href="tel:014575560">01 457 5560</a></li>
              <li><a href="mailto:info@prosperatextil.com">info@prosperatextil.com</a></li>
            </ul>
          </div>

          <div class="footer__col">
            <h4>Navigation</h4>
            <ul>
              <li><a href="index.html">Home</a></li>
              <li><a href="about.html">About Us</a></li>
              <li><a href="clients.html">Clients</a></li>
            </ul>
          </div>

          <div class="footer__col">
            <h4>Legal</h4>
            <ul>
              <li><a href="#">Terms of Services</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </div>

          <img class="footer__emblem" src="assets/wrap-logo.svg" alt="WRAP Certified" />
        </div>

        <div class="footer__bottom">
          <p class="footer__copy">All rights reserved for Prospera Textil ® - Lima, Perú</p>
          <div class="footer__social">
            <a href="#" aria-label="Instagram"><img src="assets/instagram.svg" alt="Instagram" /></a>
            <a href="#" aria-label="LinkedIn"><img src="assets/linkedin.svg" alt="LinkedIn" /></a>
          </div>
        </div>
      </div>
    </footer>`;
  }
}
customElements.define('site-footer', SiteFooter);

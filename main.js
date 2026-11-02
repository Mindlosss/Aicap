// Header
const header = document.querySelector('.site-header');
const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 12);
addEventListener('scroll', onScroll, { passive: true });
onScroll();

const toggle = document.querySelector('.nav-toggle');
const navList = document.getElementById('nav-list');
const menuLabel = toggle.querySelector('[data-menu-label]');
const setMenu = open => {
  navList.classList.toggle('is-open', open);
  toggle.setAttribute('aria-expanded', open);
  menuLabel.textContent = open ? 'Cerrar menú' : 'Abrir menú';
};
toggle.addEventListener('click', () => setMenu(!navList.classList.contains('is-open')));
navList.addEventListener('click', e => { if (e.target.closest('a')) setMenu(false); });
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && navList.classList.contains('is-open')) { setMenu(false); toggle.focus(); }
});

const rows = [...document.querySelectorAll('.index-row')];
rows.forEach(row => {
  const btn = row.querySelector('button');
  btn.addEventListener('click', () => {
    const willOpen = !row.classList.contains('is-open');
    rows.forEach(r => {
      const open = r === row && willOpen;
      r.classList.toggle('is-open', open);
      r.querySelector('button').setAttribute('aria-expanded', open);
      r.querySelector('.index-body').hidden = !open;
    });
  });
});

document.querySelectorAll('[data-product]').forEach(a => a.addEventListener('click', () => {
  const box = document.querySelector(`.demo-form input[value="${a.dataset.product}"]`);
  if (box) box.checked = true;
}));

const form = document.querySelector('[data-demo-form]');
if (form) {
  const msg = form.querySelector('.form-msg');
  const fields = [...form.querySelectorAll('input[required]')];
  const isValid = input => input.value.trim() && (input.type !== 'email' || input.checkValidity());
  function showError(input, bad) {
    const err = document.getElementById(input.getAttribute('aria-describedby'));
    input.setAttribute('aria-invalid', bad);
    err.textContent = bad ? err.dataset.msg : '';
    err.hidden = !bad;
  }
  fields.forEach(input => input.addEventListener('input', () => {
    if (input.getAttribute('aria-invalid') === 'true' && isValid(input)) showError(input, false);
  }));
  form.addEventListener('submit', e => {
    e.preventDefault();
    const bad = fields.filter(input => !isValid(input));
    fields.forEach(input => showError(input, bad.includes(input)));
    if (bad.length) {
      msg.className = 'form-msg is-error';
      msg.textContent = bad.length === 1 ? 'Revisa el campo marcado para continuar.' : `Revisa los ${bad.length} campos marcados para continuar.`;
      bad[0].focus();
      return;
    }
    msg.className = 'form-msg is-ok';
    msg.textContent = 'Mensaje recibido. Te contactaremos a la brevedad.';
    form.reset();
  });
}

const navLinks = [...navList.querySelectorAll('a[href^="#"]:not(.btn)')];
const spySections = navLinks.map(a => document.querySelector(a.getAttribute('href')));
const onSpy = () => {
  const line = innerHeight * .4;
  let current = -1;
  spySections.forEach((s, i) => { if (s.getBoundingClientRect().top <= line) current = i; });
  const demo = document.getElementById('demo');
  if (demo && demo.getBoundingClientRect().top <= line) current = -1;
  navLinks.forEach((a, i) => i === current ? a.setAttribute('aria-current', 'location') : a.removeAttribute('aria-current'));
};
if (navLinks.length) {
  addEventListener('scroll', onSpy, { passive: true });
  addEventListener('resize', onSpy);
  onSpy();
}

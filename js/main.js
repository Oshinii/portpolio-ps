(function(){
  const navToggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.site-nav');
  const navLinks = document.querySelectorAll('.site-nav a');
  
  navToggle?.addEventListener('click', () => {
    const isOpen = nav.style.display === 'flex';
    nav.style.display = isOpen ? 'none' : 'flex';
    navToggle.setAttribute('aria-expanded', String(!isOpen));
  });

  // Smooth scroll for internal anchors
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const targetId = a.getAttribute('href');
      if(!targetId || targetId === '#') return;
      const el = document.querySelector(targetId);
      if(!el) return;
      e.preventDefault();
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      if(window.innerWidth < 640){ nav.style.display = 'none'; navToggle.setAttribute('aria-expanded','false'); }
    });
  });

  // Active section highlighting
  function updateActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 100;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      const navLink = document.querySelector(`.site-nav a[href="#${sectionId}"]`);

      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        navLinks.forEach(link => link.classList.remove('active'));
        if (navLink) navLink.classList.add('active');
      }
    });

    // Handle hero section (when at top)
    if (window.scrollY < 50) {
      navLinks.forEach(link => link.classList.remove('active'));
      const heroLink = document.querySelector('.site-nav a[href="#hero"]');
      if (heroLink) heroLink.classList.add('active');
    }
  }

  // Update active nav on scroll
  window.addEventListener('scroll', updateActiveNav);
  window.addEventListener('load', updateActiveNav);

  // Year in footer
  const y = document.getElementById('year');
  if(y){ y.textContent = String(new Date().getFullYear()); }
  
  // Academic year in footer
  const ay = document.getElementById('academic-year');
  if(ay){ 
    const currentYear = new Date().getFullYear();
    ay.textContent = `${currentYear}/${currentYear + 1}`;
  }
})();

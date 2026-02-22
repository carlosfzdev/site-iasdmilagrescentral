document.addEventListener('DOMContentLoaded', function(){
  var prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var toggle = document.getElementById('menu-alternar');
  var nav = document.getElementById('navegacao-site');

  if(toggle && nav){
    toggle.addEventListener('click', function(){
      var expanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', String(!expanded));
      nav.classList.toggle('aberto');
      
      if (!expanded) {
        setTimeout(function(){
          var first = nav.querySelector('a');
          if(first) first.focus();
        }, 150);
      }
    });

    toggle.addEventListener('keydown', function(e){
      if(e.key === 'Enter' || e.key === ' '){
        e.preventDefault();
        toggle.click();
      }
    });

    document.addEventListener('keydown', function(e){
      if(e.key === 'Escape' && nav.classList.contains('aberto')){
        nav.classList.remove('aberto');
        toggle.setAttribute('aria-expanded','false');
        toggle.focus();
      }
    });
  }

  var themeToggle = document.getElementById('tema-alternar');
  if (themeToggle) {
    const setTheme = (theme) => {
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem('theme', theme);
      themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
    };

    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const currentTheme = savedTheme || (prefersDark ? 'dark' : 'light');
    setTheme(currentTheme);

    themeToggle.addEventListener('click', () => {
      const newTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      setTheme(newTheme);
    });
  }

  try{
    var links = document.querySelectorAll('#navegacao-site a');
    links.forEach(function(a){
      if(a.href === location.href) a.classList.add('ativo');
    });
  }catch(e){}

  if('IntersectionObserver' in window && !prefersReduced){
    var reveals = document.querySelectorAll('.revelar');
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){
          var el = entry.target;
          var delay = parseInt(el.getAttribute('data-delay')||0,10);
          setTimeout(function(){
            el.classList.add('visivel');
          }, Math.max(0, delay));
          io.unobserve(el);
        }
      });
    }, {threshold: 0.12});
    reveals.forEach(function(r){ io.observe(r); });
  } else {
    document.querySelectorAll('.revelar').forEach(function(el){ el.classList.add('visivel'); });
  }

  if(!prefersReduced){
    var hero = document.querySelector('.destaque');
    var img = document.querySelector('.destaque-imagem.paralaxe');
    if(hero && img){
      hero.addEventListener('mousemove', function(e){
        var rect = hero.getBoundingClientRect();
        var x = (e.clientX - rect.left) / rect.width - 0.5;
        var y = (e.clientY - rect.top) / rect.height - 0.5;
        img.style.transform = 'translate3d(' + (x * 6) + 'px,' + (y * 6) + 'px,0) scale(1.02)';
      });
      hero.addEventListener('mouseleave', function(){
        img.style.transform = '';
      });
    }
  }

  document.addEventListener('click', function(e){
    var a = e.target.closest && e.target.closest('a[href^="#"]');
    if(a){
      var id = a.getAttribute('href');
      if(id.length > 1){
        var target = document.querySelector(id);
        if(target){
          e.preventDefault();
          target.scrollIntoView({behavior:'smooth', block:'start'});
        }
      }
    }
  });

  var logo = document.querySelector('.logo');
  if(logo && !prefersReduced){
    logo.classList.add('flutuar');
  }

  document.querySelectorAll('.cartao').forEach(function(card){
    card.addEventListener('keydown', function(e){
      if(e.key === 'Enter' || e.key === ' '){
        var link = card.getAttribute('href');
        if(link) window.location = link;
      }
    });
    card.setAttribute('tabindex','0');
  });

  const galleryImages = document.querySelectorAll('.galeria img');
  if (galleryImages.length > 0) {
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    document.body.appendChild(lightbox);

    const lightboxContent = document.createElement('img');
    lightbox.appendChild(lightboxContent);

    const closeBtn = document.createElement('span');
    closeBtn.className = 'fechar';
    closeBtn.innerHTML = '&times;';
    lightbox.appendChild(closeBtn);

    galleryImages.forEach(img => {
      img.style.cursor = 'pointer';
      img.addEventListener('click', () => {
        lightbox.classList.add('ativo');
        lightboxContent.src = img.src;
      });
    });

    const closeLightbox = () => {
      lightbox.classList.remove('ativo');
    };

    closeBtn.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightbox.classList.contains('ativo')) {
        closeLightbox();
      }
    });
  }
});

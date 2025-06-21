const scrollToTopBtn = document.getElementById('scrollToTopBtn');

// === Переключение темы (сохраняется в localStorage) ===
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  // Меняем иконку
  if (theme === 'dark') {
    themeIcon.innerHTML = '<path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 1 0 9.79 9.79z" stroke="currentColor" stroke-width="2" fill="none"/>';
  } else {
    themeIcon.innerHTML = '<circle cx="12" cy="12" r="5" stroke="currentColor" stroke-width="2"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="currentColor" stroke-width="2"/>';
  }
}
// === Синхронизация смены темы для мобильной и десктопной кнопки ===
const mobileThemeToggle = document.getElementById('mobileThemeToggle');
const mobileThemeIcon = document.getElementById('mobileThemeIcon');
const origSetTheme = setTheme;
function setThemeAll(theme) {
  origSetTheme(theme);
  // Синхронизировать иконку на мобильной кнопке
  if (mobileThemeIcon) {
    if (theme === 'dark') {
      mobileThemeIcon.innerHTML = '<path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 1 0 9.79 9.79z" stroke="white" stroke-width="2" fill="none"/>';
    } else {
      mobileThemeIcon.innerHTML = '<circle cx="12" cy="12" r="5" stroke="currentColor" stroke-width="2"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="currentColor" stroke-width="2"/>';
    }
  }
  // Синхронизировать иконку на десктопной кнопке
  if (themeIcon) {
    if (theme === 'dark') {
      themeIcon.innerHTML = '<path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 1 0 9.79 9.79z" stroke="white" stroke-width="2" fill="none"/>';
    } else {
      themeIcon.innerHTML = '<circle cx="12" cy="12" r="5" stroke="currentColor" stroke-width="2"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="currentColor" stroke-width="2"/>';
    }
  }
}
setTheme = setThemeAll;
// Инициализация темы для обеих кнопок
(function() {
  const saved = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  setThemeAll(saved || (prefersDark ? 'dark' : 'light'));
})();
if (mobileThemeToggle) {
  mobileThemeToggle.onclick = function() {
    const current = document.documentElement.getAttribute('data-theme');
    setThemeAll(current === 'dark' ? 'light' : 'dark');
  };
}
if (themeToggle) {
  themeToggle.onclick = function() {
    const current = document.documentElement.getAttribute('data-theme');
    setThemeAll(current === 'dark' ? 'light' : 'dark');
  };
}
// === Модальное окно портфолио ===
const modal = document.getElementById('portfolioModal');
const modalImg = document.getElementById('modalImg');
const modalTitle = document.getElementById('modalTitle');
const modalDescription = document.getElementById('modalDescription');
const modalLink = document.getElementById('modalLink');
const modalClose = document.getElementById('modalClose');
document.querySelectorAll('.portfolio-item').forEach(item => {
  item.addEventListener('click', () => {
    modalImg.src = item.dataset.img;
    modalTitle.textContent = item.dataset.title;
    modalDescription.innerHTML = item.dataset.description;
    modalLink.href = item.dataset.link;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    if (scrollToTopBtn) {
      scrollToTopBtn.classList.add('hidden-by-modal');
    }
  });
});
modalClose.onclick = closeModal;
modal.onclick = function(e) { if (e.target === modal) closeModal(); };
function closeModal() {
  modal.classList.remove('active');
  document.body.style.overflow = '';
  modalDescription.innerHTML = ''; // Очищаем описание при закрытии
  if (scrollToTopBtn) {
    scrollToTopBtn.classList.remove('hidden-by-modal');
  }
}
// === Форма контактов (валидация и имитация отправки) ===
const form = document.querySelector('.contacts-form');
const formStatus = document.getElementById('formStatus');
form.addEventListener('submit', function(e) {
  e.preventDefault();
  formStatus.textContent = 'Отправка...';
  setTimeout(() => {
    formStatus.textContent = 'Спасибо! Я свяжусь с вами в ближайшее время.';
    form.reset();
  }, 1200);
});
// === Мобильное меню Apple-style ===
const burgerBtn = document.getElementById('burgerBtn');
const mobileNav = document.getElementById('mobileNav');
const mobileNavClose = document.getElementById('mobileNavClose');
const mobileNavOverlay = document.getElementById('mobileNavOverlay');
const mobileNavLinks = mobileNav ? mobileNav.querySelectorAll('a') : [];
if (burgerBtn && mobileNav && mobileNavClose && mobileNavOverlay) {
  burgerBtn.onclick = function() {
    mobileNav.classList.add('active');
    mobileNavOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    document.body.classList.add('menu-open');
  };
  mobileNavClose.onclick = closeMobileNav;
  mobileNavOverlay.onclick = closeMobileNav;
  mobileNavLinks.forEach(link => link.onclick = closeMobileNav);
}
function closeMobileNav() {
  mobileNav.classList.remove('active');
  mobileNavOverlay.classList.remove('active');
  document.body.style.overflow = '';
  document.body.classList.remove('menu-open');
}
// === Кнопка "Вверх" ===
window.addEventListener('scroll', function() {
  if (window.scrollY > 200) {
    scrollToTopBtn.classList.add('visible');
  } else {
    scrollToTopBtn.classList.remove('visible');
  }
});
if (scrollToTopBtn) {
  scrollToTopBtn.onclick = function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
}

// === Анимация при скролле ===
document.addEventListener('DOMContentLoaded', () => {
  // --- Общая анимация появления ---
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
      }
    });
  }, { threshold: 0.1 });
  revealElements.forEach(el => revealObserver.observe(el));

  // --- Анимация "Битвы" ---
  const battleSection = document.querySelector('.code-vs-constructor');
  const battleTrigger = document.querySelector('.column.my-work');

  if (battleSection && battleTrigger) {
    const battleObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          battleSection.classList.add('battle-active');

          const explanationEl = battleSection.querySelector('.battle-explanation');
          if (explanationEl) {
            const isMobile = window.innerWidth <= 900;
            const textDelay = isMobile ? 700 : 23000;

            setTimeout(() => {
              typeWriter(explanationEl, [
                "Это не ошибка. Это — демонстрация предела.",
                "Так шаблоны (Tilda, WordPress) пасуют перед реальными задачами."
              ]);
            }, textDelay); // Динамическая задержка
          }

          observer.unobserve(battleTrigger); // Запускаем всё один раз
        }
      });
    }, { threshold: 0.3 });
    battleObserver.observe(battleTrigger);
  }

  function typeWriter(element, lines) {
    element.innerHTML = '';
    let lineIndex = 0;
    let charIndex = 0;
    let currentParagraph;

    function type() {
      if (lineIndex >= lines.length) return;

      if (charIndex === 0) {
        currentParagraph = document.createElement('p');
        element.appendChild(currentParagraph);
        if (lineIndex === 0) {
          currentParagraph.style.color = 'var(--color-accent)';
          currentParagraph.style.fontWeight = '600';
        }
        currentParagraph.classList.add('cursor');
      }

      const line = lines[lineIndex];
      currentParagraph.textContent = line.substring(0, charIndex + 1);
      charIndex++;

      if (charIndex < line.length) {
        setTimeout(type, 50); // Скорость печати
      } else {
        currentParagraph.classList.remove('cursor');
        lineIndex++;
        charIndex = 0;
        setTimeout(type, 700); // Пауза между строками
      }
    }
    type();
  }
}); 
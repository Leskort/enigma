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
  updateThemeColorMeta(theme);
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
  const theme = saved || (prefersDark ? 'dark' : 'light');
  setThemeAll(theme);
  updateThemeColorMeta(theme);
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
// === Модальное окно для описания технологий ===
const techModal = document.getElementById('techModal');
const techModalTitle = document.getElementById('techModalTitle');
const techModalDescription = document.getElementById('techModalDescription');
const techModalClose = document.getElementById('techModalClose');
const techModalIcon = document.getElementById('techModalIcon');

// Функция для открытия модального окна с деталями технологии
function openTechDetailsModal(slideElement) {
  techModalTitle.textContent = slideElement.dataset.title;
  techModalDescription.textContent = slideElement.dataset.description;

  const slideImg = slideElement.querySelector('img');
  if (slideImg) {
    techModalIcon.src = slideImg.src;
    techModalIcon.alt = slideImg.alt;
  }

  const techModalIconLink = document.getElementById('techModalIconLink');
  if (techModalIconLink) {
    techModalIconLink.href = slideElement.dataset.link || '#';
    techModalIconLink.target = '_blank';
    techModalIconLink.rel = 'noopener';
  }

  techModal.classList.add('active');
  document.body.style.overflow = 'hidden';
  if (scrollToTopBtn) {
    scrollToTopBtn.classList.add('hidden-by-modal');
  }
}

// Обновляем существующие обработчики для использования новой функции
document.querySelectorAll('.tech-stack-marquee .slide').forEach(slide => {
  slide.addEventListener('click', () => {
    openTechDetailsModal(slide);
  });
});

if (techModalClose) {
  techModalClose.onclick = closeTechModal;
}

if (techModal) {
  techModal.addEventListener('click', (e) => {
    if (e.target === techModal) closeTechModal();
  });
}

function closeTechModal() {
  if (techModal) {
    techModal.classList.remove('active');
  }
  document.body.style.overflow = '';
  if (scrollToTopBtn) {
    scrollToTopBtn.classList.remove('hidden-by-modal');
  }
}

// === Новое модальное окно для списка всех технологий ===
const showTechListBtn = document.getElementById('showTechListBtn');
const allTechModal = document.getElementById('allTechModal');
const allTechModalClose = document.getElementById('allTechModalClose');
const allTechList = document.getElementById('allTechList');

// Функция для открытия модального окна со всеми технологиями
function openAllTechModal() {
  if (window.innerWidth >= 1101) {
    return;
  }
  if (allTechModal) {
    allTechModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    if (scrollToTopBtn) {
      scrollToTopBtn.classList.add('hidden-by-modal');
    }
    populateAllTechList(); // Заполняем список при открытии
  }
}

// Функция для закрытия модального окна со всеми технологиями
function closeAllTechModal() {
  if (allTechModal) {
    allTechModal.classList.remove('active');
  }
  document.body.style.overflow = '';
  if (scrollToTopBtn) {
    scrollToTopBtn.classList.remove('hidden-by-modal');
  }
}

// Добавляем обработчик для кнопки в мобильном меню (теперь плавающей)
if (showTechListBtn) {
  showTechListBtn.addEventListener('click', (e) => {
    e.preventDefault(); // Предотвращаем переход по ссылке #
    openAllTechModal();
  });
}

// Добавляем обработчики для закрытия модального окна со всеми технологиями
if (allTechModalClose) {
  allTechModalClose.addEventListener('click', closeAllTechModal);
}
if (allTechModal) {
  allTechModal.addEventListener('click', (e) => {
    if (e.target === allTechModal) closeAllTechModal();
  });
}

// Функция для заполнения списка всех технологий
function populateAllTechList() {
  if (!allTechList) return;

  allTechList.innerHTML = ''; // Очищаем предыдущее содержимое

  const techSlides = document.querySelectorAll('.tech-stack-marquee .slide');
  techSlides.forEach(slide => {
    const techItem = document.createElement('div');
    techItem.classList.add('all-tech-item');

    const img = document.createElement('img');
    img.src = slide.querySelector('img').src;
    img.alt = slide.querySelector('img').alt;

    const span = document.createElement('span');
    span.textContent = slide.dataset.title;

    techItem.appendChild(img);
    techItem.appendChild(span);

    techItem.addEventListener('click', () => {
      openTechDetailsModal(slide); // Открываем детальное модальное окно для выбранной технологии
      closeAllTechModal(); // Закрываем модальное окно со списком технологий
    });

    allTechList.appendChild(techItem);
  });
}

// === Показать/скрыть плавающую кнопку технологий при прокрутке ===
// const showTechFloatBtn = () => { // Удалено
//   if (window.innerWidth <= 1100 && !allTechModal.classList.contains('active')) { // Удалено
//     techFloatBtn.classList.add('show'); // Удалено
//   } else { // Удалено
//     techFloatBtn.classList.remove('show'); // Удалено
//   } // Удалено
// }; // Удалено

// if (techFloatBtn) { // Удалено
//   window.addEventListener('scroll', showTechFloatBtn); // Удалено
//   window.addEventListener('resize', showTechFloatBtn); // Удалено
//   // Инициализация видимости кнопки при загрузке страницы // Удалено
//   showTechFloatBtn(); // Удалено
// }

// === Форма контактов (валидация и имитация отправки) ===
// const form = document.querySelector('.contacts-form');
// const formStatus = document.getElementById('formStatus');
// form.addEventListener('submit', function(e) {
//   e.preventDefault();
//   formStatus.textContent = 'Отправка...';
//   setTimeout(() => {
//     formStatus.textContent = 'Спасибо! Я свяжусь с вами в ближайшее время.';
//     form.reset();
//   }, 1200);
// });

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

  // --- Анимация технологического стека (бегущая строка) ---
  const techStackMarquee = document.querySelector('.tech-stack-marquee');
  if (techStackMarquee) {
    const marqueeObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-marquee');
        }
      });
    }, { threshold: 0.2 }); // Запуск анимации, когда 20% элемента видно
    marqueeObserver.observe(techStackMarquee);
  }

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
            const isMobile = window.innerWidth <= 1100;
            const textDelay = isMobile ? 700 : 23000;

            setTimeout(() => {
              typeWriter(explanationEl, [
                "Это не ошибка. Это — демонстрация предела.",
                "Так шаблоны (Tilda, WordPress) пасуют перед реальными задачами."
              ]);
            }, textDelay); // Динамическая задержка
          }

          const isMobile = window.innerWidth <= 1100;
          if (isMobile) {
            // На мобильных — сразу центрируем победителя
            battleSection.classList.add('battle-won');
            setTimeout(() => {
              const loser = battleSection.querySelector('.column.constructor');
              const vs = battleSection.querySelector('.comparison-vs');
              if (loser) loser.classList.add('hide');
              if (vs) vs.classList.add('hide');
            }, 2000);
          } else {
            // На десктопе — только через задержку
            setTimeout(() => {
              battleSection.classList.add('battle-won');
              setTimeout(() => {
                const loser = battleSection.querySelector('.column.constructor');
                const vs = battleSection.querySelector('.comparison-vs');
                if (loser) loser.classList.add('hide');
                if (vs) vs.classList.add('hide');
              }, 2000);
            }, 23200);
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

  // 1. Функция сброса состояния секции
  function resetBattleSection() {
    battleSection.classList.remove('battle-active', 'battle-won');
    const loser = battleSection.querySelector('.column.constructor');
    const vs = battleSection.querySelector('.comparison-vs');
    if (loser) loser.classList.remove('hide');
    if (vs) vs.classList.remove('hide');
  }

  function isSectionInViewport(section) {
    const rect = section.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
    );
  }

  function isTelegramWebView() {
    return /Telegram/i.test(navigator.userAgent);
  }

  document.querySelectorAll('a[href="#code-vs-constructor"]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const section = document.getElementById('code-vs-constructor');
      if (isTelegramWebView()) {
        section.scrollIntoView({ behavior: 'smooth' });
      } else {
        const yOffset = -150;
        const y = section.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    });
  });

  if (/Telegram/i.test(navigator.userAgent)) {
    const style = document.createElement('style');
    style.innerHTML = `
      .comparison-container, .column {
        will-change: auto !important;
        box-shadow: none !important;
      }
    `;
    document.head.appendChild(style);
  }

  if (/Telegram/i.test(navigator.userAgent)) {
    const style = document.createElement('style');
    style.innerHTML = `
      @media (max-width: 1100px) {
        .code-vs-constructor,
        .comparison-container,
        .column,
        .column.my-work {
          background: transparent !important;
          border-radius: 0 !important;
          box-shadow: none !important;
          border: none !important;
        }
        .code-vs-constructor {
          background: #232326 !important; /* или твой основной фон */
        }
      }
    `;
    document.head.appendChild(style);
  }
});

function updateThemeColorMeta(theme) {
  let color = theme === 'dark' ? '#1D1D1F' : '#FFFFFF';
  let meta = document.querySelector('meta[name="theme-color"]');
  if (meta) {
    meta.setAttribute('content', color);
  }
  
  let metaDark = document.querySelector('meta[name="theme-color"][media]');
  if (metaDark) {
    metaDark.setAttribute('content', '#1D1D1F');
  }
}

// === Отправка формы в Telegram ===
document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('tg');
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();

      if (!this.checkValidity()) {
        this.classList.add('was-validated');
        return;
      }

      const data = {
        name: this.name.value,
        email: this.email.value,
        message: this.message.value
      };

      fetch('/.netlify/functions/send-tg', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
      .then(res => res.json())
      .then(res => {
        if (res.success) {
          document.getElementById('formStatus').textContent = 'Спасибо! Ваша заявка отправлена в Telegram.';
          this.reset();
          this.classList.remove('was-validated');
        } else {
          document.getElementById('formStatus').textContent = 'Ошибка отправки. Попробуйте позже.';
        }
      })
      .catch(() => {
        document.getElementById('formStatus').textContent = 'Ошибка отправки. Попробуйте позже.';
      });
    });
  }
}); 
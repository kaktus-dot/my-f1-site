// ===== ВКЛАДКИ (TABS) =====
// Знаходимо всі кнопки-вкладки і всі секції
const tabs = document.querySelectorAll('.nav-tab');
const sections = document.querySelectorAll('.tab-content');

// Функція перемикання вкладки (викликається також кнопкою "Дізнатись більше")
function switchTab(tabName) {
  // Знімаємо активний клас з усіх вкладок і секцій
  tabs.forEach(t => t.classList.remove('active'));
  sections.forEach(s => s.classList.remove('active'));

  // Додаємо активний клас до потрібної вкладки
  const activeTab = document.querySelector(`[data-tab="${tabName}"]`);
  const activeSection = document.getElementById(`tab-${tabName}`);

  if (activeTab) activeTab.classList.add('active');
  if (activeSection) {
    activeSection.classList.add('active');
    // Анімація смужок навичок при відкритті вкладки "stats"
    if (tabName === 'stats') animateSkillBars();
    // Анімація лічильників при відкритті "home"
    if (tabName === 'home') animateCounters();
  }

  // Закриваємо мобільне меню після кліку
  navLinks.classList.remove('open');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Вішаємо обробники кліків на всі вкладки
tabs.forEach(tab => {
  tab.addEventListener('click', function(e) {
    e.preventDefault();
    switchTab(this.dataset.tab);
  });
});


// ===== МОБІЛЬНЕ МЕНЮ (BURGER) =====
const burger = document.getElementById('burger');
const navLinks = document.querySelector('.nav-links');

burger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});


// ===== АНІМАЦІЯ ЛІЧИЛЬНИКІВ НА ГОЛОВНІЙ =====
function animateCounter(id, target, duration) {
  const el = document.getElementById(id);
  if (!el) return;
  let start = 0;
  const step = target / (duration / 16); // ~60fps
  const timer = setInterval(() => {
    start += step;
    if (start >= target) {
      el.textContent = target;
      clearInterval(timer);
    } else {
      el.textContent = Math.floor(start);
    }
  }, 16);
}

function animateCounters() {
  // Змінюй цифри на свої реальні дані!
  animateCounter('counter-races', 42, 1200);
  animateCounter('counter-wins', 12, 1200);
  animateCounter('counter-poles', 8, 1200);
  animateCounter('counter-champs', 3, 1200);
}


// ===== АНІМАЦІЯ СМУЖОК НАВИЧОК =====
function animateSkillBars() {
  const fills = document.querySelectorAll('.skill-fill');
  // Невелика затримка щоб CSS transition спрацював після display:block
  setTimeout(() => {
    fills.forEach(fill => {
      // Ширина вже задана inline style у HTML
      const target = fill.style.width;
      fill.style.width = '0';
      // Примусовий reflow щоб transition спрацював
      fill.getBoundingClientRect();
      fill.style.width = target;
    });
  }, 50);
}


// ===== ФОРМА КОНТАКТІВ =====
function sendForm(e) {
  e.preventDefault(); // Зупиняємо стандартну відправку форми
  const msg = document.getElementById('formMsg');
  msg.textContent = '✅ Повідомлення надіслано! Дякую за звернення.';
  e.target.reset(); // Очищуємо форму
  // Через 4 секунди прибираємо повідомлення
  setTimeout(() => { msg.textContent = ''; }, 4000);
}


// ===== ЗАПУСК ПРИ ЗАВАНТАЖЕННІ СТОРІНКИ =====
document.addEventListener('DOMContentLoaded', () => {
  animateCounters(); // Запускаємо лічильники одразу на головній
});

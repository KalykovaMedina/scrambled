// --- 1. Переключатель темы (Цифра / Аналог) ---
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

themeToggle.addEventListener('click', () => {
  if (body.classList.contains('digital-mode')) {
    body.classList.remove('digital-mode');
    body.classList.add('analog-mode');
    themeToggle.innerHTML = '<span class="icon">🎲</span> Кубик';
    document.documentElement.style.setProperty('--accent-digital', '#E67E22');
  } else {
    body.classList.remove('analog-mode');
    body.classList.add('digital-mode');
    themeToggle.innerHTML = '<span class="icon">📱</span> Телефон';
    document.documentElement.style.setProperty('--accent-digital', '#FF0055');
  }
});

// --- 2. Интерактивные грани кубика (Текст исправлен) ---
const episodes = [
    {
      title: "Игнорирование",
      text: "Эсра полностью погружена в телефон. Кубик Рубика выбирается из кучи хлама и сам подкатывается к ней, но она не обращает на него никакого внимания."
    },
    {
      title: "Раздражение",
      text: "Кубик настойчиво прыгает перед ней. Эсра злится: он мешает ей играть и наслаждаться быстрым прогрессом на экране. Аналоговый мир вторгается в её цифровую зону комфорта."
    },
    {
      title: "Первый контакт",
      text: "Любопытство берёт верх. Она берёт кубик в руки. Эсра пытается его собрать: ей даже удаётся собрать жёлтую грань, но остальные цвета ей не поддаются."
    },
    {
      title: "Провал (Фрустрация)",
      text: "Попытки собрать кубик полностью проваливаются. Он не поддаётся логике мобильной игры. В ярости Эсра отбрасывает его. Кубик расстраивается, но упорно подкатывается к ней снова."
    },
    {
      title: "Терпение",
      text: "Переломный момент. Рядом никого нет, только она и кубик. Эсра берёт его в руки и начинает вращать грани медленно, вдумчиво, без спешки, наконец-то отпуская своё раздражение."
    },
    {
      title: "Собрано!",
      text: "Щелчок. Последняя грань встаёт на место. Эсра собрала кубик! Но он больше не двигается. Прибывает поезд, и Эсра уезжает, оглядываясь на кубик в надежде, что он оживёт."
    },
    {
      title: "По кругу",
      text: "Эсра уехала. На перрон выбегает мужчина — он тоже опоздал. В гневе он швыряет портфель, разбрасывая листы. Кубик, пока катился к нему, снова смешался. И теперь он ждёт, сможет ли мужчина начать сначала."
    }
  ];

const cubeCells = document.querySelectorAll('.cube-cell');
const infoTitle = document.getElementById('infoTitle');
const infoText = document.getElementById('infoText');

cubeCells.forEach(cell => {
  cell.addEventListener('click', () => {
    cubeCells.forEach(c => c.classList.remove('active'));
    cell.classList.add('active');
    
    const ep = episodes[Number(cell.dataset.ep)];
    infoTitle.textContent = ep.title;
    infoText.textContent = ep.text;
  });
});

// --- 3. Анимация появления блоков при скролле ---
const revealElements = document.querySelectorAll('.section, .split-wrapper');
revealElements.forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

revealElements.forEach(el => revealObserver.observe(el));

// --- 4. Интерактивный наклон кубика (Исправлено) ---
const cubeContainer = document.querySelector('.cube-container');
if (cubeContainer) {
  document.addEventListener('mousemove', (e) => {
    if (document.body.classList.contains('digital-mode')) {
      const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
      const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
      // Наклоняем контейнер, а не сам кубик (чтобы не сломать CSS-анимацию парения)
      cubeContainer.style.transform = `perspective(1000px) rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
    } else {
      cubeContainer.style.transform = `none`; // Сбрасываем в аналоговом режиме
    }
  });
}
// --- 5. Реакция кубика на клик (Пасхалка) ---
const heroCubeVisual = document.querySelector('.cube-container');
if (heroCubeVisual) {
  heroCubeVisual.addEventListener('click', () => {
    // Добавляем класс для анимации вращения
    heroCubeVisual.style.transition = 'transform 0.6s cubic-bezier(0.68, -0.55, 0.27, 1.55)';
    heroCubeVisual.style.transform = 'rotateY(360deg) scale(1.2)';
    
    // Возвращаем обратно через 0.6 сек
    setTimeout(() => {
      heroCubeVisual.style.transform = 'none';
      heroCubeVisual.style.transition = 'transform 0.1s ease-out';
    }, 600);
  });
}

// --- 6. Секретная кнопка (Квест) ---
let visitedEpisodes = new Set(); // Храним уникальные клики

// Перехватываем клики по этапам
document.querySelectorAll('.cube-cell').forEach(cell => {
  cell.addEventListener('click', () => {
    visitedEpisodes.add(cell.dataset.ep);
    
    // Если собраны все 7 этапов
    if (visitedEpisodes.size === 7) {
      const secretBtn = document.getElementById('secretBtn');
      if (secretBtn) {
        secretBtn.style.display = 'inline-block'; // Показываем кнопку
      }
    }
  });
});

// Обработчик секретной кнопки
document.getElementById('secretBtn').addEventListener('click', () => {
  // Пасхалка: выводим сообщение или открываем модальное окно
  alert("Секрет разгадан! Вы прошли путь Эсры. Кубик Рубика собран. А вы нашли своё терпение? 😉");
  
  // Можно добавить конфетти или изменение цвета фона
  document.body.style.backgroundColor = "var(--accent-analog)";
  setTimeout(() => {
    document.body.style.backgroundColor = ""; // Возвращаем назад
  }, 2000);
}); 
// Обработчик секретной кнопки
const secretBtn = document.getElementById('secretBtn');
if (secretBtn) {
  secretBtn.addEventListener('click', () => {
    const overlay = document.getElementById('secretOverlay');
    const container = document.getElementById('confettiContainer');
    
    // 1. Включаем оверлей (вспышка фона)
    overlay.classList.add('active');

    // 2. Генерируем конфетти (пиксели)
    container.innerHTML = ''; // Очищаем старые
    const colors = ['#E74C3C', '#3498DB', '#F1C40F', '#2ECC71', '#E67E22', '#9B59B6'];
    
    for (let i = 0; i < 100; i++) {
      const pixel = document.createElement('div');
      pixel.classList.add('confetti-pixel');
      
      // Случайная позиция по горизонтали
      pixel.style.left = Math.random() * 100 + 'vw';
      // Случайный цвет
      pixel.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      // Случайная задержка и длительность падения
      pixel.style.animationDuration = (Math.random() * 2 + 1.5) + 's';
      pixel.style.animationDelay = Math.random() * 0.5 + 's';
      // Случайный размер (для разнообразия)
      const size = Math.random() * 10 + 10;
      pixel.style.width = size + 'px';
      pixel.style.height = size + 'px';
      
      container.appendChild(pixel);
    }

    // 3. Убираем эффект через 3 секунды
    setTimeout(() => {
      overlay.classList.remove('active');
      // Очищаем контейнер с конфетти, чтобы не тормозил браузер
      setTimeout(() => { container.innerHTML = ''; }, 500);
    }, 3000);
  });
}
const lottoSetsContainer = document.querySelector('#lotto-sets');
const generateBtn = document.querySelector('#generate');
const themeToggleBtn = document.querySelector('#theme-toggle');
const langSelect = document.querySelector('#lang-select');

// Theme Logic
const initialTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', initialTheme);
updateThemeIcon(initialTheme);

themeToggleBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    themeToggleBtn.textContent = theme === 'dark' ? '☀️' : '🌙';
}

// i18n Logic
const currentLang = localStorage.getItem('lang') || 'ko';
langSelect.value = currentLang;
applyTranslations(currentLang);

langSelect.addEventListener('change', (e) => {
    const lang = e.target.value;
    localStorage.setItem('lang', lang);
    applyTranslations(lang);
});

function applyTranslations(lang) {
    const dict = translations[lang] || translations['en'];
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (dict[key]) {
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                el.placeholder = dict[key];
            } else {
                el.innerHTML = dict[key];
            }
        }
    });
}

// Modal Logic
window.openModal = function(type) {
    const modal = document.getElementById(`${type}-modal`);
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevent scroll
    }
};

window.closeModal = function(type) {
    const modal = document.getElementById(`${type}-modal`);
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Restore scroll
    }
};

// Close modal when clicking outside content
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
};

// Smooth Scroll Logic
document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const headerOffset = 80;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

function generateLottoSet() {
    const numbers = new Set();
    while (numbers.size < 6) {
        numbers.add(Math.floor(Math.random() * 45) + 1);
    }
    const sortedNumbers = Array.from(numbers).sort((a, b) => a - b);
    
    let bonusNumber;
    do {
        bonusNumber = Math.floor(Math.random() * 45) + 1;
    } while (numbers.has(bonusNumber));

    return { main: sortedNumbers, bonus: bonusNumber };
}

function createNumberElement(number, isBonus = false) {
    const el = document.createElement('div');
    el.classList.add('lotto-number');
    if (isBonus) {
        el.classList.add('bonus');
        el.textContent = `+${number}`;
    } else {
        el.textContent = number;
        el.style.backgroundColor = getNumberColor(number);
    }
    return el;
}

function renderLottoSets() {
    lottoSetsContainer.innerHTML = '';
    for (let i = 0; i < 5; i++) {
        const set = generateLottoSet();
        const row = document.createElement('div');
        row.classList.add('lotto-row');

        const mainGroup = document.createElement('div');
        mainGroup.classList.add('numbers-group');
        set.main.forEach(num => mainGroup.appendChild(createNumberElement(num)));

        const bonusGroup = document.createElement('div');
        bonusGroup.classList.add('bonus-group');
        bonusGroup.appendChild(createNumberElement(set.bonus, true));

        row.appendChild(mainGroup);
        row.appendChild(bonusGroup);
        lottoSetsContainer.appendChild(row);
    }
}

function getNumberColor(number) {
    if (number <= 10) return '#f9e45b'; // Yellow
    if (number <= 20) return '#5b9ef9'; // Blue
    if (number <= 30) return '#f95b5b'; // Red
    if (number <= 40) return '#888888'; // Gray
    return '#5bf975'; // Green
}

generateBtn.addEventListener('click', renderLottoSets);

// Initial load
renderLottoSets();

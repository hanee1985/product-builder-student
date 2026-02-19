const lottoSetsContainer = document.querySelector('#lotto-sets');
const generateBtn = document.querySelector('#generate');
const themeToggleBtn = document.querySelector('#theme-toggle');

// Theme Logic
const currentTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', currentTheme);
updateThemeIcon(currentTheme);

themeToggleBtn.addEventListener('click', () => {
    let theme = document.documentElement.getAttribute('data-theme');
    let newTheme = theme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    themeToggleBtn.textContent = theme === 'dark' ? '☀️' : '🌙';
}

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

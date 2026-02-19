const lottoNumbersContainer = document.querySelector('.lotto-numbers');
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

function generateLottoNumbers() {
    lottoNumbersContainer.innerHTML = '';
    const numbers = new Set();
    while (numbers.size < 6) {
        const randomNumber = Math.floor(Math.random() * 45) + 1;
        numbers.add(randomNumber);
    }

    const sortedNumbers = Array.from(numbers).sort((a, b) => a - b);

    sortedNumbers.forEach(number => {
        const numberElement = document.createElement('div');
        numberElement.classList.add('lotto-number');
        numberElement.textContent = number;
        numberElement.style.backgroundColor = getNumberColor(number);
        lottoNumbersContainer.appendChild(numberElement);
    });
}

function getNumberColor(number) {
    if (number <= 10) {
        return '#f9e45b'; // Yellow
    } else if (number <= 20) {
        return '#5b9ef9'; // Blue
    } else if (number <= 30) {
        return '#f95b5b'; // Red
    } else if (number <= 40) {
        return '#888888'; // Gray
    } else {
        return '#5bf975'; // Green
    }
}

generateBtn.addEventListener('click', generateLottoNumbers);

// Generate initial numbers on page load
generateLottoNumbers();

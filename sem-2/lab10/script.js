// Константи та змінні
const API_URL = 'https://randomuser.me/api/';
const RESULTS_PER_PAGE = 30;
let currentPage = 1;
let totalPages = 1;
let users = [];
let filteredUsers = [];
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

const authContainer = document.getElementById('auth-container');
const mainContainer = document.getElementById('main-container');
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const showRegister = document.getElementById('show-register');
const showLogin = document.getElementById('show-login');
const logoutBtn = document.getElementById('logout-btn');
const searchInput = document.getElementById('search-input');
const sortSelect = document.getElementById('sort-select');
const genderFilter = document.getElementById('gender-filter');
const ageFilter = document.getElementById('age-filter');
const usersContainer = document.getElementById('users-container');
const pagination = document.getElementById('pagination');
const loading = document.getElementById('loading');
const errorMessage = document.getElementById('error-message');

// Ініціалізація додатку
function initApp() {
    checkAuth();
    setupEventListeners();
}

// Перевірка авторизації
async function checkAuth() {
    const user = localStorage.getItem('user');
    if (user) {
        authContainer.classList.add('hidden');
        mainContainer.classList.remove('hidden');
        await updateTotalPagesByFetching();   
        loadUsers();
    } else {
        authContainer.classList.remove('hidden');
        mainContainer.classList.add('hidden');
    }
}

// Налаштування слухачів подій
function setupEventListeners() {
    // Авторизація
    loginForm.addEventListener('submit', handleLogin);
    registerForm.addEventListener('submit', handleRegister);
    showRegister.addEventListener('click', toggleAuthForms);
    showLogin.addEventListener('click', toggleAuthForms);
    logoutBtn.addEventListener('click', handleLogout);

    // Пошук та фільтрація
    searchInput.addEventListener('input', debounce(handleSearch, 300));
    sortSelect.addEventListener('change', updateUsersDisplay);
    genderFilter.addEventListener('change', updateUsersDisplay);
    ageFilter.addEventListener('change', updateUsersDisplay);

    // Пагінація
    window.addEventListener('scroll', throttle(handleScroll, 500));
}

// Обробник входу
function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    // Фейкова авторизація
    localStorage.setItem('user', JSON.stringify({ email }));
    checkAuth();
}

// Обробник реєстрації
function handleRegister(e) {
    e.preventDefault();
    const name = document.getElementById('register-name').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;

    // Фейкова реєстрація
    localStorage.setItem('user', JSON.stringify({ name, email }));
    checkAuth();
}

// Обробник виходу
function handleLogout() {
    localStorage.removeItem('user');
    checkAuth();
}

// Перемикання між формами входу та реєстрації
function toggleAuthForms(e) {
    e.preventDefault();
    loginForm.classList.toggle('hidden');
    registerForm.classList.toggle('hidden');
}

const updateTotalPagesByFetching = async () => {
    try {
        const response = await fetch(`${API_URL}?results=${210}&page=${7}&seed=friends`);
        const data = await response.json();
        const total = data.results.length / RESULTS_PER_PAGE;
        totalPages = total;
    } catch (error) {
        showError(error.message);
    }
}

// Завантаження користувачів
async function loadUsers(page = 1,resultsPerPage = RESULTS_PER_PAGE) {
    try {
        showLoading();
        clearError();


        const response = await fetch(`${API_URL}?results=${resultsPerPage}&page=${page}&seed=friends`);
        if (!response.ok) throw new Error('Не вдалося завантажити користувачів');

        const data = await response.json();
        users = data.results.map(user => ({
            id: user.login.uuid,
            name: `${user.name.first} ${user.name.last}`,
            firstName: user.name.first,
            lastName: user.name.last,
            age: user.dob.age,
            gender: user.gender,
            email: user.email,
            phone: user.phone,
            picture: user.picture.large,
            location: `${user.location.city}, ${user.location.country}`,
            registered: new Date(user.registered.date)
        }));

        updateURL();
        updateUsersDisplay();
        updatePagination();
    } catch (error) {
        showError(error.message);
    } finally {
        hideLoading();
    }
}

// Фільтрація користувачів
function filterUsers() {
    const searchTerm = searchInput.value.toLowerCase();
    const gender = genderFilter.value;
    const ageRange = ageFilter.value;

    filteredUsers = users.filter(user => {
        // Пошук
        const matchesSearch = user.name.toLowerCase().includes(searchTerm) || 
                             user.email.toLowerCase().includes(searchTerm);

        // Фільтр за статтю
        const matchesGender = gender === 'all' || user.gender === gender;

        // Фільтр за віком
        let matchesAge = true;
        if (ageRange !== 'all') {
            const [min, max] = ageRange.split('-').map(Number);
            if (ageRange === '50+') {
                matchesAge = user.age >= 50;
            } else {
                matchesAge = user.age >= min && user.age <= max;
            }
        }

        return matchesSearch && matchesGender && matchesAge;
    });

    // Сортування
    sortUsers();
}

// Сортування користувачів
function sortUsers() {
    const sortValue = sortSelect.value;

    filteredUsers.sort((a, b) => {
        switch (sortValue) {
            case 'name-asc':
                return a.name.localeCompare(b.name);
            case 'name-desc':
                return b.name.localeCompare(a.name);
            case 'age-asc':
                return a.age - b.age;
            case 'age-desc':
                return b.age - a.age;
            case 'registered-asc':
                return a.registered - b.registered;
            case 'registered-desc':
                return b.registered - a.registered;
            default:
                return 0;
        }
    });
}

// Оновлення відображення користувачів
function updateUsersDisplay() {
    // loadUsers(currentPage)
    filterUsers();
    renderUsers();
    updateURL();
}

// Відображення користувачів
function renderUsers() {
    usersContainer.innerHTML = '';

    if (filteredUsers.length === 0) {
        usersContainer.innerHTML = '<p class="no-results">Користувачів не знайдено</p>';
        return;
    }

    filteredUsers.forEach(user => {
        const isFavorite = favorites.includes(user.id);
        const userCard = document.createElement('div');
        userCard.className = 'user-card';
        userCard.innerHTML = `
            <div class="user-image">
                <img src="${user.picture}" alt="${user.name}">
            </div>
            <button class="favorite-btn ${isFavorite ? 'favorited' : ''}" data-id="${user.id}">
                <i class="fas fa-heart"></i>
            </button>
            <div class="user-info">
                <h3>${user.name}, ${user.age}</h3>
                <p><i class="fas fa-envelope"></i> ${user.email}</p>
                <p><i class="fas fa-phone"></i> ${user.phone}</p>
                <p><i class="fas fa-map-marker-alt"></i> ${user.location}</p>
                <p><i class="fas fa-calendar-alt"></i> Зареєстрований: ${user.registered.toLocaleDateString()}</p>
            </div>
        `;
        usersContainer.appendChild(userCard);
    });

    // Додавання обробників для кнопок "Улюблені"
    document.querySelectorAll('.favorite-btn').forEach(btn => {
        btn.addEventListener('click', toggleFavorite);
    });
}

// Обробник пошуку
function handleSearch() {
    updateUsersDisplay();
}

// Пагінація
function updatePagination() {
    pagination.innerHTML = '';

    for (let i = 1; i <= totalPages; i++) {
        const pageBtn = document.createElement('button');
        pageBtn.textContent = i;
        if (i === currentPage) {
            pageBtn.classList.add('active');
        }
        pageBtn.addEventListener('click', () => {
            currentPage = i-1;
            // updatePagination();
            updateUsersDisplay();
            loadUsers(currentPage)
        });
        pagination.appendChild(pageBtn);
    }
}

// Обробник скролу для нескінченного завантаження
function handleScroll() {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 10 && !loading.classList.contains('hidden')) {
        if (currentPage < totalPages) {
            currentPage++;
            loadUsers(currentPage,60);
        }
    }
}

// Додавання/видалення з улюблених
function toggleFavorite(e) {
    const userId = e.currentTarget.getAttribute('data-id');
    const index = favorites.indexOf(userId);

    if (index === -1) {
        favorites.push(userId);
        e.currentTarget.classList.add('favorited');
    } else {
        favorites.splice(index, 1);
        e.currentTarget.classList.remove('favorited');
    }

    localStorage.setItem('favorites', JSON.stringify(favorites));
}

// Оновлення URL
function updateURL() {
    const params = new URLSearchParams();
    params.set('page', currentPage);
    params.set('search', searchInput.value);
    params.set('sort', sortSelect.value);
    params.set('gender', genderFilter.value);
    params.set('age', ageFilter.value);

    const newUrl = `${window.location.pathname}?${params.toString()}`;
    window.history.pushState({}, '', newUrl);
}

// Читання параметрів URL
function readURLParams() {
    const params = new URLSearchParams(window.location.search);
    currentPage = parseInt(params.get('page')) || 1;
    searchInput.value = params.get('search') || '';
    sortSelect.value = params.get('sort') || 'name-asc';
    genderFilter.value = params.get('gender') || 'all';
    ageFilter.value = params.get('age') || 'all';
}

// Показ завантаження
function showLoading() {
    loading.classList.remove('hidden');
}

// Приховування завантаження
function hideLoading() {
    loading.classList.add('hidden');
}

// Показ помилки
function showError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.remove('hidden');
}

// Очищення помилки
function clearError() {
    errorMessage.classList.add('hidden');
}

// Декоратор debounce
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Декоратор throttle
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Ініціалізація додатку при завантаженні
window.addEventListener('DOMContentLoaded', () => {
    readURLParams();
    initApp();
});

// Обробник змін стану історії (назад/вперед)
window.addEventListener('popstate', () => {
    readURLParams();
    updateUsersDisplay();
});
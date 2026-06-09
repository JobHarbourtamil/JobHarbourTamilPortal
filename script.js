document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Ad Waiting System (15-Second Timer) ---
    // Placed at the top so it always works!
    const applyButtons = document.querySelectorAll('.apply-btn');
    const adModal = document.getElementById('ad-modal');
    const countdownSpan = document.getElementById('countdown');
    const skipBtn = document.getElementById('skip-btn');
    let timerInterval;
    let targetUrl = '';

    if (adModal && skipBtn) {
        applyButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                targetUrl = btn.getAttribute('data-link');
                
                let timeLeft = 15;
                countdownSpan.textContent = timeLeft;
                skipBtn.textContent = "Please Wait...";
                skipBtn.disabled = true;
                adModal.style.display = 'flex';

                timerInterval = setInterval(() => {
                    timeLeft--;
                    countdownSpan.textContent = timeLeft;
                    if (timeLeft <= 0) {
                        clearInterval(timerInterval);
                        skipBtn.textContent = "Apply Now (Opens in New Tab)";
                        skipBtn.disabled = false;
                    }
                }, 1000);
            });
        });

        skipBtn.addEventListener('click', () => {
            if (!skipBtn.disabled) {
                adModal.style.display = 'none';
                window.open(targetUrl, '_blank');
            }
        });

        adModal.addEventListener('click', (e) => {
            if (e.target === adModal) {
                adModal.style.display = 'none';
                clearInterval(timerInterval);
            }
        });
    }


    // --- 2. Search Bar & Nav Bar Filtering ---
    const jobCards = document.querySelectorAll('.job-card');
    const keywordInput = document.getElementById('search-keyword');
    const locationInput = document.getElementById('search-location');
    const searchBtn = document.getElementById('search-btn');
    const navFilters = document.querySelectorAll('.nav-filter');
    const pills = document.querySelectorAll('.pill');

    let currentNavFilter = 'all';

    function filterJobs() {
        const keyword = keywordInput ? keywordInput.value.toLowerCase().trim() : '';
        const location = locationInput ? locationInput.value.toLowerCase().trim() : '';

        jobCards.forEach(card => {
            const cardText = card.textContent.toLowerCase();
            const cardCategories = card.getAttribute('data-category') || '';

            // 1. Check if Navbar filter matches
            const matchesNav = currentNavFilter === 'all' || cardCategories.includes(currentNavFilter);
            
            // 2. Check if Search Bar text matches
            const matchesKeyword = keyword === '' || cardText.includes(keyword);
            const matchesLocation = location === '' || cardText.includes(location);

            // Show card only if EVERYTHING matches
            if (matchesNav && matchesKeyword && matchesLocation) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }

    // A. Trigger filter when typing in search bar
    if (keywordInput) keywordInput.addEventListener('input', filterJobs);
    if (locationInput) locationInput.addEventListener('input', filterJobs);
    if (searchBtn) searchBtn.addEventListener('click', filterJobs);

    // B. Trigger filter when clicking Navbar Links
    navFilters.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            currentNavFilter = link.getAttribute('data-filter');
            filterJobs();
        });
    });

    // C. Trigger filter when clicking Category Pills
    pills.forEach(pill => {
        pill.addEventListener('click', () => {
            if (keywordInput) {
                keywordInput.value = pill.getAttribute('data-keyword');
                filterJobs();
            }
        });
    });


    // --- 3. Dark Mode Toggle ---
    const themeToggleBtn = document.getElementById('theme-toggle');
    if (themeToggleBtn) {
        if (localStorage.getItem('theme') === 'dark') {
            document.body.classList.add('dark-theme');
            themeToggleBtn.textContent = '☀️ Light Mode';
        }
        themeToggleBtn.addEventListener('click', () => {
            document.body.classList.toggle('dark-theme');
            if (document.body.classList.contains('dark-theme')) {
                localStorage.setItem('theme', 'dark');
                themeToggleBtn.textContent = '☀️ Light Mode';
            } else {
                localStorage.setItem('theme', 'light');
                themeToggleBtn.textContent = '🌙 Dark Mode';
            }
        });
    }
});
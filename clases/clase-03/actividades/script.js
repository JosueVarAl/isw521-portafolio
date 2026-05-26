document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const cvContainer = document.getElementById('cvContainer');
    const btnWebMode = document.getElementById('btnWebMode');
    const btnPdfMode = document.getElementById('btnPdfMode');
    const btnThemeToggle = document.getElementById('btnThemeToggle');
    const btnPrint = document.getElementById('btnPrint');
    const iconSun = document.querySelector('.icon-sun');
    const iconMoon = document.querySelector('.icon-moon');
    
    // Copy elements
    const copyElements = [
        document.getElementById('contactEmail'),
        document.getElementById('contactPhone')
    ];

    /* ==========================================================================
       VIEW MODE TOGGLE (Web Mode / PDF Mode)
       ========================================================================== */
    function setViewMode(mode) {
        if (mode === 'web') {
            cvContainer.classList.add('mode-web');
            cvContainer.classList.remove('mode-pdf');
            btnWebMode.classList.add('active');
            btnPdfMode.classList.remove('active');
            // Show theme switcher in Web Mode
            btnThemeToggle.parentElement.style.opacity = '1';
            btnThemeToggle.parentElement.style.pointerEvents = 'all';
            localStorage.setItem('cv-view-mode', 'web');
        } else {
            cvContainer.classList.add('mode-pdf');
            cvContainer.classList.remove('mode-web');
            btnPdfMode.classList.add('active');
            btnWebMode.classList.remove('active');
            // Disable theme switcher when looking at PDF (since PDF is white paper)
            btnThemeToggle.parentElement.style.opacity = '0.3';
            btnThemeToggle.parentElement.style.pointerEvents = 'none';
            localStorage.setItem('cv-view-mode', 'pdf');
        }
    }

    btnWebMode.addEventListener('click', () => setViewMode('web'));
    btnPdfMode.addEventListener('click', () => setViewMode('pdf'));

    // Initialize View Mode from storage (default to 'web')
    const savedViewMode = localStorage.getItem('cv-view-mode') || 'web';
    setViewMode(savedViewMode);

    /* ==========================================================================
       DARK / LIGHT THEME SWITCHER
       ========================================================================== */
    function toggleTheme() {
        const isDark = document.body.classList.toggle('dark-theme');
        localStorage.setItem('cv-dark-theme', isDark ? 'enabled' : 'disabled');
        updateThemeIcons(isDark);
    }

    function updateThemeIcons(isDark) {
        if (isDark) {
            iconSun.style.display = 'none';
            iconMoon.style.display = 'block';
        } else {
            iconSun.style.display = 'block';
            iconMoon.style.display = 'none';
        }
    }

    // Initialize Theme from storage or system preferences
    const savedTheme = localStorage.getItem('cv-dark-theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'enabled' || (!savedTheme && prefersDark)) {
        document.body.classList.add('dark-theme');
        updateThemeIcons(true);
    } else {
        document.body.classList.remove('dark-theme');
        updateThemeIcons(false);
    }

    btnThemeToggle.addEventListener('click', toggleTheme);

    /* ==========================================================================
       CLICK TO COPY TO CLIPBOARD
       ========================================================================== */
    copyElements.forEach(element => {
        if (!element) return;
        
        element.addEventListener('click', async (e) => {
            // Prevent navigating if it's inside a link anchor (safety)
            if (element.classList.contains('link-item') && e.target.closest('a')) {
                return;
            }

            const textToCopy = element.getAttribute('data-copy');
            if (!textToCopy) return;

            try {
                await navigator.clipboard.writeText(textToCopy);
                
                // Add copied class to trigger badge animations
                element.classList.add('copied');
                
                // Clear copied state after 2 seconds
                setTimeout(() => {
                    element.classList.remove('copied');
                }, 2000);
            } catch (err) {
                console.error('Error al copiar al portapapeles: ', err);
            }
        });
    });

    /* ==========================================================================
       PRINT AND EXPORT TO PDF
       ========================================================================== */
    btnPrint.addEventListener('click', () => {
        // Trigger default browser print flow (styles.css will automatically style it beautifully)
        window.print();
    });
});

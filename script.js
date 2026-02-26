document.addEventListener('DOMContentLoaded', () => {
    // 1. SELECTOR UTAMA
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;
    const darkModeToggle = document.querySelector('#dark-mode-toggle');
    const cursorDot = document.querySelector(".cursor-dot");
    const cursorOutline = document.querySelector(".cursor-outline");

    // 2. LOGIKA MENU MOBILE (SIDEBAR)
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', (e) => {
            e.stopPropagation(); // Biar gak keganggu klik document
            navLinks.classList.toggle('active');
            const icon = hamburger.querySelector('i');
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
        });

        // Tutup menu kalau link diklik
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                const icon = hamburger.querySelector('i');
                icon.classList.add('fa-bars');
                icon.classList.remove('fa-times');
            });
        });

        // Klik di mana saja buat tutup menu
        document.addEventListener('click', (e) => {
            if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
                navLinks.classList.remove('active');
                const icon = hamburger.querySelector('i');
                if (icon) {
                    icon.classList.add('fa-bars');
                    icon.classList.remove('fa-times');
                }
            }
        });
    }

    // 3. DARK MODE LOGIC (Biar gak reset pas refresh)
    if (darkModeToggle) {
        const themeIcon = darkModeToggle.querySelector('i');
        const currentTheme = localStorage.getItem('theme');

        if (currentTheme === 'dark') {
            body.classList.add('dark-theme');
            if (themeIcon) themeIcon.classList.replace('fa-moon', 'fa-sun');
        }

        darkModeToggle.addEventListener('click', () => {
            body.classList.toggle('dark-theme');
            let theme = 'light';
            if (body.classList.contains('dark-theme')) {
                theme = 'dark';
                if (themeIcon) themeIcon.classList.replace('fa-moon', 'fa-sun');
            } else {
                if (themeIcon) themeIcon.classList.replace('fa-sun', 'fa-moon');
            }
            localStorage.setItem('theme', theme);
        });
    }

    // 4. ANIMASI PROGRESS BARS (HOBI)
    const progressBars = document.querySelectorAll('.progress');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const width = entry.target.getAttribute('data-width');
                entry.target.style.width = width;
            }
        });
    }, { threshold: 0.5 });
    progressBars.forEach(bar => observer.observe(bar));

    // 5. CUSTOM CURSOR (Otomatis mati di HP)
    if (cursorDot && cursorOutline && window.matchMedia("(pointer: fine)").matches) {
        window.addEventListener("mousemove", (e) => {
            const posX = e.clientX;
            const posY = e.clientY;
            cursorDot.style.left = `${posX}px`;
            cursorDot.style.top = `${posY}px`;
            cursorOutline.animate({
                left: `${posX}px`,
                top: `${posY}px`
            }, { duration: 500, fill: "forwards" });
        });

        const interactables = document.querySelectorAll("a, button, .skill-card, .project-card, .mode-toggle, .hamburger");
        interactables.forEach(el => {
            el.addEventListener("mouseover", () => {
                cursorOutline.classList.add("cursor-active");
                cursorDot.style.transform = "translate(-50%, -50%) scale(1.5)";
            });
            el.addEventListener("mouseleave", () => {
                cursorOutline.classList.remove("cursor-active");
                cursorDot.style.transform = "translate(-50%, -50%) scale(1)";
            });
        });
    }
});
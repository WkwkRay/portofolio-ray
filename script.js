document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Logic (Updated by Roy)
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = hamburger.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-times');
            }
        });
    }

    // 2. Animate Progress Bars (Hobi)
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

    // 3. Smooth Scroll & Auto-Close Menu
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
                
                // Roy's fix: Tutup menu dan balikin ikon hamburger pas klik menu di HP
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    const icon = hamburger.querySelector('i');
                    if (icon) {
                        icon.classList.add('fa-bars');
                        icon.classList.remove('fa-times');
                    }
                }
            }           
        });
    });

    // 4. Custom Cursor Logic
    const cursorDot = document.querySelector(".cursor-dot");
    const cursorOutline = document.querySelector(".cursor-outline");

    if (cursorDot && cursorOutline) {
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

        const interactables = document.querySelectorAll("a, button, .skill-card, .project-card, .social-links a, .mode-toggle, .hamburger");
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

    // 5. Dark Mode Logic
    const darkModeToggle = document.querySelector('#dark-mode-toggle');
    if (darkModeToggle) {
        const body = document.body;
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
});
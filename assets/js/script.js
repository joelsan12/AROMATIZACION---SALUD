document.addEventListener('DOMContentLoaded', () => {

    // 1. MODO OSCURO
    const themeBtn = document.getElementById('theme-toggle');
    const themeIcon = themeBtn ? themeBtn.querySelector('i') : null;
    const body = document.body;

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        if (themeIcon) { themeIcon.classList.replace('fa-moon', 'fa-sun'); }
    }

    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
            const isDark = body.classList.contains('dark-mode');
            if (isDark) {
                themeIcon.classList.replace('fa-moon', 'fa-sun');
                localStorage.setItem('theme', 'dark');
            } else {
                themeIcon.classList.replace('fa-sun', 'fa-moon');
                localStorage.setItem('theme', 'light');
            }
        });
    }

    // 2. MENÚ MÓVIL
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('toggle');
        });
    }

    // Cerrar menú al hacer clic en un enlace
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            if (hamburger) hamburger.classList.remove('toggle');
        });
    });

    // 3. FILTROS DE SERVICIOS
    const filterBtns = document.querySelectorAll('.filter-btn');
    const serviceItems = document.querySelectorAll('.service-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filterValue = btn.getAttribute('data-filter');

            serviceItems.forEach(item => {
                if (filterValue === 'all' || item.classList.contains(filterValue)) {
                    item.classList.remove('hide');
                    item.style.animation = 'fadeIn 0.5s forwards';
                } else {
                    item.classList.add('hide');
                }
            });
        });
    });

    // 4. ANIMACIONES SCROLL (Observer)
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
});

// --- 5. BOTÓN SCROLL TOP ---
const scrollTopBtn = document.getElementById('scrollTopBtn');

window.addEventListener('scroll', () => {
    // Mostrar botón si bajamos más de 300px
    if (window.scrollY > 300) {
        scrollTopBtn.classList.add('show');
    } else {
        scrollTopBtn.classList.remove('show');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth' // Subida suave
    });
});

/* --- CONTROL MANUAL DE VIDEO (BOTÓN) --- */
const manualContainers = document.querySelectorAll('.video-manual-container');

manualContainers.forEach(container => {
    const btn = container.querySelector('.toggle-media-btn');
    const img = container.querySelector('.image-layer');
    const video = container.querySelector('.video-layer');

    if (btn && video && img) {
        btn.addEventListener('click', (e) => {
            e.preventDefault(); // Evita saltos raros

            // Si el video está pausado (estamos viendo la foto) -> DAR PLAY
            if (video.paused) {
                img.classList.remove('active'); // Ocultar foto
                video.classList.add('active');  // Mostrar video
                video.play();

                // Cambiar texto del botón
                btn.innerHTML = '<i class="fas fa-camera"></i> Ver Foto';
                btn.style.background = "rgba(0,0,0,0.7)"; // Oscurecer botón para contraste
                btn.style.color = "#fff";
            }
            // Si el video está sonando -> PAUSAR y MOSTRAR FOTO
            else {
                video.pause();
                video.classList.remove('active'); // Ocultar video
                img.classList.add('active');      // Mostrar foto

                // Restaurar botón
                btn.innerHTML = '<i class="fas fa-play"></i> Ver Video';
                btn.style.background = "rgba(255, 255, 255, 0.9)";
                btn.style.color = ""; // Volver al color original CSS
            }
        });
    }
});


/* --- 6. FAQ ACCORDION --- */
const faqQuestions = document.querySelectorAll('.faq-question');

faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
        const answer = question.nextElementSibling;
        question.classList.toggle('active');

        if (question.classList.contains('active')) {
            answer.style.maxHeight = answer.scrollHeight + "px";
        } else {
            answer.style.maxHeight = 0;
        }
    });
});
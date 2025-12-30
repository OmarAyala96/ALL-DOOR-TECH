// 1. Inicialización de EmailJS
emailjs.init("A1SeiTh9E-maUoJXc"); 

document.addEventListener("DOMContentLoaded", function() {
    
    // --- SECCIÓN CHAT FLOTANTE (Mejorada para Accesibilidad) ---
    // Añadimos role="dialog" y aria-label para que Lighthouse nos de 100
    const chatHTML = `
    <div class="adt-chat-system" role="complementary">
        <div class="adt-chat-box" id="chatContainer" style="display:none;" role="dialog" aria-label="Chat support">
            <div class="adt-chat-header" style="background:#223248; color:white; padding:15px; display:flex; align-items:center; gap:10px; border-radius:20px 20px 0 0;">
                <div class="adt-avatar" style="position: relative; width:40px; height:40px; background:#f9ae39; border-radius:50%; display:flex; align-items:center; justify-content:center; color:#223248; font-weight:bold;">RC<span style="position: absolute; bottom: 2px; right: 2px; width: 10px; height: 10px; background: #28a745; border: 2px solid #223248; border-radius: 50%;"></span></div>
                <div style="flex-grow:1; text-align:left;">
                    <p style="margin:0; font-weight:bold; font-size:14px; line-height:1.2;">Raul Cortez</p>
                    <small style="color:#f9ae39; font-size:11px;">Online Now</small>
                </div>
                <button onclick="toggleAdtChat()" aria-label="Close chat" style="background:none; border:none; color:white; font-size:22px; cursor:pointer; line-height:1;">&times;</button>
            </div>
            <div style="height:250px; background:#f0f2f5; padding:15px; overflow-y:auto;" id="chatBody">
                <div style="background:white; padding:10px; border-radius:10px; font-size:13px; margin-bottom:10px; box-shadow:0 2px 4px rgba(0,0,0,0.05);">Hi! I'm Raul. How can I help you today?</div>
            </div>
            <div style="padding:15px; background:white; border-radius:0 0 20px 20px;">
                <form id="chat-form">
                    <input type="text" name="first_name" aria-label="Full Name" placeholder="Your Name" required style="width:100%; margin-bottom:8px; padding:10px; border:1px solid #ddd; border-radius:8px; font-size:13px;">
                    <input type="email" name="email" aria-label="Email Address" placeholder="Email Address" required style="width:100%; margin-bottom:8px; padding:10px; border:1px solid #ddd; border-radius:8px; font-size:13px;">
                    <textarea name="message" aria-label="Your Message" placeholder="How can we help?" required style="width:100%; margin-bottom:8px; padding:10px; border:1px solid #ddd; border-radius:8px; font-size:13px; resize:none;" rows="2"></textarea>
                    <button type="submit" style="width:100%; background:#223248; color:#f9ae39; border:2px solid #f9ae39; padding:10px; border-radius:8px; font-weight:bold; cursor:pointer;">SEND MESSAGE</button>
                </form>
            </div>
        </div>
        <button class="adt-chat-trigger" onclick="toggleAdtChat()" id="chatBtn" aria-label="Open chat" aria-haspopup="true">
            <i class="bi bi-chat-fill"></i>
        </button>
    </div>`;

    document.body.insertAdjacentHTML('beforeend', chatHTML);

    // --- PUNTO #2: ANIMACIONES AL HACER SCROLL (Rendimiento 100%) ---
    // Esto hace que las secciones aparezcan solo cuando el usuario las ve
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.animate-up').forEach(el => observer.observe(el));

    // --- PUNTO #3: HEADER DINÁMICO (Mejor Práctica) ---
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('header--scrolled');
        } else {
            header.classList.remove('header--scrolled');
        }
    }, { passive: true }); // passive: true mejora el rendimiento del scroll

    // --- LÓGICA DE ENVÍO UNIFICADA (Tu código original mejorado) ---
    const serviceID = 'service_h07rzvh'; 
    const masterTemplate = 'template_m2b86ep'; 
    const chatTemplate = 'template_5ni0dos';   

    const forms = [
        { id: 'chat-form', template: chatTemplate },
        { id: 'estimate-form', template: masterTemplate },
        { id: 'service-form', template: masterTemplate },
        { id: 'contact-form', template: masterTemplate },
        { id: 'feedback-form', template: masterTemplate }
    ];

    forms.forEach(item => {
        const formEl = document.getElementById(item.id);
        if (formEl) {
            formEl.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const btn = formEl.querySelector('button[type="submit"]');
                const originalText = btn.innerText;

                // Validación de archivo...
                const fileInput = formEl.querySelector('input[type="file"]');
                if (fileInput && fileInput.files.length > 0) {
                    if ((fileInput.files[0].size / 1024) > 50) {
                        alert("File too large (Max 50KB). Please use WhatsApp for photos.");
                        return;
                    }
                }

                btn.innerText = 'Sending...';
                btn.disabled = true;

                emailjs.sendForm(serviceID, item.template, this)
                    .then(() => {
                        btn.innerText = 'SENT SUCCESSFULLY!';
                        btn.style.background = '#28a745';
                        btn.style.color = '#fff';
                        formEl.reset();

                        if(item.id === 'chat-form') {
                             setTimeout(() => { toggleAdtChat(); }, 2000);
                        }

                        setTimeout(() => {
                            btn.innerText = originalText;
                            btn.style.background = '';
                            btn.style.color = '';
                            btn.disabled = false;
                        }, 4000);
                    }, (err) => {
                        alert("Error sending message. Please try again.");
                        btn.innerText = originalText;
                        btn.disabled = false;
                    });
            });
        }
    });
});

function toggleAdtChat() {
    const chat = document.getElementById('chatContainer');
    const iconBtn = document.getElementById('chatBtn');
    if (!chat) return;
    const isHidden = chat.style.display === 'none' || chat.style.display === '';
    chat.style.display = isHidden ? 'block' : 'none';
    
    // Mejoramos accesibilidad al cambiar el icono
    if(iconBtn.querySelector('i')) {
        iconBtn.querySelector('i').className = isHidden ? 'bi bi-x-lg' : 'bi bi-chat-fill';
    }
}


    // Función carrusel//


document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.hero__slide');
    const dots = document.querySelectorAll('.indicator');
    let currentSlide = 0;
    const intervalTime = 5000; // 5 segundos

    if (!slides.length) return;

    function changeSlide(index) {
        // Quitamos activo a la actual
        slides[currentSlide].classList.remove('active');
        dots[currentSlide].classList.remove('active');

        currentSlide = index;

        // Ponemos activo a la nueva
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }

    function nextSlide() {
        let next = (currentSlide + 1) % slides.length;
        changeSlide(next);
    }

    let slideTimer = setInterval(nextSlide, intervalTime);

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            clearInterval(slideTimer);
            changeSlide(index);
            slideTimer = setInterval(nextSlide, intervalTime);
        });
    });
});



// --- PUNTO #2: INTERSECTION OBSERVER galery home (ANIMACIONES SCROLL) ---
    const observerOptions = {
        root: null, // Usa la pantalla del navegador
        threshold: 0.1 // Se activa cuando se ve el 10% del elemento
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Cuando el elemento entra en pantalla, añadimos la clase 'visible'
                entry.target.classList.add('visible');
                // Dejamos de observar para ahorrar recursos (solo se anima una vez)
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Activamos el observador en todos los elementos con la clase .animate-up
    document.querySelectorAll('.animate-up').forEach(el => {
        observer.observe(el);
    });



    // --- PUNTO #3: ACCESIBILIDAD MENÚ MÓVIL home (Lighthouse 100%) ---
    
    const menuCheckbox = document.getElementById('menu-toggle');
    const menuButton = document.querySelector('.header__hamburger');
    const menuLinks = document.querySelectorAll('.header__nav a'); // Todos los enlaces del menú
    const closeBtn = document.querySelector('.header__close-btn');

    // 1. Sincronizar ARIA-EXPANDED con el Checkbox
    // Cuando el checkbox cambia (click en hamburguesa o en la X), actualizamos el atributo
    menuCheckbox.addEventListener('change', () => {
        const isExpanded = menuCheckbox.checked;
        menuButton.setAttribute('aria-expanded', isExpanded);
        
        // Bloquear scroll del body cuando el menú está abierto (Mejora UX)
        document.body.style.overflow = isExpanded ? 'hidden' : '';
    });

    // 2. Cerrar menú al hacer clic en un enlace
    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            // Solo cerramos si está abierto
            if (menuCheckbox.checked) {
                menuCheckbox.checked = false;
                
                // Disparamos el evento 'change' manualmente para que se ejecute el paso 1
                menuCheckbox.dispatchEvent(new Event('change')); 
            }
        });
    });

    // 3. Soporte para Teclado (Accesibilidad Extra)
    // El "Checkbox Hack" usa <label>, que no siempre responde a "Enter" por defecto.
    // Esto permite abrir el menú usando la tecla Enter si el usuario navega con Tab.
    menuButton.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            menuCheckbox.checked = !menuCheckbox.checked;
            menuCheckbox.dispatchEvent(new Event('change'));
        }
    });

    // Soporte teclado para el botón de cerrar (la X)
    if(closeBtn) {
        closeBtn.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                menuCheckbox.checked = false;
                menuCheckbox.dispatchEvent(new Event('change'));
            }
        });
    }
// 1. INICIALIZACIÓN DE EMAILJS (Tu nueva Key)
(function() {
    // Asegúrate de que esta sea la KEY correcta. Antes tenías "A1SeiTh9E...", ahora usas esta:
    emailjs.init("YeV2hn7sjNt9bgfv-");
})();

// 2. FUNCIÓN DE APERTURA DEL CHAT (Global)
window.toggleAdtChat = function() {
    const chat = document.getElementById('chatContainer');
    const iconBtn = document.getElementById('chatBtn');
    
    if (chat) {
        if (chat.style.display === 'none' || chat.style.display === '') {
            chat.style.display = 'block';
            if(iconBtn && iconBtn.querySelector('i')) {
                iconBtn.querySelector('i').className = 'bi bi-x-lg'; // Icono Cerrar
            }
        } else {
            chat.style.display = 'none';
            if(iconBtn && iconBtn.querySelector('i')) {
                iconBtn.querySelector('i').className = 'bi bi-chat-fill'; // Icono Chat
            }
        }
    }
};

document.addEventListener('DOMContentLoaded', () => {

    // ======================================================
    // A. HERO SLIDER (Solo Home)
    // ======================================================
    const slides = document.querySelectorAll('.hero__slide');
    const dots = document.querySelectorAll('.indicator');
    
    if (slides.length > 0 && dots.length > 0) {
        let currentSlide = 0;
        const intervalTime = 5000;

        function changeSlide(index) {
            slides[currentSlide].classList.remove('active');
            dots[currentSlide].classList.remove('active');
            currentSlide = index;
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
    }

    // ======================================================
    // B. ANIMACIONES SCROLL (Intersection Observer)
    // ======================================================
    const animateElements = document.querySelectorAll('.animate-up');
    
    if (animateElements.length > 0) {
        const observerOptions = { root: null, threshold: 0.1 };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        animateElements.forEach(el => { observer.observe(el); });
    }

    // ======================================================
    // C. MENÚ MÓVIL (Accesibilidad 100%)
    // ======================================================
    const menuCheckbox = document.getElementById('menu-toggle');
    const menuButton = document.querySelector('.header__hamburger');
    const menuLinks = document.querySelectorAll('.header__nav a');
    const closeBtn = document.querySelector('.header__close-btn');

    if (menuCheckbox && menuButton) {
        // Sincronizar ARIA y Scroll
        menuCheckbox.addEventListener('change', () => {
            const isExpanded = menuCheckbox.checked;
            menuButton.setAttribute('aria-expanded', isExpanded);
            document.body.style.overflow = isExpanded ? 'hidden' : '';
        });

        // Cerrar al hacer click en links
        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (menuCheckbox.checked) {
                    menuCheckbox.checked = false;
                    menuCheckbox.dispatchEvent(new Event('change')); 
                }
            });
        });

        // Teclado (Enter/Espacio) para abrir
        menuButton.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                menuCheckbox.checked = !menuCheckbox.checked;
                menuCheckbox.dispatchEvent(new Event('change'));
            }
        });

        // Teclado para cerrar (X)
        if(closeBtn) {
            closeBtn.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    menuCheckbox.checked = false;
                    menuCheckbox.dispatchEvent(new Event('change'));
                }
            });
        }
    }
    
    // Dropdowns Accesibles (Teclado)
    const dropdownToggles = document.querySelectorAll('.dropdown__checkbox');
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('change', function() {
            const label = this.nextElementSibling; 
            if (label) label.setAttribute('aria-expanded', this.checked);
        });
    });

    // ======================================================
    // D. INYECCIÓN DEL CHAT WIDGET
    // ======================================================
    if (!document.getElementById('chatContainer')) {
        const chatHTML = `
        <div class="adt-chat-system" role="complementary">
            <div class="adt-chat-box" id="chatContainer" style="display:none;" role="dialog" aria-label="Chat support">
                <div class="adt-chat-header" style="background:#223248; color:white; padding:15px; display:flex; align-items:center; gap:10px; border-radius:20px 20px 0 0;">
                    <div class="adt-avatar" style="position: relative; width:40px; height:40px; background:#f9ae39; border-radius:50%; display:flex; align-items:center; justify-content:center; color:#223248; font-weight:bold;">ADT<span style="position: absolute; bottom: 2px; right: 2px; width: 10px; height: 10px; background: #28a745; border: 2px solid #223248; border-radius: 50%;"></span></div>
                    <div style="flex-grow:1; text-align:left;">
                        <p style="margin:0; font-weight:bold; font-size:14px; line-height:1.2;">All Door Tech</p>
                        <small style="color:#f9ae39; font-size:11px;">Online Now</small>
                    </div>
                    <button onclick="window.toggleAdtChat()" aria-label="Close chat" style="background:none; border:none; color:white; font-size:22px; cursor:pointer; line-height:1;">&times;</button>
                </div>
                <div style="height:250px; background:#f0f2f5; padding:15px; overflow-y:auto;" id="chatBody">
                    <div style="background:white; padding:10px; border-radius:10px; font-size:13px; margin-bottom:10px; box-shadow:0 2px 4px rgba(0,0,0,0.05);">Hi! We are All Door Tech. How can we help you with your door project today?</div>
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
            <button class="adt-chat-trigger" onclick="window.toggleAdtChat()" id="chatBtn" aria-label="Open chat" aria-haspopup="true">
                <i class="bi bi-chat-fill"></i>
            </button>
        </div>`;
        document.body.insertAdjacentHTML('beforeend', chatHTML);
    }

    // ======================================================
    // E. LÓGICA DE ENVÍO DE FORMULARIOS (Universal)
    // ======================================================
    const serviceID = 'service_xok36xu'; 
    const masterTemplate = 'template_apv8d1c'; 

    const forms = [
        { id: 'chat-form', label: 'Chat Support' },
        { id: 'estimate-form', label: 'Estimate Request' },
        { id: 'service-form', label: 'Service Request' },
        { id: 'contact-form', label: 'Contact Form' },
        { id: 'feedback-form', label: 'Customer Feedback' }
    ];

    forms.forEach(item => {
        const formEl = document.getElementById(item.id);
        
        if (formEl) {
            formEl.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const btn = formEl.querySelector('button[type="submit"]');
                const originalText = btn.innerText;

                // Estado Cargando
                btn.innerText = 'Sending...';
                btn.style.opacity = '0.7';
                btn.disabled = true;

                const formData = new FormData(this);

                const templateParams = {
                    form_type: item.label,
                    first_name: formData.get('first_name'),
                    last_name: formData.get('last_name') || '',
                    email: formData.get('email'),
                    phone: formData.get('phone') || 'Not provided',
                    company_name: formData.get('company') || '',
                    address: formData.get('address') || '',
                    city: formData.get('city') || '',
                    zip_code: formData.get('zip_code') || '',
                    subject: formData.get('subject') || '',
                    find_us: formData.get('source') || '',
                    message: formData.get('message') || formData.get('feedback') || ''
                };

                emailjs.send(serviceID, masterTemplate, templateParams)
                    .then(() => {
                        // ÉXITO: PONE EL BOTÓN VERDE
                        btn.innerText = 'SENT SUCCESSFULLY!';
                        btn.style.backgroundColor = '#28a745';
                        btn.style.color = '#ffffff';
                        btn.style.borderColor = '#28a745';
                        
                        formEl.reset();

                        // Si es el chat, cerrar después de 2s
                        if(item.id === 'chat-form') {
                             setTimeout(() => { window.toggleAdtChat(); }, 2000);
                        }

                        // Restaurar botón después de 4s
                        setTimeout(() => {
                            btn.innerText = originalText;
                            btn.style.backgroundColor = ''; 
                            btn.style.color = '';
                            btn.style.borderColor = '';
                            btn.style.opacity = '1';
                            btn.disabled = false;
                        }, 4000);
                    }, (err) => {
                        console.error('Error:', err);
                        alert("Error sending message. Please try again.");
                        btn.innerText = originalText;
                        btn.style.opacity = '1';
                        btn.disabled = false;
                    });
            });
        }
    });

});
// Visor de Galería (Lightbox)
const initLightbox = () => {
    // 1. Crear el visor solo si no existe
    if (!document.getElementById('adt-lightbox')) {
        const lb = document.createElement('div');
        lb.id = 'adt-lightbox';
        
        // El HTML ahora es más limpio. Los estilos van al CSS.
        lb.innerHTML = `
            <button id="lb-prev" class="lb-control" aria-label="Previous image">&#10094;</button>
            <div class="lb-content">
                <img id="adt-lightbox-img" src="" alt="Enlarged door project">
            </div>
            <button id="lb-next" class="lb-control" aria-label="Next image">&#10095;</button>
            <span class="lb-close">&times;</span>
        `;
        document.body.appendChild(lb);
    }

    const lightbox = document.getElementById('adt-lightbox');
    const lightboxImg = document.getElementById('adt-lightbox-img');
    let images = [];
    let currentIndex = 0;

    const updateImage = (index) => {
        if (index < 0) index = images.length - 1;
        if (index >= images.length) index = 0;
        currentIndex = index;
        lightboxImg.src = images[currentIndex];
    };

    // 2. Event Delegation: Más eficiente
    document.addEventListener('click', (e) => {
        const clickedImg = e.target.closest('.adt-gallery-item img');
        
        if (clickedImg) {
            const allImgElements = Array.from(document.querySelectorAll('.adt-gallery-item img'));
            images = allImgElements.map(img => img.src);
            currentIndex = images.indexOf(clickedImg.src);

            updateImage(currentIndex);
            lightbox.classList.add('active'); // Usamos clases CSS en lugar de .style
            document.body.style.overflow = 'hidden';
        }

        // Cerrar si hace clic en el fondo o en la X
        if (e.target.id === 'adt-lightbox' || e.target.classList.contains('lb-close')) {
            lightbox.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });

    // 3. Controles de flechas
    document.getElementById('lb-prev').onclick = (e) => { e.stopPropagation(); updateImage(currentIndex - 1); };
    document.getElementById('lb-next').onclick = (e) => { e.stopPropagation(); updateImage(currentIndex + 1); };

    // 4. Control por Teclado
    document.addEventListener('keydown', (e) => {
        if (lightbox.classList.contains('active')) {
            if (e.key === "ArrowRight") updateImage(currentIndex + 1);
            if (e.key === "ArrowLeft") updateImage(currentIndex - 1);
            if (e.key === "Escape") {
                lightbox.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        }
    });
};

// Iniciar componentes al cargar el DOM
document.addEventListener('DOMContentLoaded', () => {
    initLightbox();

    // Actualizar año del footer
    const yearSpan = document.querySelector('[itemprop="copyrightYear"]');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
});
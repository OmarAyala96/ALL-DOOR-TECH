// ======================================================
// CONFIGURACIÓN CENTRAL (TUS CREDENCIALES)
// ======================================================
const EMAILJS_PUBLIC_KEY = "YeV2hn7sjNt9bgfv-"; // Tu Public Key
const EMAILJS_SERVICE_ID = "service_xok36xu"; // Tu Service ID
const EMAILJS_TEMPLATE_ID = "template_apv8d1c"; // Tu Template ID

// Inicialización básica (por si acaso)
(function() {
    if (typeof emailjs !== 'undefined') {
        emailjs.init(EMAILJS_PUBLIC_KEY);
    } else {
        console.error("Librería EmailJS no encontrada. Revisa tu HTML.");
    }
})();


// ======================================================
// 1. CHAT WIDGET & UI GLOBAL
// ======================================================

// Función Global para abrir/cerrar chat
window.toggleAdtChat = function() {
    const chat = document.getElementById('chatContainer');
    const iconBtn = document.getElementById('chatBtn');
    
    if (chat) {
        if (chat.style.display === 'none' || chat.style.display === '') {
            chat.style.display = 'block';
            if(iconBtn && iconBtn.querySelector('i')) {
                iconBtn.querySelector('i').className = 'bi bi-x-lg';
            }
        } else {
            chat.style.display = 'none';
            if(iconBtn && iconBtn.querySelector('i')) {
                iconBtn.querySelector('i').className = 'bi bi-chat-fill';
            }
        }
    }
};

document.addEventListener('DOMContentLoaded', () => {

    // A. INYECCIÓN DEL CHAT WIDGET
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

    // B. HEADER & MENÚ MÓVIL (Con Overlay)
    const menuCheckbox = document.getElementById('menu-toggle');
    if (menuCheckbox) {
        // Crear Overlay
        const overlay = document.createElement('label');
        overlay.className = 'header__overlay';
        overlay.setAttribute('for', 'menu-toggle');
        overlay.setAttribute('aria-hidden', 'true');
        menuCheckbox.insertAdjacentElement('afterend', overlay);

        // Bloquear scroll al abrir
        menuCheckbox.addEventListener('change', () => {
            document.body.style.overflow = menuCheckbox.checked ? 'hidden' : '';
        });

        // Cerrar al hacer click en enlaces
        document.querySelectorAll('.header__nav a').forEach(link => {
            link.addEventListener('click', () => {
                if(menuCheckbox.checked) menuCheckbox.click();
            });
        });
    }

    // C. ACTUALIZAR AÑO COPYRIGHT
    const yearSpan = document.querySelector('[itemprop="copyrightYear"]');
    if (yearSpan) yearSpan.textContent = new Date().getFullYear();

    // D. HERO SLIDER (Solo si existe en la página)
    const slides = document.querySelectorAll('.hero__slide');
    const dots = document.querySelectorAll('.indicator');
    if (slides.length > 0 && dots.length > 0) {
        let currentSlide = 0;
        const nextSlide = () => {
            slides[currentSlide].classList.remove('active');
            dots[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
            dots[currentSlide].classList.add('active');
        };
        let timer = setInterval(nextSlide, 5000);
        dots.forEach((dot, idx) => {
            dot.addEventListener('click', () => {
                clearInterval(timer);
                slides[currentSlide].classList.remove('active');
                dots[currentSlide].classList.remove('active');
                currentSlide = idx;
                slides[currentSlide].classList.add('active');
                dots[currentSlide].classList.add('active');
                timer = setInterval(nextSlide, 5000);
            });
        });
    }

    // E. ANIMACIONES SCROLL
    const animateElements = document.querySelectorAll('.animate-up');
    if (animateElements.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        animateElements.forEach(el => observer.observe(el));
    }

    // ======================================================
    // F. LÓGICA DE ENVÍO (EmailJS) - CORREGIDA
    // ======================================================
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

                // 1. Estado Cargando
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

                // 2. ENVIAR (Pasando la Key explícitamente para evitar error 400)
                emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams, EMAILJS_PUBLIC_KEY)
                    .then(() => {
                        // ÉXITO
                        btn.innerText = 'SENT!';
                        btn.style.backgroundColor = '#28a745';
                        btn.style.color = 'white';
                        formEl.reset();

                        if(item.id === 'chat-form') {
                             setTimeout(() => { window.toggleAdtChat(); }, 2000);
                        }
                        
                        // Restaurar
                        setTimeout(() => {
                            btn.innerText = originalText;
                            btn.style.backgroundColor = '';
                            btn.style.color = '';
                            btn.style.opacity = '1';
                            btn.disabled = false;
                        }, 3000);
                    })
                    .catch((err) => {
                        // ERROR
                        console.error('FAILED...', err);
                        alert("Error sending message. Check console for details.");
                        btn.innerText = originalText;
                        btn.style.opacity = '1';
                        btn.disabled = false;
                    });
            });
        }
    });
});

// ======================================================
// G. LIGHTBOX (Galería)
// ======================================================
const initLightbox = () => {
    if (document.getElementById('adt-lightbox')) return; // Evitar duplicados

    const lb = document.createElement('div');
    lb.id = 'adt-lightbox';
    Object.assign(lb.style, {
        display: 'none', position: 'fixed', zIndex: '100000',
        top: '0', left: '0', width: '100%', height: '100%',
        backgroundColor: 'rgba(0,0,0,0.95)', justifyContent: 'center',
        alignItems: 'center', cursor: 'pointer'
    });
    lb.innerHTML = `
        <button id="lb-prev" style="position:absolute; left:20px; background:none; border:none; color:white; font-size:50px; cursor:pointer; z-index:100001;">&#10094;</button>
        <img id="adt-lightbox-img" src="" style="max-width:85%; max-height:80vh; border:3px solid #f9ae39; border-radius:12px; transition: transform 0.3s; cursor:default;">
        <button id="lb-next" style="position:absolute; right:20px; background:none; border:none; color:white; font-size:50px; cursor:pointer; z-index:100001;">&#10095;</button>
        <span style="position:absolute; top:20px; right:30px; color:white; font-size:40px; cursor:pointer;">&times;</span>
    `;
    document.body.appendChild(lb);

    const imgEl = document.getElementById('adt-lightbox-img');
    let images = [], currentIndex = 0;

    const updateImage = (idx) => {
        if (idx < 0) idx = images.length - 1;
        if (idx >= images.length) idx = 0;
        currentIndex = idx;
        imgEl.src = images[currentIndex];
    };

    document.addEventListener('click', (e) => {
        const clickedImg = e.target.closest('.adt-gallery-item img');
        if (clickedImg) {
            images = Array.from(document.querySelectorAll('.adt-gallery-item img')).map(img => img.src);
            currentIndex = images.indexOf(clickedImg.src);
            updateImage(currentIndex);
            lb.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        }
    });

    document.getElementById('lb-prev').onclick = (e) => { e.stopPropagation(); updateImage(currentIndex - 1); };
    document.getElementById('lb-next').onclick = (e) => { e.stopPropagation(); updateImage(currentIndex + 1); };
    lb.onclick = () => { lb.style.display = 'none'; document.body.style.overflow = ''; };
    
    document.addEventListener('keydown', (e) => {
        if (lb.style.display === 'flex') {
            if (e.key === "ArrowRight") updateImage(currentIndex + 1);
            if (e.key === "ArrowLeft") updateImage(currentIndex - 1);
            if (e.key === "Escape") lb.click();
        }
    });
};

// Iniciar Lightbox
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLightbox);
} else {
    initLightbox();
}
// 1. Inicialización de EmailJS con tu Public Key real
emailjs.init("A1SeiTh9E-maUoJXc"); //

document.addEventListener("DOMContentLoaded", function() {
    
    // --- SECCIÓN CHAT FLOTANTE ---
    const chatHTML = `
    <div class="adt-chat-system">
        <div class="adt-chat-box" id="chatContainer" style="display:none;">
            <div class="adt-chat-header" style="background:#223248; color:white; padding:15px; display:flex; align-items:center; gap:10px; border-radius:20px 20px 0 0;">
                <div class="adt-avatar" style="position: relative; width:40px; height:40px; background:#f9ae39; border-radius:50%; display:flex; align-items:center; justify-content:center; color:#223248; font-weight:bold;">RC<span style="position: absolute; bottom: 2px; right: 2px; width: 10px; height: 10px; background: #28a745; border: 2px solid #223248; border-radius: 50%;"></span></div>
                <div style="flex-grow:1; text-align:left;">
                    <p style="margin:0; font-weight:bold; font-size:14px; line-height:1.2;">Raul Cortez</p>
                    <small style="color:#f9ae39; font-size:11px;">Online Now</small>
                </div>
                <button onclick="toggleAdtChat()" style="background:none; border:none; color:white; font-size:22px; cursor:pointer; line-height:1;">&times;</button>
            </div>
            <div style="height:250px; background:#f0f2f5; padding:15px; overflow-y:auto;" id="chatBody">
                <div style="background:white; padding:10px; border-radius:10px; font-size:13px; margin-bottom:10px; box-shadow:0 2px 4px rgba(0,0,0,0.05);">Hi! I'm Raul. How can I help you today?</div>
            </div>
            <div style="padding:15px; background:white; border-radius:0 0 20px 20px;">
                <form id="chat-form">
                    <input type="text" name="first_name" placeholder="Your Name" required style="width:100%; margin-bottom:8px; padding:10px; border:1px solid #ddd; border-radius:8px; font-size:13px;">
                    <input type="email" name="email" placeholder="Email Address" required style="width:100%; margin-bottom:8px; padding:10px; border:1px solid #ddd; border-radius:8px; font-size:13px;">
                    <textarea name="message" placeholder="How can we help?" required style="width:100%; margin-bottom:8px; padding:10px; border:1px solid #ddd; border-radius:8px; font-size:13px; resize:none;" rows="2"></textarea>
                    <button type="submit" style="width:100%; background:#223248; color:#f9ae39; border:2px solid #f9ae39; padding:10px; border-radius:8px; font-weight:bold; cursor:pointer;">SEND MESSAGE</button>
                </form>
            </div>
        </div>
        <button class="adt-chat-trigger" onclick="toggleAdtChat()" id="chatBtn"><i class="bi bi-chat-fill"></i></button>
    </div>`;

    document.body.insertAdjacentHTML('beforeend', chatHTML); //

    // --- LÓGICA DE ENVÍO UNIFICADA ---
    const serviceID = 'service_h07rzvh'; //
    const masterTemplate = 'template_m2b86ep'; //
    const chatTemplate = 'template_5ni0dos';   // Template específico para el chat

    const forms = [
        { id: 'chat-form', template: chatTemplate },
        { id: 'estimate-form', template: masterTemplate },
        { id: 'service-form', template: masterTemplate },
        { id: 'contact-form', template: masterTemplate },
        { id: 'feedback-form', template: masterTemplate }
    ]; //

    forms.forEach(item => {
        const formEl = document.getElementById(item.id);
        if (formEl) {
            formEl.addEventListener('submit', function(e) {
                e.preventDefault();
                e.stopImmediatePropagation(); // Evita el envío doble

                const btn = formEl.querySelector('button[type="submit"]');
                const originalText = btn.innerText;

                // VALIDACIÓN DE TAMAÑO DE ARCHIVO (Límite 50KB para plan gratuito)
                const fileInput = formEl.querySelector('input[type="file"]');
                if (fileInput && fileInput.files.length > 0) {
                    const fileSize = fileInput.files[0].size / 1024; // Convertir a KB
                    if (fileSize > 50) {
                        alert("File too large (Max 50KB for free plan). Please send photos via WhatsApp."); //
                        return; // Detiene el envío si es muy pesado
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
                        alert("Error: " + JSON.stringify(err));
                        btn.innerText = originalText;
                        btn.disabled = false;
                    });
            });
        }
    });
});

// Función para abrir/cerrar el chat
function toggleAdtChat() {
    const chat = document.getElementById('chatContainer');
    const iconBtn = document.getElementById('chatBtn');
    if (!chat) return;
    const isHidden = chat.style.display === 'none' || chat.style.display === '';
    chat.style.display = isHidden ? 'block' : 'none';
    if(iconBtn.querySelector('i')) {
        iconBtn.querySelector('i').className = isHidden ? 'bi bi-x-lg' : 'bi bi-chat-fill';
    }
}
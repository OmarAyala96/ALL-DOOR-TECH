// js/main.js

// 1. Inicializa EmailJS con tu Public Key
emailjs.init("A1SeiTh9E-maUoJXc"); 

document.addEventListener("DOMContentLoaded", function() {
    
    // 2. Inyectamos el HTML del chat con el diseño de All Door Tech
    const chatHTML = `
    <div class="adt-chat-system">
        <div class="adt-chat-box" id="chatContainer" style="display:none;">
            <div class="adt-chat-header" style="background:#223248; color:white; padding:15px; display:flex; align-items:center; gap:10px; border-radius:20px 20px 0 0;">
                <div class="adt-avatar" style="position: relative; width:40px; height:40px; background:#f9ae39; border-radius:50%; display:flex; align-items:center; justify-content:center; color:#223248; font-weight:bold;">
                    RC
                    <span style="position: absolute; bottom: 2px; right: 2px; width: 10px; height: 10px; background: #28a745; border: 2px solid #223248; border-radius: 50%;"></span>
                </div>
                <div style="flex-grow:1; text-align:left;">
                    <p style="margin:0; font-weight:bold; font-size:14px; line-height:1.2;">Raul Cortez</p>
                    <small style="color:#f9ae39; font-size:11px;">Online Now</small>
                </div>
                <button onclick="toggleAdtChat()" style="background:none; border:none; color:white; font-size:22px; cursor:pointer; line-height:1;">&times;</button>
            </div>

            <div style="height:250px; background:#f0f2f5; padding:15px; overflow-y:auto;" id="chatBody">
                <div style="background:white; padding:10px; border-radius:10px; font-size:13px; margin-bottom:10px; box-shadow:0 2px 4px rgba(0,0,0,0.05);">
                    Hi! I'm Raul. How can I help you with your door project today?
                </div>
                <div style="background:white; padding:10px; border-radius:10px; font-size:13px; margin-bottom:10px; box-shadow:0 2px 4px rgba(0,0,0,0.05);">
                    Please leave your contact info (Email or Phone) below.
                </div>
            </div>

            <div style="padding:15px; background:white; border-radius:0 0 20px 20px;">
                <form id="contact-form">
                    <input type="text" name="name" placeholder="Your Name" required style="width:100%; margin-bottom:8px; padding:10px; border:1px solid #ddd; border-radius:8px; font-size:13px;">
                    <input type="text" name="email" placeholder="Email or Phone Number" required style="width:100%; margin-bottom:8px; padding:10px; border:1px solid #ddd; border-radius:8px; font-size:13px;">
                    <textarea name="message" placeholder="How can we help?" required style="width:100%; margin-bottom:8px; padding:10px; border:1px solid #ddd; border-radius:8px; font-size:13px; resize:none;" rows="2"></textarea>
                    
                    <button type="submit" id="btn-send" style="width:100%; background:#223248; color:#f9ae39; border:2px solid #f9ae39; padding:10px; border-radius:8px; font-weight:bold; cursor:pointer; transition: all 0.3s ease;">SEND MESSAGE</button>
                </form>
            </div>
        </div>

        <button class="adt-chat-trigger" onclick="toggleAdtChat()" id="chatBtn">
            <i class="bi bi-chat-fill"></i>
        </button>
    </div>`;

    document.body.insertAdjacentHTML('beforeend', chatHTML);

    const form = document.getElementById('contact-form');
    const btnSend = document.getElementById('btn-send');
    const chatBody = document.getElementById('chatBody');

    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault(); 

            // Estado: Enviando...
            btnSend.innerText = 'Sending...';
            btnSend.disabled = true;

            const serviceID = 'service_h07rzvh'; 
            const templateID = 'template_5ni0dos'; 

            emailjs.sendForm(serviceID, templateID, this)
                .then(() => {
                    // 1. Feedback visual en el botón (Verde)
                    btnSend.innerText = 'SENT SUCCESSFULLY!';
                    btnSend.style.background = '#28a745'; 
                    btnSend.style.borderColor = '#28a745';
                    btnSend.style.color = '#ffffff';

                    // 2. Insertar burbuja de éxito en el chat
                    const successMsg = document.createElement('div');
                    successMsg.style.cssText = "background:#28a745; color:white; padding:10px; border-radius:10px; font-size:13px; margin-bottom:10px; box-shadow:0 2px 4px rgba(0,0,0,0.05); text-align:center; font-weight:bold;";
                    successMsg.innerText = "Message sent! We'll contact you shortly.";
                    chatBody.appendChild(successMsg);
                    chatBody.scrollTop = chatBody.scrollHeight;

                    // 3. Pausa prolija antes de cerrar (Sin cuadro negro)
                    setTimeout(() => {
                        form.reset();
                        
                        // Restaurar botón
                        btnSend.innerText = 'SEND MESSAGE';
                        btnSend.style.background = '#223248';
                        btnSend.style.borderColor = '#f9ae39';
                        btnSend.style.color = '#f9ae39';
                        btnSend.disabled = false;
                        
                        toggleAdtChat(); // Cierra el chat solo
                        successMsg.remove();
                    }, 2500);

                }, (err) => {
                    btnSend.innerText = 'SEND MESSAGE';
                    btnSend.disabled = false;
                    alert("Error: " + JSON.stringify(err));
                });
        });
    }
});

function toggleAdtChat() {
    const chat = document.getElementById('chatContainer');
    const iconBtn = document.getElementById('chatBtn');
    
    if (chat.style.display === 'none' || chat.style.display === '') {
        chat.style.display = 'block';
        if(iconBtn.querySelector('i')) iconBtn.querySelector('i').classList.replace('bi-chat-fill', 'bi-x-lg');
    } else {
        chat.style.display = 'none';
        if(iconBtn.querySelector('i')) iconBtn.querySelector('i').classList.replace('bi-x-lg', 'bi-chat-fill');
    }
}
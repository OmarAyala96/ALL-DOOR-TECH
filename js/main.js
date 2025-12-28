// js/main.js

// Esperar a que la página cargue
document.addEventListener("DOMContentLoaded", function() {
    
    // --- LÓGICA DEL CHAT ---
    // 1. Inyectamos el HTML del chat automáticamente
    const chatHTML = `
    <div class="adt-chat-system">
        <div class="adt-chat-box" id="chatContainer" style="display:none;">
            <div class="adt-chat-header" style="background:#223248; color:white; padding:15px; display:flex; align-items:center; gap:10px; border-radius:20px 20px 0 0;">
                <div style="width:40px; height:40px; background:#f9ae39; border-radius:50%; display:flex; align-items:center; justify-content:center; color:#223248; font-weight:bold;">RC</div>
                <div style="flex-grow:1; text-align:left;">
                    <p style="margin:0; font-weight:bold; font-size:14px;">Raul Cortez</p>
                    <small style="color:#f9ae39; font-size:11px;">Support Online</small>
                </div>
                <button onclick="toggleAdtChat()" style="background:none; border:none; color:white; font-size:22px; cursor:pointer;">&times;</button>
            </div>
            <div style="height:250px; background:#f0f2f5; padding:15px; overflow-y:auto;" id="chatBody">
                <div style="background:white; padding:10px; border-radius:10px; font-size:13px; margin-bottom:10px; box-shadow:0 2px 4px rgba(0,0,0,0.05);">
                    Hi! I'm Raul. How can I help you with your door project?
                </div>
            </div>
            <div style="padding:15px; background:white; border-radius:0 0 20px 20px;">
             action="https://formspree.io/f/xvzobnbq"
             method="POST">

                    <input type="text" name="name" placeholder="Name" required style="width:100%; margin-bottom:8px; padding:10px; border:1px solid #ddd; border-radius:8px; font-size:13px;">
                    <input type="email" name="email" placeholder="Email" required style="width:100%; margin-bottom:8px; padding:10px; border:1px solid #ddd; border-radius:8px; font-size:13px;">
                    <textarea name="message" placeholder="Message..." required style="width:100%; margin-bottom:8px; padding:10px; border:1px solid #ddd; border-radius:8px; font-size:13px;"></textarea>
                    <button type="submit" style="width:100%; background:#223248; color:#f9ae39; border:2px solid #f9ae39; padding:10px; border-radius:8px; font-weight:bold; cursor:pointer;">SEND MESSAGE</button>
                </form>
            </div>
        </div>
        <button class="adt-chat-trigger" onclick="toggleAdtChat()" id="chatBtn">
            <i class="bi bi-chat-fill"></i>
        </button>
    </div>`;

    // 2. Insertar el HTML al final de cada página
    document.body.insertAdjacentHTML('beforeend', chatHTML);

    // Aquí puedes añadir más cosas que quieras que pasen al cargar la página
});

// 3. Función global para abrir/cerrar (fuera del DOMContentLoaded para que sea accesible)
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
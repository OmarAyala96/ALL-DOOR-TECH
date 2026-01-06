const { PurgeCSS } = require('purgecss');
const fs = require('fs');

(async () => {
  console.log("⏳ Iniciando limpieza V4 (Corrección de Rutas y Hero)...");

  const purgeCSSResult = await new PurgeCSS().purge({
    // 1. CORRECCIÓN CRÍTICA DE RUTAS:
    // Usamos '**/*.html' para buscar en TODAS las subcarpetas (pages, forms, doors, etc.)
    content: [
      './**/*.html', 
      './js/**/*.js'
    ],

    // 2. Tu CSS original
    css: ['css/styles.css'],

    // 3. LISTA BLINDADA MEJORADA
    safelist: {
      standard: [
        'body', 'html', 
        'active', 'show', 'fade', 
        'collapsing', 'collapsed', 'open', 'is-active',
        'nav-link', 'navbar-collapse', 'dropdown-menu',
        'sticky-top', 'fixed-top', 'scrolled', 'header-scrolled',
        'parallax', 'bg-fixed', 
        // Etiquetas HTML vitales para formularios
        'form', 'input', 'textarea', 'select', 'button', 'label', 'option'
      ],
      deep: [
        // --- CORRECCIÓN SERVICE HERO ---
        // Cambiamos /^hero-/ por /hero/ para que salve 'service-hero'
        /hero/, 
        /^banner/, /^side/, // Para el banner y los lados
        
        // --- FORMULARIOS (Reforzado) ---
        /^f-/,          // Salva f-name, f-email, f-address
        /^form/,        // Salva form__container, form__title (quitamos el __ estricto)
        /^select-/,     
        /^submit-/,     
        /^input-/,      
        
        // --- ESTRUCTURA Y GRID (Bootstrap) ---
        /^col/, /^row/, /^container/, /^d-/, // 'd-' salva d-flex, d-block, d-none
        /^position-/,   // VITAL: salva position-relative/absolute (evita que el form se bloquee)
        /^z-/,          // VITAL: salva z-index
        
        // --- FLEXBOX Y ALINEACIÓN ---
        /^flex-/, /^align-/, /^justify-/, /^gap-/, /^order-/,

        // --- TAMAÑOS Y ESPACIADO ---
        /^w-/, /^h-/, /^m-/, /^p-/, /^g-/,

        // --- ESTILOS GENERALES ---
        /^text-/, /^bg-/, /^border-/, /^shadow-/, /^rounded-/,
        /^overflow-/,   // Para tu overflow-wrap
        
        // --- ICONOS ---
        /^bi-/, /^fa-/,

        // --- TUS CLASES PROPIAS ---
        /^sub-nav-/, /^mobile-nav-/, /^scroll-/, /^nav-pill-/, /^pill-/, /^fixed-/,
        /^header-/, /^adt-/, /^gallery-/, /^portfolio-/, /^chat-/, /^contact-/, /^cert-/,
        /^cta-/         // Para la sección 'contact-cta'
      ],
      greedy: [],
      keyframes: true,
      variables: true
    }
  });

  // Verificación de seguridad
  if (purgeCSSResult.length > 0) {
      const cssLimpio = purgeCSSResult[0].css;
      fs.writeFileSync('css/style-limpio.css', cssLimpio);
      
      // Cálculo de ahorro (Opcional pero útil para ver si funciona)
      const statsOriginal = fs.statSync('css/styles.css');
      const statsLimpio = fs.statSync('css/style-limpio.css');
      console.log(`✅ ¡LISTO! CSS regenerado.`);
      console.log(`Original: ${(statsOriginal.size / 1024).toFixed(2)} KB`);
      console.log(`Limpio:   ${(statsLimpio.size / 1024).toFixed(2)} KB`);
  } else {
      console.error("❌ Error: PurgeCSS no generó ningún resultado. Revisa las rutas.");
  }

})();
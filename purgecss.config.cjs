module.exports = {
  // 1. Dónde mirar (Incluimos JS para que detecte clases dinámicas)
  content: [
    '*.html',
    'js/*.js' 
  ],

  // 2. Tu archivo CSS original
  css: ['css/styles.css'],

  // 3. Dónde guardar el limpio
  output: 'css/style-limpio.css',

  // 4. LISTA DE PROTECCIÓN (La Magia)
  safelist: {
    standard: [
      'active', 'show', 'fade', 'collapsing', 'collapsed', 
      'nav-link', 'navbar-collapse', 'dropdown-menu', 
      'open', 'is-active', 'scrolled', 'header-scrolled',
      'body', 'html'
    ],
    // "deep" usa patrones (Regex).
    // Esto dice: "Salva TODO lo que empiece por..."
    deep: [
      /^col-/,       // Salva TODAS las columnas (Grid) -> Arregla el Hero y Galería
      /^row/,        // Salva las filas
      /^container/,  // Salva los contenedores
      /^btn-/,       // Salva todos los botones
      /^nav-/,       // Salva menús
      /^navbar-/,    // Salva barra de navegación
      /^dropdown-/,  // Salva desplegables
      /^modal-/,     // Salva popups
      /^carousel-/,  // Salva sliders
      /^d-/,         // Salva display (d-none, d-block, d-flex) -> Vital para responsive
      /^bg-/,        // Salva fondos de color
      /^text-/,      // Salva alineación de texto y colores
      /^m-/, /^p-/,  // Salva márgenes y paddings
      /^aos-/,       // Salva animaciones (AOS library)
      /^gallery-/,   // Intento salvar tu galería
      /^portfolio-/, // Intento salvar tu portafolio
      /^chat-/,      // Intento salvar tu chat
      /^bi-/         // Salva iconos de Bootstrap
    ],
    greedy: [],
    keyframes: true, // Salva animaciones CSS (@keyframes)
    variables: true  // Salva variables de color (--primary-orange, etc)
  }
}
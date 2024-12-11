// main.js
// Obtener referencias a los elementos del DOM
const menuPrincipal = document.getElementById('menu-principal');
const reglas = document.getElementById('reglas');
const elegirAvatar = document.getElementById('elegir-avatar');
const ajustes = document.getElementById('ajustes');
const juego = document.getElementById('juego');
const btnVolverDesdeJuego = document.getElementById('btn-volver-menu-desde-juego');

// Botones del menú principal
const btnReglas = document.getElementById('btn-reglas');
const btnAvatar = document.getElementById('btn-avatar');
const btnAjustes = document.getElementById('btn-ajustes');
const btnIniciar = document.getElementById('btn-iniciar');

// Botones para volver al menú
const btnVolverDesdeReglas = document.getElementById('btn-volver-menu-desde-reglas');
const btnVolverDesdeAvatar = document.getElementById('btn-volver-menu-desde-avatar');
const btnVolverDesdeAjustes = document.getElementById('btn-volver-menu-desde-ajustes');

// Función para mostrar una sección y ocultar las demás
function mostrarSeccion(seccion) {
  const secciones = [menuPrincipal, reglas, elegirAvatar, ajustes, juego];
  secciones.forEach(sec => {
    sec.classList.add('section-hidden');
    sec.classList.remove('section-visible');
  });
  seccion.classList.add('section-visible');
  seccion.classList.remove('section-hidden');
}

// Event Listeners para los botones
btnReglas.addEventListener('click', () => mostrarSeccion(reglas));
btnAvatar.addEventListener('click', () => mostrarSeccion(elegirAvatar));
btnAjustes.addEventListener('click', () => mostrarSeccion(ajustes));
btnIniciar.addEventListener('click', () => {
  const cantidadJugadores = document.getElementById('select-jugadores').value;
  localStorage.setItem('cantidadJugadores', cantidadJugadores);
  window.location.href = 'game.html'; // Cambia a la ruta relativa correcta
});

btnVolverDesdeReglas.addEventListener('click', () => mostrarSeccion(menuPrincipal));
btnVolverDesdeAvatar.addEventListener('click', () => mostrarSeccion(menuPrincipal));
btnVolverDesdeAjustes.addEventListener('click', () => mostrarSeccion(menuPrincipal));
btnVolverDesdeJuego.addEventListener('click', () => {
  location.reload(); // Recarga la página para reiniciar el juego
});

// Seleccionar elementos del DOM
const avatarContainer = document.getElementById('avatar-container');
const selectedAvatarContainer = document.getElementById('selected-avatar');


// Variable para almacenar el avatar seleccionado
let avatarSeleccionado = null;

// Agregar evento de clic a las imágenes de avatares
avatarContainer.addEventListener('click', (event) => {
  if (event.target.classList.contains('avatar')) {
    // Obtener el avatar seleccionado
    avatarSeleccionado = event.target.getAttribute('src');

    // Resaltar el avatar seleccionado
    document.querySelectorAll('.avatar').forEach(avatar => {
      avatar.style.border = '2px solid transparent';
    });
    event.target.style.border = '2px solid #FFA901';

   // Mostrar el avatar seleccionado
   selectedAvatarContainer.innerHTML = `
   <p>Has seleccionado el siguiente avatar:</p>
   <img src="${avatarSeleccionado}" alt="Avatar Seleccionado">
 `;
  }
});

// Objeto con las traducciones de los textos
const traducciones = {
  es: {
    menuPrincipal: "Doctums",
    reglas: "Reglas",
    elegirAvatar: "Elegir Avatar",
    ajustesJuego: "Ajustes del juego",
    iniciarJuego: "Iniciar el juego",
    turnoJugador: "Turno del jugador",
    seleccionaIdioma: "Seleccionar idioma:",
    volverMenu: "Volver al menú",
  },
  en: {
    menuPrincipal: "Doctums",
    reglas: "Rules",
    elegirAvatar: "Choose Avatar",
    ajustesJuego: "Game Settings",
    iniciarJuego: "Start Game",
    turnoJugador: "Player's Turn",
    seleccionaIdioma: "Select language:",
    volverMenu: "Back to Menu",
  },
  pt: {
    menuPrincipal: "Doctums",
    reglas: "Regras",
    elegirAvatar: "Escolher Avatar",
    ajustesJuego: "Configurações do jogo",
    iniciarJuego: "Iniciar o jogo",
    turnoJugador: "Vez do jogador",
    seleccionaIdioma: "Selecionar idioma:",
    volverMenu: "Voltar ao menu",
  },
};

// Función para cambiar el idioma de los textos
function cambiarIdioma(idioma) {
  // Actualizar los textos según el idioma seleccionado
  document.querySelector("#menu-principal h2").textContent = traducciones[idioma].menuPrincipal;
  document.getElementById("btn-reglas").textContent = traducciones[idioma].reglas;
  document.getElementById("btn-avatar").textContent = traducciones[idioma].elegirAvatar;
  document.getElementById("btn-ajustes").textContent = traducciones[idioma].ajustesJuego;
  document.getElementById("btn-iniciar").textContent = traducciones[idioma].iniciarJuego;
  document.querySelector("#ajustes h2").textContent = traducciones[idioma].ajustesJuego;
  document.querySelector("label[for='language-select']").textContent = traducciones[idioma].seleccionaIdioma;
  document.getElementById("btn-volver-menu-desde-ajustes").textContent = traducciones[idioma].volverMenu;

  // Actualizar texto dinámico del juego (si ya está iniciado)
  if (infoTurno) {
    infoTurno.textContent = `${traducciones[idioma].turnoJugador} ${jugadores[turnoActual].id}`;
  }
}

// Escuchar el cambio de idioma
const selectIdioma = document.getElementById("language-select");
selectIdioma.addEventListener("change", (event) => {
  const idiomaSeleccionado = event.target.value;
  cambiarIdioma(idiomaSeleccionado);
});



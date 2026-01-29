let respuestasCorrectas = 0;
let aciertosNivel2 = 0;

// Referencias a las pantallas
const pantallaPortada = document.getElementById('pantalla-portada');
const pantallaMapa = document.getElementById('pantalla-mapa');
const pantallaNivel1 = document.getElementById('pantalla-nivel1');
const pantallaNivel2 = document.getElementById('pantalla-nivel2');

function hablar(texto) {
    const mensaje = new SpeechSynthesisUtterance(texto);
    const musica = document.getElementById('musica-fondo');

    mensaje.onstart = () => { if(musica) musica.volume = 0.1; }; // Baja el volumen
    mensaje.onend = () => { if(musica) musica.volume = 0.4; };   // Sube el volumen

    window.speechSynthesis.speak(mensaje);
}

// 1. PASAR DE PORTADA A MAPA
document.getElementById('btn-ir-mapa').addEventListener('click', () => {
    // Referencia y reproducción de la música
    const musica = document.getElementById('musica-fondo');
    if (musica) {
        musica.play();
        musica.volume = 0.3; // Volumen inicial suave
    }

    // Cambio de pantalla
    pantallaPortada.style.display = 'none';
    pantallaMapa.style.display = 'block';
});

// 2. PASAR DE MAPA A NIVEL 1
document.getElementById('btn-ir-nivel1').addEventListener('click', () => {
    pantallaMapa.style.display = 'none';
    pantallaNivel1.style.display = 'block';
    setTimeout(() => {
        hablar("¡Encuentra los círculos rojos! Toca los que tengan el pez rojo.");
    }, 500);
});

// --- LÓGICA NIVEL 1 ---
function marcarCorrecto(elemento) {
    if (!elemento.classList.contains('marcado')) {
        elemento.classList.add('marcado');
        respuestasCorrectas++;
        hablar("¡Excelente!");
        elemento.style.backgroundColor = "rgba(0, 255, 0, 0.5)"; 
    }
}

function marcarError(elemento) {
    const xError = document.getElementById('feedback-error');
    hablar("¡Oh no, ese no es!");
    xError.style.display = 'block';
    setTimeout(() => { xError.style.display = 'none'; }, 1000);
}

// ESTA ES LA FUNCIÓN ÚNICA PARA VALIDAR EL NIVEL 1
function validarVictoria() {
    if (respuestasCorrectas >= 2) {
        hablar("¡Excelente! Has encontrado los peces rojos. Ahora vamos al nivel 2.");
        crearConfeti();
        
        setTimeout(() => {
            pantallaNivel1.style.display = 'none';
            pantallaNivel2.style.display = 'block';
            // Reset de confeti para el siguiente nivel
            document.getElementById('confeti-container').innerHTML = '';
            hablar("Nivel 2. ¡Busca los cuadrados amarillos y tócalos!");
        }, 3500);
    } else {
        hablar("Todavía te faltan encontrar círculos rojos.");
    }
}

// --- LÓGICA NIVEL 2 ---
function marcarCorrectoNivel2(elemento) {
    if (!elemento.classList.contains('marcado')) {
        elemento.classList.add('marcado');
        aciertosNivel2++;
        hablar("¡Muy bien! Cuadrado amarillo encontrado.");
        elemento.style.backgroundColor = "#fff"; 
        elemento.style.boxShadow = "0 0 30px yellow";
    }
}

function ganarJuego() {
    if (aciertosNivel2 >= 2) {
        hablar("¡Felicidades! Has completado todos los niveles. ¡Eres un experto!");
        crearConfeti();
        setTimeout(() => {
            alert("¡FIN DEL JUEGO! Gracias por ayudar al dragón.");
            location.reload(); 
        }, 5000);
    } else {
        hablar("Busca los dos cuadrados amarillos antes de continuar.");
    }
}

// Función de Confeti
function crearConfeti() {
    const container = document.getElementById('confeti-container');
    for (let i = 0; i < 50; i++) {
        const div = document.createElement('div');
        div.className = 'confeti';
        div.style.left = Math.random() * 100 + 'vw';
        div.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
        div.style.position = 'absolute';
        div.style.width = '10px';
        div.style.height = '10px';
        div.style.top = '-10px';
        div.style.animation = `caer ${Math.random() * 2 + 2}s linear forwards`;
        container.appendChild(div);
    }
}

let aciertosNivel3 = 0;

// --- ACTUALIZA ESTA FUNCIÓN (Reemplaza la que tenías del Nivel 2) ---
function ganarJuego() {
    if (aciertosNivel2 >= 2) {
        hablar("¡Increíble! Encontraste los cuadrados. ¡Ya casi terminamos!");
        crearConfeti();
        
        setTimeout(() => {
            document.getElementById('pantalla-nivel2').style.display = 'none';
            document.getElementById('pantalla-nivel3').style.display = 'block';
            document.getElementById('confeti-container').innerHTML = ''; // Limpiar confeti
            hablar("Nivel 3. ¡Busca los  triángulos verdes y tócalos!");
        }, 3500);
    } else {
        hablar("Busca los cuadrados amarillos antes de continuar.");
    }
}

// --- LÓGICA PARA EL NIVEL 3 ---
function marcarCorrectoNivel3(elemento) {
    if (!elemento.classList.contains('marcado')) {
        elemento.classList.add('marcado');
        aciertosNivel3++;
      ;
        
        // Pequeña animación de salto
        elemento.style.transform = "translateY(-20px)";
        setTimeout(() => { elemento.style.transform = "translateY(0)"; }, 200);
    }
}

// --- REEMPLAZA TU FUNCIÓN finalizarAventura POR ESTA ---
function finalizarAventura() {
    if (aciertosNivel3 >= 2) {
        hablar("¡Increíble! Has superado los tres retos iniciales. ¡Mira, el mapa se ha actualizado!");
        crearConfeti();
        
        setTimeout(() => {
            // Ocultamos el nivel 3 y mostramos el nuevo mapa
            document.getElementById('pantalla-nivel3').style.display = 'none';
            document.getElementById('pantalla-mapa2').style.display = 'block';
            document.getElementById('confeti-container').innerHTML = ''; 
            
            hablar("¡Bienvenido a la Cueva de las Estrellas! Haz clic en la flecha para continuar.");
        }, 4000);
    } else {
        hablar("Aún quedan triángulos verdes por encontrar.");
    }
}


// --- LÓGICA PARA EL MAPA 2 Y NIVEL 4 ---

// Esta función debe existir UNA SOLA VEZ
function irAlNivel4() {
    // 1. Ocultamos el mapa 2
    document.getElementById('pantalla-mapa2').style.display = 'none';
    
    // 2. Mostramos el juego del tren
    document.getElementById('pantalla-nivel4').style.display = 'block';
    
    // 3. Audio con la instrucción clara
    hablar("¡Bienvenido al tren de colores! Toca los vagones en orden: uno, dos y tres, para armar el tren.");
}

// Asegúrate de que la variable piezasUnidas esté declarada solo una vez arriba
let piezasUnidas = 0; 

function unirPieza(elemento, orden) {
    if (elemento.classList.contains('encajado')) return;

    if (orden === piezasUnidas + 1) {
        elemento.classList.add('encajado');
        piezasUnidas++;
        
        const hueco = document.getElementById(`hueco-${orden}`);
        hueco.style.backgroundColor = window.getComputedStyle(elemento).backgroundColor;
        hueco.style.border = "none";
        hueco.innerHTML = elemento.innerHTML;
        
        elemento.style.opacity = "0.3";
        hablar("¡Muy bien!");

        if (piezasUnidas === 3) {
            hablar("¡Excelente! El tren está listo para partir.");
            document.getElementById('btn-final-total').style.display = 'flex';
            crearConfeti();
        }
    } else {
        hablar("Ese vagón todavía no va ahí. Busca el número " + (piezasUnidas + 1));
    }
}
// --- LÓGICA FINAL (MAPA 2 Y NIVEL 4) ---

// Asegúrate de declarar estas variables UNA SOLA VEZ al inicio de tu script.js

let estrellasUnidas = 0;

// FUNCIONES DE NAVEGACIÓN
function irAlNivel4() {
    document.getElementById('pantalla-mapa2').style.display = 'none';
    document.getElementById('pantalla-nivel4').style.display = 'block';
    hablar("¡Bienvenido al tren de las anguilas! Toca los vagones en orden: uno, dos y tres.");
}

function irAlNivel5() {
    // 1. Ocultar nivel 4
    document.getElementById('pantalla-nivel4').style.display = 'none';
    // 2. Mostrar nivel 5
    document.getElementById('pantalla-nivel5').style.display = 'block';
    // 3. Limpiar confeti previo
    document.getElementById('confeti-container').innerHTML = '';
    // 4. Instrucción
    hablar("¡Nivel 5! Ahora forma el tren de estrellas mágicas. Toca el uno, el dos y el tres.");
}

// LÓGICA NIVEL 4 (Vagones)
function unirPieza(elemento, orden) {
    if (elemento.classList.contains('encajado')) return;

    if (orden === piezasUnidas + 1) {
        elemento.classList.add('encajado');
        piezasUnidas++;
        
        const hueco = document.getElementById(`hueco-${orden}`);
        hueco.style.backgroundColor = window.getComputedStyle(elemento).backgroundColor;
        hueco.style.border = "none";
        hueco.innerHTML = elemento.innerHTML;
        
        elemento.style.opacity = "0.3";
        hablar("¡Muy bien!");

        if (piezasUnidas === 3) {
            hablar("¡Excelente! El tren está listo. ¡Haz clic en la flecha para ir al nivel final!");
            document.getElementById('btn-final-total').style.display = 'flex';
            crearConfeti();
        }
    } else {
        hablar("Ese no es el correcto. Busca el número " + (piezasUnidas + 1));
    }
}

// LÓGICA NIVEL 5 (Estrellas)
function unirEstrella(elemento, orden) {
    if (elemento.classList.contains('encajado')) return;

    if (orden === estrellasUnidas + 1) {
        elemento.classList.add('encajado');
        estrellasUnidas++;
        
        const hueco = document.getElementById(`hueco-estrella-${orden}`);
        hueco.style.backgroundColor = "rgba(255, 215, 0, 0.8)"; // Color dorado
        hueco.style.border = "none";
        hueco.innerHTML = elemento.innerHTML;
        
        elemento.style.opacity = "0.3";
        hablar("¡Estrella " + orden + " colocada!");

        if (estrellasUnidas === 3) {
            hablar("¡Increíble! Has formado el tren de estrellas mágicas. ¡Eres un campeón!");
            document.getElementById('btn-victoria-final').style.display = 'flex';
            crearConfeti();
        }
    } else {
        hablar("Esa estrella aún no va ahí. Busca el número " + (estrellasUnidas + 1));
    }
}

// MODIFICA tu función actual por esta
function victoriaTotal() {
    hablar("¡Increíble! Has completado el tren de estrellas. ¡Mira! El mapa se ha actualizado.");
    crearConfeti();
    
    setTimeout(() => {
        // Ocultamos nivel 5 y mostramos el Mapa 3
        document.getElementById('pantalla-nivel5').style.display = 'none';
        document.getElementById('pantalla-mapa3').style.display = 'block';
        document.getElementById('confeti-container').innerHTML = '';
        
        hablar("¡Hemos llegado al Barco Hundido! Haz clic en la flecha para continuar la aventura.");
    }, 4000);
}

// NUEVA FUNCIÓN para iniciar el contenido del Nivel 3
function empezarNivel3() {
    hablar("Preparándonos para explorar el Barco Hundido...");
    // Aquí iría la lógica para mostrar la siguiente pantalla de juego (Nivel 3.1)
    // document.getElementById('pantalla-mapa3').style.display = 'none';
    // document.getElementById('pantalla-nivel3-1').style.display = 'block';
}

let estrellasEncontradasNivel6 = 0;

function empezarNivel3() {
    document.getElementById('pantalla-mapa3').style.display = 'none';
    document.getElementById('pantalla-nivel6').style.display = 'block';
    
    // Audio de instrucción
    hablar("¡Increíble! Hemos llegado al Barco Hundido. Hay 4 estrellas amarillas mágicas ocultas en este paisaje. ¡Búscalas con cuidado!");
}

function encontrarEstrella(elemento) {
    if (!elemento.classList.contains('estrella-encontrada')) {
        elemento.classList.add('estrella-encontrada');
        estrellasEncontradasNivel6++;
        
        hablar("¡Muy bien! Llevas " + estrellasEncontradasNivel6 + " estrellas.");

        // Ahora verificamos que sean 4
        if (estrellasEncontradasNivel6 === 4) {
            hablar("¡Fantástico! Encontraste las 4 estrellas. ¡Ya podemos seguir!");
            document.getElementById('btn-pasar-nivel6').style.display = 'flex';
            crearConfeti();
        }
    }
}

// ESTA ES LA FUNCIÓN QUE TE FALTABA CONECTAR
function finalizarNivel6() {
    document.getElementById('pantalla-nivel6').style.display = 'none';
    document.getElementById('pantalla-nivel7').style.display = 'block';
    document.getElementById('confeti-container').innerHTML = ''; 
    hablar("¡Bien hecho! Ahora encuentra los 4 rombos rojos ocultos en las rocas.");
}

let rombosEncontradosNivel7 = 0;

// MODIFICA la función del nivel anterior para que pase al 7
function finalizarNivel6() {
    document.getElementById('pantalla-nivel6').style.display = 'none';
    document.getElementById('pantalla-nivel7').style.display = 'block';
    
    // Audio de instrucción para el nuevo nivel
    hablar("¡Bien hecho! Ahora estamos más profundo. Encuentra los 4 rombos rojos ocultos en las rocas.");
}

// Lógica para encontrar rombos
function encontrarRombo(elemento) {
    if (!elemento.classList.contains('rombo-encontrado')) {
        elemento.classList.add('rombo-encontrado');
        rombosEncontradosNivel7++;
        
        hablar("¡Excelente! Encontraste un rombo.");

        if (rombosEncontradosNivel7 === 4) {
            hablar("¡Increíble! Has encontrado todos los rombos. ¡Pulsa la flecha para continuar la aventura!");
            document.getElementById('btn-pasar-nivel7').style.display = 'flex';
            crearConfeti();
        }
    }
}

// MODIFICA esta función para que active el paso al Mapa 4
function finalizarNivel7() {
    hablar("¡Increíble! Has encontrado todos los rombos rojos. ¡Mira! Hemos llegado al Bosque de Algas.");
    crearConfeti();
    
    setTimeout(() => {
        // Ocultamos el nivel 7 y mostramos el nuevo Mapa 4
        document.getElementById('pantalla-nivel7').style.display = 'none';
        document.getElementById('pantalla-mapa4').style.display = 'block';
        document.getElementById('confeti-container').innerHTML = ''; // Limpiar confeti
        
        hablar("¡Bienvenido al Bosque de Algas! Haz clic en la flecha para continuar la exploración.");
    }, 4000);
}

// NUEVA FUNCIÓN para el siguiente nivel (Nivel 8)
function empezarNivel8() {
    hablar("Entrando al Bosque de Algas... ¡Ten cuidado con las corrientes!");
    document.getElementById('pantalla-mapa4').style.display = 'none';
    document.getElementById('pantalla-nivel8').style.display = 'flex'; // Usamos flex para centrar contenido

    // Audio de instrucción
    hablar("¡Mira cuántas algas! Los caballitos de mar están escondidos. Toca la figura que sea un cuadrado para encontrarlos.");
}

function seleccionarOpcion8(elemento, esCorrecto) {
    if (esCorrecto) {
        elemento.classList.add('correcta');
        hablar("¡Excelente! Ese es el cuadrado. ¡Encontraste a los caballitos de mar!");
        crearConfeti();
        
        // Mostramos la flecha para continuar
        document.getElementById('btn-pasar-nivel8').style.display = 'flex';
    } else {
        elemento.classList.add('incorrecta');
        hablar("¡Oh no! Ese es un círculo. Busca el que tiene cuatro lados iguales.");
        
        // Quitamos la clase roja después de un segundo para que pueda reintentar
        setTimeout(() => {
            elemento.classList.remove('incorrecta');
        }, 1000);
    }
}

// MODIFICA la función del nivel anterior
function finalizarNivel8() {
    document.getElementById('pantalla-nivel8').style.display = 'none';
    document.getElementById('pantalla-nivel9').style.display = 'flex';
    
    // Audio de instrucción para el Nivel 9
    hablar("¡Increíble! Ahora estamos en las cuevas profundas. ¿Puedes ver a la ballena? Toca la figura que sea un círculo para encontrarla.");
}

// Lógica del Nivel 9
function seleccionarOpcion9(elemento, esCorrecto) {
    if (esCorrecto) {
        elemento.classList.add('correcta'); // Usa la misma clase verde del nivel 8
        hablar("¡Excelente! Encontraste a la ballena en el círculo. ¡Eres un experto!");
        crearConfeti();
        
        document.getElementById('btn-pasar-nivel9').style.display = 'flex';
    } else {
        elemento.classList.add('incorrecta'); // Usa la clase roja del nivel 8
        hablar("Esa es una estrella. ¡Busca el círculo azul!");
        
        setTimeout(() => {
            elemento.classList.remove('incorrecta');
        }, 1000);
    }
}
// MODIFICA esta función para saltar al Mapa 5
function finalizarNivel9() {
    hablar("¡Increíble! Has encontrado a la ballena. ¡Mira! Hemos llegado al Abismo de Neón.");
    crearConfeti();
    
    setTimeout(() => {
        // Ocultamos el nivel 9 y mostramos el Mapa 5
        document.getElementById('pantalla-nivel9').style.display = 'none';
        document.getElementById('pantalla-mapa5').style.display = 'block';
        document.getElementById('confeti-container').innerHTML = ''; 
        
        hablar("¡Bienvenido al Abismo de Neón! Haz clic en la flecha para continuar nuestra aventura submarina.");
    }, 4000);
}

// Función para entrar al Nivel 10 desde el Mapa 5 (CORREGIDA)
function empezarNivel10() {
    console.log("¡Clic detectado en la flecha del Mapa 5!");

    const mapaActual = document.getElementById('pantalla-mapa5');
    const siguienteNivel = document.getElementById('pantalla-nivel10');

    // --- ESTA ES LA PARTE QUE FALTABA ---
    if (mapaActual && siguienteNivel) {
        mapaActual.style.display = 'none'; // Escondemos el mapa
        siguienteNivel.style.display = 'flex'; // Mostramos el escenario (Nivel 10)
    }

    // Instrucción de voz
    hablar("¡Qué increíble escenario! Mira estas cuatro animaciones brillantes.");
    
    // Mostrar la flecha de salida después de 5 segundos
    setTimeout(() => {
        const btnPasar = document.getElementById('btn-pasar-nivel10');
        if (btnPasar) btnPasar.style.display = 'flex';
    }, 5000);
}

function finalizarNivel10() {
    console.log("Entrando al gran final...");

    // --- CÓDIGO PARA DETENER LA MÚSICA ---
    const musica = document.getElementById('musica-fondo');
    if (musica) {
        musica.pause();
        musica.currentTime = 0; // Opcional: Reinicia la canción al principio
    }
    // -------------------------------------

    // 1. Cambio de pantallas
    document.getElementById('pantalla-nivel10').style.display = 'none';
    document.getElementById('pantalla-nivel11').style.display = 'flex';

    // 2. Audio de introducción al final
    hablar("¡Cuidado! El guardián del abismo ha aparecido. ¡Mira lo que sucede!");

    // 3. Reproducir el video automáticamente
    const video = document.getElementById('video-final');
    if (video) {
        video.play();
        
        // Al terminar el video, mostramos el botón de reinicio
        video.onended = function() {
            document.getElementById('btn-reiniciar').style.display = 'block';
            hablar("¡Increíble! Has salvado el océano. Eres un verdadero explorador submarino.");
        };
    }
}

function reiniciarJuego() {
    // Recarga la página para volver al principio
    location.reload();
}

const btnMute = document.getElementById('btn-mute');
const iconoMute = document.getElementById('icono-mute');
let musicaSilenciada = false;

btnMute.addEventListener('click', () => {
    const musica = document.getElementById('musica-fondo');
    
    if (musica) {
        if (!musicaSilenciada) {
            musica.muted = true;
            iconoMute.innerText = "×"; // Icono de silencio
            musicaSilenciada = true;
        } else {
            musica.muted = false;
            iconoMute.innerText = "🔊"; // Icono de sonido
            musicaSilenciada = false;
        }
    }
});
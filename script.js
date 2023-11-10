// Función para la animación de la sección de inicio
function animarInicio() {
    const inicioSection = document.getElementById('inicio');

    // Animación al cargar la página
    inicioSection.style.opacity = 0;
    let opacity = 0;

    const fadeIn = setInterval(() => {
        opacity += 0.01;
        inicioSection.style.opacity = opacity;
        if (opacity >= 1) {
            clearInterval(fadeIn);
        }
    }, 10);
}

// Función para descargar el CV al hacer clic en el botón
function descargarCV() {
    const url = 'D:\2smx\CV';
    const link = document.createElement('a');
    link.href = url;
    link.download = 'CV_Amanda_Andreis.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Llamada a la función de animación al cargar la página
window.onload = animarInicio;

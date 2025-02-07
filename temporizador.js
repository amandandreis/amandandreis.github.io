const relojActual = document.getElementById("reloj-actual");
const cuentaAtras = document.getElementById("cuenta-atras");

function actualizarHoraActual() {
  const ahora = new Date();
  relojActual.textContent = ahora.toLocaleTimeString();
}

setInterval(actualizarHoraActual, 1000);

document.getElementById("iniciar-temporizador").addEventListener("click", () => {
  const horaFin = document.getElementById("hora-fin").value;
  if (!horaFin) {
    alert("Establece una hora de finalización.");
    return;
  }
  const [horas, minutos] = horaFin.split(":").map(Number);
  const fin = new Date();
  fin.setHours(horas, minutos, 0);

  const intervalo = setInterval(() => {
    const ahora = new Date();
    const diferencia = fin - ahora;

    if (diferencia <= 0) {
      clearInterval(intervalo);
      cuentaAtras.textContent = "¡Tarea finalizada!";
      const audio = new Audio("assets/alarma.mp3");
      audio.play();
    } else {
      const horas = Math.floor(diferencia / (1000 * 60 * 60));
      const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
      const segundos = Math.floor((diferencia % (1000 * 60)) / 1000);
      cuentaAtras.textContent = `Tiempo restante: ${horas}:${minutos}:${segundos}`;
    }
  }, 1000);
});

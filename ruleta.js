const nombres = [];
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const nombreSeleccionado = document.getElementById("nombre-seleccionado");
const cargarNombresBtn = document.getElementById("cargar-nombres");
const activarRuletaBtn = document.getElementById("activar-ruleta");

let anguloInicial = 0;
let girando = false;

// Cargar nombres desde noms.txt
cargarNombresBtn.addEventListener("click", () => {
  fetch("assets/noms.txt")
    .then(response => response.text())
    .then(data => {
      nombres.length = 0;
      nombres.push(...data.split("\n").map(nombre => nombre.trim()).filter(nombre => nombre));
      dibujarRuleta();
    });
});

function dibujarRuleta() {
  const totalNombres = nombres.length;
  const anguloPorSegmento = (2 * Math.PI) / totalNombres;

  nombres.forEach((nombre, index) => {
    const inicio = anguloInicial + index * anguloPorSegmento;
    const fin = inicio + anguloPorSegmento;

    // Dibujar segmento
    ctx.beginPath();
    ctx.moveTo(150, 150);
    ctx.arc(150, 150, 150, inicio, fin);
    ctx.fillStyle = `hsl(${(360 / totalNombres) * index}, 70%, 60%)`;
    ctx.fill();
    ctx.closePath();

    // Dibujar texto
    ctx.save();
    ctx.translate(150, 150);
    ctx.rotate(inicio + anguloPorSegmento / 2);
    ctx.textAlign = "right";
    ctx.fillStyle = "#fff";
    ctx.font = "14px Arial";
    ctx.fillText(nombre, 140, 10);
    ctx.restore();
  });
}

activarRuletaBtn.addEventListener("click", () => {
  if (girando || nombres.length === 0) return;
  girando = true;

  let rotacion = Math.random() * 360 + 360 * 3; // Gira varias veces
  let anguloFinal = (rotacion % 360) * (Math.PI / 180);

  const animacion = setInterval(() => {
    anguloInicial += 0.05;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    dibujarRuleta();

    if (rotacion <= 0) {
      clearInterval(animacion);
      girando = false;
      const anguloSeleccionado = (anguloFinal + anguloInicial) % (2 * Math.PI);
      const indice = Math.floor((anguloSeleccionado / (2 * Math.PI)) * nombres.length);
      nombreSeleccionado.textContent = nombres[indice];
    }

    rotacion -= 10;
  }, 30);
});

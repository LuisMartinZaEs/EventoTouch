const $canvas = document.querySelector("#canvas"),
    $btnDescargar = document.querySelector("#btnDescargar"),
    $btnLimpiar = document.querySelector("#btnLimpiar");
    $btnGenerarDocumento = document.querySelector("#btnGenerarDocumento");
    
var ctx = $canvas.getContext("2d");
var cw = ($canvas.width = 350), cx = cw / 2;
var ch = ($canvas.height = 130), cy = ch / 2;
ctx.strokeStyle = "fff";
const COLOR_PINCEL="black";
const COLOR_FONDO = "white";
var dibujando = false;


var m = { x: 0, y: 0 };
const limpiarCanvas = () => {
  // Colocar color blanco en fondo de canvas
  ctx.fillStyle = COLOR_FONDO;
  ctx.fillRect(0, 0, $canvas.width, $canvas.height);
};
limpiarCanvas();
$btnLimpiar.onclick = limpiarCanvas;
// Escuchar clic del botón para descargar el canvas
$btnDescargar.onclick = () => {
  const enlace = document.createElement('a');
  // El título
  enlace.download = "Firma.png";
  // Convertir la imagen a Base64 y ponerlo en el enlace
  enlace.href = $canvas.toDataURL();
  // Hacer click en él
  enlace.click();
};

window.obtenerImagen = () => {
  return $canvas.toDataURL();
};

$btnGenerarDocumento.onclick = () => {
  window.open("documento.html");
};

var eventsRy = [{event:"mousedown",func:"onStart"}, 
                {event:"touchstart",func:"onStart"},
                {event:"mousemove",func:"onMove"},
                {event:"touchmove",func:"onMove"},
                {event:"mouseup",func:"onEnd"},
                {event:"touchend",func:"onEnd"},
                {event:"mouseout",func:"onEnd"}
               ];

function onStart(evt) {
  m = oMousePos($canvas, evt);
  ctx.beginPath();
  ctx.fillStyle = COLOR_PINCEL;
  dibujando = true;
}

function onMove(evt) {
  if (dibujando) {
    ctx.moveTo(m.x, m.y);
    m = oMousePos($canvas, evt);
    ctx.fillStyle = COLOR_PINCEL;
    ctx.lineTo(m.x, m.y);
    ctx.stroke();
  }
}

function onEnd(evt) {
  dibujando = false;
}

function oMousePos($canvas, evt) {
  var ClientRect = $canvas.getBoundingClientRect();
  var e = evt.touches ? evt.touches[0] : evt;

    return {
      x: Math.round(e.clientX - ClientRect.left),
      y: Math.round(e.clientY - ClientRect.top)
    };
}

for (var i = 0; i < eventsRy.length; i++) {
  (function(i) {
      var e = eventsRy[i].event;
      var f = eventsRy[i].func;console.log(f);
      $canvas.addEventListener(e, function(evt) {
            evt.preventDefault();
            window[f](evt);
            return;
        },false);
  })(i);
}

clear.addEventListener(
  "click",
  function() {
    ctx.clearRect(0, 0, cw, ch);
  },
  false
);
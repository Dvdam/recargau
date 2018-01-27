// ====================================================================================================================
var Juego = {
  posicionVacia : {
    fila: 2,
    columna: 2
  },
  ganador: false,
} // Termina la Declaracion del Obejo Juego
// ====================================================================================================================

// ====================================================================================================================

Juego.chequearMovimientosRestantes = function(){
  perdiste = 0
  if(Juego.contadorDeMovimientos <= 0 ){
    $('#contadorDeMovimientos').val(perdiste);
    setTimeout('Juego.mostrarCartel("PERDISTE")', 10); 
  }
} // Termina chequearMovimientosValidos
// ====================================================================================================================

// ====================================================================================================================
Juego.mostrarCartel = function (estado) {
  var segundos = document.getElementById("segundos").innerHTML;
  var minutos =  document.getElementById("minutos").innerHTML;
  var textoGano = "¡Armaste el Rompecabezas Correctamente! con un impresionante tiempo de "+ minutos +":"+ segundos;
  var textoPerder = "Intentalo nuevamente!!! Podes mejorar tu tiempo:"+ minutos +":"+ segundos;
  if(estado === "GANASTE"){
    swal({
      title: "FELICIDADES GANASTE",
      text: textoGano,
      type: "success",
      confirmButtonColor: '#9C27B0',
      confirmButtonText: "Cerrar",
      animation: false,
      customClass: 'animated tada'
      });
      Juego.reiniciarReloj();
      setTimeout(function () {location.reload()}, 3000);//3500
   } else {
    localStorage.setItem("swal",
    swal({
    title: "PERDISTE!!!",
    text: textoPerder,
    type: "error",
    confirmButtonColor: '#9C27B0',
    confirmButtonText: "Cerrar",
    showConfirmButton: true
    })
    );
    setTimeout(function () {location.reload()}, 3000);//3500
    localStorage.getItem("swal");
        Juego.reiniciarReloj();
  }
} // Termina mostrarCartel
// ====================================================================================================================

// ====================================================================================================================
Juego.actualizarPiezas = function (){
  for( y=0; y<Juego.grilla.length; y++){
    for( x=0; x<Juego.grilla[0].length; x++){
      var posX = x * Juego.anchoPiezas;
      var posY = y * Juego.altoPiezas;
      Juego.piezas[Juego.grilla[y][x]].x = posX;
      Juego.piezas[Juego.grilla[y][x]].y = posY;
    }
  }
} // Termina actualizarPiezas
// ====================================================================================================================

// ====================================================================================================================
// Intercambia posiciones
Juego.intercambiarPosiciones = function (fila1, columna1, fila2, columna2) {
  var valorAnterior = Juego.grilla[fila1][columna1];
  Juego.grilla[fila1][columna1] = Juego.grilla[fila2][columna2];
  Juego.grilla[fila2][columna2] = valorAnterior; 
  Juego.actualizarPiezas();
} // Termina intercambiarPosiciones

// ====================================================================================================================

// ====================================================================================================================
// Actualiza la posición de la pieza vacía
Juego.actualizarPosicionVacia = function (nuevaFila, nuevaColumna) {
  Juego.posicionVacia.fila = nuevaFila;
  Juego.posicionVacia.columna = nuevaColumna;
} // Termina actualizarPosicionVacia

// ====================================================================================================================

// ====================================================================================================================
// Chequear si la posicón está dentro de la grilla.
Juego.posicionValida = function (fila, columna) {
  if (fila < 0 || fila >= Juego.grilla.length || columna < 0 || columna >= Juego.grilla[0].length) {
    return false;
  } else {
    if(!Juego.mezclando){
      Juego.setContadorDeMovimientos(Juego.contadorDeMovimientos-=1);
    }
    return true;
  }
} // Termina posicionValida

// ====================================================================================================================

// ====================================================================================================================
// Movimiento de fichas, en este caso la que se mueve es la blanca intercambiando su posición con otro elemento
Juego.moverEnDireccion = function (direccion) {
  var nuevaFilaPiezaVacia;
  var nuevaColumnaPiezaVacia;
  if(Juego.contadorDeMovimientos >=0 && !Juego.ganador){
    // Intercambia pieza blanca con la pieza que está arriba suyo
    if (direccion == 40) {
      nuevaFilaPiezaVacia = Juego.posicionVacia.fila - 1;
      nuevaColumnaPiezaVacia = Juego.posicionVacia.columna;
    }
    // Intercambia pieza blanca con la pieza que está abajo suyo
    else if (direccion == 38) {
      nuevaFilaPiezaVacia = Juego.posicionVacia.fila + 1;
      nuevaColumnaPiezaVacia = Juego.posicionVacia.columna;
    }
    // Intercambia pieza blanca con la pieza que está a su izq
    else if (direccion == 39) {
      nuevaFilaPiezaVacia = Juego.posicionVacia.fila;
      nuevaColumnaPiezaVacia = Juego.posicionVacia.columna - 1;
    }
    // Intercambia pieza blanca con la pieza que está a su der
    else if (direccion == 37) {
      nuevaFilaPiezaVacia = Juego.posicionVacia.fila;
      nuevaColumnaPiezaVacia = Juego.posicionVacia.columna + 1;
    }

    // Se chequea si la nueva posición es válida, si lo es, se intercambia
    if (Juego.posicionValida(nuevaFilaPiezaVacia, nuevaColumnaPiezaVacia)) {
      Juego.intercambiarPosiciones(Juego.posicionVacia.fila, Juego.posicionVacia.columna, nuevaFilaPiezaVacia, nuevaColumnaPiezaVacia);
      Juego.actualizarPosicionVacia(nuevaFilaPiezaVacia, nuevaColumnaPiezaVacia);        
    }

  }
} // Termina Mover en Direccion

// ====================================================================================================================

// ====================================================================================================================
// Extras, ya vienen dadas
Juego.mezclarPiezas = function(veces) {
  if (veces <= 0) {
    Juego.mezclando = false;
    return;
  }
  var direcciones = [40, 38, 39, 37];
  var direccion = direcciones[Math.floor(Math.random() * direcciones.length)];
  Juego.moverEnDireccion(direccion);
  setTimeout(function () {Juego.mezclarPiezas(veces - 1)},5);
 
} // Termina mezclarPiezas
// ====================================================================================================================

// ====================================================================================================================
Juego.capturarTeclas = function() {
  if(Juego.contadorDeMovimientos >= 0 && !Juego.ganador){
    document.onkeydown = (function (evento) {
      if (evento.which == 40 || evento.which == 38 || evento.which == 39 || evento.which == 37) {
        Juego.moverEnDireccion(evento.which);
        Juego.chequearSiGano();
        Juego.chequearMovimientosRestantes();
        evento.preventDefault();
      }
    })
  }
} // Termina capturarTeclas

// ====================================================================================================================
// ====================================================================================================================
Juego.controles = function(){
  /*======================== EVENTOS TOUCH ===========================*/
  document.querySelector("#izquierda").addEventListener("touchstart", function(e){
    e.preventDefault();
    Juego.moverEnDireccion(39);
    Juego.chequearSiGano();
    Juego.chequearMovimientosRestantes();
  });

  document.querySelector("#derecha").addEventListener("touchstart", function(e){
    e.preventDefault();
    Juego.moverEnDireccion(37);
    Juego.chequearSiGano();
    Juego.chequearMovimientosRestantes();
  });
  document.querySelector("#arriba").addEventListener("touchstart", function(e){
    e.preventDefault();
    Juego.moverEnDireccion(40);
    Juego.chequearSiGano();
    Juego.chequearMovimientosRestantes();
  });

  document.querySelector("#abajo").addEventListener("touchstart", function(e){
    e.preventDefault();
    Juego.moverEnDireccion(38);
    Juego.chequearSiGano();
    Juego.chequearMovimientosRestantes();
  });
  
  // Juego.chequearSiGano();
  // Juego.chequearMovimientosRestantes();

} //Termina los controles
// ====================================================================================================================
// ====================================================================================================================


// ====================================================================================================================

// ====================================================================================================================
Juego.capturarMouse = function(){
  if(Juego.contadorDeMovimientos >= 0 && !Juego.ganador){
    document.onmousedown = (function(evento){
      var canvasBox = canvas.getBoundingClientRect();
      clickMouse.x = evento.clientX - canvasBox.left;
      clickMouse.y = evento.clientY - canvasBox.top;
  
      var piezaSize = Juego.piezas[0].width;
      var piezaPos = {
        x: Juego.piezas[Juego.piezas.length - 1].x,
        y: Juego.piezas[Juego.piezas.length - 1].y,
      }
      // Click dentro del canvas
      if(clickMouse.x > 0 && clickMouse.x < canvas.width && clickMouse.y > 0 && clickMouse.y < canvas.height){
        // Izquierda
        if(clickMouse.x < piezaPos.x && clickMouse.x > piezaPos.x - piezaSize && clickMouse.y > piezaPos.y && clickMouse.y < piezaPos.y + piezaSize){
          Juego.moverEnDireccion(39);
        }
        // Arriba
        if(clickMouse.x > piezaPos.x && clickMouse.x < piezaPos.x + piezaSize && clickMouse.y < piezaPos.y && clickMouse.y > piezaPos.y - piezaSize){
          Juego.moverEnDireccion(40);
        }
        // Derecha
        if(clickMouse.x > piezaPos.x + piezaSize && clickMouse.x < piezaPos.x + piezaSize * 2 && clickMouse.y > piezaPos.y && clickMouse.y < piezaPos.y + piezaSize){
          Juego.moverEnDireccion(37);
        }
        // Abajo
        if(clickMouse.x > piezaPos.x && clickMouse.x < piezaPos.x + piezaSize && clickMouse.y > piezaPos.y + piezaSize && clickMouse.y < piezaPos.y + piezaSize * 2){
          Juego.moverEnDireccion(38);
        }
        Juego.chequearSiGano();
        Juego.chequearMovimientosRestantes();
      }
    });

  }
} // Termina capturarMouse
// ====================================================================================================================

// ====================================================================================================================
Juego.crearGrilla = function(){
  Juego.grilla = [];
    for (var y = 0; y < Juego.cantidadDePiezasPorLado; y++) {
      Juego.grilla[y] = new Array(Juego.cantidadDePiezasPorLado);
      for (var x = 0; x < Juego.cantidadDePiezasPorLado; x++) {
        Juego.grilla[y][x] = (y * Juego.cantidadDePiezasPorLado) + x;
      }      
    }
    Juego.posicionVacia.fila = Juego.cantidadDePiezasPorLado - 1;
    Juego.posicionVacia.columna = Juego.cantidadDePiezasPorLado - 1;
} // Termina crearGrilla
// ====================================================================================================================

// ====================================================================================================================
// Creamos el contexto para el CANVAS
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
// ====================================================================================================================

// ====================================================================================================================

// Tendremos que rastrear donde hace click el usuario.
var clickMouse = {
  x: 0,
  y: 0,
}

//se carga la imagen del rompecabezas
Juego.cargarImagen = function (e) {
  //se calcula el ancho y el alto de las piezas de acuerdo al tamaño del canvas (600). 
  this.anchoPiezas = Math.floor(600 / this.cantidadDePiezasPorLado);
  this.altoPiezas = Math.floor(600 / this.cantidadDePiezasPorLado);
  //se calcula el ancho y alto del rompecabezas de acuerdo al ancho y alto de cada pieza y la cantidad de piezas por lado
  this.anchoDeRompecabezas = this.anchoPiezas * this.cantidadDePiezasPorLado;
  this.altoDeRompecabezas = this.altoPiezas * this.cantidadDePiezasPorLado;
  this.configurarCanvas();
}
// ====================================================================================================================

// ====================================================================================================================
//funcion que carga la imagen
Juego.iniciarImagen = function (callback) {
  this.imagen = new Image();
  var self = this;
  //se espera a que se termine de cargar la imagen antes de ejecutar la siguiente funcion
  this.imagen.addEventListener('load', function () {
    self.cargarImagen.call(self);
    callback();
  }, false);
  // ==================================================
  var fondos = document.getElementById("canvas").style.backgroundImage;
  if(fondos == ""){
    this.imagen.src = "images/r5.jpg";
  }else{
  var fondo = fondos.slice(5, -2);
  // console.log(fondo);
  this.imagen.src = fondo;
  }
  // ==================================================
} // Termina iniciarImagen
// ====================================================================================================================

// ====================================================================================================================
Juego.configurarCanvas = function(){
  ctx.fillStyle = "purple";
  ctx.fillRect(0,0,canvas.width,canvas.height);
} // Termina configurarCanvas

Juego.construirPiezas = function (){
  Juego.piezas = new Array();
  for( y=0; y<Juego.grilla.length; y++){
    for( x=0; x<Juego.grilla[0].length; x++){
      var posX = x * Juego.anchoPiezas;
      var posY = y * Juego.altoPiezas;
      var cropX = posX;
      var cropY = posY;
      var nuevaPieza = new Pieza(Juego.grilla[y][x],posX, posY, Juego.anchoPiezas, Juego.altoPiezas);
      nuevaPieza.setImageURL(this.imagen.src);
      nuevaPieza.setImageCrop(cropX, cropY);
      Juego.piezas.push(nuevaPieza);
    }
  }
} //Termina construirPiezas;
// ====================================================================================================================

// ====================================================================================================================
//una vez elegido el nivel, se inicia el juego
Juego.iniciar = function (cantMovimientos) {
  this.movimientosTotales = cantMovimientos;
  Juego.contadorDeMovimientos = cantMovimientos;
  Juego.maxMovimientos = 0;
  Juego.mezclando = true;
  Juego.frameCount = 0;
  Juego.opacidadObraFinal = 0.5;
  this.piezas = [];
  this.grilla = [];

  var nivelDificultad = $("input[type='radio'][name='nivel']:checked").val();
  Juego.configurarNivel(nivelDificultad);
  $("#cantidadPiezasPorLado").val(Juego.cantidadDePiezasPorLado);

  $("#btnReIniciar").click(function(){
    location.reload();
  });

  $("#btnMezclar").click(function(){
    Juego.mezclando = true;  
    Juego.mezclarPiezas(20);
  });
  // // =========================================================
  // $("#imageSlider").val(1);
  // $("#imageSlider").delay(200).animate({value:"0"},2500);
  // // =========================================================
    // =========================================================
    $("#btnInicio").val(1);
    $("#btnInicio").delay(200).animate({value:"0"},2500);
    // =========================================================

  //se guarda el contexto en una variable para que no se pierda cuando se ejecute la funcion iniciarImagen (que va a tener otro contexto interno)
  var self = this;
  this.crearGrilla();
  //se instancian los atributos que indican la posicion de las fila y columna vacias de acuerdo a la cantidad de piezas por lado para que sea la ultima del tablero
  this.filaPosicionVacia = this.cantidadDePiezasPorLado - 1;
  this.columnaPosicionVacia = this.cantidadDePiezasPorLado - 1;
  //se espera a que este iniciada la imagen antes de construir las piezas y empezar a mezclarlas
  this.iniciarImagen(function () {
    self.construirPiezas();
    //la cantidad de veces que se mezcla es en funcion a la cantidad de piezas por lado que tenemos, para que sea lo mas razonable posible.
    var cantidadDeMezclas = Math.max(Math.pow(self.cantidadDePiezasPorLado, 3), 100);

    Juego.capturarTeclas();
    Juego.capturarMouse();
    self.mezclarPiezas(cantidadDeMezclas);
    Juego.iniciarReloj();
    Juego.controles();
    // ==================================================================================
    setInterval(function() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      Juego.frameCount+=1;
     // =======================================================================
    Juego.piezas.forEach(function(pieza) {
      ctx.strokeStyle = 'purple';
      ctx.drawImage(pieza.image, pieza.xCrop, pieza.yCrop, pieza.width, pieza.height, pieza.x, pieza.y, pieza.width, pieza.height);
      ctx.strokeRect(pieza.xCrop,  pieza.yCrop, pieza.width, pieza.width);
     });
    // ========================================================================
     Juego.mostrarPiezaMovil();
     ctx.save();
     ctx.globalAlpha = $("#btnInicio").val();
     ctx.drawImage(Juego.piezas[0].image,0,0);
     ctx.restore();
    },1000/30); //Termina SetInterval
  });
} // Termina iniciar //
// ====================================================================================================================

// ====================================================================================================================

Juego.setContadorDeMovimientos = function(contador){
  Juego.contadorDeMovimientos = contador;
  if(!Juego.mezclando){
    $("#contadorDeMovimientos").val(Juego.contadorDeMovimientos);
  } else {
    $("#contadorDeMovimientos").val(0);
  }
} //Termina setContadorDemovimientos

// ====================================================================================================================

// ====================================================================================================================
//Configuramos el nivel seleciconado por el Jugador
Juego.configurarNivel = function(nivel){
  var piezas = 0;
  var movimientos = 0;
  nivel = nivel == undefined ? "facil" : nivel;
  
  if(nivel == "facil"){
    piezas = 3; //3
    movimientos = 30;//30
  } else if(nivel == "medio"){
    piezas = 4;
    movimientos = 50;
  } else if(nivel == "dificil"){
    piezas = 5;
    movimientos = 70;
  } else {
    piezas = Math.abs($("#cantidadPiezasPorLado").val());
    movimientos = Math.abs($("#contadorDeMovimientos").val());
  }

  Juego.cantidadDePiezasPorLado = piezas;
  Juego.maxMovimientos = movimientos;
  Juego.contadorDeMovimientos = Juego.maxMovimientos;
  $("#contadorDeMovimientos").val(Juego.maxMovimientos);
} // Termina configurarNivel
// ====================================================================================================================

// ====================================================================================================================
//Mostramos la Pieza movil del rompecabezas
Juego.mostrarPiezaMovil = function() {
      ctx.fillStyle = "rgba(156, 39, 176)"; //Purple
      ctx.fillRect(Juego.piezas[Juego.piezas.length - 1].x, Juego.piezas[Juego.piezas.length - 1].y, Juego.piezas[0].width, Juego.piezas[0].height);
};
// ====================================================================================================================

// ====================================================================================================================
// MOSTRAMOS EL TIEMPO TRANSCURRIDO EN EL JUEGO
// ===================================================================
var seg;
var min;
var reloj;

Juego.reiniciarReloj = function(){
  clearInterval(reloj);
};

Juego.iniciarReloj = function(){
  seg =0;
  min =0;
  s = document.getElementById("segundos");
  m = document.getElementById("minutos");

  reloj = setInterval(
      function(){
          if(seg==60){
              seg=0;
              min++;
              if (min<10) m.innerHTML ="0"+min;
              else m.innerHTML = min;
              if(min==60) min=0;
          }
          if (seg<10) s.innerHTML ="0"+seg;
          else s.innerHTML = seg;
          seg++;
      },1000);
};
// ====================================================================

Juego.chequearSiGano = function() {
  Juego.ganador = true;
  if(Juego.contadorDeMovimientos >=0){
    for (var y = 0; y < Juego.grilla.length; y++) {
      for (var x = 0; x < Juego.grilla[y].length; x++) {
        var ordenPiezas = ((Juego.grilla[0].length * y) + x);
        if (Juego.grilla[y][x] != ordenPiezas) {
          Juego.ganador = false;
         }
      }
    }
    if (Juego.ganador) {
      setTimeout("Juego.mostrarCartel('GANASTE')", 10);
    }
  }
} //Termina chequearSiGano

//=========================================================================================
// Cargo la imagen seleccionada en el canvas y modifico el color del Body
//  var colores = ['#303f9f', '#03a9f4', '#4caf50', '#FF9800', '#ff5722']; // Varios Colores
var colores = ['#303f9f', '#03a9f4', '#9933ee', '#3933ee', '#33e1ee']; // Tonos azules
// var colores = ['#03002c', '#b30029', '#f5841a', '#f6490d', '#f96d00']; // Tonos Rojos
var Fondo_Juego = document.getElementById("canvas");
var Fondo_Body = $('body');
var Fondo_Titulo = $('#titulo');
var iniciamos = $('.btns');
var cartel = $('h2');
// var final = $('#pie');
var final = $('footer');
var fondoNiveles = $('#Niveles label');

// console.log(Fondo_Titulo);

$('#r1').click(function () {
    // document.getElementById("canvas").style.backgroundImage = "url('images/r1.jpg')";
    Fondo_Juego.style.backgroundImage = "url('images/r1.jpg')";
    var color_Uno = colores[Math.floor(Math.random() * colores.length)];
    Fondo_Body.css('background', color_Uno);
    Fondo_Titulo.css('background', color_Uno);
    iniciamos.css('background', color_Uno);
    cartel.css('color', color_Uno);
    final.css('background', color_Uno);
    fondoNiveles.css('background', color_Uno);

});

$('#r2').click(function () {
    Fondo_Juego.style.backgroundImage = "url('images/r2.jpg')";
    var color_Dos = colores[Math.floor(Math.random() * colores.length)];
    Fondo_Body.css('background', color_Dos);
    Fondo_Titulo.css('background', color_Dos);
    iniciamos.css('background', color_Dos);
    cartel.css('color', color_Dos);
    final.css('background', color_Dos);
    fondoNiveles.css('background', color_Dos);

});

$('#r3').click(function () {
    Fondo_Juego.style.backgroundImage = "url('images/r3.jpg')";
    var color_Tres = colores[Math.floor(Math.random() * colores.length)];
    Fondo_Body.css('background', color_Tres);
    Fondo_Titulo.css('background', color_Tres);
    iniciamos.css('background', color_Tres);
    cartel.css('color', color_Tres);
    final.css('background', color_Tres);
    fondoNiveles.css('background', color_Tres);
});

$('#r4').click(function () {
    Fondo_Juego.style.backgroundImage = "url('images/r4.jpg')";
    var color_Cuatro = colores[Math.floor(Math.random() * colores.length)];
    Fondo_Body.css('background', color_Cuatro);
    Fondo_Titulo.css('background', color_Cuatro);
    iniciamos.css('background', color_Cuatro);
    cartel.css('color', color_Cuatro);
    final.css('background', color_Cuatro);
    fondoNiveles.css('background', color_Cuatro);

});

$('#r5').click(function () {
    Fondo_Juego.style.backgroundImage = "url('images/r5.jpg')";
    var color_Cinco = colores[Math.floor(Math.random() * colores.length)];
    Fondo_Body.css('background', color_Cinco);
    Fondo_Titulo.css('background', color_Cinco);
    iniciamos.css('background', color_Cinco);
    cartel.css('color', color_Cinco);
    final.css('background', color_Cinco);
    fondoNiveles.css('background', color_Cinco);
});

//======================================================================
$("#btnInicio").click(function () {
    Juego.iniciar(10);
    $("#btnInicio").hide();
    $("#imgs").hide();
    $("#btnMezclar").show();
    $("#controles").show();
});

//======================================================================
//======================================================================
//SELECCIONAR NIVEL POR EL USUARIO
var $nivelDeJuego = $('#cantidadPiezasPorLado');
var $movimientosDelNivel = $('#contadorDeMovimientos');
var $nivelDejuegoElegido = $('#Niveles input[type=radio]').change(function () {
    $nivelElegido = $(this).val();
    var Dificultad;
    var Movimientos;
    if ($nivelElegido == "facil") {
        Dificultad = 3;
        Movimientos = 30;
    }
    if ($nivelElegido == "medio") {
        Dificultad = 4;
        Movimientos = 50
    }
    if ($nivelElegido == "dificil") {
        Dificultad = 5;
        Movimientos = 70
    }
    $nivelDeJuego.val(Dificultad);
    $movimientosDelNivel.val(Movimientos);
});

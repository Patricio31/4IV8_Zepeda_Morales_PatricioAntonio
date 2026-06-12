<<<<<<< HEAD
var isntrucciones = [
    "Utiliza las flechas de navegacion para mover las piezas",
    "Para acomodar las piezas guiate por la imagen objetivo"
];
// para guardar los movimientos necesitamos un arreglo
var movimientos = [];
//Tengo que saber cuales son las posiciones del rompecabezas original
var rompe = [
    [1,2,3],
    [4,5,6],
    [7,8,9]
];
//necesito otra variable para saber que el orden del rompecabezas es el correcto.
var rompeCorrecta = [
    [1,2,3],
    [4,5,6],
    [7,8,9]
];
//necesito saber la posicion de la ficha/pieza vacia
var FilaVacia = 2;
var ColumnaVacia = 2;
//necesito una funcion que se encargue de mostrar la lista de instrucciones
function mostrarInstrucciones(instrucciones){
    for (var i = 0; i < isntrucciones.length; i++)(
        mostrarInstruccioneslista(instrucciones[1],"lista-instrucciones")
    )
}
function mostrarInstrucciones(instrucciones,idLista){
    var ul = document.getElementById(idLista)
    var li = document.createElement("li");
    li.textContent = instruccion;
    ul.appendChild(li);
=======
var isntrucciones = [
    "Utiliza las flechas de navegacion para mover las piezas",
    "Para acomodar las piezas guiate por la imagen objetivo"
];
// para guardar los movimientos necesitamos un arreglo
var movimientos = [];
//Tengo que saber cuales son las posiciones del rompecabezas original
var rompe = [
    [1,2,3],
    [4,5,6],
    [7,8,9]
];
//necesito otra variable para saber que el orden del rompecabezas es el correcto.
var rompeCorrecta = [
    [1,2,3],
    [4,5,6],
    [7,8,9]
];
//necesito saber la posicion de la ficha/pieza vacia
var FilaVacia = 2;
var ColumnaVacia = 2;
//necesito una funcion que se encargue de mostrar la lista de instrucciones
function mostrarInstrucciones(instrucciones){
    for (var i = 0; i < isntrucciones.length; i++)(
        mostrarInstruccioneslista(instrucciones[1],"lista-instrucciones")
    )
}
function mostrarInstrucciones(instrucciones,idLista){
    var ul = document.getElementById(idLista)
    var li = document.createElement("li");
    li.textContent = instruccion;
    ul.appendChild(li);
>>>>>>> 6da914a114d4a1ec848df25cc7def213e1c36337
}
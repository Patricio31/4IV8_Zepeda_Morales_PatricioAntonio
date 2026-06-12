<<<<<<< HEAD
function descuento() {
    var total = document.getElementById("total").value;
    var descuento = 0.15;

    const resultado = document.getElementById("resultado");
    resultado.textContent = "El total con descuento es: " + (total - (total * descuento)).toFixed(2);
    return false;
=======
function descuento() {
    var total = document.getElementById("total").value;
    var descuento = 0.15;

    const resultado = document.getElementById("resultado");
    resultado.textContent = "El total con descuento es: " + (total - (total * descuento)).toFixed(2);
    return false;
>>>>>>> 6da914a114d4a1ec848df25cc7def213e1c36337
}
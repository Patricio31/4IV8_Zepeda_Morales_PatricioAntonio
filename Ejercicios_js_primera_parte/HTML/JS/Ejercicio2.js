<<<<<<< HEAD
function comisiones() {
    var sueldo = document.getElementById("sueldo").value;
    var ventas = document.getElementById("ventas").value;
    var comision = ventas.value * 0.1;

    const resultado = document.getElementById("resultado"); 
    resultado.textContent = "La comisión es: " + sueldo+ comision.toFixed(2);
    return false;
=======
function comisiones() {
    var sueldo = document.getElementById("sueldo").value;
    var ventas = document.getElementById("ventas").value;
    var comision = ventas.value * 0.1;

    const resultado = document.getElementById("resultado"); 
    resultado.textContent = "La comisión es: " + sueldo+ comision.toFixed(2);
    return false;
>>>>>>> 6da914a114d4a1ec848df25cc7def213e1c36337
}
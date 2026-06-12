<<<<<<< HEAD
function calculadora() {
    var Capital = document.getElementById("capital").value;
    var Interes = document.getElementById("meses").value;

    const resultado = document.getElementById("resultado");
    resultado.textContent = "El resultado es: " + (Capital * Math.pow(1.02, Interes)).toFixed(2);
    return false;
=======
function calculadora() {
    var Capital = document.getElementById("capital").value;
    var Interes = document.getElementById("meses").value;

    const resultado = document.getElementById("resultado");
    resultado.textContent = "El resultado es: " + (Capital * Math.pow(1.02, Interes)).toFixed(2);
    return false;
>>>>>>> 6da914a114d4a1ec848df25cc7def213e1c36337
}
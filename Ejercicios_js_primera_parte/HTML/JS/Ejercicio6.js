<<<<<<< HEAD
function edad() {
    var añoNacimiento = document.getElementById("añoNacimiento").value;
    var añoActual = new Date().getFullYear();
    var edad = añoActual - añoNacimiento;
    document.getElementById("resultado").textContent = "La edad es: " + edad;
    return false;
=======
function edad() {
    var añoNacimiento = document.getElementById("añoNacimiento").value;
    var añoActual = new Date().getFullYear();
    var edad = añoActual - añoNacimiento;
    document.getElementById("resultado").textContent = "La edad es: " + edad;
    return false;
>>>>>>> 6da914a114d4a1ec848df25cc7def213e1c36337
}
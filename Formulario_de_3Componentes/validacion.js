<<<<<<< HEAD
const nombre = document.getElementById("name");
const edad = document.getElementById("age");
const email = document.getElementById("email");
const form = document.getElementById("form");
const parrafo = document.getElementById("warnings");

form.addEventListener("submit", e => {
    e.preventDefault();
    let warnings = "";
    let regexEmail = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,4})+$/;
    let entrar = false;
    parrafo.innerHTML = "";

    if (nombre.value.trim().length < 2) {
        warnings += "El nombre no es válido <br>";
        entrar = true;
    }
    // Validación para que no quede vacío y no tenga un largo absurdo
    if (edad.value.length === 0 || edad.value.length > 3) {
        warnings += "La edad no es válida <br>";
        entrar = true;
    }
    if (!regexEmail.test(email.value)) {
        warnings += "El Email no es válido <br>";
        entrar = true;
    }

    if (entrar) {
        parrafo.innerHTML = warnings;
    } else {
        parrafo.innerHTML = "Enviado";
    }
=======
const nombre = document.getElementById("name");
const edad = document.getElementById("age");
const email = document.getElementById("email");
const form = document.getElementById("form");
const parrafo = document.getElementById("warnings");

form.addEventListener("submit", e => {
    e.preventDefault();
    let warnings = "";
    let regexEmail = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,4})+$/;
    let entrar = false;
    parrafo.innerHTML = "";

    if (nombre.value.trim().length < 2) {
        warnings += "El nombre no es válido <br>";
        entrar = true;
    }
    // Validación para que no quede vacío y no tenga un largo absurdo
    if (edad.value.length === 0 || edad.value.length > 3) {
        warnings += "La edad no es válida <br>";
        entrar = true;
    }
    if (!regexEmail.test(email.value)) {
        warnings += "El Email no es válido <br>";
        entrar = true;
    }

    if (entrar) {
        parrafo.innerHTML = warnings;
    } else {
        parrafo.innerHTML = "Enviado";
    }
>>>>>>> 6da914a114d4a1ec848df25cc7def213e1c36337
});
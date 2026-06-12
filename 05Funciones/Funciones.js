<<<<<<< HEAD
//vamos a hacer un viaje de tiempo y haremos todo bajo el esquema ES6

/*
Para javaScript ya conocemos el concepto de variable 
"var"
Se sutituye por las nuevas variables:
Let -> es una variable de tipo "protegida", ya que solo funciona dentro de un fragmento de código

const -> si es constante


if(true){
    const x = "x";
    console.log(x);
}
let x = "y";
console.log(x)
*/

/*
Para declarar en jaaScript las funciones hay una manera más efectiva de declrarse, es a partir de una funcion flecha. No genera su propio texto (this), necesita ser declarada antes de ser usada y no necesita un return

Function cosa (String hola) { this.hola = hola}

hagamos una funcion que sume dos numeros
*/

/*
function sumarnumeros(n1, n2){
    return n1 + n2;
}

const sumarDosNumeros = (n1, n2) => n1 + n2;

console.log(`la suma de ka funcion es: (2, 3): ${sumarnumeros(2, 3)} `);

console.log(`la suma de ka funcion es: (2, 3): ${sumarDosNumeros(5, 3)} `);
*/

/*Para armar una funcion flecha hay que entender su estructura, la estructura siempre va a ser:

"Cadena" esta constituida por -tipovar-nombrefunc-(argumentos) => operación

*/

const razaDePerros = [
    "Gran Danez",
    "Doberman",
    "Pastor Aleman",
    "Pitbull",
    "San Bernando",
    "Xoloscuincle",
];

/*for(let i = 0; i < razaDePerros.length; i++ ){
    console.log(razaDePerros[i]);
}

for(const raza of razaDePerros){
    console.log(raza);
}


for(const indice of razaDePerros){
    console.log(razaDePerros[indice]);
}
    forEach
    Itera sobre elementos de arreglo que devuelven nada

razaDePerros.forEach(raza=> console.log(raza));

Por ejemplo, necesitamos una funcion para encontrar la funcion "chihuahua", y si no existe agregarla 

//Función "map", esta funcion itera sobre los elemntos del arreglo y regresa un arreglo diferente, podemos hacwr con el lo que queramos sin necesidad de modificarn el arreglo original

const RazasDePerrosEnMayusculas = razaDePerros.map((razaDePerros, indice, arregloOriginal) =>console.log(razaDePerros.toUpperCase()));
*/

if(razaDePerros.find(raza => raza === "Chihuahua")){
    console.log("La raza si se econtro y es Chihuahua");
    console.log(razaDePerros)
}else{
    razaDePerros.push("Chihuahua");
    console.log("Se agrego Chihuahua");
    console.log(razaDePerros);
=======
//vamos a hacer un viaje de tiempo y haremos todo bajo el esquema ES6

/*
Para javaScript ya conocemos el concepto de variable 
"var"
Se sutituye por las nuevas variables:
Let -> es una variable de tipo "protegida", ya que solo funciona dentro de un fragmento de código

const -> si es constante


if(true){
    const x = "x";
    console.log(x);
}
let x = "y";
console.log(x)
*/

/*
Para declarar en jaaScript las funciones hay una manera más efectiva de declrarse, es a partir de una funcion flecha. No genera su propio texto (this), necesita ser declarada antes de ser usada y no necesita un return

Function cosa (String hola) { this.hola = hola}

hagamos una funcion que sume dos numeros
*/

/*
function sumarnumeros(n1, n2){
    return n1 + n2;
}

const sumarDosNumeros = (n1, n2) => n1 + n2;

console.log(`la suma de ka funcion es: (2, 3): ${sumarnumeros(2, 3)} `);

console.log(`la suma de ka funcion es: (2, 3): ${sumarDosNumeros(5, 3)} `);
*/

/*Para armar una funcion flecha hay que entender su estructura, la estructura siempre va a ser:

"Cadena" esta constituida por -tipovar-nombrefunc-(argumentos) => operación

*/

const razaDePerros = [
    "Gran Danez",
    "Doberman",
    "Pastor Aleman",
    "Pitbull",
    "San Bernando",
    "Xoloscuincle",
];

/*for(let i = 0; i < razaDePerros.length; i++ ){
    console.log(razaDePerros[i]);
}

for(const raza of razaDePerros){
    console.log(raza);
}


for(const indice of razaDePerros){
    console.log(razaDePerros[indice]);
}
    forEach
    Itera sobre elementos de arreglo que devuelven nada

razaDePerros.forEach(raza=> console.log(raza));

Por ejemplo, necesitamos una funcion para encontrar la funcion "chihuahua", y si no existe agregarla 

//Función "map", esta funcion itera sobre los elemntos del arreglo y regresa un arreglo diferente, podemos hacwr con el lo que queramos sin necesidad de modificarn el arreglo original

const RazasDePerrosEnMayusculas = razaDePerros.map((razaDePerros, indice, arregloOriginal) =>console.log(razaDePerros.toUpperCase()));
*/

if(razaDePerros.find(raza => raza === "Chihuahua")){
    console.log("La raza si se econtro y es Chihuahua");
    console.log(razaDePerros)
}else{
    razaDePerros.push("Chihuahua");
    console.log("Se agrego Chihuahua");
    console.log(razaDePerros);
>>>>>>> 6da914a114d4a1ec848df25cc7def213e1c36337
}
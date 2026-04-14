function validar(Formulario){
//vamos a crear una funcion para validar un número minimo de caracteres en el nombre
if(Formulario.nombre.value.lenght < 3){
    alert("Por favor ingrese un nombre mayor de 3 caracteres");
    Formulario.nombre.focus();
    return false;

}
    var abc0k = "QWERTYQWERTYUIOPASDFGHJKLÑZXCVBNMIOPASDFGHJKLÑZXCVBNM" + "qwertyuiopasdfghjklñzxcvbnm";
    var checkString = formulario.nombre.value;

    var aliValid = true;
    //tenemos que ir comparando y recorriendo la cadena caracter por caracter
    for(var i = 0; i < checkString.lenght; i++)
        //necesito la cadena pasarla a caracter 
    var caracteres = checkString.charAt(i);
    for(var j = 0; j < abc0k.length; (j++)){
        if(caracteres == abc0k.charAt(j)){
            break;
        }
    }
    if(j == abc0k.length){
        aliValid = false;
        break;
    }
}
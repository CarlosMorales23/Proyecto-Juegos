'use strict'

//Inicializacion de variables
let tarjetasDestapadas = 0;
let tarjeta1 = null;
let tarjeta2 = null;
let primerResultado = null;
let segundoResultado = null;
let movimientos = 0;
let aciertos = 0;

//Apuntando a documento Html las estadisticas
let mostrarMovimientos = document.getElementById("movimientos")
let mostrarAciertos = document.getElementById("aciertos")


//*Creo el arreglo de 16 numeros pares para las cartas. 
let numeros = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];

//uso la propiedad Sort para crear un arreglo ordenado aleatoriamente del arreglo anterior
numeros = numeros.sort(()=> {return Math.random()-0.5});


console.log(numeros)

//Funcion Principal
function destapar(id){
    tarjetasDestapadas++;
    console.log(tarjetasDestapadas)

    if (tarjetasDestapadas== 1){
        //mostrar primer numero
        tarjeta1= document.getElementById(id);
        primerResultado = numeros[id]
        tarjeta1.innerHTML = primerResultado;


        //desabilitar primer boton para que no pueda aumentar contador
        tarjeta1.disabled = true
    }
    else if (tarjetasDestapadas == 2){
        //Mostrar segundo número
        tarjeta2 = document.getElementById(id)
        segundoResultado = numeros[id];
        tarjeta2.innerHTML = segundoResultado;

        //desabilitar primer boton para que no pueda aumentar contador
        tarjeta2.disabled = true

        //Incrementar movimientos
        movimientos++;
        mostrarMovimientos.innerHTML = `Movimientos: ${movimientos}`;

        if(primerResultado == segundoResultado){
            //Reiniciar contador de tartejas destapadas
            tarjetasDestapadas = 0;

            //Aumentar aciertos
            aciertos++;
            mostrarAciertos.innerHTML = `Aciertos: ${aciertos}`;
        }
        else{
            //Mostrar momentaneamente valores y volver a tapar 
        }


    }


}
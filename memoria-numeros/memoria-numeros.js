'use strict'

swal("Hello world!");

//Inicializacion de variables
let tarjetasDestapadas = 0;
let tarjeta1 = null;
let tarjeta2 = null;
let primerResultado = null;
let segundoResultado = null;
let movimientos = 0;
let aciertos = 0;
let temporizador = false;
let timer = 45;
let timepoRegresivoId = null;
let timerBloquearCartas = null;

//Apuntando a documento Html las estadisticas
let mostrarMovimientos = document.getElementById("movimientos")
let mostrarAciertos = document.getElementById("aciertos")
let mostrarTiempo = document.getElementById("t-restante");


//*Creo el arreglo de 16 numeros pares para las cartas. 
let numeros = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];

//uso la propiedad Sort para crear un arreglo ordenado aleatoriamente del arreglo anterior
numeros = numeros.sort(()=> {return Math.random()-0.5});
console.log(numeros)


//Funciones
function contarTiempo(){
    timepoRegresivoId = setInterval(()=>{
        timer--;
        mostrarTiempo.innerHTML = `Tiempo ${timer} segundos`;

        if(timer == 0 ){
            clearInterval(timepoRegresivoId);
            clearTimeout(timerBloquearCartas);
            bloquearTarjetas()
        }
    }, 1000)
}

function bloquearTarjetas(){
    for ( let i = 0; i <= 15; i++){
        let tarjetaBloqueada = document.getElementById(i);
        tarjetaBloqueada.innerHTML= numeros[i];
        tarjetaBloqueada.disabled = true;

    }
}


//Funcion Principal
function destapar(id){

    if(temporizador == false){
        contarTiempo();
        temporizador = true
    }

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

            if (aciertos == 8){
                clearInterval(timepoRegresivoId);
                mostrarAciertos.innerHTML = `¡¡¡¡¡Ganaste con : ${aciertos} aciertos!!!!!`;
                mostrarTiempo.innerHTML = `Genial! Ganaste! y te sobraron: ${timer} segundos`;
                mostrarMovimientos.innerHTML = `Ganaste! y solo usaste: ${movimientos} movimiento`;

            }
        }
        else{
            // mostrar momentaneamente y volver a tapar
            timerBloquearCartas = setTimeout(() => {
                tarjeta1.innerHTML = ' ';
                tarjeta2.innerHTML = ' ';
                tarjeta1.disabled = false;
                tarjeta2.disabled = false;
                tarjetasDestapadas = 0;
            }, 300);
        }
    }
}
'use strict'

swal(`¡¡Hola!!, \n Vamos aventarnos una Partidita de Memoria!`);

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


//Array de Objeto para registrar puntajes
let puntajesUsuarios = [
    {
    "nombre": "Carlitos",
    "puntaje": 0
    }
    ,
    {
    "nombre": "Sofia",
    "puntaje": 0
    }
    ,
    {
    "nombre": "Alexandra",
    "puntaje": 0
    }
    ,
    {
    "nombre": "Carlos",
    "puntaje": 0
    }
    ,
    {
    "nombre": "Luis",
    "puntaje": 0
    }
    ,
    {
    "nombre": "Marina",
    "puntaje": 0
    }
    ,
    {
    "nombre": "Invitado",
    "puntaje": 0
    }    
]
;

const botonRegistrarPuntaje=document.getElementById('registrarPuntaje');
const selectorUsuarios = document.getElementById('selectorUsuarios');

botonRegistrarPuntaje.addEventListener('click' , ()=>{
    const usuarioActual = puntajesUsuarios.find((user)=>{
    return user.name === selectorUsuarios.value;
})
    console.log(usuarioActual)
})

//******************************************************************************************* */

//Ejemplo Promesas
function generarSelectorUsuarios(usuarios){
    console.log(usuarios);

    const miForm = document.getElementById('miForm');
    let miHTML = '<select id="selectorUsuarios"><option disabled selected hidden>Jugador</option>'


    for(const usuario of usuarios){
    miHTML+=`<option value=${usuario.nombre}>${usuario.nombre}</option>`
    }
    miHTML += '</select>'
    miForm.innerHTML = miHTML
}

//************************************************************************************************ */
fetch('./usuarios.json')
.then((response)=>{
    return response.json();
}).then((usuarios)=>{
    generarSelectorUsuarios(usuarios)
})

//Sonidos del Juego
const correcto= new Audio ('./sounds/correcto.wav')
const error = new Audio ('./sounds/error.wav')
const ganar =new Audio ('./sounds/ganar.wav')
const perder = new Audio ('./sounds/perder.wav')
const seleccion = new Audio ('./sounds/seleccion.wav')


//Apuntando a documento Html las estadisticas
let mostrarMovimientos = document.getElementById("movimientos")
let mostrarAciertos = document.getElementById("aciertos")
let mostrarTiempo = document.getElementById("t-restante");


//*Creo el arreglo de 16 numeros pares para las cartas. 
let numeros = ["1.png", "1.png", "2.png", "2.png", "3.png", "3.png", "4.png", "4.png", "5.png", "5.png", "6.png", "6.png", "7.png", "7.png", "8.png", "8.png"];

//uso la propiedad Sort para crear un arreglo ordenado aleatoriamente del arreglo anterior
numeros = numeros.sort(()=> {return Math.random()-0.5});


//Funciones
function contarTiempo(){
    timepoRegresivoId = setInterval(()=>{
        timer--;
        mostrarTiempo.innerHTML = `Tiempo: ${timer} segundos`;
        
        
        if(timer == 0 ){
            clearInterval(timepoRegresivoId);
            clearTimeout(timerBloquearCartas);
            bloquearTarjetas(numeros);
            perder.play();
        }
    }, 1000, timer)
}

function bloquearTarjetas(){
    for ( let i = 0; i <= 15; i++){
        let tarjetaBloqueada = document.getElementById(i);
        tarjetaBloqueada.innerHTML= `<img src="./img/${numeros[i]}"></img>`;
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
        primerResultado = numeros[id];
        tarjeta1.innerHTML = `<img src="./img/${numeros[id]}"></img>`;
        seleccion.play();

        //desabilitar primer boton para que no pueda aumentar contador
        tarjeta1.disabled = true
    }
    else if (tarjetasDestapadas == 2){
        //Mostrar segundo número
        tarjeta2 = document.getElementById(id)
        segundoResultado = numeros[id];
        tarjeta2.innerHTML = `<img src="./img/${numeros[id]}"></img>`;

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
            correcto.play()

            if (aciertos == 8){
                ganar.play()
                clearInterval(timepoRegresivoId);
                swal("Buen trabajo Carlitos!", "Eres un genio!");
                mostrarAciertos.innerHTML = `¡¡¡¡¡Ganaste con : ${aciertos} aciertos!!!!!`;
                mostrarTiempo.innerHTML = `Genial! Ganaste! y te sobraron: ${timer} segundos`;
                mostrarMovimientos.innerHTML = `Ganaste! y solo usaste: ${movimientos} movimiento`;

            }
        }
        else{
            error.play()
            //Mostrar momentaneamente valores y volver a tapar
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
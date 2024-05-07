//Constante que define a los jugadores
const players = (name, score, vegie) =>{
    const winningScore = () => {
        score++;
        console.log(`${name}, your score is ${score}`);
    }
    return {vegie,winningScore, name}
}

//Declarar a ambos jugadores
let Player1 = players('Player 1',0,'cucumber');
let Player2 = players('Player 2',0,'tomato');


//
const restart = document.getElementById('restart');

//Selecciona los elementos del tablero del html a jv
const Gameboard = ( () =>{
    const cells = document.querySelectorAll('.square');
    const tomato = 'tomato';
    const cucumber = 'cucumber';
    let turn = false;

    //Constante que indica las posibles combinaciones para ganar
    const winningComb = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ]

    //Funcion para iniciar el juego
    function startGame(){
        cells.forEach(cells => {
            //Al inicial el juego, se eliminan las clases contenidas en las celdas
            cells.classList.remove(tomato);
            cells.classList.remove(cucumber);
            cells.removeEventListener('click', game);

            //Oculta el boton de reiniciar una vez se le da click
            cells.addEventListener('click',game ,{once: true});
            restart.style.visibility = 'hidden';
        })
    }

    //Funcion que inicia el juego
    function game(){
        const cells = this;

        //intercambia turnos entre jugadores
        const playerTurn = turn ? tomato : cucumber;
        addMarks(playerTurn, cells);
    
        //Determina si a ganado algun jugador o es empate
        if(winState(Player1.vegie)){
            console.log(`${Player1.name}, the ${Player1.vegie} wins!`)
            Player1.winningScore();
            restart.style.visibility = 'visible';
        }else if(winState(Player2.vegie)){
            console.log(`${Player2.name}, the ${Player2.vegie} wins!`);
            Player2.winningScore();
            restart.style.visibility = 'visible';
        }else if(draw()){
            console.log('Empate!')
            restart.style.visibility = 'visible';
        }else{
            //Si ningun jugador a ganado aun, se cambiara de turno
            switchingTurns();
        }
    }

    //Cambia la variable que determina de quien es el turno
    function switchingTurns(){
        turn = !turn;
    }

    //Añade la clase necesaria a la celda para que aparezca la marca del jugador
    function addMarks(playerTurn, cells){
        cells.classList.add(playerTurn);
    }

    //Verifica si en la tabla, se cumple con las combinaciones de victoria
    function winState(playerTurn){
        return winningComb.some(comb => {
            return comb.every(index => {
                return cells[index].classList.contains(playerTurn);
            })
        })
    }


    //Determina si todas las celdas estan llenas pero sin ningun ganador
    function draw(){
        return [...cells].every(cell =>{
            return cell.classList.contains(tomato) || cell.classList.contains(cucumber);
        })
    }

    return{
        startGame
    }

})();

Gameboard.startGame();

restart.addEventListener('click', Gameboard.startGame);

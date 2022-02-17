//Players
const players = (name, score, vegie) =>{
    const winningScore = () => {
        score++;
        console.log(`${name}, your score is ${score}`);
    }
    return {vegie,winningScore, name}
}

let Plit = players('Plit',0,'cucumber');
let Frog = players('Frog',0,'tomato');


//Actual Game
const restart = document.getElementById('restart');

const Gameboard = ( () =>{
    const cells = document.querySelectorAll('.square');
    const tomato = 'tomato';
    const cucumber = 'cucumber';
    let turn = false;
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

    function startGame(){
        cells.forEach(cells => {
            cells.classList.remove(tomato);
            cells.classList.remove(cucumber);
            cells.removeEventListener('click', game);
            cells.addEventListener('click',game ,{once: true});
            restart.style.visibility = 'hidden';
        })
    }
    function game(){
        const cells = this;
        const playerTurn = turn ? tomato : cucumber;
        addMarks(playerTurn, cells);
    
        if(winState(Plit.vegie)){
            console.log(`${Plit.name}, the ${Plit.vegie} wins :D`)
            Plit.winningScore();
            restart.style.visibility = 'visible';
        }else if(winState(Frog.vegie)){
            console.log(`${Frog.name}, the ${Frog.vegie} wins :D`);
            Frog.winningScore();
            restart.style.visibility = 'visible';
        }else if(draw()){
            console.log('draw :v')
            restart.style.visibility = 'visible';
        }else{
            switchingTurns();
        }
    }

    function switchingTurns(){
        turn = !turn;
    }

    function addMarks(playerTurn, cells){
        cells.classList.add(playerTurn);
    }

    function winState(playerTurn){
        return winningComb.some(comb => {
            return comb.every(index => {
                return cells[index].classList.contains(playerTurn);
            })
        })
    }

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

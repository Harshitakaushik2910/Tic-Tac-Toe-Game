const boxes=document.querySelectorAll(".box");
const gameInfo=document.querySelector(".game-info");
const newGameBtn=document.querySelector(".btn");


let currentPlayer;
let gameGrid;
const winningPositions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

// let's create a function to initialize the game
function initGame() {
    currentPlayer = "X";
    gameGrid = ["","","","","","","","",""];
    // ui p empty
    boxes.forEach((box,index)=> {
        box.innerText="";
        boxes[index].style.pointerEvents="all"
        //initialize css properties again
        box.classList=`box box${index+1}`;

        
    });
    newGameBtn.classList.remove("active");
    gameInfo.innerText =`Current Player - ${currentPlayer}`;

}
initGame()
 function swapTurn() {
    if(currentPlayer === "X") {
        currentPlayer = "0";
    }
    else{
        currentPlayer = "X"
    }
    // ui ipdate
    gameInfo.innerText =`Current Player - ${currentPlayer}`;
 }

 function checkGameOver() {
   let answer ="";

   winningPositions.forEach((position) =>{

    //sare box non empty h or sab m same value h
     if( (gameGrid[position[0]]!== "" || gameGrid[position[1]]!== "" || gameGrid[position[2]]!== "")
        && (gameGrid[position[0]] === gameGrid[position[1]]) && (gameGrid[position[1]] === gameGrid[position[2]]))
    {
        //check if winner is X
        if(gameGrid[position[0]]=="X")
            answer="X";
        else
        answer="0";
        
     //disable pointer events
     boxes.forEach((box)=>{
        box.style.pointerEvents="none";})
        // now winner is finded
        boxes[position[0]].classList.add("win");
        boxes[position[1]].classList.add("win");
        boxes[position[2]].classList.add("win");

    }
   });
   //means we have a winner
   if (answer!==""){
        gameInfo.innerText=`Winner Player - ${answer}`;
        newGameBtn.classList.add("active");
    }
    //when there is tie 
    let emptyCount=0;
    gameGrid.forEach((box)=>{
        if(box !=="")
            emptyCount++;
    });
    // cell fill hogye
    if(emptyCount === 9){
        gameInfo.innerText="Game Tied";
        newGameBtn.classList.add("active");
    }

 }
function handleClick(index) {
    if(gameGrid[index] === "" ) {
        boxes[index].innerText =currentPlayer;
        gameGrid[index] =currentPlayer;
        boxes[index].style.pointerEvents="none";
        //swap  kro turn
        swapTurn();
        //check someone win the game
        checkGameOver();
    }
    
}
boxes.forEach((box,index) => {
    box.addEventListener("click",() =>{
        handleClick(index);
    })
})

newGameBtn.addEventListener("click",initGame);
















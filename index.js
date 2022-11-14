const gameBoard = document.querySelector('#snack')
const ctx = gameBoard.getContext('2d')
const scoreText = document.querySelector('#scoreText')
const resetbtn = document.querySelector('#resetbtn')
const gameWidth = gameBoard.width
const gameHeight = gameBoard.height
const boardBackground = 'white'
const snakeColor = '#00FF42'
const appleColor = 'red'
const snakeBorder = 'black'
const unitSize = 25
let running = false
let xvelocity = unitSize
let yvelocity = 0
let appleX;
let appleY;
let score = 0
let snake = [
 { x:unitSize * 4, y:0},
 { x:unitSize * 3, y:0},
 { x:unitSize * 2, y:0},
 { x:unitSize , y:0},
 { x:0, y:0}
]

window.addEventListener('keydown',changeDirection)
resetbtn.addEventListener('click',resetGame)
gameStart()
createApple()
drawApple()
function gameStart(){
  running= true
  scoreText.textContent = score
  createApple()
  drawApple()
  resetTick()
 }
 function resetTick(){
    if(running){
      setTimeout(()=>{
        clearBoard()
        drawApple()
        moveSnake()
        drawSnake()
       checkGameOver()
       resetTick()      
      },120)
    }
    else{
    displayGameOver()      
    }
 }
 function clearBoard(){
  ctx.fillStyle = boardBackground
  ctx.fillRect(0,0,gameWidth,gameHeight)


}
function createApple(){
  function randomApple(a,b){
    const randomNum = Math.round((Math.random() * (a - b) + b) /unitSize) * unitSize
    return randomNum
  }
  appleX = randomApple(0, gameWidth - unitSize)
  appleY = randomApple(0, gameWidth - unitSize)
}
function drawApple(){
  ctx.fillStyle = appleColor
  ctx.fillRect(appleX,appleY,unitSize,unitSize)
}
function moveSnake(){
  const head = {
    x:snake[0].x + xvelocity,
    y:snake[0].y + yvelocity
  } 
  snake.unshift(head)
  if(snake[0].x == appleX && snake[0].y == appleY){
    score += 1
    scoreText.textContent = score
    createApple()
  }
  else{snake.pop()}
}
function drawSnake(){
  ctx.fillStyle = snakeColor
  ctx.strokeStyle = snakeBorder
  snake.forEach(element => {
    ctx.fillRect(element.x,element.y,unitSize,unitSize)   
    ctx.strokeRect(element.x,element.y,unitSize,unitSize)
  });
}
function changeDirection(e){
  const keyPressed  = e.keyCode
  const LEFT = 37
  const UP = 38
const RIGHT = 39
const DOWN = 40

const goingUp = (yvelocity == -unitSize)
const goingDown = (yvelocity == unitSize)
const goingRight = (xvelocity == unitSize)
const goingLeft = (xvelocity == -unitSize)
switch(true){
  case(keyPressed == LEFT && !goingRight):
  xvelocity = -unitSize
  yvelocity = 0
  break;
  case(keyPressed == UP && !goingDown):
  xvelocity = 0
  yvelocity = -unitSize
  break;
  case(keyPressed == RIGHT && !goingLeft):
  xvelocity = unitSize
  yvelocity = 0
  break;
  case(keyPressed == DOWN && !goingUp):
  xvelocity = 0
  yvelocity = unitSize
  break;
}

}
function checkGameOver(){
  switch(true){
    case(snake[0].x < 0):
    running = false
    break;
    case(snake[0].x >= gameWidth):
    running = false
    break;
    case(snake[0].y < 0):
    running = false
    break;
    case(snake[0].y >= gameHeight):
    running = false;
    break;
  }
  for(var i = 1; i < snake.length; i+=1){
    if(snake[i].x == snake[0].x && snake[i].y == snake[0].y ){  
      running = false;}
    }
  }
  function displayGameOver(){
    ctx.font = '50px MV Boil';
    ctx.fillStyle = 'black'
    ctx.textAlign = 'center'
    ctx.fillText('Game Over', gameWidth / 2, gameHeight / 2 )
    running = false;
  }
  

    function resetGame(){
      score = 0
      xvelocity = unitSize
      yvelocity = 0
      snake = [
        { x: unitSize * 4 , y: 0 },
        { x: unitSize * 3 , y: 0 },
        { x: unitSize * 2 , y: 0 },
        { x: unitSize     , y: 0 },
        { x: 0            , y: 0 }
      ]
      gameStart()  
    }  
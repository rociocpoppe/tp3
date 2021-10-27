
let x = 0;
let y = 0;
const bird = document.getElementById('bird');
const pipeline = document.getElementById("pipeline")
const topPipe = document.getElementById("topPipe")
const bottomPipe = document.getElementById("bottomPipe");
const container=document.getElementById("gameContainer");
let birdLeft = 10;
let birdBottom = 100;
let gravity = 3;
let gap = 50;
let isGameOver=false;




    function startGame() {
        birdBottom -= gravity;
        bird.style.bottom = birdBottom + 'px';
        bird.style.left = birdLeft + 'px';
    }
    let gameTimerId = setInterval(startGame, 20)



function moveBird(e) {
    if (e.keyCode === 32) {
        jump()
    }
}

function jump() {
    if (birdBottom < 500) birdBottom += 50
    bird.style.bottom = birdBottom + 'px'
}
document.addEventListener('keyup', moveBird)
let debug = "";

function generateObstacle() {

    let obstacleLeft=1100//--> se empiezan a dibujar afuera por esto ->container.getBoundingClientRect().width;
    console.log(obstacleLeft);
    let bottomPipe = document.createElement('div');
    let topPipe = document.createElement('div');
    let coin=document.createElement('div');
    if (isGameOver==false) {
        console.log("gameover " +isGameOver);
        bottomPipe.classList.add('bottomPipe');
        topPipe.classList.add('topPipe');
        coin.classList.add('coin');
    }
    let heightTpipe = Math.floor(Math.random() * ((container.getBoundingClientRect().height/2 - 100)-50) + 50);//170

    let heightBpipe = Math.floor(Math.random() * ((container.getBoundingClientRect().height - heightTpipe - 75)-50) + 50);//170
 
    topPipe.style.height = `${heightTpipe}px`;  
    if(heightBpipe <= 300){
        bottomPipe.style.height = `${heightBpipe}px`;
    }else{
        heightBpipe = 299;
        bottomPipe.style.height = `${heightBpipe}px`;
    }
    let marginBottomPipe=container.getBoundingClientRect().height-heightBpipe;
    bottomPipe.style.marginTop=`${marginBottomPipe}px`;
    pipeline.appendChild(topPipe);
    pipeline.appendChild(bottomPipe);
    pipeline.appendChild(coin);
    bottomPipe.style.width='60px';  
    topPipe.style.width='60px';
    coin.style.top='200px';
    let timerId = setInterval(moveObstacle, 20);
    function moveObstacle() {
        obstacleLeft -=2;
        bottomPipe.style.left = obstacleLeft + 'px';
        topPipe.style.left = obstacleLeft + 'px';
        coin.style.left=obstacleLeft + 'px';
        let widthBird = bird.getBoundingClientRect().width;
        let heightBird = bird.getBoundingClientRect().height;
        let birdX = bird.getBoundingClientRect().x + widthBird;
        let birdY = bird.getBoundingClientRect().y + heightBird;
        let bottomPipeX = bottomPipe.getBoundingClientRect().x;
        let bottomPipeY = bottomPipe.getBoundingClientRect().y;
        let topPipeX = topPipe.getBoundingClientRect().x;
        let topPipeY = topPipe.getBoundingClientRect().y;
        let bottomPipeWidth = bottomPipe.getBoundingClientRect().width;
        let bottomPipeHeight = bottomPipe.getBoundingClientRect().height;
        let topPipeWidth = topPipe.getBoundingClientRect().width;
        let topPipeHeight = topPipe.getBoundingClientRect().height;
        let birdYT = bird.getBoundingClientRect().y;
        
        if (obstacleLeft === 100 ) {
            //si pones <-130, las pipes desaparecen fuera de la pantalla, fijate que con esto desaparecen antes de 
            //llegar al borde izquierdo
            console.log("entra");
            clearInterval(timerId);
            pipeline.removeChild(bottomPipe);
            pipeline.removeChild(topPipe);
            pipeline.removeChild(coin);
        }

        if (birdBottom<container.getBoundingClientRect().height*(-1)+heightBird || 

            (birdX >= topPipeX && birdX <= topPipeX + topPipeWidth 
                /*&& birdYT >= topPipeY*/ && birdYT <= topPipeY + topPipeHeight)||

            ( birdX >= bottomPipeX && birdX <= bottomPipeX + bottomPipeWidth
                && birdY >= bottomPipeY && birdY <= bottomPipeY + bottomPipeHeight )) {
                    
                    // console.log("DATOS DEL TUBO DE ARRIBA");
                    // console.log(topPipeX);
                    // console.log(topPipeY);
                    // console.log(topPipeWidth);
                    // console.log(topPipeHeight);

                    // console.log("DATOS DEL PAJARO");
                    // console.log(birdX);
                    // console.log(birdYT);
                    // console.log(birdY);
                    // console.log(widthBird);
                    // console.log(heightBird);
                    // console.log(bird.getBoundingClientRect().x);
                    
                    // console.log("DATOS DEL TUBO DE ABAJO");
                    // console.log(bottomPipeX);
                    // console.log(bottomPipeY);
                    // console.log(bottomPipeWidth);
                    // console.log(bottomPipeHeight);
            debug = "CORTO";
            gameOver();
            clearInterval(timerId); 
        }
    }

    if (!isGameOver){
        let random = Math.floor(Math.random() * (4000 - 500) + 500)
        setTimeout(generateObstacle,random );//3000
    } 
  
 
 
} 
generateObstacle();

function gameOver() {
    clearInterval(gameTimerId);
    console.log('game over');
    isGameOver = true;
    document.removeEventListener('keyup', moveBird);
    clearInterval(temp);
    
}
let seconds = 59;
let minutes = 1;
let temp = setInterval(timeLimit, 1000);
let chain;
let time = true;

function timeLimit() {
    if (seconds < 10) {
        chain = minutes + ":0" + seconds;
    } else {
        chain = minutes + ":" + seconds;
    }
    document.getElementById("text").innerHTML = chain;

    if (minutes == 0 && seconds == 0) {
        time = false;
        document.getElementById("text").innerHTML = "Se acabo el tiempo";
        clearInterval(temp);
    } else if (seconds == 0) {
        minutes--;
        seconds = 60;
    }
    seconds--;
}



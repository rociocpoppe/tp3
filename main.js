
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
/*
*Al llevar el eje de coordenadas al documento html hacemos una traducción
*debido a que funcionan distinto y esa diferencia es más evidente cuando trabajamos en el top.
*
*En el eje de coordenadas incremetamos para mover hacia arriba, en el top decrementamos
*para empujar hacias arriba.
*/
// console.log(bottomPipe.getBoundingClientRect());
// function movimiento(event) {
//     let widthBird = bird.getBoundingClientRect().width;
//     let heightBird = bird.getBoundingClientRect().height;
//     let birdX = bird.getBoundingClientRect().x + widthBird;
//     let birdY = bird.getBoundingClientRect().y + heightBird;
//     let bottomPipeX = bottomPipe.getBoundingClientRect().x;
//     let bottomPipeY = bottomPipe.getBoundingClientRect().y;
//     let topPipeX = topPipe.getBoundingClientRect().x;
//     let topPipeY = topPipe.getBoundingClientRect().y;
//     let bottomPipeWidth = bottomPipe.getBoundingClientRect().width;
//     let bottomPipeHeight = bottomPipe.getBoundingClientRect().height;
//     let topPipeWidth = bottomPipe.getBoundingClientRect().width;
//     let topPipeHeight = bottomPipe.getBoundingClientRect().height;
//     let birdYT = bird.getBoundingClientRect().y;
//     //  }
//     // if (event.keyCode == '39') {//derecha


//     //     x = x + 10;
//     //     bird.style.left = x + 'px';
//     // }

//     // if (event.keyCode == '37') {//Izquierda
//     //     x = x - 10;
//     //     bird.style.left = x + 'px';
//     // }

   

//     // if (event.keyCode == '38') {//arriba
//     //     let birdAux = birdYT-200;
//     //     element.style.setProperty("myVar0", birdYT);
//     //     element.style.setProperty("myVar100", birdAux);
//     //     bird.style.animation = 'up 0.95s ease-in-out'; //ease-out-quart
//     //     bird.style.top = 500+'px';
//     // }



     


//     if (birdX >= topPipeX && birdX <= topPipeX + topPipeWidth
//         && birdYT >= topPipeY && birdYT <= topPipeY + topPipeHeight) {


//         bird.style.animation = 'up 0.95s ease-in-out ';
//         bird.style.top = '500px';

//         // caer();

//     }

//     //chequeada
//     if (birdX >= bottomPipeX && birdX <= bottomPipeX + bottomPipeWidth
//         && birdY >= bottomPipeY && birdY <= bottomPipeY + bottomPipeHeight) {
//         console.log("cae");
//     }

//     // if (event.keyCode == '40') {//abajo
//     //     y = y - 10;
//     //     bird.style.top = (-y) + 'px';
//     // }

	
// }


// function caer() {

//     bird.style.animation = 'down 1.1s ease-in-out ';
//     bird.style.top = '500px';

// }




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

    console.log(debug);
    let obstacleLeft=container.getBoundingClientRect().width;;
    let bottomPipe = document.createElement('div');
    let topPipe = document.createElement('div');
    if (isGameOver==false) {
        console.log("gameover " +isGameOver);
        bottomPipe.classList.add('bottomPipe');
        topPipe.classList.add('topPipe');
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
    bottomPipe.style.width='60px';  
    topPipe.style.width='60px';

    let timerId = setInterval(moveObstacle, 20);
    function moveObstacle() {
        obstacleLeft -=2;
        bottomPipe.style.left = obstacleLeft + 'px';
        topPipe.style.left = obstacleLeft + 'px';
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
        
        if (obstacleLeft < -130 ) {

            clearInterval(timerId);
            pipeline.removeChild(bottomPipe);
            pipeline.removeChild(topPipe);
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



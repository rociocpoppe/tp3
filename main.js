
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
    console.log(birdBottom)
}
document.addEventListener('keyup', moveBird)


function generateObstacle() {
    let obstacleLeft=900;
    let bottomPipe = document.createElement('div');
    let topPipe = document.createElement('div');
    if (!isGameOver) {
    bottomPipe.classList.add('bottomPipe')
    topPipe.classList.add('topPipe')
    }
    pipeline.appendChild(topPipe)
    pipeline.appendChild(bottomPipe)

    function moveObstacle() {
        obstacleLeft -=4
        bottomPipe.style.left = obstacleLeft + 'px'
        topPipe.style.left = obstacleLeft + 'px'
        let widthBird = bird.getBoundingClientRect().width;
    let heightBird = bird.getBoundingClientRect().height;
    console.log("bird height" +heightBird);
    let birdX = bird.getBoundingClientRect().x + widthBird;
    let birdY = bird.getBoundingClientRect().y + heightBird;
    let bottomPipeX = bottomPipe.getBoundingClientRect().x;
    let bottomPipeY = bottomPipe.getBoundingClientRect().y;
    let topPipeX = topPipe.getBoundingClientRect().x;
    let topPipeY = topPipe.getBoundingClientRect().y;
    let bottomPipeWidth = bottomPipe.getBoundingClientRect().width;
    let bottomPipeHeight = bottomPipe.getBoundingClientRect().height;
    let topPipeWidth = bottomPipe.getBoundingClientRect().width;
    let topPipeHeight = bottomPipe.getBoundingClientRect().height;
    let birdYT = bird.getBoundingClientRect().y;
        
        console.log(topPipe.getBoundingClientRect().width);
        if (obstacleLeft ==-70) {
            clearInterval(timerId)
            pipeline.removeChild(bottomPipe)
            pipeline.removeChild(topPipe)
        }
        if (birdBottom==-500 || (birdX >= topPipeX && birdX <= topPipeX + topPipeWidth
                    && birdYT >= topPipeY && birdYT <= topPipeY + topPipeHeight)||
                   ( birdX >= bottomPipeX && birdX <= bottomPipeX + bottomPipeWidth
                     && birdY >= bottomPipeY && birdY <= bottomPipeY + bottomPipeHeight )) {
                console.log("game over");
             gameOver();
            clearInterval(timerId)
        }
    }
     let timerId = setInterval(moveObstacle, 20) 
    
     if (!isGameOver) setTimeout(generateObstacle, 3000)

    //     if (
    //         obstacleLeft > 200 && obstacleLeft < 280 && birdLeft === 220 &&
    //         (birdBottom < obstacleBottom + 153 || birdBottom > obstacleBottom + gap -200)||
    //         birdBottom === 0 
    //         ) {
    //       
}
generateObstacle()

function gameOver() {
    clearInterval(gameTimerId)
    console.log('game over')
    isGameOver = true
    document.removeEventListener('keyup', moveBird)
}

// function setPipeSize() {
//     const alturaDisponible = innerHeight - 150;
//     console.log(alturaDisponible);
//     const bottomHeight = Math.floor(Math.random() * (alturaDisponible + 1));
//     bottomPipe.style.height = `${bottomHeight}px`;
//     const upperHeight = alturaDisponible - bottomHeight;
//     topPipe.style.height = `${upperHeight}px`;
// }

// //no sirve habria que hacer un for que recorra el ancho y que vaya aumentando el margen 
// function setPipePosition(){
//     for(let i=200; i<=700; i+=200){
//        bottomPipe.style.marginLeft= `${i}px`;
//        topPipe.style.marginLeft= `${i}px`;

//     }
        // bottomPipe.style.marginLeft= `${index}px`;
        // topPipe.style.marginLeft= `${i}px`;
    // const anchoDisponible=700;
    // const pos = Math.floor(Math.random() * (anchoDisponible + 1));
    // bottomPipe.style.marginLeft= `${pos}px`;
    // topPipe.style.marginLeft= `${pos}px`;
// }

// pipeline.addEventListener("animationiteration", () => {
//     setPipeSize();
//    // setPipePosition();
//     // bottomPipe.style.marginLeft=`30px`;
// });
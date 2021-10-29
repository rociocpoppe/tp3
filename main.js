let x = 0;
let y = 0;

const bird = document.getElementById('bird');
const pipeline = document.getElementById("pipeline")
const topPipe = document.getElementById("topPipe")
const bottomPipe = document.getElementById("bottomPipe");
const container=document.getElementById("gameContainer");
const city=document.getElementById("city");

let birdLeft = 10;
let birdBottom = 100;
let gravity = 3;
let gap = 50;
let isGameOver=false;
let points=0;
let contObtaculo = 1;

    function startGame() {
        birdBottom -= gravity;
        bird.style.bottom = birdBottom + 'px';
        bird.style.left = birdLeft + 'px';
    }
    let gameTimerId = setInterval(startGame, 20);

    function moveBird(e) {
        if (e.keyCode === 32) {
            jump();
        }
    }
    
    function jump() {
        if (birdBottom < 500) birdBottom += 50;
        bird.style.transform='rotate (30deg)';
        bird.style.bottom = birdBottom + 'px';
    }
    document.addEventListener('keyup', moveBird);


    function generateObstacle() {
        let obstacleLeft=1100//--> se empiezan a dibujar afuera por esto ->container.getBoundingClientRect().width;
        let bottomPipe = document.createElement('div');
        let topPipe = document.createElement('div');
        let coin=document.createElement('div');
        let obstacle = document.createElement('div');
        if(contObtaculo<7){
            bottomPipe.classList.add('bottomPipe');
            topPipe.classList.add('topPipe');
            coin.classList.add('coin');   
        }
          
        if (contObtaculo >7) {
            obstacle.classList.add('obstacle2');
        } 
         
        let heightTpipe = Math.floor(Math.random() * ((container.getBoundingClientRect().height/2 - 100)-50) + 50);//170
        let heightBpipe = Math.floor(Math.random() * ((container.getBoundingClientRect().height - heightTpipe - 75)-50) + 50);//170
        let coinPosition= Math.floor(Math.random() * ((pipeline.getBoundingClientRect().height /2)));
        let obstacle2Position = Math.floor(Math.random() * ((pipeline.getBoundingClientRect().height / 2)));
        
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
        pipeline.appendChild(obstacle);

        bottomPipe.style.width='60px';  
        topPipe.style.width='60px';
        coin.style.top= `${coinPosition}px`;
        obstacle.style.top = `${obstacle2Position}px`;
        let timerId = setInterval(moveObstacle, 20);
        function moveObstacle() {
            if(!isGameOver){
                obstacleLeft -=2;
                bottomPipe.style.left = obstacleLeft + 'px';
                topPipe.style.left = obstacleLeft + 'px';
                coin.style.left=obstacleLeft + 'px';
                obstacle.style.left = obstacleLeft + 'px';
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
                let coinY=coin.getBoundingClientRect().y;
                let coinX=coin.getBoundingClientRect().x;
                let coinHeight=coin.getBoundingClientRect().height;
                let coinWidth=coin.getBoundingClientRect().width;
                let birdYT = bird.getBoundingClientRect().y;
                let obstacle2Y = obstacle.getBoundingClientRect().y;
                let obstacle2X = obstacle.getBoundingClientRect().x;
                let obstacle2Height = obstacle.getBoundingClientRect().height;
                let obstacle2Width = obstacle.getBoundingClientRect().width;
                if (obstacleLeft <100 ) {
                    clearInterval(timerId);
                    pipeline.removeChild(bottomPipe);
                    pipeline.removeChild(topPipe);
                    pipeline.removeChild(coin);
                    pipeline.removeChild(obstacle);
               
                }
                if (birdBottom<container.getBoundingClientRect().height*(-1)+heightBird || 
                    (birdX >= topPipeX && birdX <= topPipeX + topPipeWidth 
                        /*&& birdYT >= topPipeY*/ && birdYT <= topPipeY + topPipeHeight)||
                    ( birdX >= bottomPipeX && birdX <= bottomPipeX + bottomPipeWidth
                        && birdY >= bottomPipeY && birdY <= bottomPipeY + bottomPipeHeight
                        ||  birdX >= obstacle2X && birdX <= obstacle2X + obstacle2Width
                        && birdYT >= obstacle2Y && birdYT <= obstacle2Y + obstacle2Height )) {
                    
                    clearInterval(timerId); 
                    isGameOver = true;
                
                    clearInterval(temp);
                    gameOver();
                }
                let coin2=document.createElement('div');
                let obstacle2 = document.createElement('div');
                if(birdX>=coinX && birdX<= coinX+coinWidth && birdYT<=coinY+ coinHeight && !isGameOver){
                    points++;
                    document.getElementById("points").innerHTML = "SCORE "+`${points}`;
                    coin2.classList.add('coin2');
                    pipeline.appendChild(coin2);
                    coin2.style.top= `${coinPosition}px`;
                    pipeline.replaceChild(coin2,coin);
                    
                    
                }
            }
        }
        if (!isGameOver){
            let random1 = Math.floor(Math.random() * (4000 - 500) + 500);
            setTimeout(generateObstacle,random1 );//3000
            let random2 = Math.floor(Math.random() * (10 - 1) + 1);
            contObtaculo = random2;

        }  
    } 

    generateObstacle();

    function gameOver() {
        let gameOv=document.createElement('div');
        gameOv.classList.add('gameOver');
        city.appendChild(gameOv);
        clearInterval(gameTimerId);
        isGameOver = true;
        pipeline.remove();
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
            document.getElementById("text").innerHTML = "Time's up";
            clearInterval(temp);
            gameOver();
        } else if (seconds == 0) {
            minutes--;
            seconds = 60;
        }
        seconds--;
        if(60/2>=seconds){
            city.style.background=`url(img/b1.jpg)`;
        }
        else if(60/2<=seconds){
            city.style.background=`url(img/b3.jpg)`;
        }
     
    }

    //let change= setInterval(changeScenery,5000);
    let aux=1;
    function changeScenery(){
        // let selected = document.getElementById("changeScenery").value;
        // city.style.background=`url(${selected})`;
       
        if(contObtaculo=1){
            city.style.background=`url(img/b1.jpg)`;
            aux=0;
            console.log("if" + aux);
        }else if(contObtaculo=0){
            city.style.background=`url(img/b3.jpg)`;
            aux=1;
            console.log("else" + aux);
        }
    }

    

document.getElementById('changeScenery').addEventListener("click", changeScenery);


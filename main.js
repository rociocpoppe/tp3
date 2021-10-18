
let x = 0;
let y = 0;
const bird = document.getElementById('bird');
const pipeline = document.getElementById("pipeline")
const topPipe = document.getElementById("topPipe")
const bottomPipe = document.getElementById("bottomPipe");
const container=document.getElementById("gaemContainer");


/*
*Al llevar el eje de coordenadas al documento html hacemos una traducción
*debido a que funcionan distinto y esa diferencia es más evidente cuando trabajamos en el top.
*
*En el eje de coordenadas incremetamos para mover hacia arriba, en el top decrementamos
*para empujar hacias arriba.
*/

function movimiento(event){
	if(event.keyCode == '39'){//derecha
		x= x + 50;
		bird.style.left = x + 'px';
	}

	if(event.keyCode == '37'){//Izquierda
		x= x - 50;
		bird.style.left = x +'px';	
	}
	
	if(event.keyCode == '38'){//arriba
		y = y + 50;                               
		bird.style.top = (-y) + 'px';
	}

	if(event.keyCode == '40'){//abajo
		y = y - 50;                            
		bird.style.top = (-y) + 'px';
	}

}

function mantener(){

}
window.onkeyup = movimiento;
window.onkeydown=mantener;

function pierde(){
  
    const tocaIzq = bird.offsetLeft >= topPipe.offsetLeft - bird.clientWidth;
  
    // const offsetRightPipe = (pipeline.offsetLeft + 2 * bird.clientWidth);

    // const behind = offsetRightPipe < bird.offsetLeft;

    // const isColumnLine = tocaIzq && !behind;

    // if (!isColumnLine) return false;

    // const touchingTop = bird.offsetTop <= topPipe.offsetHeight;

    // const touchingBotton = bird.offsetTop <= bottomPipe.offsetHeight;
    // console.log("perdio");
    // return (touchingTop || touchingBotton);
    
   
}

pierde();


function setPipeSize() {

    const alturaDisponible = innerHeight - 150;
    console.log(alturaDisponible);
    const bottomHeight = Math.floor(Math.random() * (alturaDisponible + 1));
    bottomPipe.style.height = `${bottomHeight}px`;
    const upperHeight = alturaDisponible - bottomHeight;
    topPipe.style.height = `${upperHeight}px`;
}

//no sirve habria que hacer un for que recorra el ancho y que vaya aumentando el margen 
function setPipePosition(){
    for(let i=200; i<=700; i+=200){
       bottomPipe.style.marginLeft= `${i}px`;
       topPipe.style.marginLeft= `${i}px`;
     
    }
        // bottomPipe.style.marginLeft= `${index}px`;
        // topPipe.style.marginLeft= `${i}px`;
    // const anchoDisponible=700;
    // const pos = Math.floor(Math.random() * (anchoDisponible + 1));
    // bottomPipe.style.marginLeft= `${pos}px`;
    // topPipe.style.marginLeft= `${pos}px`;
}

pipeline.addEventListener("animationiteration", () => {
    setPipeSize();
   // setPipePosition();
    // bottomPipe.style.marginLeft=`30px`;
});
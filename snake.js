"use strict";

let canvas = document.getElementById("snakeBoard");
let cxt = canvas.getContext("2d");

let canvasW = canvas.width;
let canvasH = canvas.height;

let snakeW = 10;
let snakeH = 10;

let score = 0;
let hi_score = 0;

// deafult direction
let direction = "right";

//function htmlCanvas () {
	cxt.textAlign = "center";
	cxt.fillStyle = "#4160D2";
	cxt.fillText('Press play', canvasW/2, canvasH/2);
//}
//htmlCanvas();

let play;
let isPaused = true;
function game() {
		play = document.getElementById("play");
		isPaused = !isPaused;
		if(isPaused && play.innerHTML=="Pause") {
			cxt.textAlign = "center";
			cxt.fillStyle = "#4160D2";
			cxt.fillText('Paused', canvasW/2, canvasH/2);
			play.innerHTML = "Play";
		}
		else if(!isPaused && play.innerHTML=="Play") {
			play.innerHTML = "Pause";
		}
		 else if(over) {
		 	over = !over;
		 	cxt.clearRect(0,0,canvasW,canvasH);
		 	cxt.fillStyle = "#4160D2";
		 	cxt.fillText('Press Play', canvasW/2, canvasH/2);
		 	play.innerHTML="Play";
		 	//htmlCanvas();
		 	snakeInitialize();
		 	foodInitialize();	
		 	score = 0;
		 	document.getElementById('score_value').innerHTML = score;
		 	direction = "right";
		 	startGame();	
		}
	}	

	function randomColor() {
		var letters = '0123456789ABCDEF';
    	var color = '#';
  		for (var i = 0; i < 6; i++) {
    	color += letters[Math.floor(Math.random() * 16)];
  	}
  	if (color != "#DF2020" && color != "#DFC920") {
  		return color;
  	}
  	else {
  		randomColor();
  	}
	}

	function setRandomColor() {
  		canvas.style.backgroundColor = randomColor();
	}

	function slowSnake() {
		timer = timer+20;
		startGame();
	}

	function fastSnake() {
		timer = timer-20;
		startGame();
	}

	let snake;
	function snakeInitialize() {
	//create snake as array. By default contains four cells
	let len = 4;
	snake = [];

	for(let i = len-1; i>=0; i--) {
		snake.push({x:i, y:0});
	}
}

	//to color snake
	function drawSnake (x, y) {
		cxt.fillStyle = "#DF2020";
		cxt.fillRect(x*snakeW,y*snakeH,snakeW,snakeH);

		cxt.strokeStyle = "#D29B41";
		cxt.strokeRect(x*snakeW,y*snakeH,snakeW,snakeH);
	}

	
	let food;
	//create food	
	function foodInitialize() {
		food = { 
			x: Math.round(Math.random()*(canvasW/snakeW-2)+1),
			y: Math.round(Math.random()*(canvasH/snakeH-2)+1)
		};
	}


	function createFood (x,y) {
		for (let i=0; i<snake.length; i++) {
			if (x==snake[i].x && y==snake[i].y) {
				food = {
					x: Math.round(Math.random()*(canvasW/snakeW-2)+1),
					y: Math.round(Math.random()*(canvasH/snakeH-2)+1)
				};
				createFood(food.x, food.y);
			}
		}
		cxt.fillStyle = "#DFC920";
		cxt.fillRect(x*snakeW,y*snakeH,snakeW,snakeH);

		cxt.strokeStyle = "#000";
		cxt.strokeRect(x*snakeW,y*snakeH,snakeW,snakeH);
	}

	// //create obstacle as array. 
	// let len = 4;
	// let obstacle = [];

	// for(let i = len-1; i>=0; i--) {
	// 	obstacle.push({x:i, y:0});
	// }
	// //to create obstacle
	// function createObstacle (x, y) {
	// 	cxt.fillStyle = "#AAA";
	// 	cxt.fillRect(x*snakeW,y*snakeH,snakeW,snakeH);

	// 	cxt.strokeStyle = "#000";
	// 	cxt.strokeRect(x*snakeW,y*snakeH,snakeW,snakeH);
	// }

	//add user inputs
	document.addEventListener("keydown",getDirection);

	function getDirection(e) {
		if (e.keyCode == 37 && direction != "right") {
			direction = "left";
		} else if (e.keyCode == 38 && direction != "down") {
			direction = "up";
		} else if (e.keyCode == 39 && direction != "left") {
			direction = "right";
		} else if (e.keyCode == 40 && direction != "up") {
			direction = "down";
		}
	}

	// check when the snake hits itself
	function checkSelfHit(x,y,snakeArray) {		
		for (let i=0; i<snakeArray.length; i++) {
			if(x==snakeArray[i].x && y==snakeArray[i].y) {
				return true;
			}			
		}
		return false;		
	}

	 
	 let over;
	 let gameOverText;
	 function gameOver(snakeX,snakeY,canvasW,snakeW,canvasH,snakeH,snake,score) {
	 	if (snakeX < 0 || snakeY < 0 || snakeX >= canvasW/snakeW || snakeY >= canvasH/snakeH || checkSelfHit(snakeX,snakeY,snake)) {
			cxt.textAlign = "center";
			cxt.fillStyle = "#4160D2";
			gameOverText = cxt.fillText('Game over!', canvasW/2, canvasH/2);
			cxt.fillText(`Score: ${score}`, canvasW/2, canvasH/2+10);
			play.innerHTML = "Start New Game";
			clearInterval(interval);
			return true;
		}
		return false;
	 }


	snakeInitialize();
	foodInitialize();

	function draw() {

		if (isPaused) {			
			return;
		}

		cxt.clearRect(0,0,canvasW,canvasH);
		//snakeInitialize();
		for(let i=0; i<snake.length; i++) {
			let x = snake[i].x;
			let y = snake[i].y;
			drawSnake(x,y);
		}

		// for(let i=0; i<obstacle.length; i++) {
		// 	let x = obstacle[i].x;
		// 	let y = obstacle[i].y;
		// 	createObstacle(x,y);
		// }
		
		createFood(food.x, food.y);
		

		// snake head
		let snakeX = snake[0].x;
		let snakeY = snake[0].y;


		if (direction == "left") snakeX--;
		else if (direction == "up") snakeY--;
		else if (direction == "right") snakeX++;
		else if (direction == "down") snakeY++;

		// if the snake hits the wall....... and for self hit, checkSelfHit(snakeX,snakeY,snake)
		over = gameOver(snakeX,snakeY,canvasW,snakeW,canvasH,snakeH,snake,score);
		if (over) {
			return;
		}
		

		if (snakeX == food.x && snakeY == food.y) {
			let newHead = {x: snakeX, y: snakeY};
			snake.unshift(newHead);
			score++;
			food = {
				x: Math.round(Math.random()*(canvasW/snakeW-2)+1),
				y: Math.round(Math.random()*(canvasH/snakeH-2)+1)
			}			
		}
		else {
			// remove tail
			snake.pop();
			let newHead = {x: snakeX, y: snakeY};
			snake.unshift(newHead);
		}
		

		document.getElementById('score_value').innerHTML = score;
		
		if (score > 2 && score < 6) {
			clearInterval(interval);
			interval = setInterval(draw,timer-50);
		}
		if (score > 6) {
			clearInterval(interval);
			interval = setInterval(draw,timer-100);
		}
		if (score > hi_score) {
		hi_score = score;
		document.getElementById('hi_score_value').innerHTML = hi_score;
	}
	}
	if (score > hi_score) {
		hi_score = score;
		document.getElementById('hi_score_value').innerHTML = hi_score;
	}
	

	let timer = 200;
	let interval;
	function startGame() {
		//htmlCanvas();
		clearInterval(interval);
		//direction = "right";
		interval = setInterval(draw,timer);
	}
	startGame();


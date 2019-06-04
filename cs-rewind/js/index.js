function dotCollector1() {
	var canvas = document.getElementById("dot-collector-1");
	var ctx = canvas.getContext("2d");

	function setupCanvas() {
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
	}
	setupCanvas();
	window.onresize = function() {
		setupCanvas();
	};

	function getRandomColor() {
		var letters = "0123456789ABCDEF";
		var color = "#";
		for (var i = 0; i < 6; i++) {
			color += letters[Math.floor(Math.random() * 16)];
		}
		return color;
	}

	const keys = [];
	document.onkeydown = function(e) {
		keys[e.keyCode] = true;
	};
	document.onkeyup = function(e) {
		keys[e.keyCode] = false;
	};

	document.getElementById("dot-collector-1").style.backgroundColor = "#b3ffff";

	let text = "collect dots!";
	var score = 0;

	let boulder = {
		pos: {
			x: Math.random() * canvas.width,
			y: -400 - canvas.height,
		},
		dim: {
			length: 200,
			width:  canvas.width/5.25,
		},
		motion: {
			shake: 1,
		}
	};

	let player = {
		pos: {
			x: canvas.width/2,
			y: canvas.length/2,
		},
		size: canvas.width/15,
	}

	let point = {
		pos: {
			x: Math.random() * canvas.width,
			y: Math.random() * canvas.height
		},
		size: 10
	};

	let slowTime = {
		pos: {
			x: Math.random() * canvas.width,
			y: Math.random() * canvas.height,
		},
		factor: 1,
		ready: false,
	}

	let doublePnts = {
		pos: {
			x: Math.random() * canvas.width,
			y: Math.random() * canvas.height,
		},
		factor: 1,
		ready: false,
	}

	let seconds = 1;
	let slowTimeTimer;
	let dblPtsTimer = 0;

	let playerSpeed = canvas.width/100;




	// btw *this* --> ?turn_off_js=true <-- feature is just great




	function cycle() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		// Player Movement
		if (keys[16]) 
			playerSpeed = canvas.width/(66 + 2/3) / slowTime.factor;
		if (keys[68] || keys[39]) 
			player.pos.x += playerSpeed;
		if (keys[65] || keys[37]) 
			player.pos.x -= playerSpeed;
		if (keys[87] || keys[38]) 
			player.pos.y -= playerSpeed;
		if (keys[83] || keys[40]) 
			player.pos.y += playerSpeed;

		ctx.fillStyle = "#968388";
		if (seconds % 5 < .1)
			ctx.fillRect(player.pos.x, player.pos.y, player.size, player.size);
		playerSpeed = canvas.width/100 / slowTime.factor;

		// Point stuff system
		ctx.fillStyle = "#66ff33";
		if ( point.pos.x > player.pos.x && 
		     point.pos.x < player.pos.x + player.size &&
			point.pos.y < player.pos.y + player.size && 
		     point.pos.y > player.pos.y ) {
			if (doublePnts.factor === 2) {
				score++;
				ctx.font = "50px Arial";
				ctx.fillText("+2", point.pos.x, point.pos.y + 5);
			} else {
				ctx.font = "50px Arial";
				ctx.fillText("+1", point.pos.x, point.pos.y + 5);
			}
			text = ++score;
			point.pos.x = Math.random() * canvas.width;
			point.pos.y = Math.random() * canvas.height;
		}
		ctx.fillRect(point.pos.x, point.pos.y, point.size, point.size);
		ctx.stroke();
		ctx.strokeStyle = "yellow";
		ctx.strokeRect(point.pos.x, point.pos.y, point.size, point.size);

		if (score >= 45)
			document.getElementById("dot-collector-1").style.backgroundColor = "#081435";
		else if (score >= 40)
			document.getElementById("dot-collector-1").style.backgroundColor = "#12255b";
		else if (score >= 35)
			document.getElementById("dot-collector-1").style.backgroundColor = "#182e68";
		else if (score >= 30)
			document.getElementById("dot-collector-1").style.backgroundColor = "#305472";
		else if (score >= 25)
			document.getElementById("dot-collector-1").style.backgroundColor = "#3c7287";
		else if (score >= 20)
			document.getElementById("dot-collector-1").style.backgroundColor = "#4d7c8e";
		else if (score >= 15)
			document.getElementById("dot-collector-1").style.backgroundColor = "#55919b";
		else if (score >= 10)
			document.getElementById("dot-collector-1").style.backgroundColor = "#62a8ad";
		else if (score >= 5)
			document.getElementById("dot-collector-1").style.backgroundColor = "#8ed1d1";

		ctx.fillStyle = "#d1a258";
		ctx.font = "25px Arial";
		if (difficulty < 1) {
			ctx.fillText("easy difficulty", 300, 50);
		} else if (difficulty < 2.5) {
			ctx.fillText("normal difficulty", 300, 50);
		} else if (difficulty < 20) {
			ctx.fillText("hard difficulty", 300, 50);
		} else if (difficulty < 21) {
			ctx.fillText("impossible difficulty", 300, 50);
		}

		// Blocks
		boulder.motion.shake = Math.random() % 2;
		if (boulder.motion.shake < .1)
			boulder.pos.x += 8 * difficulty;
		else if (boulder.motion.shake > .9)
			boulder.pos.x -= 8 * difficulty;

	// 	boulder.position.x += (Math.random() - .5) * 16 * difficulty;

		if (boulder.pos.y > canvas.height) {
			boulder.pos.y = -500 / difficulty;
			boulder.pos.x = Math.random() * canvas.width;
		} else 
			boulder.pos.y += 13 * difficulty / slowTime.factor;

		if (player.pos.x > canvas.width - player.size)
			player.pos.x -= player.size/3.85;
		if (player.pos.x < 0)
			player.pos.x += player.size/3.85;
		if (player.pos.y > canvas.height - player.size)
			player.pos.y -= player.size/3.85;
		if (player.pos.y < 0) 
			player.pos.y += player.size/3.85;
		ctx.fillStyle = "#6e2c00";
		ctx.fillRect(boulder.pos.x, boulder.pos.y, boulder.dim.width, 200);

		ctx.fillStyle = "#fe5478";
		ctx.fillRect(player.pos.x, player.pos.y, player.size, player.size);

		// Score text
		ctx.fillStyle = getRandomColor();
		ctx.font = "45px Arial";
		ctx.fillText(text, 10, 50);

		// Power-ups
			// Time and Slowtime Powerup 
		seconds += 1/60 / slowTime.factor;

		if ( seconds % 2 < .000000001/*.0000000000001*/ &&
		    Math.random() > .8 || slowTime.ready === true ) {
			slowTime.ready = true;
			ctx.fillStyle = "#ffcc00";
			ctx.fillRect(slowTime.pos.x, slowTime.pos.y, 35, 35);
			if ( player.pos.x < slowTime.pos.x + 35 &&
			    player.pos.x + player.size > slowTime.pos.x &&
			    slowTime.pos.y < player.pos.y + player.size && 
			    slowTime.pos.y + 35 > player.pos.y ) {
					// // // // // console.log("slowtime is on");
					slowTime.factor = 3;
					slowTime.pos.x = Math.random() * canvas.width;
					slowTime.pos.y = Math.random() * canvas.height;
					slowTime.ready = false;
					slowTimeTimer = seconds;
			}
		}
			// Double points Powerup
		if ( seconds % 2 < .000000001/*.0000000000001*/ &&
		    Math.random() > .8 || doublePnts.ready === true) {
			doublePnts.ready = true;
			ctx.fillStyle = "#4169e1";
			ctx.fillRect(doublePnts.pos.x, doublePnts.pos.y, 35, 35);
			if (player.pos.x < doublePnts.pos.x + 35 &&
			    player.pos.x + player.size > doublePnts.pos.x &&
			    doublePnts.pos.y < player.pos.y + player.size && 
			    doublePnts.pos.y + 35 > player.pos.y ) {
					// // // // // console.log("Double Points is on");
					doublePnts.factor = 2;
					doublePnts.pos.x = Math.random() * canvas.width;
					doublePnts.pos.y = Math.random() * canvas.height;
					doublePnts.ready = false;
					dblPtsTimer = seconds;
			}
		}

		if (seconds - slowTimeTimer >= 1 + 1/3) {
			slowTime.factor = 1;
			// // // // // console.log("slowtime is off");
		} else if (slowTime.factor === 3) {
			ctx.fillStyle = "#ffcc00";
			ctx.font = "30px Arial";
			ctx.fillText("⌛", canvas.width - 50, 50);
		}
		if (seconds - dblPtsTimer >= 5) {
			doublePnts.factor = 1;
			// // // // // console.log("Double Points is off");
		} else if (doublePnts.factor === 2) {
			ctx.fillStyle = "#4169e1";
			ctx.font = "30px Arial";
			ctx.fillText("X2", canvas.width - 100, 50);
		}

		// Check for gameover
		if (player.pos.x < boulder.pos.x + boulder.dim.width &&
		    player.pos.x + player.size > boulder.pos.x &&
		    boulder.pos.y < player.pos.y + player.size && 
		    boulder.pos.y + 190 > player.pos.y ) {

			ctx.fillStyle = getRandomColor();
			ctx.font = "400px Arial";
			ctx.fillText(score, canvas.width/3, canvas.height/1.5);

			ctx.fillStyle = getRandomColor();
			ctx.font = "30px Arial";
			ctx.fillText("PRESS \"R\" TO PLAY AGAIN",
					   canvas.width/4, canvas.height/1.25);
			requestAnimationFrame(spaceToStart);
		} else 
			requestAnimationFrame(cycle);
	}

	function spaceToStart() {
		if (keys[49])
			difficulty = .6;
		if (keys[50])
			difficulty = 1;
		if (keys[51])
			difficulty = 2.5;
		if (keys[52])
			difficulty = 20;

		if (keys[82]) {
			text = "collect dots!";
			score = 0;
			document.getElementById("dot-collector-1").style.backgroundColor = "#b3ffff";

			player.pos.x = canvas.width/2 - 25;
			player.pos.y = canvas.height/2 - 25;
			player.size = canvas.width/15;

			boulder.pos.x = Math.random() * canvas.width;
			boulder.pos.y = -400 - canvas.height;
			boulder.dim.width = canvas.width/5.25;

			point.pos.x = Math.random() * canvas.width;
			point.posy = Math.random() * canvas.height;

			slowTime.pos.x = Math.random() * canvas.width;
			slowTime.pos.y = Math.random() * canvas.height;
			slowTime.factor = 1;
			slowTime.ready = false;

			doublePnts.pos.x = Math.random() * canvas.width;
			doublePnts.pos.y = Math.random() * canvas.height;
			doublePnts.factor = 1;
			doublePnts.ready = false;

			seconds = 1;
			slowTimeTimer;
			dblPtsTimer = 0;
			playerSpeed = 10;

			requestAnimationFrame(cycle);
			return;
		}
		else 
			requestAnimationFrame(spaceToStart);
	}

	let difficulty = 2;

	ctx.fillStyle = getRandomColor();
	ctx.font = canvas.width/22 + "px Arial";
	ctx.fillText("PRESS \"R\" TO START", canvas.width/4, canvas.height/2);
	ctx.fillText("also click 1,2,3, or 4 to change difficulty", canvas.width/8, canvas.height/1.8);
	ctx.fillText("(easy, normal, hard, or impossible respectively)", canvas.width/8, canvas.height/1.6);
	requestAnimationFrame(spaceToStart);
}

//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////

function dotCollector2() {
	var canvas = document.getElementById("dot-collector-2");
	var ctx = canvas.getContext("2d");

	function setupCanvas() {
		canvas.width = 650;
		canvas.height = 550;
	}
	
	setupCanvas();
	window.onresize = function() {
		setupCanvas();
	};

	function getRandomColor() {
		var letters = "0123456789ABCDEF";
		var color = "#";
		for (var i = 0; i < 6; i++) {
			color += letters[Math.floor(Math.random() * 16)];
		}
		return color;
	}

	let mouse = {
	  down: false,
	  x: 0,
	  y: 0
	};

	canvas.addEventListener("mousemove", event => {
	  var rect = canvas.getBoundingClientRect();
	  mouse.x = (event.clientX - rect.left)*1.35;
	  mouse.y = (event.clientY - rect.top)*1.35;
	});
	canvas.addEventListener("mousedown", event => {
	  mouse.down = true;
	  // // // // // console.log(mouse);
	});
	canvas.addEventListener("mouseup", event => {
	  mouse.down = false;
	});

	const keys = [];
		canvas
	canvas.addEventListener("keydown", event => {
		keys[e.keyCode] = true;
	});
	canvas.addEventListener("keyup", event => {
		keys[e.keyCode] = false;
	});

	let text = "collect dots!";
	var score = 0;

	let boulder = {
		pos: {
			x: Math.random() * canvas.width,
			y: -400 - canvas.height,
		},
		dim: {
			length: 200,
			width:  canvas.width/5.25,
		},
		motion: {
			shake: 1,
		}
	};

	let player = {
		pos: {
			x: canvas.width/2,
			y: canvas.length/2,
		},
		size: canvas.width/15,
	}

	let point = {
		pos: {
			x: Math.random() * canvas.width,
			y: Math.random() * canvas.height
		},
		size: 10
	};

	let slowTime = {
		pos: {
			x: Math.random() * canvas.width,
			y: Math.random() * canvas.height,
		},
		factor: 1,
		ready: false,
	}

	let doublePnts = {
		pos: {
			x: Math.random() * canvas.width,
			y: Math.random() * canvas.height,
		},
		factor: 1,
		ready: false,
	}

	let seconds = 1;
	let slowTimeTimer;
	let dblPtsTimer = 0;

	let playerSpeed = canvas.width/58;
	let backColor = "b3ffff";


	function cycle() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.fillStyle = backColor;
		//ctx.fillRect(0, 0, canvas.width, canvas.height)

		// Player Movement

		const ang = Math.atan2(mouse.y - player.size/2 - player.pos.y,
					     mouse.x - player.size/2 - player.pos.x);
		const adj = Math.cos(ang) * playerSpeed;
		const opp = Math.sin(ang) * playerSpeed;
		if (adj < Math.abs(mouse.x - player.pos.x))
			player.pos.x += adj;
		else
			player.pos.x += mouse.x - player.pos.x;
		if (opp < Math.abs(player.pos.y - mouse.y))
			player.pos.y += opp;
		else
			player.pos.y += mouse.y - player.pos.y;
		// player.pos.x = .8 * player.pos.x + .2 * (player.pos.x + Math.cos(ang) * playerSpeed);
		// player.pos.y = .8 * player.pos.y + .2 * (player.pos.y + Math.sin(ang) * playerSpeed);

		ctx.fillStyle = "#968388";
		if (seconds % 5 < .1)
			ctx.fillRect(player.pos.x, player.pos.y, player.size, player.size);
		playerSpeed = canvas.width/70 / slowTime.factor;

		// Point stuff system
		ctx.fillStyle = "#66ff33";
		if ( point.pos.x > player.pos.x && 
		     point.pos.x < player.pos.x + player.size &&
			point.pos.y < player.pos.y + player.size && 
		     point.pos.y > player.pos.y ) {
			if (doublePnts.factor === 2) {
				score++;
				ctx.font = "50px Arial";
				ctx.fillText("+2", point.pos.x, point.pos.y + 5);
			} else {
				ctx.font = "50px Arial";
				ctx.fillText("+1", point.pos.x, point.pos.y + 5);
			}
			text = ++score;
			point.pos.x = Math.random() * canvas.width;
			point.pos.y = Math.random() * canvas.height * .9 + canvas.height * .1;
		}
		ctx.fillRect(point.pos.x, point.pos.y, point.size, point.size);
		ctx.stroke();
		ctx.strokeStyle = "yellow";
		ctx.strokeRect(point.pos.x, point.pos.y, point.size, point.size);

		if (score >= 45)
			backColor = "#081435";
		else if (score >= 40)
			backColor = "#12255b";
		else if (score >= 35)
			backColor = "#182e68";
		else if (score >= 30)
			backColor = "#305472";
		else if (score >= 25)
			backColor = "#3c7287";
		else if (score >= 20)
			backColor = "#4d7c8e";
		else if (score >= 15)
			backColor = "#55919b";
		else if (score >= 10)
			backColor = "#62a8ad";
		else if (score >= 5)
			backColor = "#8ed1d1";

		if (difficulty < 1) {
			ctx.fillStyle = "#d1a258";
			ctx.font = "15px Arial";
			ctx.fillText("easy difficulty", 200, 50);
		} else if (difficulty < 2.5) {
			ctx.fillStyle = "#d1a258";
			ctx.font = "15px Arial";
			ctx.fillText("normal difficulty", 200, 50);
		} else if (difficulty < 20) {
			ctx.fillStyle = "#d1a258";
			ctx.font = "15px Arial";
			ctx.fillText("hard difficulty", 200, 50);
		} else if (difficulty < 21) {
			ctx.fillStyle = "#d1a258";
			ctx.font = "15px Arial";
			ctx.fillText("impossible difficulty", 200, 50);
		}

		// Blocks
		boulder.motion.shake = Math.random() % 2;
		if (boulder.motion.shake < .1)
			boulder.pos.x += canvas.width/120 * difficulty;
		else if (boulder.motion.shake > .9)
			boulder.pos.x -= canvas.width/120 * difficulty;

	// 	boulder.position.x += (Math.random() - .5) * 16 * difficulty;

		if (boulder.pos.y > canvas.height) {
			boulder.pos.y = -500 / difficulty;
			boulder.pos.x = Math.random() * canvas.width;
		} else 
			boulder.pos.y += canvas.height/80 * difficulty / slowTime.factor;

		if (player.pos.x > canvas.width - player.size)
			player.pos.x = canvas.width - player.size;
		if (player.pos.x < 0)
			player.pos.x = 0;
		if (player.pos.y > canvas.height - player.size)
			player.pos.y = canvas.height - player.size;
		if (player.pos.y < 0) 
			player.pos.y = 0;
		ctx.fillStyle = "#6e2c00";
		ctx.fillRect(boulder.pos.x, boulder.pos.y, boulder.dim.width, 200);

		ctx.fillStyle = "#fe5478";
		ctx.fillRect(player.pos.x, player.pos.y, player.size, player.size);

		// Score text
		ctx.fillStyle = getRandomColor();
		ctx.font = "30px Arial";
		ctx.fillText(text, 10, 50);

		// Power-ups
			// Time and Slowtime Powerup 
		seconds += 1/60 / slowTime.factor;

		if ( seconds % 2 < .000000001/*.0000000000001*/ &&
		    Math.random() > .8 || slowTime.ready === true ) {
			slowTime.ready = true;
			ctx.fillStyle = "#ffcc00";
			ctx.fillRect(slowTime.pos.x, slowTime.pos.y, 35, 35);
			if ( player.pos.x < slowTime.pos.x + 35 &&
			    player.pos.x + player.size > slowTime.pos.x &&
			    slowTime.pos.y < player.pos.y + player.size && 
			    slowTime.pos.y + 35 > player.pos.y ) {
					// console.log("slowtime is on");
					slowTime.factor = 3;
					slowTime.pos.x = Math.random() * canvas.width;
					slowTime.pos.y = Math.random() * canvas.height;
					slowTime.ready = false;
					slowTimeTimer = seconds;
			}
		}
			// Double points Powerup
		if ( seconds % 2 < .000000001/*.0000000000001*/ &&
		    Math.random() > .8 || doublePnts.ready === true) {
			doublePnts.ready = true;
			ctx.fillStyle = "#4169e1";
			ctx.fillRect(doublePnts.pos.x, doublePnts.pos.y, 35, 35);
			if (player.pos.x < doublePnts.pos.x + 35 &&
			    player.pos.x + player.size > doublePnts.pos.x &&
			    doublePnts.pos.y < player.pos.y + player.size && 
			    doublePnts.pos.y + 35 > player.pos.y ) {
					// // // // console.log("Double Points is on");
					doublePnts.factor = 2;
					doublePnts.pos.x = Math.random() * canvas.width;
					doublePnts.pos.y = Math.random() * canvas.height;
					doublePnts.ready = false;
					dblPtsTimer = seconds;
			}
		}

		if (seconds - slowTimeTimer >= 1 + 1/3) {
			slowTime.factor = 1;
			// console.log("slowtime is off");
		} else if (slowTime.factor === 3) {
			ctx.fillStyle = "#ffcc00";
			ctx.font = "30px Arial";
			ctx.fillText("⌛", canvas.width - 50, 50);
		}
		if (seconds - dblPtsTimer >= 5) {
			doublePnts.factor = 1;
			// console.log("Double Points is off");
		} else if (doublePnts.factor === 2) {
			ctx.fillStyle = "#4169e1";
			ctx.font = "30px Arial";
			ctx.fillText("X2", canvas.width - 100, 50);
		}

		// Check for gameover
		if (player.pos.x < boulder.pos.x + boulder.dim.width &&
		    player.pos.x + player.size > boulder.pos.x &&
		    boulder.pos.y < player.pos.y + player.size && 
		    boulder.pos.y + 190 > player.pos.y ) {

			ctx.fillStyle = getRandomColor();
			ctx.font = "400px Arial";
			ctx.fillText(score, canvas.width/3, canvas.height/1.5);

			ctx.fillStyle = getRandomColor();
			ctx.font = "30px Arial";
			ctx.fillText("CLCK TO PLAY AGAIN",
					   canvas.width/4, canvas.height/1.25);
			ctx.fillText("change difficulty with 1 2 3 4", 
					 canvas.width/6, canvas.height/1.15);
			requestAnimationFrame(clickToStart);
		} else 
			requestAnimationFrame(cycle);
	}

	let difficulty = 1.1;
	function clickToStart() {
		if (keys[49])
			difficulty = .6;
		if (keys[50])
			difficulty = 1;
		if (keys[51])
			difficulty = 2.5;
		if (keys[52])
			difficulty = 20;
		// console.log(difficulty)

		if (mouse.down) {
			text = "collect dots!";
			score = 0;
			document.getElementById("dot-collector-2").style.backgroundColor = "#b3ffff";

			player.pos.x = canvas.width/2 - 25;
			player.pos.y = canvas.height/2 - 25;
			player.size = canvas.width/15;

			boulder.pos.x = Math.random() * canvas.width;
			boulder.pos.y = -400 - canvas.height;
			boulder.dim.width = canvas.width/5.25;

			point.pos.x = Math.random() * canvas.width;
			point.pos.y = Math.random() * canvas.height;

			slowTime.pos.x = Math.random() * canvas.width;
			slowTime.pos.y = Math.random() * canvas.height;
			slowTime.factor = 1;
			slowTime.ready = false;

			doublePnts.pos.x = Math.random() * canvas.width;
			doublePnts.pos.y = Math.random() * canvas.height;
			doublePnts.factor = 1;
			doublePnts.ready = false;

			seconds = 1;
			slowTimeTimer;
			dblPtsTimer = 0;
			playerSpeed = 10;

			requestAnimationFrame(cycle);
			return;
		}
		else 
			requestAnimationFrame(clickToStart);
	}

	ctx.fillStyle = getRandomColor();
	ctx.font = "22px Arial";
	ctx.fillText("CLICK TO START",
			canvas.width/2 - 22*7, canvas.height/2);
	ctx.fillText("press 1,2,3, or 4 to change difficulty",
			canvas.width/8, canvas.height/1.8);
	ctx.fillText("(easy, normal, hard, or impossible respectively)",
			canvas.width/8, canvas.height/1.6);
	requestAnimationFrame(clickToStart);
}

//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////

function atariAdventureRemake() {
	var canvas = document.getElementById("atari-adventure-remake");
	var ctx = canvas.getContext("2d");

	function setupCanvas() {
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
	}
	setupCanvas();
	window.onresize = function() {
		setupCanvas();
	};

	function getRandomColor() {
		var letters = "0123456789ABCDEF";
		var color = "#";
		for (var i = 0; i < 6; i++) {
			color += letters[Math.floor(Math.random() * 16)];
		}
		return color;
	}

	window.onload = function() {
		var c = document.getElementById("myCanvas");
		var dragon = document.getElementById("dragon");
	   ctx.drawImage(dragon, 800, 10);
		var doorKey = document.getElementById("doorKey");
	   ctx.drawImage(doorKey, 800, 10);
		var sword = document.getElementById("sword");
	   ctx.drawImage(sword, 800, 10);
	}

	//___________________get keyboard input___________________
	const keys = [];
	document.onkeydown = function(e) {
	  keys[e.keyCode] = true;
	}
	document.onkeyup = function(e) {
	  keys[e.keyCode] = false;
	}

	document.getElementById("atari-adventure-remake").style.backgroundColor = "#C0C0C0";

	// MAP 
	walls = [ // 32 x 32
	//  0  1  2  3  4  5  6  7  8  9  10 11 12 13 14 15 16|17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33
		[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
		[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
		[1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
		[1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
		[1, 1, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1],
		[1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1],
		[1, 1, 0, 1, 0, 0, 0, 1, 0, 1, 1, 1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1],
		[1, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 1, 1],
		[1, 1, 0, 1, 1, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 6, 0, 0, 1, 0, 1, 1],
		[1, 1, 0, 0, 0, 1, 0, 1, 1, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 1],
		[1, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1],
		[1, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1],
		[1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1],
		[1, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 1],
		[1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1],
		[1, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 1],
		[1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1],
		[1, 1, 0, 1, 0, 1, 1, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1],
		[1, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1],
		[1, 1, 0, 1, 5, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 1, 0, 1, 1],
		[1, 1, 0, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 1],
		[1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 0, 1, 0, 1, 1],
		[1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1],
		[1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 0, 1, 0, 1, 1],
		[1, 1, 0, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 1],
		[1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 1, 0, 1, 1],
		[1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 3, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 1],
		[1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 1],
		[1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 1, 1],
		[1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1],
		[1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
		[1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
		[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
		[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
	];
	let wallColor = "#86b300";
	let FOV = 4;

	// PLAYER OBJECT
	let player = {
		pos: {
			x: 5,
			y: 29,
		},
		vel: {
			x: 2,
			y: 2,
		},
		size: {
			body: {
				w: canvas.width/18,
				h: canvas.height/18,
			},
			head: {
				w: canvas.width/19,
				h: canvas.height/21,
			},
		},
	}

	let canMoveUp = true;
	let canMoveLeft = true;
	let canMoveDown = true;
	let canMoveRight = true;

	class Enemy {
		constructor(posX, posY, speed, damOut, hp) {
			this.posX = posX;
			this.posY = posY;
			this.speed = speed;
			this.damOut = damOut;
			this.hp = hp;
			this.height = canvas.height/5.8;
			this.width = canvas.width/12;
			this.type = "arc";
			this.Xpos = 0;
			this.Ypos = 0;
			this.alive = true;
		}
	}
	let enemies = [0];

	function drawEnemies(enemies) {
		for (let i = 0; i < enemies.length; i++) {
		  ctx.drawImage(dragon, enemies[i].posX, enemies[i].posY, enemies[i].width,  enemies[i].height);
			// ctx.beginPath();
			// ctx.arc(enemies[i].posX, enemies[i].posY, enemies[i].height, 0, 2 * Math.PI);
			// ctx.fill();
		} 
	}

	let doorKey1 = {
		pos: {
			x: 4,
			y: 18,
		},
	}


	let swordWeapon = {
		pos: {
			x: 4,
			y: 18,
		},
		size: {
			x: 1,
			y: 1,
		},
	}

	let reachedEnd = false;
	let hasKey = false;
	let doorIsOpen = false;
	let hasSword = false;
	let alive = true;

	// DRAW MAP FUNCTION
	function drawMap(walls = walls, posX = 16, posY = 16, FOV = 16) {
		wallW = canvas.width/FOV / 2;
		wallL = canvas.height/FOV / 2;
		canMoveUp = true;
		canMoveLeft = true;
		canMoveDown = true;
		canMoveRight = true;
		ctx.fillStyle = wallColor;
		for (let y = Math.floor(posY) - FOV; y <= Math.floor(posY) + FOV && y < walls.length; y++) {
			if (y >= 0) {
				for (let x = Math.floor(posX) - FOV; x <= Math.floor(posX) + FOV && x < walls[0].length; x++) {
					if (x >= 0)
						if (walls[y][x] === 1) {
							ctx.fillRect((x - (posX - FOV)) * wallW, (y - (posY - FOV)) * wallL, wallW+.5, wallL+.5);
							if ( // Up Check
								canvas.width/2 + player.size.head.w/player.vel.x  	> (x - (posX - FOV)) * wallW &&
								canvas.width/2 + player.size.head.w/player.vel.x  	< (x - (posX - FOV)) * wallW + wallW &&
								canvas.height/2 + player.size.head.h/player.vel.y 	> (y - (posY - FOV)) * wallL && 
								canvas.height/2 - player.size.head.h 					< (y - (posY - FOV)) * wallL + wallL)
								canMoveUp = false;
							if ( // Left Check
								canvas.width/2 - player.size.head.w/player.vel.x 	> (x - (posX - FOV)) * wallW &&
								canvas.width/2 - player.size.head.w/player.vel.x 	< (x - (posX - FOV)) * wallW + wallW &&
								canvas.height/2 - player.size.head.h/player.vel.y 	< (y - (posY - FOV)) * wallL + wallL && 
								canvas.height/2 + player.size.head.h/player.vel.y 	> (y - (posY - FOV)) * wallL)
								canMoveLeft = false;
							if ( // Down Check 
								canvas.width/2 + player.size.head.w/player.vel.x	> (x - (posX - FOV)) * wallW &&
								canvas.width/2 + player.size.head.w/player.vel.x	< (x - (posX - FOV)) * wallW + wallW &&
								canvas.height/2 + player.size.head.h 					< (y - (posY - FOV)) * wallL + wallL && 
								canvas.height/2 + player.size.head.h 					> (y - (posY - FOV)) * wallL)
								canMoveDown = false;
							if ( // Right Cheack
								canvas.width/2 + player.size.head.w  					< (x - (posX - FOV)) * wallW + wallW &&
								canvas.width/2 + player.size.head.w  					> (x - (posX - FOV)) * wallW &&
								canvas.height/2 - player.size.head.h/player.vel.y 	< (y - (posY - FOV)) * wallL + wallL && 
								canvas.height/2 + player.size.head.h/player.vel.y 	> (y - (posY - FOV)) * wallL)
								canMoveRight = false;
						} else if (walls[y][x] === 2) {
							ctx.fillStyle = "#33ff33";
							ctx.fillRect((x - (posX - FOV)) * wallW, (y - (posY - FOV)) * wallL, wallW, wallL);
							if (
								canvas.width/2 - player.size.head.w/2  < (x - (posX - FOV)) * wallW + wallW &&
								canvas.width/2 + player.size.head.w/2  > (x - (posX - FOV)) * wallW &&
								canvas.height/2 - player.size.head.h   < (y - (posY - FOV)) * wallL + wallL &&
								canvas.height/2 + player.size.head.h/2 > (y - (posY - FOV)) * wallL
								) {
								reachedEnd = true;
								walls[4][17] = 1;
							} 
							ctx.fillStyle = wallColor;
						} else if (walls[y][x] === 3) {
							if (enemies[0]) {
								if (enemies[0].alive) {

									ctx.fillStyle = "#003311";
									enemies[0].posX = (x - (posX - FOV)) * wallW + enemies[0].Xpos;
									enemies[0].posY = (y - (posY - FOV)) * wallL + enemies[0].Ypos;

									if (
										canvas.width/2 - player.size.head.w/2  < 	enemies[0].posX + enemies[0].width &&
										canvas.width/2 + player.size.head.w/2  > 	enemies[0].posX &&
										canvas.height/2 - player.size.head.h   < 	enemies[0].posY + enemies[0].height &&
										canvas.height/2 + player.size.head.h/2 > 	enemies[0].posY
										) {
										enemies[0].posX = canvas.width/2  - enemies[0].width/2;
										enemies[0].posY = canvas.height/2 - enemies[0].height/2;
										canMoveUp = false;
										canMoveLeft = false;
										canMoveDown = false;
										canMoveRight = false;
										alive = false;
										drawPlayer();
									} else if (
										swordWeapon.pos.x					< 	enemies[0].posX + enemies[0].width &&
										swordWeapon.pos.x + wallW/2	>  enemies[0].posX &&
										swordWeapon.pos.y 				< 	enemies[0].posY + enemies[0].height &&
										swordWeapon.pos.y + wallL	 	> 	enemies[0].posY
										) {
										enemies[0].posX = 9999999;
										enemies[0].posY = 9999999;
										enemies[0].alive = false;
									} else if (alive) {
										const opp = canvas.width/2 - enemies[0].posX;
										const adj = enemies[0].posY - canvas.height/2;
										const hyp = Math.sqrt(opp*opp + adj*adj);
										const ang = Math.atan2(adj, opp) * 180 / Math.PI;

											enemies[0].Xpos += 1.9 * Math.cos(-ang);
											enemies[0].Ypos += 1.9 * Math.sin(-ang);
									}
									drawEnemies(enemies);

									ctx.fillStyle = wallColor;
								}
							} else {
								enemies[0] = new Enemy((x - (posX - FOV)) * wallW, (y - (posY - FOV)) * wallL, .1, 5, 8);
							}
						} else if (walls[y][x] === 5) { // key
							if (
								!(canvas.width/2 - player.size.head.w/2  < (x - (posX - FOV)) * wallW + wallW &&
								canvas.width/2 + player.size.head.w/2  > (x - (posX - FOV)) * wallW &&
								canvas.height/2 - player.size.head.h   < (y - (posY - FOV)) * wallL + wallL &&
								canvas.height/2 + player.size.head.h/2 > (y - (posY - FOV)) * wallL)
								&& !hasKey) {
								doorKey1.pos.x = (x - (posX - FOV)) * wallW;
								doorKey1.pos.y = (y - (posY - FOV)) * wallL;
							} else if (keys[69])
								hasKey = true;
							ctx.drawImage(doorKey, doorKey1.pos.x, doorKey1.pos.y, canvas.width/10,  canvas.height/19);
						} else if (walls[y][x] === 4) { // door
							if (!doorIsOpen) {
								ctx.fillStyle = "#87490c";
								ctx.fillRect((x - (posX - FOV)) * wallW, (y - (posY - FOV)) * wallL, wallW+1, wallL+1);
								ctx.fillStyle = "#000000";
								ctx.fillRect((x - (posX - FOV)) * wallW + wallW/2 - 2, (y - (posY - FOV)) * wallL, 4, wallL);
								ctx.fillStyle = wallColor;
								if (
									canvas.width/2 - player.size.head.w/2  < (x - (posX - FOV)) * wallW + wallW &&
									canvas.width/2 + player.size.head.w/2  > (x - (posX - FOV)) * wallW &&
									canvas.height/2 - player.size.head.h   < (y - (posY - FOV)) * wallL + wallL &&
									canvas.height/2 + player.size.head.h/2 > (y - (posY - FOV)) * wallL ) {
									if (hasKey) {
										doorIsOpen = true;
										hasKey = false;
									}
									else{
										// // // console.log(" a key is needed ");
										canMoveUp = false;
									}
								}	
							} 	
						} else if (walls[y][x] === 6) {	
							if (
								!(canvas.width/2 - player.size.head.w/2	< (x - (posX - FOV)) * wallW + wallW &&
								canvas.width/2 + player.size.head.w/2  	> (x - (posX - FOV)) * wallW &&
								canvas.height/2 - player.size.head.h   	< (y - (posY - FOV)) * wallL + wallL &&
								canvas.height/2 + player.size.head.h/2 	> (y - (posY - FOV)) * wallL)
								&& !hasSword) {
								swordWeapon.pos.x = (x - (posX - FOV)) * wallW;
								swordWeapon.pos.y = (y - (posY - FOV)) * wallL;
							} else if (keys[69])
								hasSword = true;
							ctx.drawImage(sword, swordWeapon.pos.x + wallW/4, swordWeapon.pos.y, wallW/2, wallL);
						} else
							 ctx.fillRect((x - (posX - FOV)) * wallW, (y - (posY - FOV)) * wallL, 0, 0);
				}
			}
		}
		if (hasKey) {
			ctx.drawImage(doorKey, doorKey1.pos.x, doorKey1.pos.y, canvas.width/10,  canvas.height/19);
			if (keys[32])
				hasKey = false;
		}
		if (hasSword) {
			ctx.drawImage(sword, swordWeapon.pos.x + wallW/4, swordWeapon.pos.y, wallW/2, wallL);
			if (keys[32])
				hasSword = false;
		}
	}

	function drawPlayer() {
		player.size.body.w = canvas.width/16;
		player.size.body.h = canvas.height/16;
		player.size.head.w = canvas.width/19;
		player.size.head.h = canvas.height/21;
		ctx.fillStyle = "#002db3";
		ctx.fillRect(canvas.width/2 - player.size.body.w/2,
						 canvas.height/2 - player.size.body.h/2,
						player.size.body.w, player.size.body.h);
		ctx.fillStyle = "#ffcc66";
		ctx.fillRect(canvas.width/2 - player.size.head.w/player.vel.x,
						 canvas.height/2 - player.size.head.h/player.vel.y,
						player.size.head.w, player.size.head.h);
	}

	let collision = true;

	// CYCLE
	function cycle() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		drawMap(walls, player.pos.x, player.pos.y, FOV);

		if (keys[16] && keys [67]) // toggle collision i/o
			collision = !collision;

		if ((canMoveUp || !collision) && (keys[87] || keys[38])) { 		// up
			player.pos.y -= .14;
			player.vel.x = 2;
			player.vel.y = 1.2;
		}
		if ((canMoveLeft || !collision) && (keys[65] || keys[37])) { 	// left
			player.pos.x -= .14;
			player.vel.x = 1.2;
			player.vel.y = 2;
		}
		if ((canMoveDown || !collision) && (keys[83] || keys[40])) { 	// down
			player.pos.y += .14;
			player.vel.x = 2;
			player.vel.y = 5;
		}
		if ((canMoveRight || !collision) && (keys[68] || keys[39])) { 	// right
			player.pos.x += .14;
			player.vel.x = 5;
			player.vel.y = 2;
		}

		if (alive)
			drawPlayer();

		if (reachedEnd) {
			ctx.fillStyle = getRandomColor();
			wallColor = getRandomColor();
			ctx.TectAlign = "center";
			ctx.font = Math.floor(canvas.width/5) + "px Georgia";
			ctx.fillText("YOU WIN", canvas.width/25, canvas.height/2);
		}

		requestAnimationFrame(cycle);
	}
	requestAnimationFrame(cycle);
}

//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////

function skyGunner() {
	var canvas = document.getElementById("sky-gunner");
	var ctx = canvas.getContext("2d");

	function setupCanvas() {
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
	}
	setupCanvas();
	window.onresize = function() {
		setupCanvas();
	};
	
	window.onload = function() {
		var sansPNG1		= document.getElementById("sansPNG1");
		var sansPNG2		= document.getElementById("sansPNG2");
		var groundPNG		= document.getElementById("groundPNG");
		var playerPNG 		= document.getElementById("playerPNG");
		var bulletPNG 		= document.getElementById("bulletPNG");
		var backgroundPNG = document.getElementById("backgroundPNG");
	}

	function getRandomColor() {
		var letters = "0123456789ABCDEF";
		var color = "#";
		for (var i = 0; i < 6; i++) {
			color += letters[Math.floor(Math.random() * 16)];
		}
		return color;
	}

	let mouse = {
	  down: false,
	  x: 0,
	  y: 0
	};
	canvas.addEventListener("mousedown", event => {
	  mouse.down = true;
	});
	canvas.addEventListener("mouseup", event => {
	  mouse.down = false;
	});

	const keys = [];
	document.onkeydown = function(e) {
	  keys[e.keyCode] = true;
	}
	document.onkeyup = function(e) {
	  keys[e.keyCode] = false;
	}

	ctx.fillStyle = "#fe5478";

	////////////////////////////////////////////////////////////

	// miscellanious 
	let	groundLvl = canvas.height/(4/3);
	let	time = 0;
	let	projectileTimer = 0;
	let	skyEnemyTimer = 0;
	const	MAXHP = 100;
	let	baseHP = MAXHP;
	let	score = 0;
	let	KO = false;
	let	enemSpeed = 1;
	let	enemFreq = 2; // in seconds
	let	projFreq = .35;
	let	KOTimer = 0;
	let	hasInvincibility = false;
	let	invincibilityTimer = 0;

	let player = {
		png: 		playerPNG,
		pos: {
			x:		canvas.width/2,
			y:		groundLvl,
		},
		size: {
			w:		canvas.width/6,
			h:		canvas.height/6,
		},
		vel:		{
			x: 	0,
			y: 	0,
		},
		acl:		{
			x:		2,
			y:		-canvas.height/9.9728,
					//intitial acl for jumping
		},
	}

	class Projectile {
		constructor(x, y, velX, velY, png = bulletPNG) {
			this.png		=	png;
			this.posX 	=	x;
			this.posY	=	y;
			this.velX	=	velX;
			this.velY	=	velY;
		}
		takeStep() {
			this.posX += this.velX;
			this.posY += this.velY;
		}
	}
	let projectiles = [];

	class Enemy { 
		constructor(x = canvas.width, y = 0, w = canvas.width/6,
						 h = canvas.height/6, hp = 2, png1 = sansPNG1, png2 = sansPNG2) {
			this.png		=	png1;
			this.png1	=	png1;
			this.png2	=	png2;
			this.posX 	=	(x - w) * Math.random();
			this.posY	=	y - h;
			this.w		=	w;
			this.h		=	h;
			this.hp 		= 	hp;

			this.ang		=	(Math.atan2(this.posY, canvas.width - this.posX) + Math.abs(Math.atan2(this.posY, this.posX))) * (Math.random() - Math.abs(Math.atan2(this.posY, this.posX)/100));
			this.velX	=	Math.sin(this.ang);
			this.velY	=	Math.cos(this.ang);
		}
		takeStep(speedFactor = 1) {
			this.posX += this.velX * speedFactor;
			this.posY += this.velY * speedFactor;
		}
	}
	let enemies = [];

	////////////////////////////////////////////////////////////

	function cycle() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.drawImage(backgroundPNG, 0, 0, canvas.width, canvas.height);
	   ctx.drawImage(groundPNG, 0, groundLvl, canvas.width, canvas.height/3);
		groundLvl 		=	canvas.height/(4/3);
	   ctx.drawImage(player.png, player.pos.x, player.pos.y,
						  player.size.w, player.size.h);
		player.size.w 	=	canvas.width/ 6;
		player.size.h 	=	canvas.height/6;
		player.acl.y 	=	-canvas.height/9.9728;

		// screen bounces
		if (player.pos.x + player.size.w >= canvas.width)
			player.vel.x = -Math.abs(player.vel.x);

		if (player.pos.x <= 0)
			player.vel.x = Math.abs(player.vel.x);

		if (!KO) {
		// jump
			if (keys[87] && player.pos.y >= groundLvl)
				player.vel.y = player.acl.y/(5/3);
			else if (player.pos.y < groundLvl)
				player.vel.y += 9.81/3;
			else {
				player.pos.y = groundLvl;
				player.vel.y = 0;
			}

		// left/right 
			if (player.pos.y >= groundLvl) {
				if (player.vel.x > 0)
					player.vel.x--;
				else if (player.vel.x < 0)
					player.vel.x++;
				if (keys[65])
					player.vel.x -= player.acl.x;
				if (keys[68])
					player.vel.x += player.acl.x;
			}

		// shoot
			if (keys[76] && time - projectileTimer >= projFreq) {
				projectileTimer = time;
				player.size.h *= .94;
				projectiles[projectiles.length] = new Projectile(
					player.pos.x + player.size.w/2,
					player.pos.y - 2,
					player.vel.x / 3.5,
					-canvas.height/30)
			}
			player.pos.y += player.vel.y;
			player.pos.x += player.vel.x;

		} else {
			if (time - KOTimer >= 1.5)
				KO = false;
				player.pos.y += player.vel.y/4;
				player.pos.x += player.vel.x/4;
		}

		if (time - invincibilityTimer >= 3)
		hasInvincibility = false;



		// drawProjectiles
		for (let i = 0; i < projectiles.length; i++) {
			if (projectiles[i].posY < 0) {
				projectiles.shift();
				i--;
				continue;
			} else
				projectiles[i].velX *= .93;
				projectiles[i].velY *= .981;
			projectiles[i].takeStep();
			ctx.drawImage(projectiles[i].png,
							  projectiles[i].posX, 
							  projectiles[i].posY,
							  canvas.width/25, 
							  canvas.height/17);
		}

		 // initializing enemies
		if (time - skyEnemyTimer >= enemFreq) {
			skyEnemyTimer = time;
			enemies[enemies.length] = new Enemy(canvas.width, 
															0, 
															canvas.width/6, 
															canvas.height/6,
															2,
															sansPNG1,
															sansPNG2);
		}

		// drawEnems
		for (let i = enemies.length - 1; i >= 0; i--) {
			if (enemies[i].posY > groundLvl) {
				enemies.shift();
				if (baseHP > 0)
					baseHP -= 10;
				groundLvl += 5;
				i--;
				continue;
			}
			enemies[i].takeStep(enemSpeed);
			ctx.drawImage(enemies[i].png,
							  enemies[i].posX, 
							  enemies[i].posY,
							  enemies[i].w, 
							  enemies[i].h);
			if (enemies[i].posX 						<=		player.pos.x + player.size.w && 
				 enemies[i].posX + enemies[i].w	>=		player.pos.x && 
				 enemies[i].posY 						<=		player.pos.y + player.size.h && 
				 enemies[i].posY + enemies[i].h	>=		player.pos.y &&     
				 !KO && !hasInvincibility) { // if enem touches player
				player.vel.x *= -1;
				player.vel.y *= -1;
				KO = true;
				hasInvincibility = true;
				invincibilityTimer = time;
				KOTimer = time;
			}
			for (let j = 0; j < projectiles.length; j++) {
				if (enemies[i].posX						<=		projectiles[j].posX &&
					enemies[i].posX + enemies[i].w	>= 	projectiles[j].posX &&
					enemies[i].posY						<= 	projectiles[j].posY &&
					enemies[i].posY + enemies[i].h	>= 	projectiles[j].posY) {
					projectiles.splice(j, 1);
					if (enemies[i].hp <= 1) {
						ctx.fillStyle = "#00FF00";
						ctx.font = "50px Arial";
						ctx.fillText("+1", enemies[i].posX, enemies[i].posY);
						enemies.splice(i, 1);
						score++;
						enemSpeed	=	Math.log(time * 1.2);
						enemFreq		=	10/(score+15) + .375;
						projFreq 	*=	Math.pow(22/23, projFreq * 1.3);
					}
					else if (enemies[i].hp === 2) {
						enemies[i].posY -= 10;
						enemies[i].posX += 3;
						enemies[i].hp--;
						enemies[i].png = enemies[i].png2;
					}
					break;
				}
			}
		}

		ctx.font = "45px Arial";
		ctx.fillText(score, 10, 60);

		// HP Bar
		ctx.fillStyle = "#fa8072";
		ctx.fillRect(canvas.width/1.25, canvas.height/1.1,
						 canvas.width/7, canvas.height/40);
		ctx.fillStyle = "#00FF00";
		ctx.fillRect(canvas.width/1.25, canvas.height/1.1,
						 baseHP/MAXHP * canvas.width/7, canvas.height/40);

		time += (1/60);

		if (baseHP > 0)
			requestAnimationFrame(cycle);
		else {
			// say "GAME OVER"
			requestAnimationFrame(sToStart);
		}
	}

	function sToStart() {
		// SAY "PRESS SPACE TO START"
		if (keys[83]) {
			// Reset Settings
			groundLvl = canvas.height/(4/3);
			time = 0;
			projectileTimer = 0;
			skyEnemyTimer = 0;
			baseHP = MAXHP;
			score = 0;
			KO = false;
			enemSpeed = 1;
			enemFreq = 2; // in seconds
			projFreq = .35;
			KOTimer = 0;
			hasInvincibility = false;
			invincibilityTimer = 0;
			projectiles = [];
			enemies = [];

			requestAnimationFrame(cycle);
			return;
		}
		else 
			requestAnimationFrame(sToStart);
	}

	requestAnimationFrame(sToStart);
}

//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////

function solarSystem() {
	var canvas = document.getElementById("solar-system");
	var ctx = canvas.getContext("2d");

	function setupCanvas() {
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
	}
	setupCanvas();
	window.onresize = function() {
		setupCanvas();
	};

	var defPlan		= document.getElementById("default-planet");
	var mercuryImg	= document.getElementById("mercury");
	var venusImg	= document.getElementById("venus");
	var earthImg	= document.getElementById("earth");
	var marsImg	= document.getElementById("mars");
	var sunImg		= document.getElementById("sun");

	// document.body.style.backgroundColor = 

	class Planet {
		constructor(name = "n/a",
				 img = defPlan,
				 planetNum = 3,
				 x = canvas.width/2,
				 y = canvas.height/2,
				 d = canvas.width/6) {
			this.name = name;
			this.img = img;
			this.pos = {
				x: x,
				y: y,
			};
			this.siz = {
				d: d,
			};
		}
	}

	let earthDays = 0;

	let planets = [0,
			   0,
			   0,
			   0,
			   new Planet("sun", sunImg, 			0,),
			   new Planet("mercury", mercuryImg,	1),
			   new Planet("venus",	venusImg,		2),
			   new Planet("earth",	earthImg,		3),
			   0//new Planet("mars",	marsImg,		3)
			  ];

	let a = 0, b = 0;

	function cycle() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		for (let i = planets.length - 1; i >= 0; i--) {
			if (planets[i]) {
				planets[i].pos.y = canvas.height/2;

				if (planets[i].name === "earth") {
					planets[i].siz.d = canvas.width/7;
					planets[i].pos.x = Math.sin(earthDays)*.4 * canvas.width + planets[i].siz.d*3;
					if (Math.sin(earthDays) > .99995) {
						// console.log("over");
						planets[1] = planets[i];
						// planets[i] = 0;
						break;
					} else if (Math.sin(earthDays) < -.9999) {
						// console.log("under");
						// planets[3 - planets[i].planetNum] = planets[i];
						planets[1] = 0;
						break;
					}
				} else if (planets[i] && planets[i].name === "venus") {
					planets[i].siz.d = canvas.width/7.35;
					planets[i].pos.x = Math.sin(earthDays*(360/686.5))*.3
						* canvas.width + planets[i].siz.d*3;
					if (Math.sin(earthDays*(360/686.5)) > .99) {
						planets[2] = planets[i];
						// planets[i] = 0;
					} else if (Math.sin(earthDays*(360/686.5)) < -.99) {
						// planets[3 - planets[i].planetNum] = planets[i];
						planets[2] = 0;
					}
				} else if (planets[i] && planets[i].name === "mercury") {
					planets[i].siz.d = canvas.width/9;
					planets[i].pos.x = Math.sin(earthDays*(360/88))*.2 
						* canvas.width + planets[i].siz.d*4;
					if (Math.sin(earthDays*(360/88)) > .99)
						planets[3] = planets[i];
					else if (Math.sin(earthDays*(360/88)) < -.99)
						planets[3] = 0;
				// } else if (planets[i] && planets[i].name === "mars") {
				// 	planets[i].siz.d = canvas.width/9;
				// 	planets[i].pos.x = Math.sin(earthDays*(360/88))*.2 
				// 		* canvas.width + planets[i].siz.d*4;
				// 	if (Math.sin(earthDays*(360/88)) > .99)
				// 		planets[0] = planets[i];
				// 	else if (Math.sin(earthDays*(360/88)) < -.99)
				// 		planets[0] = 0;
				} else if (planets[i] && planets[i].name === "sun") {
					planets[i].siz.d = canvas.width/1.4;
					planets[i].pos.x = canvas.width/2 - planets[i].siz.d/2;
				}
			}
		}
		for (let i = planets.length - 1; i >= 0; i--) {
			if (planets[i])
				ctx.drawImage(planets[i].img,
						  planets[i].pos.x,
						  planets[i].pos.y - planets[i].siz.d/2,
						  planets[i].siz.d,  planets[i].siz.d);
		}

		ctx.fillStyle = "#ececec";
		ctx.font = "20px Courier";
		ctx.fillText("Earth Days: " + earthDays * 182.6211, 10, 25);
		earthDays += (360/365.2422/182.6211);
		requestAnimationFrame(cycle);
	}

	requestAnimationFrame(cycle);
}

//////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////

dotCollector1();
dotCollector2();
atariAdventureRemake();
skyGunner();
solarSystem();
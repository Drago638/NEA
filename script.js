let player;
let enemy;
let map1;
let tileSize = 20;
let emptyImg;
let ai;
let timer = 300;
 
function preload() {
	map1 = loadImage('top down map 1.png')
	player = new Sprite(62, 24, 30, 30);
	player.diameter = 30;
	player.spriteSheet = 'every movement.png';
	player.anis.offset.x = 0;
	player.anis.frameDelay = 8;
	player.friction = 0;
	player.tile = 'p';
	player.health = 100;
	emptyImg = loadImage('Empty.png');

	enemy = new Sprite(62, 24, 30, 30);
	enemy.diameter = 30;
	enemy.spriteSheet = 'enemy movements.png';
	enemy.anis.offset.x = 0;
	enemy.anis.frameDelay = 8;
	enemy.friction = 0;
	enemy.tile = 'e';
	enemy.health = 100;
	
	
 
	player.addAnis({
		run: { row: 0, frames: 3, },
		punch: {row: 1, frames: 2, frameDelay: 20},
		kick: {row: 2, frames: 2, frameDelay: 20},
		stand: { row: 0, frames: 0, },
		
	});
	player.changeAni('stand');

	enemy.addAnis({
		run: { row: 2, frames: 3, },
		punch: {row: 1, frames: 2, frameDelay: 20},
		kick: {row: 0, frames: 2, frameDelay: 20},
		stand: { row: 0, frames: 1, },
	});
	enemy.changeAni('stand');
}
function offense(){
	if(player.overlapping(enemy))
		if(kb.presses("r")){
			enemy.health -=1;
			
}
if(player.overlapping(enemy))
	if(kb.presses("f")){
		enemy.health -=1.5;
	}
	if(enemy.overlapping(player))
		if (kb.presses("y")){
			player.health -=1;
		}
		if(enemy.overlapping(player))
			if (kb.presses("h")){
				player.health -=1.5;
			}

}
 
function setup() {
	createCanvas(1010,995);
	
	wall = new Group();
	wall.image = emptyImg
	wall.collider = 's';
	wall.w = 15;
	wall.h = 15;
	wall.tile = 'E';

	new Tiles(
		[
			"....................................................",
"..................................................",
"..................................................",
"..................................................",
"..................................................",
"..................................................",
"..................................................",
"..................................................",
"..................................................",
"..................................................",
"..................................................",
"..................................................",
"..................................................",
"..................................................",
"..................................................",
"EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE",
"E.EEE....EEEE......EEEEEEEEE......EE.............E.E",
"E.EEEE...EEEE.....................EE.............E.E",
"E.E.E.....EEE......................E..........E..E.E",
"E.E......EEEE......................EEE........E..E.E",
"E.E......EE........................EEE...........E.E",
"E.E.EE....E..................EE..EEEE...EEEEEEEEEE.E",
"E.E.......EEE................E...........EEEEEEEEE.E",
"E.EEEE..EEEEE................EE..........E..EEEE.E.E",
"E.E.......EEE................EE..........EE......E.E",
"E.E..........................EE..........E.......E.E",
"E.E..........................EEE.........E.......E.E",
"Ep...........................EEE.................e.E",
"E............................EEE...........EEE.....E",
"E.......EEEEEEEEEEEEEEEEE....EEE...........EEE...EEE",
"E.E....EE...............E....EEEEEEEEEEEEEEEEEEEEEEE",
"EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE",
"..................................................",
"..................................................",
"..................................................",
"..................................................",
"..................................................",
"..................................................",
"..................................................",
"..................................................",
"..................................................",
"..................................................",
"..................................................",
"..................................................",
"..................................................",
"..................................................",
"..................................................",
"..................................................",
"..................................................",
"..................................................",

		],
		8,
		16,
		tileSize,
		tileSize - 1,
	)
setInterval(countDown,1000)
}
function countDown(){
	if(timer > 0){
		timer -= 1;
	}
	else{
		clearInterval(countDown)
	}
}
function drawCountdown(){
	fill(255, 255, 255, 100)
	rect(width / 2 - 80, height / 2 - 60, 200, 100)
	textSize(50)
	fill(255)
	text(countDown, width / 2, height / 2)

}
 
function draw() {
	clear();
    fill(0);
	background(255,0,0)
	camera.on()
	enemy.scale = 0.7;
	

	//image(map1,0,0,1010,995)
	image(map1,0,0,1010,995)
//camera.x = player.x + 0
//camera.y = player.y 

//if(player.health >0){
//}
camera.off()
displayHealth();

	playerControls();
	enemyControls();
	offense()

}
function displayHealth() {
	textSize(20);
	fill(255);
	text("Health", 100, 85);
	fill(255, 0, 0);
	rect(100, 100, 100, 10);
	fill(0, 255, 0);
	rect(100, 100, player.health, 10);

	textSize(20);
	fill(255);
	text("Health", 800, 85);
	fill(255, 0, 0);
	rect(800, 100, 100, 10);
	fill(0, 255, 0);
	rect(800, 100, enemy.health, 10);


	

}

function playerControls() {
	if (kb.pressing("a")) {
		player.x -= 1.5;
		player.mirror.x = true;
	}
	if (kb.pressing("s")) {
		player.y += 1.5;
		player.mirror.y = false;
	}
	if (kb.pressing("d")) {
		player.x += 1.5;
		player.mirror.x = false;
	}
	if (kb.pressing("w")) {
		player.y -= 1.5;
		player.mirror.y = false;
	}

	if (kb.pressing("a")) {
		player.changeAni("run");
	}
	else if (kb.pressing("s")) {
		player.changeAni("run");
	}
	else if (kb.pressing("d")) {
		player.changeAni("run");
	}
	else if (kb.pressing("w")) {
		player.changeAni("run");
	}	else if (player.ani.name != "stand") {
		player.changeAni("stand");
	}
	if (kb.pressing("r")) {
		player.changeAni(["punch", "stand"]);
	}
	if (kb.pressing("f")) {
		player.changeAni(["kick", "stand"]);
	}
}

function enemyControls() {
	if (kb.pressing("j")) {
		enemy.x -= 1.5;
		enemy.mirror.x = true;
	}
	if (kb.pressing("k")) {
		enemy.y += 1.5;
		enemy.mirror.y = false;
	}
	if (kb.pressing("l")) {
		enemy.x += 1.5;
		enemy.mirror.x = false;
	}
	if (kb.pressing("i")) {
		enemy.y -= 1.5;
		enemy.mirror.y = true;
	}

	if (kb.pressing("j")) {
		enemy.changeAni("run");
	}
	else if (kb.pressing("k")) {
		enemy.changeAni("run");
	}
	else if (kb.pressing("l")) {
		enemy.changeAni("run");
	}
	else if (kb.pressing("i")) {
		enemy.changeAni("run");
	}	else if (enemy.ani.name != "stand") {
		enemy.changeAni("stand");
	}
	if (kb.pressing("y")) {
		enemy.changeAni(["punch", "stand"]);
	}
	if (kb.pressing("h")) {
		enemy.changeAni(["kick", "stand"]);
	}
}



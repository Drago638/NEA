let player;
let enemy;
let map1;
let tileSize = 20;
let emptyImg;
let ai;
let countdown = 300;
let cd;
let wall,fence
let batimg
let scytheimg
let shovelimg
let axeimg
 
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
	player.equipped = 'n'
	player.equipped = 'b'
	player.equipped = 's'

	batimg = loadImage('bat_wood.png')

	scytheimg = loadImage('tile_0129.png')

	shovelimg = loadImage('tile_0128.png')

	axeImg = loadImage('tile_0127.png')

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


			//cycle 2

		
}
 
function setup() {
	createCanvas(1010,995);
	
	wall = new Group();
	wall.image = emptyImg
	wall.collider = 's';
	wall.w = 15;
	wall.h = 15;
	wall.tile = 'E';



//cycle 2
	        weapon  = new Group()
			weapon.collider = 'n'
			weapon.type = 'n'
			weapon.hp = 10

			bat = new weapon.Group()
			bat.type = 'b'
			bat.dmg = 7
			bat.tile = 'b'
			bat.img = batimg
			
			bat.color = 'red'

			axe = new weapon.Group()
			axe.type = 'a'
			axe.dmg = 8
			axe.tile = 'a'
			//axe.img = axeimg

			shovel = new weapon.Group()
			shovel.type = 'sh'
			shovel.dmg = 9
			shovel.tile = 's'
			shovel.img = shovelimg

			scythe = new weapon.Group()
			scythe.type = 'sc'
			scythe.dmg = 10
			scythe.tile = 'sc'
			//scythe.img = scytheimg 

			player.overlaps(weapon, equip)
			enemy.overlapping(weapon,attack)





	// fence = new wall.Group()

	// fence.tile = 'f'
	// fence.color = 'pink'

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
"E.E......EEEE.....s................EEE........E..E.E",
"E.E......EE........................EEE...........E.E",
"E.E.EE....E..................EE..EEEE...EEEEEEEEEE.E",
"E.E.......EEE................E...........EEEEEEEEE.E",
"E.EEEE..EEEEE................EE..........E..EEEE.E.E",
"E.E.......EEE................EE..........EE......E.E",
"E.E..........................EE..........E.......E.E",
"E.E...............b..........EEE.........E.......E.E",
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
 cd = setInterval(countDown,1000)
}
function countDown(){
	if(countdown){
		countdown --;
	}
	else{
		clearInterval(cd)
	}
}
function drawCountdown(){
	
	fill(255, 255, 255, 100)
	rect(width / 2 - 100, 40, 160, 100)
	textSize(50)
	fill(255)
	text(countdown, width / 2 - 65, 95)

}
 
function draw() {
	clear();
    fill(0);
	background(255,0,0)
	camera.on()
	enemy.scale = 0.8;
	

	//image(map1,0,0,1010,995)
	image(map1,0,0,1010,995)
//camera.x = player.x + 0
//camera.y = player.y 

//if(player.health >0){
//}
camera.off()
displayHealth();
drawCountdown();

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
		player.changeAni(["punch" , "stand" ]);
	}
	if (kb.pressing("f")) {
		player.changeAni(["kick" ,"stand"]);
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

//cycle 2

function equip(p,w){
p.equipped = w.type;
	

 switch(w.type){

	case 'b':
	let weapon = new bat.Sprite(player.x+5 ,player.y+6)
	let gj = new GlueJoint(player,weapon)
    break;

}





w.remove()


}
	

function attack(e,w){

	if(kb.presses('e')){
		e.health -=w.dmg;
		if(w.counter<=0)
		{
			w.joints.removeAll()
			w.remove()

		}
	     
		}
	}

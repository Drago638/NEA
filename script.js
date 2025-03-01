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
let score = 0;
let enemyScore = 0;
let aiButton
let playing = false;
let state = 0
let menuImg
let keysButton
 
function preload() {
	map1 = loadImage('top down map 1.png')
	player = new Sprite(62, 24, 30, 30);
	player.diameter = 30;
	player.spriteSheet = 'every movement.png';
	player.anis.offset.x = 0;
	player.anis.frameDelay = 8;
	player.friction = 0;
	player.tile = 'p';
	player.health = 100;//healthbar
	player.equipped = 'n'//equipping weapons
	player.equipped = 'b'
	player.equipped = 'sh'
	player.equipped = 'a'
	player.equipped = 'sc'

	batimg = loadImage('bat_wood.png')// displays the images of the game

	scytheimg = loadImage('scythe tile.png')

	shovelimg = loadImage('shovel tile.png')

	axeimg = loadImage('axe tile.png')

	emptyImg = loadImage('Empty.png')
	
	menuImg = loadImage('menu photo.png')

	enemy = new Sprite(62, 24, 30, 30);
	enemy.diameter = 30;//size of sprite
	enemy.spriteSheet = 'enemy movements.png';
	enemy.anis.offset.x = 0;
	enemy.anis.frameDelay = 8;
	enemy.friction = 0;
	enemy.tile = 'e';
	enemy.health = 100;//healthbar 
	enemy.equipped = 'n'//equipping weapons
	enemy.equipped = 'b'
	enemy.equipped = 'sh'
	enemy.equipped = 'a'
	enemy.equipped = 'sc'
	enemy.type = 'p2'
	enemy.dmg = 2
	player.dmg = 2
	player.type = 'p1'
 
	player.addAnis({//sprite animations
		run: { row: 0, frames: 3, },
		punch: {row: 1, frames: 2, frameDelay: 20},
		kick: {row: 2, frames: 2, frameDelay: 20},
		stand: { row: 0, frames: 0, },
		
	});
	player.changeAni('stand');

	enemy.addAnis({//sprite animations
		run: { row: 2, frames: 3, },
		punch: {row: 1, frames: 2, frameDelay: 20},
		kick: {row: 0, frames: 2, frameDelay: 20},
		stand: { row: 0, frames: 1, },
	});
	enemy.changeAni('stand');

	player.collider = 'd'
enemy.collider = 'd'


}
function offense(){
// 	if(player.overlapping(enemy))//How much health it takes off enemy health if weapons used
// 		if(kb.presses("e")){

// 			if(weapon.type == 'b'){
// 				enemy.health -=5;
// 				score +=5;
// 			}
// 			if(weapon.type == 'a'){
// 				enemy.health -=7;
// 				score += 7;
// 			}
// 			if(weapon.type == 'sh'){
// 				enemy.health -=6;
// 				score += 6;
// 			}
// 			if(weapon.type == 'sc'){
// 				enemy.health -=7;
// 				score +=7;
// 			}

// 			else{
// 			enemy.health -=1;
// 			}
			
// }
// if(enemy.overlapping(player))//how much health it takes off player health if weapons used
// 	if(kb.presses("u")){

// 		if(weapon.type == 'b'){
// 			player.health -=5;
// 		}
// 		if(weapon.type == 'a'){
// 			player.health -=7;
// 		}
// 		if(weapon.type == 'sh'){
// 			player.health -=6;
// 		}
// 		if(weapon.type == 'sc'){
// 			player.health -=7;
// 		}

// 		else{
// 		player.health -=1;
// 		}
		
// }

	

if(player.overlapping(enemy))//how much health it takes off player and enemy when hit with punch or kick
	if(kb.presses("f")){
		enemy.health -=1.5;
	}
	if(player.overlapping(enemy))
		if(kb.presses("r")){
			enemy.health -=1;
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

buttonClass= new Group()


buttonClass.color = 'orange'
buttonClass.stroke = 'black'
buttonClass.strokeWeight = '3'
buttonClass.textSize = 30
buttonClass.w = 115
startButton = new buttonClass.Sprite(150,700)// displays each button made
startButton.text = 'PvP'

settingsButton = new buttonClass.Sprite(900,50)
settingsButton.text = 'Settings'




backButton = new buttonClass.Sprite(900,700)
backButton.text = 'Back'


aiButton = new buttonClass.Sprite(300,700)
aiButton.text = 'PvE'


keysButton = new buttonClass.Sprite(200, 200)
keysButton.text = 'Keys'


	wall = new Group();
	wall.image = emptyImg
	wall.collider = 's';
	wall.w = 15;
	wall.h = 15;
	wall.tile = 'E';


	wall.isWall = true;



//cycle 2
	        weapon  = new Group()// shows how much damage each weapon deals 
			weapon.collider = 'n'
			weapon.type = 'n'
			weapon.hp = 10
			weapon.equipped = false

			bat = new weapon.Group()
			bat.type = 'b'
			bat.dmg = 5
			bat.tile = 'b'
			bat.img = batimg
			
			bat.color = 'red'

			axe = new weapon.Group()
			axe.type = 'a'
			axe.dmg = 7
			axe.tile = 'a'
			axe.img = axeimg

			shovel = new weapon.Group()
			shovel.type = 'sh'
			shovel.dmg = 6
			shovel.tile = 's'
			shovel.img = shovelimg

			scythe = new weapon.Group()
			scythe.type = 'sc'
			scythe.dmg = 7
			scythe.tile = 'c'
			scythe.img = scytheimg 


			player.layer =2
			enemy.layer = 2
			player.overlaps(weapon, equip)
			
			enemy.overlaps(weapon,equip)
            player.colliding(enemy, attack)

             enemy.overlapping(player,attack2)
			//  player.overlapping(menuControls)
			//  enemy.overlapping(menuControls)

allSprites.visible = false
startButton.visible  = true
settingsButton.visible = true
backButton.visible = false
aiButton.visible = true
keysButton.visible = false


	// fence = new wall.Group()

	// fence.tile = 'f'
	// fence.color = 'pink'

	new Tiles(// tile map
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
"E.EEEE...EEEE.........b...........EE.....a.......E.E",
"E.E.E..s..EEE......................E..........E..E.E",
"E.E......EEEE......................EEE........E..E.E",
"E.E......EE........................EEE...........E.E",
"E.E.EE....E..................EE..EEEE...EEEEEEEEEE.E",
"E.E.......EEE................E...........EEEEEEEEE.E",
"E.EEEE..EEEEE................EE..........E..EEEE.E.E",
"E.E.......EEE................EE..........EE......E.E",
"E.E..........................EE..........E.......E.E",
"E.E..........................EEE.........E.......E.E",
"Ep...........................EEE.............e.....E",
"E............................EEE...........EEE.....E",
"E.......EEEEEEEEEEEEEEEEE..c.EEE...........EEE...EEE",
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
function drawCountdown(){// displays the working countdown
	
	fill(255, 255, 255, 150)
	rect(width / 2 - 100, 30, 160, 100)
	textSize(50)
	fill(255)
	text(countdown, width / 2 - 65, 95)

}

 function menuControls(){
	background(menuImg)
	if (startButton.mouse.pressed()){// start button can appear and shows what otehr buttons will be present
	playing = true
	state = 1
	startButton.collider = 'n'
	startButton.visible = false
	enemy.visible = true
	weapon.visible  = true
	player.visible = true
	settingsButton.visible = false
	backButton.visible = false
	aiButton.visible = false
	keysButton.visible = false
	keysButton.collider = 'n'


}
if (settingsButton.mouse.pressed()){// settings button can appear and shows what otehr buttons will be present
	playing = false
	state = 3
	settingsButton.collider = 'n'
	settingsButton.visible = false
	startButton.collider = 'n'
	startButton.visible = false
	backButton.collider = 'n'
	backButton.visible = true
	aiButton.visible = false
	keysButton.visible = true
	keysButton.collider = 's'

	

}
if(keysButton.mouse.pressed()){// keys button can appear and shows what otehr buttons will be present
	playing = false
	state = 6
	settingsButton.collider = 'n'
	settingsButton.visible = true
	startButton.collider = 'n'
	startButton.visible = false
	backButton.collider = 'n'
	backButton.visible = true
	backButton.collider = 'n'
	aiButton.visible = false
	aiButton.collider = 'n'
	keysButton.visible = false
	keysButton.collider = 'n'
	
}
if (backButton.mouse.pressed()){// back button can appear and shows what otehr buttons will be present
	playing = false
	state = 4
	//settingButton.collider = 's'
	settingsButton.visible = true
	backButton.collider = 'n'
	backButton.visible = true
	startButton.collider = 'n'
	startButton.visible = true
	aiButton.visible = true
	aiButton.collider = 'n'
	keysButton.visible = 'false'
	keysButton.collider = 's'
}
if(aiButton.mouse.pressed()){// ai button can appear and shows what otehr buttons will be present
	state = 5
	playing = true

	aiButton.visible = false
	startButton.collider = 'n'
	startButton.visible = false
	enemy.visible = true
	weapon.visible  = true
	player.visible = true
	settingsButton.visible = false
	backButton.visible = false
	keysButton.visible = false
	keysButton.collider = 'n'
}
 }
//  function WinLose(){
// 	if (player.health == 0()){
// 		text("You Lose" + player.health,100,85 )

// 	}
// 	}
 
function draw() {
	if(!playing){
		menuControls()
		background(menuImg)
		
	}
	if(!playing && state == 6){
		//background(menuImg)
		menuControls()
		
		settingsButton.visible = false
		backButton.collider = 's'
		backButton.visible = true
		startButton.collider = 'n'
		startButton.visible = false
		aiButton.visible = false
		aiButton.collider = 's'
		keysButton.visible = false
		keysButton.collider = 's'

	}
	 if(!playing && state == 4){
		//background(menuImg)
		menuControls()
		
		settingsButton.visible = true
		backButton.collider = 's'
		backButton.visible = false
		startButton.collider = 's'
		startButton.visible = true
		aiButton.visible = true
		aiButton.collider = 's'
		keysButton.visible = false
		keysButton.collider = 's'


	}
	else if(!playing && state == 5){
		//background(menuImg)
		menuControls()
		
		aiButton.visible = false
		startButton.collider = 's'
		startButton.visible = false
		enemy.visible = true
		weapon.visible  = true
		player.visible = true
		settingsButton.visible = false
		backButton.visible = false
		keysButton.visible = false
		
	}
	else if(playing && state == 1){
		//background(menuImg)
		menuControls()
		
		startButton.collider = 's'
		startButton.visible = false
		enemy.visible = true
		weapon.visible  = true
		player.visible = true
		settingsButton.visible = false
		backButton.visible = false
		aiButton.visible = false
		keysButton.visible = false
	
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
camera.off()// the camera size if i want it zoomed in or not
displayHealth();
drawCountdown();
 if(player.overlapping(enemy)){
 	if(kb.presses('e') ){
 		enemy.health -= enemy.dmg;
 	    score +=player.dmg 
 		}
 }
	playerControls();
	enemyControls();
	displayScore()
	offense()
	displayEnemyScore();
	}

	else if(playing && state == 5){
		background(255)
	
	
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
//enemy.moveTowards(player,0.005)
drawCountdown();
 if(player.overlapping(enemy)){
 	if(kb.presses('e') ){
 		enemy.health -= enemy.dmg;
 	    score +=player.dmg 
 		}
 }
	playerControls();
	//enemyControls();
	
	displayScore()
	AI();
	offense()
	displayEnemyScore();
	}
	

}
function AI(){// AI goes towards the player
	let seen = false

		 sprites = world.rayCastAll(player, enemy, (sprite) => sprite.isWall);
	 	 for (let sprite of sprites) {
			line(player.x, player.y, sprite.x, sprite.y);
			sprite.moveTowards(player,0.005)
			if(sprite.type == 'p2')
			seen = true
			//console.log(sprite.ani)
		}
	if(seen){
		enemy.ani = 'run';
	}
	else{
		enemy.ani = 'stand';
		enemy.vel.x = 0
		enemy.vel.y = 0
		}
		console.log(seen)

		

	}



function displayScore(){// shows the score
	text("Score " + score, 100, 160);
	
}
function displayEnemyScore(){// shows the score
	text("Score " + enemyScore, 800, 160);
}
function displayHealth() {// shwos the working healthbar
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

	if (player.health <= 0 ){
		player.health = 0
	}
	if (enemy.health <=0){
		enemy.health = 0
	}


	

}

function playerControls() {// movement of the player and punch and kick
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

function enemyControls() {// enemy movement and punc hand kick
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

function equip(p,w){// can equip weapons and deal damage with them
p.equipped = w.type;
console.log(w.equipped)
if(!w.equipped && p.joints.length == 0){
let weapon
let gj
 switch(w.type){

	case 'b':
	 weapon = new bat.Sprite(p.x+5 ,p.y+6)
	 gj = new GlueJoint(p,weapon)
	 w.equipped = true
	 weapon.equipped = true
	 p.dmg = weapon.dmg
    break;
	case 'sh':
	weapon = new shovel.Sprite(p.x+5 ,p.y+6)
	 gj = new GlueJoint(p,weapon)
	 w.equipped = true
	 weapon.equipped = true
	 p.dmg = weapon.dmg
	 
    break;
	case 'sc':
	 weapon = new scythe.Sprite(p.x+5 ,p.y+6)
	 gj = new GlueJoint(p,weapon)
	 w.equipped = true
	 weapon.equipped = true
	 p.dmg = weapon.dmg
    break;
	case 'a':
	 weapon = new axe.Sprite(p.x+5 ,p.y+6)
	 gj = new GlueJoint(p,weapon)
	 w.equipped = true
	 weapon.equipped = true
	 p.dmg = weapon.dmg
    break;

default:
	 p.dmg =1.2

	
 }
w.remove()

gj.visible = false;
}

}

//   function hit(val){
//   score += val;
//   console.log("score" + score);
//   console.log("score" + enemyScore);
//   }

	
function attack(p,e){// allows damage to be dealt with weapons and the amount of damage goes to the score count up
console.log("11111")
	if(kb.presses('e') ){
		player.health -= p.dmg;
	    score +=p.dmg 
		}
	}	
function attack2(p){

		 if(kb.presses('u') ){
			player.health -= p.dmg;
			enemyScore +=p.dmg
			}
		}
	

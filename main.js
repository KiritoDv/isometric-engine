let textures = {};
var canvas;
var map;

var picker;

var player = {
	x: 0,
	y: 0,
	texture: "Snowy"
};

function preload() {
	textures["Grass"] = loadImage('assets/Grass.png');
	textures["Grass3"] = loadImage('assets/Grass3.png');
	textures["G2M"] = loadImage('assets/G2M.png');
	textures["SmallStone"] = loadImage('assets/SmallStone.png');
	textures["Stone"] = loadImage('assets/Stone.png');
	textures["Dirt"] = loadImage('assets/Dirt.png');
	textures["Snowy"] = loadImage('assets/wew.png');
}

let cameraLocation;
function setup() {
	const canvasElt = createCanvas(windowWidth, windowHeight).elt;
	canvasElt.style.width = '100%', canvasElt.style.height = '100%';
	cameraLocation = createVector(0, 0, (height/2.0) / tan(PI*30.0 / 180.0));	
	frameRate(60);
	map = new Tilemap(40, 40, 40);

	picker = new IsometricPicker({x: 32, y: 32});	

	for (var i = 0; i < 20; i++) {
		for (var k = 0; k < 20; k++) {
			map.setTile(i, 0, k, { texture:textures["Stone"], width: 32, height: 32 });
			map.setTile(i, 1, k, { texture:textures["Grass"], width: 32, height: 32 });
		}
	}	

	map.setTile(0, 2, 0, { texture:textures["Grass"], width: 32, height: 32 });
	map.setTile(0, 3, 0, { texture:textures["Grass"], width: 32, height: 32 });
	map.setTile(0, 4, 0, { texture:textures["Grass"], width: 32, height: 32 });
	map.setTile(0, 5, 0, { texture:textures["Grass"], width: 32, height: 32 });
}

function draw() {
	clear();
	background(100, 149, 237);
	noSmooth();			
	//camera(cameraLocation.x, cameraLocation.y, cameraLocation.z, 0, 0, 0, 0, 1, 0);
	
	camera.position.x = player.x;
	camera.position.y = player.y;	
	camera.on();
	//camera(player.x, player.y, (height / 2) / tan(PI / 6), 0, 0, 0, 0, 1, 0);	
	for(var x = 0; x <= this.map.mapX; x++){		
		line(-x*16, x*8, ((this.map.mapX/2)*32)-(x*16), ((this.map.mapY/2)*16)+(x*8));
	}
	for(var x = 0; x <= this.map.mapY; x++){
		line(x*16, x*8, (-((this.map.mapX)/2)*32)+(x*16), (((this.map.mapY)/2)*16)+(x*8));
	}

	map.points.forEach(a => {
		if(a.d){
			var baseX = 0;
			var baseY = 0;		
			var x = baseX + ((a.x - a.z) * (32 / 2)) - (32 / 2);
			var y = baseY + (((a.x + a.z) * (32 / 4)) - ((32 / 2) * (a.y))) - (32/ 2);		
			image(a.tile.texture, x, y, 32, 32);
			textAlign(CENTER);
			textSize(8);			
			text(a.z, x+16, y, 12);
		}
	});

	//rect(-mouseX/2, mouseY, 100, 100);

	//image(textures[player.texture], player.x, player.y)	

	camera.off();
	line(0, mouseY, windowWidth, mouseY);
	line(mouseX, 0, mouseX, windowHeight);			

	if (keyIsDown(87)) {
		player.y -= 0.2 * deltaTime;
	}
	if (keyIsDown(83)) {
		player.y += 0.2 * deltaTime;
	}
	if (keyIsDown(65)) {
		player.x -= 0.2 * deltaTime;
	}
	if (keyIsDown(68)) {
		player.x += 0.2 * deltaTime;
	}

	let fps = frameRate();	
	text("FPS: " + fps.toFixed(2), 20, 20);

	//var xC = (camera.mouseX / 16 + camera.mouseX / 16) / 2;
	//var yC = ((camera.mouseY*8) / 32 - (camera.mouseX / 8)) /2;

	var xC = Math.floor((camera.mouseX + (16 / 2.0)) / 16);
    var yC = Math.floor(camera.mouseY / 16);

	var tP = {
		x: yC + xC,
		y: xC - yC -1
	}

	text("X: "+Math.round(tP.x), mouseX+20, mouseY+10, 12);
	text("Y: "+Math.round(yC), mouseX+60, mouseY+10, 12);
}


function mouseDragged(){
	//var xC = (camera.mouseX / 16 + camera.mouseX / 16) / 2;
	//var yC = (camera.mouseY / 16 - (camera.mouseX / 16)) / 2;	

	var xC = Math.floor((camera.mouseX + (16 / 2.0)) / 16);
    var yC = Math.floor(camera.mouseY / 16);

	var a = this.map.points.find(a => a.x == Math.round(xC) && a.y == 1 && a.z == Math.round(yC));	
	if(a != null){
		a.d = false;
	}
}

window.onresize = function () {
	resizeCanvas(windowWidth, windowHeight);
};
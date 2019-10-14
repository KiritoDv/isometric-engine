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
	textures["Stone"] = loadImage('assets/Stone.png');
	textures["Wool"] = loadImage('assets/Wool_Base.png');
	textures["Dirt"] = loadImage('assets/Dirt.png');
	textures["G2M"] = loadImage('assets/G2M.png');
	textures["SmallStone"] = loadImage('assets/SmallStone.png');		
	textures["Snowy"] = loadImage('assets/wew.png');
}

p5.disableFriendlyErrors = true; 

let cameraLocation;
function setup() {
	const canvasElt = createCanvas(windowWidth, windowHeight).elt;
	canvasElt.style.width = '100%', canvasElt.style.height = '100%';
	cameraLocation = createVector(0, 0, (height/2.0) / tan(PI*30.0 / 180.0));	
	frameRate(60);
	map = new Tilemap(70, 70, 70);

	picker = new IsometricPicker({x: 32, y: 32});	

	for (var i = 0; i < 70; i++) {
		for (var k = 0; k < 70; k++) {
			map.setTile(i, k, 0, { texture: null, width: 32, height: 32, color: {
				r: 255,
				g: 255,
				b: 255
			}});
			//map.setTile(i, 1, k, { texture:textures["Grass"], width: 32, height: 32 });
		}
	}
}

function draw() {
	clear();
	background(100, 149, 237);
	noSmooth();			

	var baseX = (windowWidth/2)-player.x;
	var baseY = (windowHeight/4)-player.y;

	//camera(cameraLocation.x, cameraLocation.y, cameraLocation.z, 0, 0, 0, 0, 1, 0);
	
	//camera.position.x = player.x;
	//camera.position.y = player.y;	
	camera.on();
	//camera(player.x, player.y, (height / 2) / tan(PI / 6), 0, 0, 0, 0, 1, 0);		
	
	push()
	stroke(0,0,0, 50)
	translate(baseX+16, baseY)
	for(var x = 0; x <= this.map.mapX; x++){
		line(-x*16, x*8, ((this.map.mapX/2)*32)-(x*16), ((this.map.mapY/2)*16)+(x*8));
	}
	for(var x = 0; x <= this.map.mapY; x++){
		line(x*16, x*8, (-((this.map.mapX)/2)*32)+(x*16), (((this.map.mapY)/2)*16)+(x*8));
	}	
	pop()

	var mX = (mouseX - 16) - baseX
	var mY = (mouseY - 8) - baseY

	var xC = Math.round(((mX / (32 / 2) + mY / (32 / 4)) / 2));
	var yC = Math.round(((mY / (32 / 4) - (mX / (32 / 2))) / 2));

	//text("X: "+xC, mouseX+20, mouseY+10, 12);
	//text("Y: "+yC, mouseX+60, mouseY+10, 12);	

	var a = this.map.points.find(a => a.x == xC && a.y == yC && a.z == 0);	

	var gX = Math.round(((xC - yC) * (32 / 2)))
	var gY = Math.round(((xC + yC) * (32 / 4)))

	if(xC >= 0 && xC < map.mapX && yC >= 0 && yC < map.mapY){
		push()	
		translate(baseX + gX, (baseY + gY)+8)
		line(16, -8, 0, 0);
		line(16, 8, 0, 0);
		line(32, 0, 16, -8);
		line(32, 0, 16, 8);
		pop()
	}

	map.points.forEach((a, i) => {
		if(a.d && a.tile.texture != null){
			//var baseX = 0;			
			//var baseY = 0;		
			//var x = baseX + ((a.x - a.z) * (32 / 2)) - (32 / 2);
			//var y = baseY + (((a.x + a.z) * (32 / 4)) - ((32 / 2) * (a.y))) - (32/ 2);
			var x = baseX + Math.round(((a.x - a.y) * (a.tile.texture.width / 2)))
			var y = baseY + Math.round((((a.x + a.y) * (a.tile.texture.height / 4)))-16)
			if(x > - 32 && x < windowWidth && y < windowHeight && y > -32){				
				image(a.tile.texture, x, y, 32, 32)
			}			
			//textAlign(CENTER);
			//textSize(8);			
			//text(i, x+16, y, 12);
		}
	})	

	var ba = [0, 1, 2, 3, 4, 5, 6]
	

	function tmp(){
		var arr = [];
		map.points.forEach(item => {
			if(!arr.includes(item['x']))
				arr.push(item['x']);
		})
		return arr;
	}	
	//console.log((-((this.map.mapX)/2)*32)+(16))
		
	//rect(-mouseX/2, mouseY, 100, 100);

	//image(textures[player.texture], player.x, player.y)	

	camera.off();
	//line(0, mouseY, windowWidth, mouseY);
	//line(mouseX, 0, mouseX, windowHeight);			

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
	text("- Controls -", 20, 38);
	text("[ WASD ] - Camera Movement", 20, 55);
	text("[ Left Click ] - Break Block", 20, 70);
	text("[ Right Click ] - Place Block", 20, 85);

	//var xC = (camera.mouseX / 16 + camera.mouseX / 16) / 2;
	//var yC = ((camera.mouseY*8) / 32 - (camera.mouseX / 8)) /2;

	//var x = (camera.mouseX/16);
	//var y = (camera.mouseY/16)
	//var y = (((a.x + a.z) * (32 / 4)) - ((32 / 2) * (camera.mouseY))) - (32/ 2);	

	//text("X: "+Math.round((map.mapX+x)/2), mouseX+20, mouseY+10, 12);
	//text("Y: "+Math.round((map.mapZ+y)/24), mouseX+60, mouseY+10, 12);
	
	if(a && mouseIsPressed){				
		if (mouseButton === LEFT && a.tile.texture) {
			a.tile.texture = null;
		}
		if (mouseButton === RIGHT && !a.tile.texture) {
			a.tile.texture = textures[["Grass", "Wool"][Math.round(Math.random() * 1)]]
		}
		if (mouseButton === CENTER && a.tile.texture) {
			if(a.tile.texture == textures["Wool"]){
				a.tile.color = {
					r: Math.round(Math.random()*255),
					g: Math.round(Math.random()*255),
					b: Math.round(Math.random()*255)
				}
				//tint(a.tile.color.r, a.tile.color.g, a.tile.color.b)
				//a.tile.texture = textures["Wool"];
			}else{
				a.tile.texture = textures[["Grass", "Stone", "Dirt"][Math.round(Math.random() * 2)]]
			}			
		}
	}	
}

function getMaxOfArray(numArray) {
	return Math.max.apply(null, numArray);
}

function mouseDragged(){
	//var xC = (camera.mouseX / 16 + camera.mouseX / 16) / 2;
	//var yC = (camera.mouseY / 16 - (camera.mouseX / 16)) / 2;	

	//var xC = (camera.mouseX/16);
	//var yC = Math.floor(camera.mouseY / 16);
	
	
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}

/**
    @description:  
    	This code is a basic sprite animation engine that uses html canvas to 
		animate rows from a sprite sheet.
*/

/* 
   1. get canvas.

   2. get 2d canvas methods from canvas.
	
   3. adjust width and height if necessary.	
   
   N.B. single_sprite = (sprite_sheet_px / total number of columns) 
*/
const canvas = document.getElementById("core");  
const ctx = canvas.getContext("2d");
const CANVAS_WIDTH = 600;
const CANVAS_HEIGHT = 600;
const SPRITE_WIDTH = 575;
const SPRITE_HEIGHT = 523;
const player_image = new Image();
const limiter = 5;
const PLAYER_STATE = "idle";
/*  
    This is an example animation_type[]. 
    Delete or add to this array the names 
    of your animations and frame length
    stored as objects.
 */
const animation_type = [
	      {
	      	name: "idle",
	      	len: 7 
	      },
	      {
	      	name: "jump",
	      	len: 7
	      }
];
let game_frame = 0;

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

// fill animation_type[] with all frame locations of each sprite type
for (let i = 0; i<animation_type.length; i++) {
	
	   const frames = {
	   			 loc: []
	   };
	   
	   for (let j = 0; j<animation_type[i].len; j++) {
	   		  
	   		  const pos_x = j * SPRITE_WIDTH;
	   		  const pos_y = i * SPRITE_HEIGHT;
	   		  
	   		  frames.loc[frames.loc.length] = {x: pos_x, y: pos_y};
	   }
	   
	   animation_type[animation_type[i].name] = frames;
}

// get sprite_sheet image
player_image.src = "./sprites/shadow_dog.png";

// begin animation loop
function animate() {
	/*
	  1. clear canvas after each frame.
	  
	  2. animate entire sprite sheet row. 
	  
	  3. request to use each frame on canvas.
	  
	   N.B. During the animation loop, cyclic behavior of modulo operator is used to
	  	      control speed of animation, frames, and get {x, y} coordinates of sprites.
	*/
	
	ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
	
	let position = Math.floor(game_frame / limiter ) %
	animation_type[PLAYER_STATE].loc.length;
	
	let frameX = animation_type[PLAYER_STATE].loc[position].x;
	let frameY = animation_type[PLAYER_STATE].loc[position].y;
	
	//  @ctx.drawImage(image, s_x,  s_y,  s_w,  s_h,  d_y,  d_x,  d_w,  d_h)
	ctx.drawImage(player_image, frameX, frameY, SPRITE_WIDTH, SPRITE_HEIGHT, 
	0, 0, SPRITE_WIDTH, SPRITE_HEIGHT);
	
	// control game engine frames
	game_frame++;
	
	requestAnimationFrame(animate);
}

animate();
   
var CELL_TIME = 0.016;
var joystick = require("joystick");

cc.Class({
    extends: cc.Component,

    properties: {
		speed: 200,
		BLOCK_LEN : 25,
		stick: {
			type: joystick,
			default: null,
		},
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
		this.now_time = 0;
		this.capture_points();
    },
	
	fixed_update(dt){
		if(this.stick.dir === -1){
			return;
		}
		
		var s = this.speed * dt;
		var sx = s * Math.cos(this.stick.radius);
		var sy = s * Math.sin(this.stick.radius);
		
		var head = this.node.children[0];
		var pos = head.getPosition();
		pos.x += sx;
		pos.y += sy;
		head.setPosition(pos);
		this.pos_set.push(cc.v2(pos.x, pos.y));
		
		var degree = this.stick.radius * 180 / Math.PI;
		degree -= 90;
		head.angle = degree;
		
		for(var i = 1; i < this.node.childrenCount; i ++){
			var item = this.node.children[i];
			var index = item.cur_index + 1;
			item.setPosition(this.pos_set[index]);
			item.cur_index = index;
		}
		
		var tail = this.node.children[this.node.childrenCount - 1];
		if(tail.cur_index >= 512) {
			for(var i = 1; i < this.node.childrenCount; i ++){
				var item = this.node.children[i];
				item.cur_index -= 512;
			}
			this.pos_set.splice(0, 512);
		}
	},
	
	capture_points(){
		var len = (this.node.childrenCount - 1) *this.BLOCK_LEN ;
		var xpos = 0;
		var ypos = -len;
		len = len * 2;
		var total_time = len / this.speed;
		this.pos_set = [];
		this.pos_set.push(cc.v2(xpos, ypos));
		
		var passed_time = 0;
		while(passed_time <total_time){
			ypos += this.speed * CELL_TIME;
			this.pos_set.push(cc.v2(xpos, ypos));
			passed_time += CELL_TIME;
		}
		
		var head = this.node.children[0];
		head.setPosition(this.pos_set[this.pos_set.length - 1]);
		
		var point_num = Math.floor(this.BLOCK_LEN / (this.speed * CELL_TIME));
		for(var i = 1; i < this.node.childrenCount; i ++){
			var item = this.node.children[i];
			var index = this.pos_set.length - 1 - point_num * i;
			item.setPosition(this.pos_set[index]);
			item.cur_index = index;
		}
	},

    update (dt) {
		this.now_time += dt;
		while(this.now_time >= CELL_TIME){
			this.fixed_update(CELL_TIME);
			this.now_time -= CELL_TIME;
		}
	},
});

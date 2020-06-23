
cc.Class({
    extends: cc.Component,

    properties: {
		stick: {
			type: cc.Node,
			default: null,
		},
		max_r: 120,
		min_r: 60,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
		this.dir = -1;
		this.radius = 0;
		
		this.stick.on(cc.Node.EventType.TOUCH_MOVE, function(e) {
			var w_pos = e.getLocation();
			var pos = this.node.convertToNodeSpaceAR(w_pos);
			var len = pos.mag();
			if(len > this.max_r){
				pos.x = pos.x * this.max_r / len;
				pos.y = pos.y * this.max_r / len;
			}
			this.stick.setPosition(pos);
			
			if(len < this.min_r){
				return;
			}
			
			this.dir = -1;
			var r = Math.atan2(pos.y, pos.x);
			if(r >= -8 * Math.PI / 8 && r < -7 * Math.PI / 8){
				this.dir = 2;
			} else if(r >= -7 * Math.PI / 8 && r < -5 * Math.PI / 8){
				this.dir = 6;
			} else if(r >= -5 * Math.PI / 8 && r < -3 * Math.PI / 8){
				this.dir = 1;
			} else if(r >= -3 * Math.PI / 8 && r < -1 * Math.PI / 8){
				this.dir = 7;
			} else if(r >= -1 * Math.PI / 8 && r < 1 * Math.PI / 8){
				this.dir = 3;
			} else if(r >= 1 * Math.PI / 8 && r < 3 * Math.PI / 8){
				this.dir = 4;
			} else if(r >= 3 * Math.PI / 8 && r < 5 * Math.PI / 8){
				this.dir = 0;
			} else if(r >= 5 * Math.PI / 8 && r < 7 * Math.PI / 8){
				this.dir = 5;
			} else if(r >= 7 * Math.PI / 8 && r < 8 * Math.PI / 8){
				this.dir = 2;
			} 
			this.radius = r;
		}.bind(this), this);
		
		this.stick.on(cc.Node.EventType.TOUCH_END, function(e){
			this.stick.setPosition(cc.v2(0, 0));
			this.dir = -1;
		}.bind(this), this);
		
		this.stick.on(cc.Node.EventType.TOUCH_CANCEL, function(e){
			this.stick.setPosition(cc.v2(0, 0));
			this.dir = -1;
		},bind(this), this);
	},

    start () {

    },

    // update (dt) {},
});

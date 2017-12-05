/**
 * Created by huangxinping on 2/27/14.
 *
 * 智能骷髅
 *
 */

var AISkeletonNode;
AISkeletonNode = cc.Sprite.extend({

    defaultPoint:null, // 起始默认点
    targetPoint:null, // 去向点
    direction:0,

    canChangeOpen:false, // 能够改变开发状态

    moveToAction:null, // 移动Action
    moveEnable:true,

    ctor: function () {
        this._super();

        cc.SpriteFrameCache.getInstance().addSpriteFrames(g_game_skeleton_plist,g_game_skeleton);
    },

    init: function (direction,defaultPoint,targetPoint) {
        var frames = new Array();
        for (var i = 1; i <= 37; i++){
            frames.push(cc.SpriteFrameCache.getInstance().getSpriteFrame("skeleton_"+i+".png"));
        }
        var animation = new cc.Animation.create(frames,0.1);
        var action = cc.Animate.create(animation);

        var repeat = cc.RepeatForever.create(action);

        this.initWithSpriteFrame(frames[0]);
        var size = cc.Director.getInstance().getWinSize();
        this.setPosition(defaultPoint[0]*GameLevelConfig.getInstance().grid[0]+GameLevelConfig.getInstance().gridOffset[0]+GameLevelConfig.getInstance().grid[0]/2,
            size.height-(defaultPoint[1]*GameLevelConfig.getInstance().grid[1]+GameLevelConfig.getInstance().gridOffset[1]+GameLevelConfig.getInstance().grid[1]/2));

        this.runAction(repeat);

        this.defaultPoint = defaultPoint;
        this.targetPoint = targetPoint;
        this.direction = direction;
    },

    // 智能移动到开关处
    aiMoveOpened : function () {
        if (!this.moveEnable) {
            return;
        }
        this.stopAction(this.moveToAction);
        var size = cc.Director.getInstance().getWinSize();
        var duration = 1.0;
        if (this.direction == 0) {
            duration = Math.abs(this.targetPoint[0]-this.defaultPoint[0])*1.0;
        } else {
            duration = Math.abs(this.targetPoint[1]-this.defaultPoint[1])*1.0;
        }
        var targetPoint = cc.p(this.targetPoint[0]*GameLevelConfig.getInstance().grid[0]+GameLevelConfig.getInstance().gridOffset[0]+GameLevelConfig.getInstance().grid[0]/2,
                size.height-(this.targetPoint[1]*GameLevelConfig.getInstance().grid[1]+GameLevelConfig.getInstance().gridOffset[1]+GameLevelConfig.getInstance().grid[1]/2));
        cc.log("target:"+targetPoint.x+" "+targetPoint.y);
        this.moveToAction = cc.MoveTo.create(duration,targetPoint);
        var callFunc = cc.CallFunc.create(function(){
            this.canChangeOpen = true;
        },this,true);
        var seq = cc.Sequence.create(this.moveToAction,callFunc);
        this.runAction(seq);

        this.moveEnable = false;
    },

    // 智能移动到原始处
    aiMoveDefault : function () {
        this.stopAction(this.moveToAction);
        var size = cc.Director.getInstance().getWinSize();
        var duration = 1.0;
        if (this.direction == 0) {
            duration = Math.abs(this.targetPoint[0]-this.defaultPoint[0])*1.0;
        } else {
            duration = Math.abs(this.targetPoint[1]-this.defaultPoint[1])*1.0;
        }
        var targetPoint = cc.p(this.defaultPoint[0]*GameLevelConfig.getInstance().grid[0]+GameLevelConfig.getInstance().gridOffset[0]+GameLevelConfig.getInstance().grid[0]/2,
                size.height-(this.defaultPoint[1]*GameLevelConfig.getInstance().grid[1]+GameLevelConfig.getInstance().gridOffset[1]+GameLevelConfig.getInstance().grid[1]/2));
        this.moveToAction = cc.MoveTo.create(duration,targetPoint);
        var callFunc = cc.CallFunc.create(function(){
            this.canChangeOpen = false;
            this.moveEnable = true;
            this.setPosition(this.defaultPoint[0]*GameLevelConfig.getInstance().grid[0]+GameLevelConfig.getInstance().gridOffset[0]+GameLevelConfig.getInstance().grid[0]/2,
                    size.height-(this.defaultPoint[1]*GameLevelConfig.getInstance().grid[1]+GameLevelConfig.getInstance().gridOffset[1]+GameLevelConfig.getInstance().grid[1]/2));
        },this,true);
        var seq = cc.Sequence.create(this.moveToAction,callFunc);
        this.runAction(seq);

    }
});
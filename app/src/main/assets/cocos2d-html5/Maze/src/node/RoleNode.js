/**
 * Created by huangxinping on 2/13/14.
 *
 * 人物角色
 *
 */

var RoleNode = cc.Sprite.extend({

    roleDirection:DIRECTION_RIGHT,
    moveEnable:false,

    moveGridX:0, // 移动对应的X方向索引
    moveGridY:0, // 移动对应的Y方向索引

    moveDistanceX:0, // 每次移动的位移 - X
    moveDistanceY:0, // 每次移动的位移 - Y

    canMoveToDoor:false, // 是否能移动到“门”位置

    canProtect:false, // 是否能够保护（当吃到药瓶时候，能保护角色）
    protectCount:0, // 保护计数

    moveAction:null, // 移动动画

    ctor: function () {
        this._super();

        cc.SpriteFrameCache.getInstance().addSpriteFrames(g_game_role_up_plist,g_game_role_up);
        cc.SpriteFrameCache.getInstance().addSpriteFrames(g_game_role_down_plist,g_game_role_down);
        cc.SpriteFrameCache.getInstance().addSpriteFrames(g_game_role_left_plist,g_game_role_left);
        cc.SpriteFrameCache.getInstance().addSpriteFrames(g_game_fog_plist,g_game_fog);
        cc.SpriteFrameCache.getInstance().addSpriteFrames(g_game_role_shield_plist,g_game_role_shield);
    },

    initWithGameLevelConfig : function () {
        this.swtichDirection(GameLevelConfig.getInstance().roleDirection);

        var girds = GameLevelConfig.getInstance().gameGrids;

        for (var i = 0; i < GameLevelConfig.getInstance().grids[0]; i++) {
            for (var j = 0; j < GameLevelConfig.getInstance().grids[1]; j++) {
                if (GameLevelConfig.getInstance().gameGrids[i][j] == 2) {
                    this.moveGridX = j;
                    this.moveGridY = i;
                    GameLevelConfig.getInstance().gameGrids[i][j] = 0;
                    break;
                }
            }
        }

        var size = cc.Director.getInstance().getWinSize();

        this.setAnchorPoint(0.5,0.5);
//        this.setScale(0.5);
        this.setPosition(this.moveGridX*GameLevelConfig.getInstance().grid[0]+GameLevelConfig.getInstance().gridOffset[0]+GameLevelConfig.getInstance().grid[0]/2,
            size.height-(this.moveGridY*GameLevelConfig.getInstance().grid[1]+GameLevelConfig.getInstance().gridOffset[1]+GameLevelConfig.getInstance().grid[1]/2));

        this.schedule(this.update);
    },

    jumpToGrid : function (gridX,gridY) {
        if (this.moveEnable) {
            return;
        }

        this.moveGridX = gridX;
        this.moveGridY = gridY;

        var size = cc.Director.getInstance().getWinSize();
        this.setPosition(this.moveGridX*GameLevelConfig.getInstance().grid[0]+GameLevelConfig.getInstance().gridOffset[0]+GameLevelConfig.getInstance().grid[0]/2,
                size.height-(this.moveGridY*GameLevelConfig.getInstance().grid[1]+GameLevelConfig.getInstance().gridOffset[1]+GameLevelConfig.getInstance().grid[1]/2));
    },

    swtichDirection : function (direction) {
        if (this.moveEnable) {
            return;
        }
        this.stopAllActions();
        switch (direction) {
            case DIRECTION_UP: // 上
            {
                this.initWithSpriteFrameName("role_up_direction_still_1.png");

                var frames = new Array();
                for (var i = 1; i <= 17; i++){
                    frames.push(cc.SpriteFrameCache.getInstance().getSpriteFrame("role_up_direction_still_"+i+".png"));
                }
                var animation = new cc.Animation.create(frames,0.1);
                var action = cc.Animate.create(animation);

                var repeat = cc.RepeatForever.create(action);
                this.runAction(repeat);
                break;
            }
            case DIRECTION_DOWN: // 下
            {
                this.initWithSpriteFrameName("role_down_direction_still_1.png");

                var frames = new Array();
                for (var i = 1; i <= 17; i++){
                    frames.push(cc.SpriteFrameCache.getInstance().getSpriteFrame("role_down_direction_still_"+i+".png"));
                }
                var animation = new cc.Animation.create(frames,0.1);
                var action = cc.Animate.create(animation);

                var repeat = cc.RepeatForever.create(action);
                this.runAction(repeat);
                break;
            }
            case DIRECTION_LEFT: // 左
            {
                this.initWithSpriteFrameName("role_left_direction_still_1.png");

                var frames = new Array();
                for (var i = 1; i <= 17; i++){
                    frames.push(cc.SpriteFrameCache.getInstance().getSpriteFrame("role_left_direction_still_"+i+".png"));
                }
                var animation = new cc.Animation.create(frames,0.1);
                var action = cc.Animate.create(animation);

                var repeat = cc.RepeatForever.create(action);
                this.runAction(repeat);
                break;
            }
            case DIRECTION_RIGHT: // 右
            {
                this.initWithSpriteFrameName("role_left_direction_still_1.png");
                this.setFlippedX(true);

                var frames = new Array();
                for (var i = 1; i <= 17; i++){
                    frames.push(cc.SpriteFrameCache.getInstance().getSpriteFrame("role_left_direction_still_"+i+".png"));
                }
                var animation = new cc.Animation.create(frames,0.1);
                var action = cc.Animate.create(animation);

                var repeat = cc.RepeatForever.create(action);
                this.runAction(repeat);
                break;
            }
            default:
                break;
        }
        this.roleDirection = direction;
    },

    directionAnimate : function () {
        if (this.moveEnable) {
            return;
        }
        this.stopAllActions();
        switch (this.roleDirection) {
            case DIRECTION_UP: // 上
            {
                this.initWithSpriteFrameName("role_up_direction_move_1.png");

                var frames = new Array();
                for (var i = 1; i <= 17; i++){
                    frames.push(cc.SpriteFrameCache.getInstance().getSpriteFrame("role_up_direction_move_"+i+".png"));
                }
                var animation = new cc.Animation.create(frames,0.1);
                var action = cc.Animate.create(animation);
                var repeat = cc.RepeatForever.create(action);
                this.runAction(repeat);
                break;
            }
            case DIRECTION_DOWN: // 下
            {
                this.initWithSpriteFrameName("role_down_direction_move_1.png");

                var frames = new Array();
                for (var i = 1; i <= 17; i++){
                    frames.push(cc.SpriteFrameCache.getInstance().getSpriteFrame("role_down_direction_move_"+i+".png"));
                }
                var animation = new cc.Animation.create(frames,0.1);
                var action = cc.Animate.create(animation);
                var repeat = cc.RepeatForever.create(action);
                this.runAction(repeat);
                break;
            }
            case DIRECTION_LEFT: // 左
            {
                this.initWithSpriteFrameName("role_left_direction_move_1.png");
                this.setFlippedX(false);

                var frames = new Array();
                for (var i = 1; i <= 17; i++){
                    frames.push(cc.SpriteFrameCache.getInstance().getSpriteFrame("role_left_direction_move_"+i+".png"));
                }
                var animation = new cc.Animation.create(frames,0.1);
                var action = cc.Animate.create(animation);
                var repeat = cc.RepeatForever.create(action);
                this.runAction(repeat);
                break;
            }
            case DIRECTION_RIGHT: // 右
            {
                this.initWithSpriteFrameName("role_left_direction_move_1.png");
                this.setFlippedX(true);

                var frames = new Array();
                for (var i = 1; i <= 17; i++){
                    frames.push(cc.SpriteFrameCache.getInstance().getSpriteFrame("role_left_direction_move_"+i+".png"));
                }
                var animation = new cc.Animation.create(frames,0.1);
                var action = cc.Animate.create(animation);
                var repeat = cc.RepeatForever.create(action);
                this.runAction(repeat);
                break;
            }
            default:
                break;
        }
        this.calculateDistance();
    },

    checkBarrierAndOpen : function (i) {
        switch (this.roleDirection) {
            case DIRECTION_UP:
            {
                var barrier = GameLevelConfig.getInstance().barrier["change"];
                for (var j = 0; j < barrier.length; j++) {
                    var item = barrier[j];
                    var info = item["info"];
                    if (info[0][1] == i && info[0][0] == this.moveGridX && GameLevelConfig.getInstance().gameGrids[info[0][1]][info[0][0]] == 0) {
                        for (var m = 10; m > i; m--) {
                            if (GameLevelConfig.getInstance().gameGrids[m][this.moveGridX] == 7) { // 开关
                                return true;
                            }
                        }
                    }
                }
                break;
            }
            case DIRECTION_DOWN:
            {
                var barrier = GameLevelConfig.getInstance().barrier["change"];
                for (var j = 0; j < barrier.length; j++) {
                    var item = barrier[j];
                    var info = item["info"];
                    if (info[0][1] == i && info[0][0] == this.moveGridX && GameLevelConfig.getInstance().gameGrids[info[0][1]][info[0][0]] == 0) {
                        for (var m = i; m > 0; m--) {
                            if (GameLevelConfig.getInstance().gameGrids[m][this.moveGridX] == 7) { // 开关
                                return true;
                            }
                        }
                    }
                }
                break;
            }
            case DIRECTION_LEFT:
            {
                var barrier = GameLevelConfig.getInstance().barrier["change"];
                for (var j = 0; j < barrier.length; j++) {
                    var item = barrier[j];
                    var info = item["info"];
                    if (info[0][1] == this.moveGridY && info[0][0] == i && GameLevelConfig.getInstance().gameGrids[info[0][1]][info[0][0]] == 0) {
                        for (var m = 10; m > i; m--) {
                            if (GameLevelConfig.getInstance().gameGrids[this.moveGridY][m] == 7) { // 开关
                                return true;
                            }
                        }
                    }
                }
                break;
            }
            case DIRECTION_RIGHT:
            {
                var barrier = GameLevelConfig.getInstance().barrier["change"];
                for (var j = 0; j < barrier.length; j++) {
                    var item = barrier[j];
                    var info = item["info"];
                    if (info[0][1] == this.moveGridY && info[0][0] == i && GameLevelConfig.getInstance().gameGrids[info[0][1]][info[0][0]] == 0) {
                        for (var m = i; m > 0; m--) {
                            if (GameLevelConfig.getInstance().gameGrids[this.moveGridY][m] == 7) { // 开关
                                return true;
                            }
                        }
                    }
                }
                break;
            }
            default:
                break;
        }
        return false;
    },

    calculateDistance : function () {
        this.moveDistanceX = 0;
        this.moveDistanceY = 0;
        var moveGridCount = 0;
        switch (this.roleDirection) {
            case DIRECTION_UP:
            {
                for (var i = this.moveGridY-1; i >= 0; i--) {
                    if (!this.canMoveToDoor && GameLevelConfig.getInstance().gameGrids[i][this.moveGridX] == 3) {

                    } else {
                        if (GameLevelConfig.getInstance().gameGrids[i][this.moveGridX] == 6 ||
                            (!this.canMoveToDoor && GameLevelConfig.getInstance().gameGrids[i][this.moveGridX] == 3)) {
                            break;
                        }
                    }

                    if (this.checkBarrierAndOpen(i)) {
                        break;
                    }

                    moveGridCount++;

                    if (GameLevelConfig.getInstance().gameGrids[i][this.moveGridX] == 10) { // 传送门
                        break;
                    }
                }
                this.moveDistanceY = moveGridCount*GameLevelConfig.getInstance().grid[0];
                break;
            }
            case DIRECTION_DOWN:
            {
                for (var i = this.moveGridY+1; i < 10; i++) {
                    if (GameLevelConfig.getInstance().gameGrids[i][this.moveGridX] == 6) { // 墙壁
                        break;
                    }

                    if (this.checkBarrierAndOpen(i)) {
                        break;
                    }

                    moveGridCount++;

                    if (GameLevelConfig.getInstance().gameGrids[i][this.moveGridX] == 10) { // 传送门
                        break;
                    }
                }
                this.moveDistanceY = -1*(moveGridCount*GameLevelConfig.getInstance().grid[0]);
                break;
            }
            case DIRECTION_LEFT:
            {
                if (this.moveGridX == 0) {
                    return;
                }
                for (var i = this.moveGridX-1; i >= 0; i--) {
                    if (GameLevelConfig.getInstance().gameGrids[this.moveGridY][i] == 6) {
                        break;
                    }

                    if (this.checkBarrierAndOpen(i)) {
                        break;
                    }

                    moveGridCount++;

                    if (GameLevelConfig.getInstance().gameGrids[this.moveGridY][i] == 10) { // 传送门
                        break;
                    }
                }
                this.moveDistanceX = -1*(moveGridCount*GameLevelConfig.getInstance().grid[0]);
                break;
            }
            case DIRECTION_RIGHT:
            {
                for (var i = this.moveGridX+1; i < 14; i++) {
                    if (GameLevelConfig.getInstance().gameGrids[this.moveGridY][i] == 6) {
                        break;
                    }

                    if (this.checkBarrierAndOpen(i)) {
                        break;
                    }

                    moveGridCount++;

                    if (GameLevelConfig.getInstance().gameGrids[this.moveGridY][i] == 10) { // 传送门
                        break;
                    }
                }
                this.moveDistanceX = moveGridCount*GameLevelConfig.getInstance().grid[0];
                break;
            }
            default:
                break;
        }

        if (this.moveDistanceX == 0 &&
            this.moveDistanceY == 0) {
            return;
        }

        this.moveEnable = true;

        if (!LOCAL_SERVICE) {
            SmallBridge.sendMessage('playeffect:4');
        } else {
            cc.AudioEngine.getInstance().playEffect(g_audio_game_effect_4, false);
        }

        var targetX = this.getPositionX()+this.moveDistanceX;
        var targetY = this.getPositionY()+this.moveDistanceY;
        if (this.getPositionX() == targetX &&
            this.getPositionY() == targetY) { // 如果当前的位置跟目标位置一致，则不
            this.moveEnable = false;
            this.swtichDirection(this.roleDirection);
            this.setPosition(targetX,targetY);
            return;
        }
        var moveTo = cc.MoveTo.create(moveGridCount*0.1,cc.p(targetX,targetY));
        var callFunc = cc.CallFunc.create(function(){
            this.moveEnable = false;
            this.swtichDirection(this.roleDirection);
            this.setPosition(targetX,targetY);

            { // 检查碰撞到传送门没有
                var checkDoor = false;
                for (var i = 0; i < GameLevelConfig.getInstance().transport.length; i++) {
                    var item = GameLevelConfig.getInstance().transport[i];
                    var fat = item["fat"];
                    if (this.moveGridX == fat[0][0] &&
                        this.moveGridY == fat[0][1]) {
                        this.jumpToGrid(fat[1][0],fat[1][1]);
                        checkDoor = true;
                        break;
                    }
                }
            }

            { // 再检查一次检查（主要是前面计算到开着的栅栏处就停止运动了，但是在运动的途中碰撞了开关）
                if (!checkDoor) {
                    this.calculateDistance();
                }
            }
        },this,true);
        this.moveAction = cc.Sequence.create(moveTo,callFunc);
        this.runAction(this.moveAction);
    },

    update : function (dt) {
        var size = cc.Director.getInstance().getWinSize();
        var roleX = this.getPositionX();
        var roleY = this.getPositionY();
        var offsetX = GameLevelConfig.getInstance().gridOffset[0];
        var offsetY = GameLevelConfig.getInstance().gridOffset[1];
        var gridW = GameLevelConfig.getInstance().grid[0];
        var gridH = GameLevelConfig.getInstance().grid[1];
        roleX = roleX-gridW;
        roleY = roleY+gridH;
        this.moveGridX = Math.ceil((roleX-offsetX)/gridW);
        this.moveGridY = Math.ceil(((size.height-roleY)-offsetY)/gridH);
    },

    checkEvent : function () {
        for (var i = 0; i < GameLevelConfig.getInstance().grids[0]; i++) {
            for (var j = 0; j < GameLevelConfig.getInstance().grids[1]; j++) {
                return GameLevelConfig.getInstance().gameGrids[this.moveGridY][this.moveGridX];
            }
        }
        return - 1;
    },

    performFog : function () {
        fog = cc.Sprite.createWithSpriteFrameName("fog_1.png");
        var size = cc.Director.getInstance().getWinSize();
        fog.setPosition(this.moveGridX*GameLevelConfig.getInstance().grid[0]+GameLevelConfig.getInstance().gridOffset[0],
            size.height-(this.moveGridY*GameLevelConfig.getInstance().grid[1]+GameLevelConfig.getInstance().gridOffset[1]));
        this.getParent().addChild(fog);

        var frames = new Array();
        for (var i = 1; i <= 19; i++){
            frames.push(cc.SpriteFrameCache.getInstance().getSpriteFrame("fog_"+i+".png"));
        }
        var animation = new cc.Animation.create(frames,0.03);
        var action = cc.Animate.create(animation);
        var repeat = cc.Repeat.create(action,1);
        var callFunc = cc.CallFunc.create(function() {
            fog.removeFromParent();
        },this);
        var sequence = cc.Sequence.create(repeat,callFunc);
        fog.runAction(sequence);
    },

    controlShield : function (protect) {
        this.canProtect = protect;
        if (protect) {
            this.protectCount++;
        } else {
            this.protectCount--;
        }
        if (this.protectCount <= 0) {
            this.removeShield();
        } else if (this.protectCount == 1) {
            this.preformShield();
        }
    },

    /*
    *  开启防护罩
    * */
     preformShield : function () {
         this.removeAllChildren();
         var frames = new Array();
         for (var i = 1; i <= 25; i++){
             frames.push(cc.SpriteFrameCache.getInstance().getSpriteFrame("role_shield_"+i+".png"));
         }
         var animation = new cc.Animation.create(frames,0.1);
         var action = cc.Animate.create(animation);
         var repeat = cc.RepeatForever.create(action);

         var sprite = cc.Sprite.createWithSpriteFrame(frames[0]);
         sprite.setScaleX(0.8);
         sprite.setScaleY(1.0);
         sprite.setPosition(this.getContentSize().width/2,this.getContentSize().height/2+20);
         this.addChild(sprite);

         sprite.runAction(repeat);
    },

    /*
    *  移除防护罩
    * */
    removeShield : function () {
        this.removeAllChildren();
    }
});
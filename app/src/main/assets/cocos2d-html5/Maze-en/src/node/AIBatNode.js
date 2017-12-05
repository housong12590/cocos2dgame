/**
 * Created by huangxinping on 8/6/14.
 *
 * 智能蝙蝠
 *
 */

var AIBatNode;
AIBatNode = cc.Sprite.extend({

    flyKnifes:null,
    bombFlyKifes:null,

    gridX:0,
    gridY:0,

    ctor: function () {
        this._super();

        cc.SpriteFrameCache.getInstance().addSpriteFrames(g_game_bat_plist,g_game_bat);
        cc.SpriteFrameCache.getInstance().addSpriteFrames(g_game_darts_plist,g_game_darts);
    },

    init: function (i,j) {
        this.gridX = i;
        this.gridY = j;

        this.ainimateBat(i,j);
    },

    ainimateBat : function(i,j) {
        var frames = new Array();
        for (var m = 1; m <= 36; m++){
            frames.push(cc.SpriteFrameCache.getInstance().getSpriteFrame("bat_"+m+".png"));
        }
        var animation = new cc.Animation.create(frames,0.1);
        var action = cc.Animate.create(animation);

        this.initWithSpriteFrame(frames[0]);
        var size = cc.Director.getInstance().getWinSize();

        this.setPosition(
                j*GameLevelConfig.getInstance().grid[0]+GameLevelConfig.getInstance().gridOffset[0]+(GameLevelConfig.getInstance().grid[0]/2),
                size.height-(i*GameLevelConfig.getInstance().grid[1]+GameLevelConfig.getInstance().gridOffset[1])-(GameLevelConfig.getInstance().grid[1]/2)
        );
        this.setScale(0.8);

        var repeat = cc.RepeatForever.create(action);
        this.runAction(repeat);
    },

    flyKnifeDistance : function (gridX,gridY,direction) {
        var moveDistance = 0;
        var moveGridCount = 0;
        switch (direction) {
            case DIRECTION_UP:
            {
                for (var i = gridY-1; i >= 0; i--) {
                    if (GameLevelConfig.getInstance().gameGrids[i][gridX] == 6) {
                        break;
                    }
                    moveGridCount++;
                }
                moveDistance = moveGridCount*GameLevelConfig.getInstance().grid[0];
                break;
            }
            case DIRECTION_DOWN:
            {
                for (var i = gridY+1; i < 10; i++) {
                    if (GameLevelConfig.getInstance().gameGrids[i][gridX] == 6) { // 墙壁
                        break;
                    }
                    moveGridCount++;
                }
                moveDistance = -1*(moveGridCount*GameLevelConfig.getInstance().grid[0]);
                break;
            }
            case DIRECTION_LEFT:
            {
                if (gridX == 0) {
                    return moveDistance;
                }
                for (var i = gridX-1; i >= 0; i--) {
                    if (GameLevelConfig.getInstance().gameGrids[gridY][i] == 6) {
                        break;
                    }
                    moveGridCount++;
                }
                moveDistance = -1*(moveGridCount*GameLevelConfig.getInstance().grid[0]);
                break;
            }
            case DIRECTION_RIGHT:
            {
                for (var i = gridX+1; i < 14; i++) {
                    if (GameLevelConfig.getInstance().gameGrids[gridY][i] == 6) {
                        break;
                    }
                    moveGridCount++;
                }
                moveDistance = moveGridCount*GameLevelConfig.getInstance().grid[0];
                break;
            }
            default:
                break;
        }
        return moveDistance;
    },

    shotFlyKnife: function () {
        if (!this.getParent())
        {
            return;
        }

        this.flyKnifes = new Array();
        this.bombFlyKifes = new Array();
        for (var m = 0; m < 4; m++) {
            { // 飞行中的飞刀
                var sprite = cc.Sprite.createWithSpriteFrameName("darts_running.png");
                this.getParent().addChild(sprite);
                sprite.setPosition(this.getPosition());
                sprite.setVisible(false);
                sprite.setTag(m);
                this.flyKnifes.push(sprite);
            }

            { // 爆炸性的飞刀
                var sprite = cc.Sprite.createWithSpriteFrameName("darts_broken_0.png");
                this.getParent().addChild(sprite);
                sprite.setPosition(this.getPosition());
                sprite.setVisible(false);

                this.bombFlyKifes.push(sprite);
            }
        }

        var rotations = [-90,90,-180,0];
        var moveDistances = [];
        var maxDistance = 0;
        var maxDistanceIndex = 0;
        for (var m = 0; m < 4; m++) // 计算4个方向的位移量
        {
            var distance = this.flyKnifeDistance(this.gridY,this.gridX,m);
            moveDistances.push(distance);
            if (Math.abs(distance) > maxDistance) {
                maxDistance = Math.abs(distance);
                maxDistanceIndex = m;
            }
        }

        var defaultPT = this.getPosition(); // 获取飞刀的起始位置ß
        for (var l = 0; l < 4; l++)
        {
            if (distance == 0 || distance == -0) {
                continue;
            }
            var targetPT = 0;
            if (l == 0 || l == 1) { // 上下2个方向，控制Y轴偏移
                targetPT = cc.p(defaultPT.x,defaultPT.y+moveDistances[l]);
            } else {
                targetPT = cc.p(defaultPT.x+moveDistances[l],defaultPT.y);
            }

            var moveTo = cc.MoveTo.create(Math.abs(moveDistances[l]/GameLevelConfig.getInstance().grid[0])*0.6,targetPT);
            var params = [this.flyKnifes[l],l==maxDistanceIndex?1:0]
            var callFunc = cc.CallFunc.create(this.doBumb,this, params);
            var seq = cc.Sequence.create(moveTo,callFunc);

            this.flyKnifes[l].setVisible(true);
            this.flyKnifes[l].setPosition(defaultPT);
            this.flyKnifes[l].setRotation(rotations[l]);
            this.flyKnifes[l].runAction(seq);
        }
    },

    doBumb:function(thisclass,params) {
        var sprite = params[0];
        var bombAndRenew = params[1]==1?true:false;
        var tag = sprite.getTag();
        // 释放飞刀爆炸
        {
            var frames = new Array();
            for (var m = 0; m <= 1; m++){
                frames.push(cc.SpriteFrameCache.getInstance().getSpriteFrame("darts_broken_"+m+".png"));
            }
            var animation = new cc.Animation.create(frames,0.1);
            var action = cc.Animate.create(animation);

            this.bombFlyKifes[tag].setVisible(sprite.isVisible());
            this.bombFlyKifes[tag].setPosition(sprite.getPosition());
            var callFuncDeal = cc.CallFunc.create(this.dealBombFlyKnifes,this.bombFlyKifes[tag],true);
            var callFunc = cc.CallFunc.create(function(){
                if (bombAndRenew) {
                    this.shotFlyKnife();
                }
            },this,true);
            var delay = cc.DelayTime.create(0.1);
            var seq = cc.Sequence.create(action,delay,callFuncDeal,callFunc);
            this.bombFlyKifes[tag].runAction(seq);
        }

        { // 隐藏飞行中的飞刀
            sprite.setVisible(false);
            sprite.setPosition(this.getPosition());
        }
    },

    dealBombFlyKnifes:function(object,params){
        object.setVisible(false);
    }

});
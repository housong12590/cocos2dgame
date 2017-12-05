/**
 * Created by huangxinping on 2/14/14.
 * 任务完成场景
 */

var GameMissionCompleteLayer;
GameMissionCompleteLayer = cc.Layer.extend({

    ctor : function () {
        this._super();
    },

    init: function () {
        this._super();

        var size = cc.Director.getInstance().getWinSize();

        { // 音效
            if (!LOCAL_SERVICE) {
                SmallBridge.sendMessage('playeffect:2');
            } else {
                cc.AudioEngine.getInstance().playEffect(g_audio_game_effect_2, false);
            }
        }

        { // 背景或固定物
            background = cc.Sprite.create(g_complete_background);
            background.setPosition(size.width/2,size.height/2);
            this.addChild(background);
        }

        { // 选择
            var nextItem = cc.MenuItemImage.create(
                g_complete_next_button,
                g_complete_next_button_clicked,
                function () {
                    g_current_level++;
                    cc.Director.getInstance().purgeCachedData();
//                    var transitionScene = cc.TransitionLib.getInstance().slideInTToScene(0.3,new GameScene());
                    cc.Director.getInstance().replaceScene(new GameScene());
                },this);
            nextItem.setPosition(512,400);

            var restartItem = cc.MenuItemImage.create(
                g_answer_restart_game_button,
                g_answer_restart_game_button_clicked,
                function () {
                    cc.Director.getInstance().purgeCachedData();
//                    var transitionScene = cc.TransitionLib.getInstance().slideInTToScene(0.3,new GameScene());
                    cc.Director.getInstance().replaceScene(new GameScene());
                },this);
            restartItem.setScale(0.8);
            restartItem.setPosition(512,300);

            var menu = cc.Menu.create(nextItem,restartItem);
            menu.setPosition(0,0);
            this.addChild(menu, 1);
        }

        this.setTouchEnabled(true);
        return true;
    },

    performScore : function (score) {
        for (var m = 0; m < 3; m++) {
            if (m < score) {
                var ps = [cc.p(412+m*100,500)];
                var ss = [0.8];
                for (var j = 0; j < ps.length; j++) {
                    var frames = new Array();
                    for (var i = 1; i <= 20; i++){
                        frames.push(cc.SpriteFrameCache.getInstance().getSpriteFrame("blue_cup_"+i+".png"));
                    }
                    var animation = new cc.Animation.create(frames,0.1);
                    var action = cc.Animate.create(animation);

                    var sprite = cc.Sprite.createWithSpriteFrameName("blue_cup_1.png");
                    sprite.setPosition(ps[j].x,ps[j].y);
                    sprite.setScale(ss[j]);
                    this.addChild(sprite);

                    var repeat = cc.RepeatForever.create(action);
                    sprite.runAction(repeat);
                }
            } else {
                var ps = [cc.p(412+m*100,500)];
                var ss = [0.8];
                for (var j = 0; j < ps.length; j++) {
                    var frames = new Array();
                    for (var i = 1; i <= 20; i++){
                        frames.push(cc.SpriteFrameCache.getInstance().getSpriteFrame("gray_cup_"+i+".png"));
                    }
                    var animation = new cc.Animation.create(frames,0.1);
                    var action = cc.Animate.create(animation);

                    var sprite = cc.Sprite.createWithSpriteFrameName("gray_cup_1.png");
                    sprite.setPosition(ps[j].x,ps[j].y);
                    sprite.setScale(ss[j]);
                    this.addChild(sprite);

                    var repeat = cc.RepeatForever.create(action);
                    sprite.runAction(repeat);
                }
            }
        }
    },

    onEnter:function() {
        this._super();
    },

    onTouchesBegan: function (touches, event) {
    },

    onTouchesMoved: function (touches, event) {
    },

    onTouchesEnded: function (touches, event) {

    },

    onTouchesCancelled: function (touches, event) {
    }
});

var GameMissionCompleteScene = cc.Scene.extend({

    score:0,

    onEnter:function () {
        this._super();
        var layer = new GameMissionCompleteLayer();
        layer.init();
        layer.performScore(this.score);
        this.addChild(layer);
    }
});
/**
 * Created by huangxinping on 2/20/14.
 */

var GameAnswerSuccessLayer;
GameAnswerSuccessLayer = cc.Layer.extend({

    init: function () {
        this._super();

        var size = cc.Director.getInstance().getWinSize();

        { // 音效
            if (!LOCAL_SERVICE) {
                SmallBridge.sendMessage('playeffect:2');
            } else {
                cc.AudioEngine.getInstance().playEffect(g_audio_game_effect_2);
            }
        }

        { // 背景或固定物
            background = cc.Sprite.create(g_answer_error_background);
            background.setPosition(size.width/2,size.height/2);
            this.addChild(background);

            bingo = cc.Sprite.create(g_answer_success_image);
            bingo.setPosition(size.width/2,size.height/2);
            bingo.setScale(0.5);
            this.addChild(bingo);
        }

        { // 按钮
        }

        // 开启定时器
        this.schedule(this.update,3.0);

        this.setTouchEnabled(false);
        return true;
    },

    onEnter:function() {
        this._super();
        this.setScale(2.0);
    },

    update:function(dt){
        this.unschedule(this.update);
        g_current_level++;
        cc.Director.getInstance().purgeCachedData();
        cc.Director.getInstance().replaceScene(new GameScene());
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

var GameAnswerSuccessScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new GameAnswerSuccessLayer();
        layer.init();
        this.addChild(layer);
    }
});
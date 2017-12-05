/**
 * Created by huangxinping on 2/14/14.
 */

var GameAnswerErrorLayer;
GameAnswerErrorLayer = cc.Layer.extend({

    init: function () {
        this._super();

        var size = cc.Director.getInstance().getWinSize();

        { // 背景或固定物
            background = cc.Sprite.create(g_answer_error_background);
            background.setPosition(size.width/2,size.height/2);
            this.addChild(background);

            error = cc.Sprite.create(g_answer_error_image);
            error.setPosition(size.width/2,size.height/2+60);
            error.setScale(0.5);
            this.addChild(error);
        }

        { // 按钮
            var retryItem = cc.MenuItemImage.create(
                g_answer_retry_button,
                g_answer_retry_button_clicked,
                function () {
                    this.removeFromParent();
                },this);
            retryItem.setAnchorPoint(0.5, 0.5);
            retryItem.setScale(0.6);
            retryItem.setPosition(size.width/2,size.height/2+5);

            var restartItem = cc.MenuItemImage.create(
                g_answer_restart_game_button,
                g_answer_restart_game_button_clicked,
                function () {
                    cc.Director.getInstance().purgeCachedData();
                    cc.Director.getInstance().replaceScene(new GameScene());
                },this);
            restartItem.setAnchorPoint(0.5, 0.5);
            restartItem.setScale(0.5);
            restartItem.setPosition(size.width/2,size.height/2-60);

            var menu = cc.Menu.create(retryItem,restartItem);
            menu.setPosition(0,0);
            this.addChild(menu, 1);
        }

        this.setTouchEnabled(true);

        cc.Director.getInstance().getTouchDispatcher()._addTargetedDelegate(this,-128,true);
        return true;
    },

    onEnter:function() {
        this._super();
        this.setScale(2.0);
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

var GameAnswerErrorScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new GameAnswerErrorLayer();
        layer.init();
        this.addChild(layer);
    }
});
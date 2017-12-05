/**
 * Created by huangxinping on 2/14/14.
 * 暂停场景
 */

var GamePauseLayer;
GamePauseLayer = cc.Layer.extend({

    init: function () {
        this._super();

        var size = cc.Director.getInstance().getWinSize();

        { // 背景或固定物
            background = cc.Sprite.create(g_pause_background);
            background.setPosition(size.width/2,size.height/2);
            this.addChild(background);
        }

        { // 按钮
            var continueItem = cc.MenuItemImage.create(
                g_pause_continue_button,
                g_pause_continue_button_clicked,
                function () {
                    cc.Director.getInstance().popScene();
                },this);
            continueItem.setAnchorPoint(0.5, 0.5);
            continueItem.setPosition(size.width/2+20,size.height/2+100);

            var choiceItem = cc.MenuItemImage.create(
                g_pause_level_choice_button,
                g_pause_level_choice_button_clicked,
                function () {
                    cc.Director.getInstance().purgeCachedData();
                    cc.Director.getInstance().pushScene(new GameLevelChoiceScene());
                },this);
            choiceItem.setAnchorPoint(0.5, 0.5);
            choiceItem.setPosition(size.width/2+20,size.height/2-40);

            var mainItem = cc.MenuItemImage.create(
                g_pause_quit_game_button,
                g_pause_quit_game_button_clicked,
                function () {
                    cc.Director.getInstance().purgeCachedData();
                    if (!LOCAL_SERVICE) {
                        SmallBridge.sendMessage('quitegame:1');
                    } else {
                        g_current_level = 1;
                        cc.Director.getInstance().replaceScene(new MainScene());
                    }
                },this);
            mainItem.setAnchorPoint(0.5, 0.5);
            mainItem.setPosition(size.width/2+20,size.height/2-170);

            var menu = cc.Menu.create(continueItem,choiceItem,mainItem);
            menu.setPosition(0,0);
            this.addChild(menu, 1);
        }

        this.setTouchEnabled(true);
        return true;
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


var GamePauseScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new GamePauseLayer();
        layer.init();
        this.addChild(layer);
    }
});
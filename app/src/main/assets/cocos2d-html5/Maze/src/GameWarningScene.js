/**
 * Created by huangxinping on 4/4/14.
 */

var GameWaringLayer;
GameWaringLayer = cc.Layer.extend({

    init: function () {
        this._super();

        var size = cc.Director.getInstance().getWinSize();

        background = cc.Sprite.create(g_warning_background);
        background.setPosition(size.width/2,size.height/2);
        this.addChild(background);

        { // 按钮
            var continueItem = cc.MenuItemImage.create(
                g_warning_continue,
                g_warning_continue_clicked,
                function () {
                    cc.Director.getInstance().replaceScene(new GameScene());
                },this);
            continueItem.setAnchorPoint(0.5, 0.5);
            continueItem.setPosition(size.width/2, 600);

            var newItem = cc.MenuItemImage.create(
                g_warning_new,
                g_warning_new_clicked,
                function () {
                    cc.Director.getInstance().replaceScene(new IntroduceScene());
                },this);
            newItem.setAnchorPoint(0.5, 0.5);
            newItem.setPosition(size.width/2, 400);

            var menuItem = cc.MenuItemImage.create(
                g_warning_menu,
                g_warning_menu_clicked,
                function () {
                    cc.Director.getInstance().replaceScene(new MainScene());
                },this);
            menuItem.setAnchorPoint(0.5, 0.5);
            menuItem.setPosition(size.width/2, 200);

            var menu = cc.Menu.create(continueItem,newItem,menuItem);
            menu.setPosition(0,0);
            this.addChild(menu, 1);
        }

        return true;
    },

    onEnter:function() {
        this._super();
    },

    update:function(dt){

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

var GameWaringScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new GameWaringLayer();
        layer.init();
        this.addChild(layer);
    }
});
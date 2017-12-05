/**
 * Created by huangxinping on 4/4/14.
 */

/**
 * Created by huangxinping on 2/14/14.
 * 暂停场景
 */

var GameLevelChoiceLayer;
GameLevelChoiceLayer = cc.Layer.extend({

    init: function () {
        this._super();

        var size = cc.Director.getInstance().getWinSize();

        { // 背景或固定物
            background = cc.Sprite.create(g_level_choice_background);
            background.setPosition(size.width/2,size.height/2);
            this.addChild(background);

            tip = cc.Sprite.create(g_level_choice_button);
            tip.setPosition(size.width/2,720);
            this.addChild(tip);
        }

        { // plist序列
            cc.SpriteFrameCache.getInstance().addSpriteFrames(g_game_level_plist,g_game_level);
            cc.SpriteFrameCache.getInstance().addSpriteFrames(g_game_cup_plist,g_game_cup);
        }

//        var menuItem = cc.MenuItemImage.create(
//            g_level_choice_menu_button,
//            g_level_choice_menu_button_clicked,
//            function () {
//                cc.Director.getInstance().purgeCachedData();
//                cc.Director.getInstance().pushScene(new MainScene());
//            },this);
//        menuItem.setAnchorPoint(0.5, 0.5);
//        menuItem.setPosition(size.width/2, 100);
//
//        var menu = cc.Menu.create(menuItem);
//        menu.setPosition(0,0);
//        this.addChild(menu, 1);

        copyrightLabel = cc.LabelTTF.create("江苏红楼梦世界股份有限公司","Marker Felt",42);
//        copyrightLabel.setDimensions(cc.size(650,180));
        copyrightLabel.setHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
        copyrightLabel.setPosition(size.width/2, 100);
        copyrightLabel.setColor(cc.c3b(15,166,255));
        this.addChild(copyrightLabel,5);

        var level_normal = [
            [137,768-217],
            [249,768-176],
            [348,768-213],
            [461,768-175],
            [566,768-209],
            [675,768-176],
            [779,768-211],
            [886,768-174],
            [140,768-363],
            [247,768-338],
            [351,768-373],
            [460,768-340],
            [564,768-375],
            [673,768-345],
            [776,768-380],
            [884,768-341],
            [139,768-543],
            [246,768-507],
            [348,768-544],
            [461,768-511],
            [568,768-544],
            [676,768-510],
            [779,768-545],
            [893,768-506],
        ];

        for (var i = 0; i < level_normal.length; i++) {
            var p = level_normal[i];
            var levelChoice = new LevelChoiceNode();
            levelChoice.initWithLevel(i+1,g_state_level[i]);
            levelChoice.setPosition(cc.p(p[0],p[1]));
            this.addChild(levelChoice);
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


var GameLevelChoiceScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new GameLevelChoiceLayer();
        layer.init();
        this.addChild(layer);
    }
});
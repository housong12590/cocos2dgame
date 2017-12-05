/**
 * Created by huangxinping on 2/10/14.
 *
 * 介绍场景
 *
 */

var IntroduceLayer;
IntroduceLayer = cc.Layer.extend({

    introduce_index:0,
    backgroundSprite:null, // 背景

    nameNemu:null,

    startGameNemu:null,

    answerError:null,

    init: function () {
        this._super();

        var size = cc.Director.getInstance().getWinSize();

        { // 背景或固定物
            this.backgroundSprite = cc.Sprite.create(g_introduce_background_1);
//            this.backgroundSprite.setScale(0.5);
            this.backgroundSprite.setPosition(size.width / 2, size.height / 2);
            this.addChild(this.backgroundSprite);

            this.answerError = cc.Sprite.create(g_introduce_answer_error);
//            this.answerError.setScale(0.5);
            this.answerError.setPosition(size.width / 2, 150);
            this.addChild(this.answerError);
            this.answerError.setVisible(false);
        }

        { // 按钮
            var nextItem = cc.MenuItemImage.create(
                g_introduce_arrow,
                g_introduce_arrow,
                function () {
                    this.introduce_index = this.introduce_index+1;
                    if (this.introduce_index > 2) {
                        this.introduce_index = 2;
                    }
                    this.updateUIWithIndex(this.introduce_index);
                },this);
            nextItem.setAnchorPoint(0.5, 0.5);
//            nextItem.setScale(0.5);
            nextItem.setPosition(size.width - 70, 35);

            var previousItem = cc.MenuItemImage.create(
                g_introduce_arrow,
                g_introduce_arrow,
                function () {
                    this.introduce_index = this.introduce_index-1;
                    if (this.introduce_index < 0) {
                        this.introduce_index = 0;
                    }
                    this.updateUIWithIndex(this.introduce_index);
                },this);
            previousItem.setAnchorPoint(0.5, 0.5);
//            previousItem.setScale(0.5);
            previousItem.setPosition(70, 35);
            previousItem.setRotation(180);

            var menu = cc.Menu.create(nextItem,previousItem);
            menu.setPosition(0,0);
            this.addChild(menu, 1);

            { // 选择按钮
                var cxqItem = cc.MenuItemImage.create(
                    g_introduce_cxq,
                    g_introduce_cxq,
                    function () {
                        this.nameMenuSelected(0);
                    },this);
                cxqItem.setAnchorPoint(0.5, 0.5);
//                cxqItem.setScale(0.5);
                cxqItem.setPosition(size.width/2 - 100, size.height/2 + 100 - 50); // 曹雪芹

                var lgzItem = cc.MenuItemImage.create(
                    g_introduce_lgz,
                    g_introduce_lgz,
                    function () {
                        this.nameMenuSelected(1);
                    },this);
                lgzItem.setAnchorPoint(0.5, 0.5);
//                lgzItem.setScale(0.5);
                lgzItem.setPosition(size.width/2 + 100, size.height/2 + 100 - 50); // 罗贯中

                var snaItem = cc.MenuItemImage.create(
                    g_introduce_sna,
                    g_introduce_sna,
                    function () {
                        this.nameMenuSelected(2);
                    },this);
                snaItem.setAnchorPoint(0.5, 0.5);
//                snaItem.setScale(0.5);
                snaItem.setPosition(size.width/2 - 100, size.height/2 - 100 - 50 + 20); // 施耐庵

                var wceItem = cc.MenuItemImage.create(
                    g_introduce_wce,
                    g_introduce_wce,
                    function () {
                        this.nameMenuSelected(3);
                    },this);
                wceItem.setAnchorPoint(0.5, 0.5);
//                wceItem.setScale(0.5);
                wceItem.setPosition(size.width/2 + 100, size.height/2 - 100 - 50 + 20); // 吴承恩

                this.nameNemu = cc.Menu.create(cxqItem,lgzItem,snaItem,wceItem);
                this.nameNemu.setPosition(0,0);
                this.addChild(this.nameNemu, 1);
                this.nameNemu.setVisible(false);
            }

            { // 开始游戏
                var startItem = cc.MenuItemImage.create(
                    g_introduce_start_game,
                    g_introduce_start_game,
                    function () {
                        cc.Director.getInstance().purgeCachedData();
                        cc.Director.getInstance().replaceScene(new GameScene());
//                        var transitionScene = cc.TransitionLib.getInstance().slideInRToScene(0.3,new GameScene());
//                        cc.Director.getInstance().replaceScene(transitionScene);
                    },this);
                startItem.setAnchorPoint(0.5, 0.5);
//                startItem.setScale(0.5);
                startItem.setPosition(size.width/2, 150);

                this.startGameNemu = cc.Menu.create(startItem);
                this.startGameNemu.setPosition(0,0);
                this.addChild(this.startGameNemu, 1);
                this.startGameNemu.setVisible(false);
            }
        }

        this.setTouchEnabled(false);
        return true;
    },

    // 名字菜单选择
    nameMenuSelected:function(index) {
        switch (index) {
            case 0:
                this.startGameNemu.setVisible(true);
                this.answerError.setVisible(false);
                break;
            case 1:
            case 2:
            case 3:
            default:
                this.startGameNemu.setVisible(false);
                this.answerError.setVisible(true);
                break
        }
    },

    // 更新UI从当前的介绍索引
    updateUIWithIndex:function(introduceIndex) {
       switch (this.introduce_index) {
           case 0:
               var texture  = cc.TextureCache.getInstance().addImage(g_introduce_background_1);
               this.backgroundSprite.setTexture(texture);

               this.nameNemu.setVisible(false);
               break;
           case 1:
               var texture  = cc.TextureCache.getInstance().addImage(g_introduce_background_2);
               this.backgroundSprite.setTexture(texture);

               this.nameNemu.setVisible(false);
               break;
           case 2:
           {
               var texture  = cc.TextureCache.getInstance().addImage(g_introduce_background_3);
               this.backgroundSprite.setTexture(texture);

               this.nameNemu.setVisible(true);
           }
               break;
           default:
               break;
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


var IntroduceScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new IntroduceLayer();
        layer.init();
        this.addChild(layer);
    }
});
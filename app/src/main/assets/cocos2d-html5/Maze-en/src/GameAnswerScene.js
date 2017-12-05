/**
 * Created by huangxinping on 2/14/14.
 */

/**
 * Created by huangxinping on 2/14/14.
 * 回答问题场景
 */

var GameAnswerLayer;
GameAnswerLayer = cc.Layer.extend({

    answerMenu:null,
    AItem:null,
    BItem:null,
    CItem:null,
    DItem:null,

    titleLabel:null,

    answerIndex:1,

    rightCount:0, // 正确的数量统计


    ctor : function () {
        this._super();
    },

    init: function () {
        this._super();

        var size = cc.Director.getInstance().getWinSize();

        { // 背景或固定物
            background = cc.Sprite.create(g_answer_background);
            background.setPosition(size.width/2,size.height/2);
            this.addChild(background);

//            cc.UserDefault.getInstance().setStringForKey("name","huangxinping");
//            cc.log(cc.UserDefault.getInstance().getStringForKey("name",""));
        }

        { // 按钮
            var backItem = cc.MenuItemImage.create(
                g_answer_back_button,
                g_answer_back_button_clicked,
                function () {
                    cc.Director.getInstance().popScene();
                },this);
            backItem.setAnchorPoint(0.5, 0.5);
            backItem.setPosition(size.width-80,size.height-50);

            var menu = cc.Menu.create(backItem);
            menu.setPosition(0,0);
            this.addChild(menu, 1);
        }

        { // 选择
            cc.MenuItemFont.setFontName("Arial");
            this.createAnswer(this.answerIndex);
        }

        this.setTouchEnabled(false);

        if (g_current_level == 1 && g_level_answer_tip) {

            var layer = new GameAnswerTipLayer();
            layer.init();
            this.addChild(layer,900);

            g_level_answer_tip = false;
        }
        return true;
    },

    // 创建问题（answerIndex都是从1开始）
    // answerIndex 问题索引

//    "American Typewriter"
//    "Arial"
//    "Arial Rounded MT Bold"
//    "Courier New"
//    "Georgia"
//    "Helvetica"
//    "Marker Felt"
//    "Times New Roman"
//    "Trebuchet MS"
//    "Verdana"
//    "Zapfino"
    createAnswer:function (answerIndex) {
        var answer = GameLevelConfig.getInstance().answer[answerIndex-1];
        title = answer["title"];
        answerA = answer["keys"][0];
        answerB = answer["keys"][1];
        answerC = answer["keys"][2];
        answerD = answer["keys"][3];
        resultIndex = answer["result"];

        var size = cc.Director.getInstance().getWinSize();

        if (this.titleLabel != null) {
            this.titleLabel.removeFromParent();
        }
        this.titleLabel = cc.LabelTTF.create(title,"Marker Felt",30);
        this.titleLabel.setDimensions(cc.size(650,180));
        this.titleLabel.setHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
        this.titleLabel.setPosition(size.width/2+30,size.height/2+100);
        this.titleLabel.setColor(cc.black());
        this.addChild(this.titleLabel,5);

        if (this.AItem != null) {
            this.AItem.removeFromParent();
        }
        this.AItem = cc.MenuItemFont.create(answerA,function() {
            if (this.AItem.tag == resultIndex) {
                this.answerOK();
            } else {
                this.answerError();
            }
        },this);
        this.AItem.setFontName("Marker Felt");
        this.AItem.setFontSize(28);
        this.AItem.setColor(cc.black());
        this.AItem.tag = 1;

        if (this.BItem != null) {
            this.BItem.removeFromParent();
        }
        this.BItem = cc.MenuItemFont.create(answerB,function() {
            if (this.BItem.tag == resultIndex) {
                this.answerOK();
            } else {
                this.answerError();
            }
        },this);
        this.BItem.setFontName("Marker Felt");
        this.BItem.setFontSize(28);
        this.BItem.setColor(cc.black());
        this.BItem.tag = 2;

        if (this.CItem != null) {
            this.CItem.removeFromParent();
        }
        this.CItem = cc.MenuItemFont.create(answerC,function() {
            if (this.CItem.tag == resultIndex) {
                this.answerOK();
            } else {
                this.answerError();
            }
        },this);
        this.CItem.setFontName("Marker Felt");
        this.CItem.setFontSize(28);
        this.CItem.setColor(cc.black());
        this.CItem.tag = 3;

        if (this.DItem != null) {
            this.DItem.removeFromParent();
        }
        this.DItem = cc.MenuItemFont.create(answerD,function() {
            if (this.DItem.tag == resultIndex) {
                this.answerOK();
            } else {
                this.answerError();
            }
        },this);
        this.DItem.setFontName("Marker Felt");
        this.DItem.setFontSize(28);
        this.DItem.setColor(cc.black());
        this.DItem.tag = 4;


        if (this.answerMenu != null) {
            this.answerMenu.removeFromParent();
        }
        this.answerNemu = cc.Menu.create(this.AItem,this.BItem,this.CItem,this.DItem);
        this.answerNemu.setPosition(size.width/2,size.height/2-50);
        if (answerA.length >= 6) {
            this.answerNemu.alignItemsVerticallyWithPadding(20);
        } else {
            this.answerNemu.alignItemsInColumns(2,2);
        }
        this.addChild(this.answerNemu, 1);
    },

    answerError:function () {
        var layer = new GameAnswerErrorLayer();
        layer.init();
        this.addChild(layer,90);
    },

    answerOK:function () {
        this.rightCount = this.rightCount+1;
        if (this.rightCount >= 5) {

            this.setTouchEnabled(false);
            this.removeAllChildren();

            if (g_current_level >= g_level_max) { // 如果当前是最后一关
                cc.Director.getInstance().purgeCachedData();
                cc.Director.getInstance().replaceScene(new GameMissionOverScene());
            } else {
                var layer = new GameAnswerSuccessLayer();
                layer.init();
                this.addChild(layer,90);
            }
            return;
        }
        this.answerIndex = this.answerIndex+1;
        this.createAnswer(this.answerIndex)
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
    },

    exit : function() {
      document.location.href = "http://www.baidu.com";
    }
});

var GameAnswerScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new GameAnswerLayer();
        layer.init();
        this.addChild(layer);
    }
});
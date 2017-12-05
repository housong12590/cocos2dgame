/**
 * Created by huangxinping on 2/20/14.
 *
 * 游戏通过场景
 *
 */

var GameMissionOverLayer;
GameMissionOverLayer = cc.Layer.extend({

    ctor : function () {
        this._super();
    },

    init: function () {
        this._super();

        var size = cc.Director.getInstance().getWinSize();

        { // 音乐
            if (!LOCAL_SERVICE) {
                SmallBridge.sendMessage('playmusic:6');
            } else {
                cc.AudioEngine.getInstance().stopMusic();
                cc.AudioEngine.getInstance().playMusic(g_audio_game_background_6,true);
            }
        }

        { // plist序列
            cc.SpriteFrameCache.getInstance().addSpriteFrames(g_over_score_number_plist,g_over_score_number);
            cc.SpriteFrameCache.getInstance().addSpriteFrames(g_game_cup_plist,g_game_cup);
        }

        { // 背景或固定物
            background = cc.Sprite.create(g_over_background);
            background.setPosition(size.width/2,size.height/2);
            this.addChild(background);

            totalScore = cc.Sprite.create(g_over_total_score);
            totalScore.setPosition(size.width/2+50,220);
            this.addChild(totalScore);

            cup = cc.Sprite.createWithSpriteFrameName("blue_cup_1.png");
            cup.setPosition(size.width/2+200,190);
            this.addChild(cup);

            scoreLine = cc.Sprite.create(g_over_score_line);
            scoreLine.setPosition(size.width/2+290,190);
            this.addChild(scoreLine);

            { // 显示总得分
                var current_total_score = 0;
                for (var i = 0; i < g_current_score.length; i++) {
                    current_total_score += g_current_score[i];
                }
                var scoreBuffer = current_total_score.toString();
                for (var i = 0; i < scoreBuffer.length; i++) {
                    var item = scoreBuffer.charAt(i);
                    number = cc.Sprite.createWithSpriteFrameName("number_"+item+".png");
                    number.setPosition(size.width/2+345+i*30,190);
                    this.addChild(number);
                }
            }
        }

        { // 选择
            var mainMenuItem = cc.MenuItemImage.create(
                g_over_main_menu_button,
                g_over_main_menu_button_clicked,
                function () {
                    cc.Director.getInstance().purgeCachedData();
                    g_current_level = 1;
                    cc.Director.getInstance().pushScene(new MainScene());
                },this);
            mainMenuItem.setPosition(612,600);

            var moreGameItem = cc.MenuItemImage.create(
                g_over_more_game_button,
                g_over_more_game_button_clicked,
                function () {
                    cc.Director.getInstance().purgeCachedData();
                    g_current_level = 1;
                    cc.Director.getInstance().replaceScene(new MainScene());
                },this);
            moreGameItem.setPosition(692,395);

            var menu = cc.Menu.create(mainMenuItem,moreGameItem);
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

var GameMissionOverScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new GameMissionOverLayer();
        layer.init();
        this.addChild(layer);
    }
});
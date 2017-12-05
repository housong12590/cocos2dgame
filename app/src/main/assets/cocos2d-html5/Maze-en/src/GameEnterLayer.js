/**
 * Created by huangxinping on 4/3/14.
 */

var GameEnterLayer;
GameEnterLayer = cc.Layer.extend({


    init: function () {
        this._super();
        this.setTouchEnabled(true);
        return true;
    },

    updateWithLevel:function(level) {
        if (level == 2 ||
            level == 4 ||
            level == 6 ||
            level == 8 ||
            level == 9 ||
            level == 10 ||
            level == 12 ||
            level == 13 ||
            level == 15 ||
            level == 16 ||
            level == 18 ||
            level == 19 ||
            level == 20 ||
            level == 21 ||
            level == 22 ||
            level == 23) {
            this.setTouchEnabled(false);
            this.setVisible(false);
            return;
        }
        if (g_guide_state[level-1] == 1) {
            this.setVisible(false);
            this.removeFromParent();
            return;
        }
        var background = cc.Sprite.create("res/enter/mask_"+level+".png");
        background.setPosition(0,0);
        this.addChild(background);
        this.setVisible(true);
        this.setTouchEnabled(true);

        g_guide_state[level-1] = 1; // 设置当前关卡已经显示引导
    },

    onEnter:function() {
        this._super();
    },

    onTouchesBegan: function (touches, event) {
    },

    onTouchesMoved: function (touches, event) {
    },

    onTouchesEnded: function (touches, event) {
        this.setVisible(false);
        this.removeFromParent();
    },

    onTouchesCancelled: function (touches, event) {
    }
});
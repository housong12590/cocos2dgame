/**
 * Created by huangxinping on 6/30/14.
 */

var GameAnswerTipLayer;
GameAnswerTipLayer = cc.Layer.extend({

    init: function () {
        this._super();

        var size = cc.Director.getInstance().getWinSize();

        background = cc.Sprite.create(g_answer_background);
        background.setPosition(size.width/2,size.height/2);
        this.addChild(background);

        var tip = cc.LabelTTF.create("回答正确5题即可过关喔。亲！","Marker Felt",32);
        tip.setDimensions(cc.size(500,150));
        tip.setHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
        tip.setPosition(size.width/2+50,size.height/2);
        tip.setColor(cc.black());
        this.addChild(tip,50);

        // 开启定时器
        this.schedule(this.update,2.0);
        return true;
    },

    onEnter:function() {
        this._super();
        this.setScale(1.0);
    },

    update:function(dt){
        this.removeFromParent();
    },
});

var GameAnswerTipScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new GameAnswerTipLayer();
        layer.init();
        this.addChild(layer);
    }
});
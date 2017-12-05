/**
 * Created by huangxinping on 4/8/14.
 */

var LevelChoiceNode = cc.Sprite.extend({

    level:-1,

    ctor:function() {
        this._super();
    },

    initWithLevel : function (level,played) {
        this.level = level;
        if (played) {
            this.initWithFile(g_level_choice_level_played);
        } else {
            this.initWithFile(g_level_choice_will_play);
        }
        var size = this.getContentSize();
        var size = this.getContentSize();
        sprite = cc.Sprite.createWithSpriteFrameName(level+"q.png");
        sprite.setPosition(size.width/2,size.height/2+8);
        this.addChild(sprite);

        var score = g_current_score[level-1];
        for (var m = 0; m < score; m++) {
            var ps = [cc.p(28+m*28,23)];
            var ss = [0.3];
            for (var j = 0; j < ps.length; j++) {
                var sprite = cc.Sprite.createWithSpriteFrameName("gray_cup_1.png");
                sprite.setPosition(ps[j].x,ps[j].y);
                sprite.setScale(ss[j]);
                this.addChild(sprite);
            }
        }
    },

    update: function (dt) {

    },

    onEnter:function() {
        cc.Director.getInstance().getTouchDispatcher()._addTargetedDelegate(this,0,true);
    },

    // 刚触摸瞬间
    onTouchBegan:function (touch, event) {
        if (!this.containsTouchLocation(touch)) return false;
        return true;
    },

    // 触摸移动
    onTouchMoved:function (touch, event) {

    },

    // 判断触摸点是否在图片的区域上
    containsTouchLocation:function (touch) {
        // 获取触摸点位置
        var getPoint = touch.getLocation();
        // 获取图片区域尺寸
        var contentSize  =  this.getContentSize();
        // 定义拖拽的区域
        var myRect = cc.rect(0, 0, contentSize.width, contentSize.height);
        myRect.x += this.getPosition().x-this.getContentSize().width/2;
        myRect.y += this.getPosition().y-this.getContentSize().height/2;
        // 判断点击是否在区域上
        return cc.rectContainsPoint(myRect, getPoint);
    },

    onTouchEnded:function (touch, event) {
        if (!g_state_level[this.level-1]) {
            return;
        }
        cc.Director.getInstance().getTouchDispatcher().removeAllDelegates();
        cc.Director.getInstance().purgeCachedData();
        g_current_level = this.level;
        cc.Director.getInstance().replaceScene(new GameScene());
    }
});